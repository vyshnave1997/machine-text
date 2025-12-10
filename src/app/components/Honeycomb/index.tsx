'use client';

import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

export interface HoneycombCell {
  id: number;
  label?: string;
  icon?: React.ReactNode;
  link?: string;
  size?: number;
  color?: string;
  isCenter?: boolean;
}

interface HoneycombProps {
  icons?: React.ReactNode[];
  cells?: HoneycombCell[];
  width?: number;
  height?: number;
  onCellClick?: (cell: HoneycombCell, event?: any) => void;
}

export const HoneycombD3Force: React.FC<HoneycombProps> = ({
  icons = [],
  cells,
  width = 200,
  height = 400,
  onCellClick
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellData, setCellData] = useState<HoneycombCell[]>([]);

  useEffect(() => {
    const data: HoneycombCell[] = cells || [
      { id: 0, label: '', isCenter: true },
      ...icons.map((icon, index) => ({
        id: index + 1,
        label: '',
        icon: icon,
        size: 60,
        color: 'rgba(20, 30, 50, 0.6)',
        isCenter: false
      }))
    ];
    setCellData(data);
  }, [cells, icons]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || cellData.length === 0) return;

    d3.select(svgRef.current).selectAll('*').remove();
    const svg = d3.select(svgRef.current);

    const hexagonPath = (radius: number) => {
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        points.push([x, y]);
      }
      return 'M' + points.map(p => p.join(',')).join('L') + 'Z';
    };

    const nodes = cellData.map(cell => ({
      ...cell,
      size: cell.size || 60,
      color: cell.color || (cell.isCenter ? 'transparent' : 'rgba(20, 30, 50, 0.6)'),
      x: width / 2,
      y: height / 2,
      fx: cell.isCenter ? width / 2 : null,
      fy: cell.isCenter ? height / 2 : null
    }));

    const centerNode = nodes.find(n => n.isCenter);
    const links = centerNode
      ? nodes.filter(n => !n.isCenter).map(n => ({ 
          source: centerNode.id, 
          target: n.id 
        }))
      : [];

    const simulation = d3
      .forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.size * 1.2));

    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', 'transparent')
      .attr('stroke-width', 2);

    const node = svg
      .append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .style('cursor', (d: any) => (d.isCenter ? 'default' : 'pointer'))
      .call(
        d3.drag<any, any>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended) as any
      );

    node
      .append('path')
      .attr('d', (d: any) => hexagonPath(d.size))
      .attr('fill', (d: any) => d.color)
      .attr('stroke', (d: any) => (d.isCenter ? 'transparent' : 'rgba(59, 130, 246, 0.3)'))
      .attr('stroke-width', 1)
      .attr('pointer-events', (d: any) => (d.isCenter ? 'none' : 'all'))
      .style('backdrop-filter', 'blur(10px)')
      .style('-webkit-backdrop-filter', 'blur(10px)')
      .on('mouseenter', function (event, d: any) {
        if (!d.isCenter) {
          d3.select(this)
            .transition()
            .duration(300)
            .attr('fill', 'rgba(30, 40, 60, 0.8)')
            .attr('stroke-width', 2);
        }
      })
      .on('mouseleave', function (event, d: any) {
        if (!d.isCenter) {
          d3.select(this)
            .transition()
            .duration(300)
            .attr('fill', d.color)
            .attr('stroke', 'rgba(59, 130, 246, 0.3)')
            .attr('stroke-width', 1);
        }
      })
      .on('click', function (event, d: any) {
        if (!d.isCenter) {
          if (d.link) {
            window.location.href = d.link;
          }
          if (onCellClick) {
            onCellClick(d, event);
          }
        }
      });

    node
      .filter((d: any) => !d.isCenter)
      .each(function(d: any) {
        const group = d3.select(this);
        const pathLength = d.size * 6 * 1.15;
        
        const borderPath = group.insert('path', ':first-child')
          .attr('d', hexagonPath(d.size + 1))
          .attr('fill', 'none')
          .attr('stroke', 'rgba(96, 165, 250, 1)')
          .attr('stroke-width', 2.5)
          .attr('opacity', 0)
          .style('pointer-events', 'none')
          .style('filter', 'drop-shadow(0 0 6px rgba(96, 165, 250, 0.8))')
          .attr('stroke-dasharray', `${pathLength * 0.25} ${pathLength * 0.75}`)
          .attr('stroke-dashoffset', 0);

        let animationFrame: number;
        let offset = 0;

        const animate = () => {
          offset -= 3;
          borderPath.attr('stroke-dashoffset', offset);
          animationFrame = requestAnimationFrame(animate);
        };

        group.select('path:nth-child(2)')
          .on('mouseenter.border', function() {
            borderPath.transition().duration(300).attr('opacity', 1);
            animate();
          })
          .on('mouseleave.border', function() {
            borderPath.transition().duration(300).attr('opacity', 0);
            cancelAnimationFrame(animationFrame);
            offset = 0;
          });
      });

    node
      .filter((d: any) => d.icon && !d.isCenter)
      .append('foreignObject')
      .attr('x', -30)
      .attr('y', -30)
      .attr('width', 60)
      .attr('height', 60)
      .style('pointer-events', 'none')
      .style('overflow', 'visible')
      .each(function(d: any) {
        const iconContainer = d3.select(this)
          .append('xhtml:div')
          .style('width', '100%')
          .style('height', '100%')
          .style('display', 'flex')
          .style('align-items', 'center')
          .style('justify-content', 'center')
          .style('color', 'rgba(147, 197, 253, 0.9)')
          .style('font-size', '28px');
        
        setTimeout(() => {
          const hiddenIcon = containerRef.current?.querySelector(`[data-icon-id="${d.id}"]`);
          if (hiddenIcon) {
            iconContainer.html(hiddenIcon.innerHTML);
          }
        }, 0);
      });

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (d.isCenter) return;
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      if (d.isCenter) return;
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (d.isCenter) return;
      if (!event.active) simulation.alphaTarget(0);
      if (!d.isCenter) {
        d.fx = null;
        d.fy = null;
      }
    }

    return () => {
      simulation.stop();
    };
  }, [cellData, width, height, onCellClick]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width, height }}>
      <svg ref={svgRef} width={width} height={height} style={{ overflow: 'visible' }} />
      {cellData.map((cell) => (
        cell.icon && !cell.isCenter && (
          <div 
            key={cell.id} 
            data-icon-id={cell.id}
            style={{ 
              position: 'absolute',
              opacity: 0,
              pointerEvents: 'none',
              width: 0,
              height: 0
            }}
          >
            {cell.icon}
          </div>
        )
      ))}
    </div>
  );
};