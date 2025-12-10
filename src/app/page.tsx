'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { HoneycombButtons } from './components/honeycombbutton';
import { HoneycombCell } from './components/Honeycomb';
import Inbox from './components/Inbox';

const StarIcon = () => <span style={{ fontSize: '24px' }}></span>;

export default function Page() {
  const [showInbox, setShowInbox] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('messages');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasClickedHoneycomb, setHasClickedHoneycomb] = useState(false);
  const inboxRef = useRef<HTMLDivElement>(null);
  const glassContainerRef = useRef<HTMLDivElement>(null);
  const [dummyHoneycombs, setDummyHoneycombs] = useState<Array<{
    id: string;
    startX: number;
    startY: number;
    icon: React.ReactNode;
  }>>([]);

  useEffect(() => {
    if (inboxRef.current && glassContainerRef.current) {
      const glassRect = glassContainerRef.current.getBoundingClientRect();
      const inboxWidth = glassRect.width * 0.9;

      if (showInbox) {
        
        gsap.to(inboxRef.current, {
          top: '50%',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          scale: 1.1,
          opacity: 1,
          width: inboxWidth,
          height: '90%',
          duration: 1.8,
          ease: 'power3.out'
        });
      } else {
        // Initial state
        gsap.to(inboxRef.current, {
          top: '60%',
          left: '50%',
          xPercent: -50,
          yPercent: 0,
          scale: 1,
          opacity: 1,
          width: inboxWidth,
          height: '400px',
          duration: 0.6,
          ease: 'power2.inOut'
        });
      }
    }
  }, [showInbox]);

  
  useEffect(() => {
    const handleResize = () => {
      if (inboxRef.current && glassContainerRef.current) {
        const glassRect = glassContainerRef.current.getBoundingClientRect();
        const inboxWidth = glassRect.width * 0.9;
        gsap.set(inboxRef.current, { width: inboxWidth });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHoneycombClick = (labelOrCell: any, event?: any) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setHasClickedHoneycomb(true); 
    let label: string;
    let icon: React.ReactNode;
    
    if (typeof labelOrCell === 'string') {
      label = labelOrCell;
    } else if (labelOrCell && typeof labelOrCell === 'object') {
      label = labelOrCell.label || '';
      icon = labelOrCell.icon;
    } else {
      label = '';
    }
    
    
    if (event && event.target) {
      const rect = event.target.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;
      
      const dummyId = `dummy-${Date.now()}`;
      setDummyHoneycombs(prev => [...prev, {
        id: dummyId,
        startX,
        startY,
        icon: icon || <StarIcon />
      }]);
      
      setTimeout(() => {
        const dummyElement = document.getElementById(dummyId);
        const inboxElement = inboxRef.current;
        
        if (dummyElement && inboxElement) {
          const inboxRect = inboxElement.getBoundingClientRect();
          const targetX = inboxRect.left + inboxRect.width / 2;
          const targetY = inboxRect.top + inboxRect.height / 2;
          
          
          gsap.to(dummyElement, {
            x: targetX - startX,
            y: targetY - startY,
            scale: 0.3,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out',
            onComplete: () => {
              setDummyHoneycombs(prev => prev.filter(h => h.id !== dummyId));
              setIsAnimating(false);
            }
          });
        } else {
          setIsAnimating(false);
        }
      }, 50);
    } else {
      setIsAnimating(false);
    }
    
    
    const categoryMap: { [key: string]: string } = {
      'employees': 'team',
      'inbox': 'messages',
      'contacts': 'contacts',
      'team': 'team',
      'workflows': 'groups',
      'campaigns': 'favorites'
    };
    
    const category = categoryMap[label.toLowerCase()] || 'messages';
    setSelectedCategory(category);
    
   
    setTimeout(() => {
      setShowInbox(true);
    }, 400);
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
  
      <svg style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 5,
        filter: 'drop-shadow(0 0 30px rgba(147, 197, 253, 1)) drop-shadow(0 0 60px rgba(96, 165, 250, 0.9))',
        pointerEvents: 'none',
      }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(147, 197, 253, 0.8)" />
            <stop offset="50%" stopColor="rgba(96, 165, 250, 0.6)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.4)" />
          </linearGradient>
        </defs>
        <path d="M 75 0 Q 60 50 90 100" fill="none" stroke="url(#arcGradient)" strokeWidth="0.3" />
        <path d="M 0 75 Q 25 50 50 60" fill="none" stroke="url(#arcGradient)" strokeWidth="0.3" />
      </svg>
      

      <HoneycombButtons onCellClick={handleHoneycombClick} isAnimating={isAnimating} />
      

      <img 
        src="/hero.gif" 
        alt="Hero" 
        style={{
          width: '288px',
          height: '273px',
          objectFit: 'contain',
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 1,
          zIndex: 20,
          background: 'transparent',
          mixBlendMode: 'screen',
          filter: 'contrast(1.1) brightness(1.1)',
        }}
      />
      
  
      <div 
        ref={glassContainerRef}
        style={{
          position: 'absolute',
          width: '95vw',
          height: '95vh',
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 30%, rgba(255, 255, 255, 0.02) 60%, rgba(255, 255, 255, 0.01) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
          zIndex: 10,
          opacity: 0,
          animation: 'fadeInScale 1.2s ease-out 0.5s forwards',
        }}
      >
        <div style={{
          position: 'absolute',
          right: '10%',
          top: 0,
          width: '300px',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(147, 197, 253, 0.9) 0%, rgba(96, 165, 250, 0.8) 50%, rgba(59, 130, 246, 0.7) 100%)',
          filter: 'blur(120px)',
          transform: 'rotate(-10deg)',
        }}></div>
      </div>
      
     
      {!showInbox && (
        <div style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 25,
          color: 'white',
          opacity: 0,
          animation: 'fadeInUp 1s ease-out 0.8s forwards',
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            margin: '0 0 20px 0',
            background: 'linear-gradient(to right, #93c5fd, #60a5fa, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Extracting Information...
          </h1>
          <p style={{
            fontSize: '18px',
            margin: 0,
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.6',
          }}>
            We are extracting information from the above honey combs to<br />your system
          </p>
        </div>
      )}

  
      <div 
        ref={inboxRef} 
        style={{
          position: 'absolute',
          width: '90%',
          maxWidth: '1600px',
          height: '400px',
          zIndex: 30,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Inbox selectedCategory={selectedCategory} showSkeleton={!hasClickedHoneycomb} />
      </div>

      {dummyHoneycombs.map(dummy => (
        <div
          key={dummy.id}
          id={dummy.id}
          style={{
            position: 'fixed',
            left: dummy.startX,
            top: dummy.startY,
            width: '60px',
            height: '60px',
            zIndex: 100,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg width="60" height="60" viewBox="-30 -30 60 60" style={{ overflow: 'visible' }}>
            <defs>
              <filter id={`glow-${dummy.id}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 25.98 -15 L 25.98 15 L 0 30 L -25.98 15 L -25.98 -15 L 0 -30 Z"
              fill="rgba(30, 40, 60, 0.9)"
              stroke="rgba(96, 165, 250, 1)"
              strokeWidth="2"
              filter={`url(#glow-${dummy.id})`}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(147, 197, 253, 0.9)',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {dummy.icon}
          </div>
        </div>
      ))}

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}