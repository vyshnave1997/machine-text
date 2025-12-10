
import React from 'react';
import { HoneycombD3Force, HoneycombCell } from '../Honeycomb';

const IconImage = ({ src, alt }: { src: string; alt: string }) => (
  <img 
    src={src} 
    alt={alt} 
    style={{ 
      width: '24px', 
      height: '24px',
      objectFit: 'contain',
      transition: 'filter 0.3s ease',
    }}
    className="honeycomb-icon"
  />
);

interface HoneycombButtonsProps {
  onCellClick: (cell: HoneycombCell, event?: any) => void;
  isAnimating: boolean;
}

export const HoneycombButtons: React.FC<HoneycombButtonsProps> = ({ onCellClick, isAnimating }) => {
  const leftHoneycombCells = [
    { id: 0, isCenter: true },
    { id: 1, icon: <IconImage src="/icons/employees.png" alt="employees" />, size: 50, link: '', label: 'employees' },
    { id: 2, icon: <IconImage src="/icons/inbox.png" alt="inbox" />, size: 45, link: '', label: 'inbox' },
    { id: 3, icon: <IconImage src="/icons/contacts.png" alt="contacts" />, size: 45, link: '', label: 'contacts' }
  ];
  
  const rightHoneycombCells = [
    { id: 0, isCenter: true },
    { id: 1, icon: <IconImage src="/icons/team.png" alt="team" />, size: 50, link: '', label: 'team' },
    { id: 2, icon: <IconImage src="/icons/workflows.png" alt="workflows" />, size: 45, link: '', label: 'workflows' },
    { id: 3, icon: <IconImage src="/icons/campaign.png" alt="campaigns" />, size: 45, link: '', label: 'Campaigns' }
  ];

  return (
    <>
      <style>{`
        .honeycomb-cell:hover .honeycomb-icon {
          filter: brightness(1.5) drop-shadow(0 0 8px rgba(96, 165, 250, 0.8)) drop-shadow(0 0 12px rgba(147, 197, 253, 0.6));
        }
      `}</style>
      
      <div style={{
        position: 'absolute',
        left: '10%',
        top: '10%',
        width: '130px',
        height: '280px',
        zIndex: 25,
        opacity: 0,
        animation: 'slideInLeft 1s ease-out 0.2s forwards',
        pointerEvents: isAnimating ? 'none' : 'auto'
      }}>
        <HoneycombD3Force 
          cells={leftHoneycombCells} 
          width={130}
          height={280}
          onCellClick={onCellClick}
        />
      </div>
      
      <div style={{
        position: 'absolute',
        right: '10%',
        top: '10%',
        width: '130px',
        height: '280px',
        zIndex: 25,
        opacity: 0,
        animation: 'slideInRight 1s ease-out 0.2s forwards',
        pointerEvents: isAnimating ? 'none' : 'auto'
      }}>
        <HoneycombD3Force 
          cells={rightHoneycombCells} 
          width={130}
          height={280}
          onCellClick={onCellClick}
        />
      </div>
    </>
  );
};