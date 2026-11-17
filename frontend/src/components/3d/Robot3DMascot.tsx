import React, { useState } from 'react';
import { RobotState } from '../../context/AIChatContext';

export interface Robot3DMascotProps {
  state?: RobotState;
  className?: string;
  isRtl?: boolean;
  isThinking?: boolean;
  showShadow?: boolean;
  onClick?: () => void;
}

/**
 * Masko 3D AI Robot Mascot for Eviq
 * Studio-rendered transparent animated character loop with alpha channel transparency,
 * glowing electric cyan smiling eyes, glossy white chibi body, and organic edge peeking.
 */
export const Robot3DMascot: React.FC<Robot3DMascotProps> = ({
  className = '',
  isRtl = false,
  isThinking = false,
  showShadow = true,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Directional flip: in RTL (Arabic) on left edge, flip to look inward right.
  // In LTR (English) on right edge, look inward left.
  const flipClass = isRtl ? 'scale-x-[-1]' : 'scale-x-100';
  const hoverScaleClass = isHovered ? 'scale-105 -translate-y-0.5' : 'scale-100 translate-y-0';

  return (
    <div
      className={`relative cursor-pointer select-none flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Precision Ground Contact Shadow - tightly anchored to character footprint */}
      {showShadow && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-2.5 pointer-events-none flex items-center justify-center">
          {/* Deep contact shadow directly under feet */}
          <div className="w-10 h-1.5 rounded-full bg-slate-900/40 blur-[2px]" />
          {/* Soft ambient diffused shadow */}
          <div className="absolute w-14 h-2.5 rounded-full bg-indigo-950/20 blur-[4px]" />
          {/* Subtle cyan reactor glow reflection */}
          <div
            className={`absolute w-8 h-1 rounded-full bg-cyan-400/20 blur-[3px] transition-all ${
              isThinking ? 'animate-pulse bg-cyan-400/50 scale-125' : ''
            }`}
          />
        </div>
      )}

      <div
        className={`relative size-full flex items-center justify-center transition-all duration-300 ease-out filter drop-shadow-[0_8px_16px_rgba(15,23,42,0.18)] drop-shadow-[0_2px_8px_rgba(37,99,235,0.20)] ${flipClass} ${hoverScaleClass}`}
      >
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            poster="/mascot/eviq-mascot-peek-wave.png"
            className="size-full object-contain pointer-events-none select-none"
          >
            {/* 1. WebM with VP9 Alpha (Chrome, Edge, Firefox, Desktop & Android) */}
            <source src="/mascot/eviq-mascot-peek-wave.webm" type="video/webm" />
            {/* 2. HEVC / MOV with Alpha (Safari, macOS, iOS) */}
            <source
              src="https://assets.masko.ai/b6501a9b/eviq-ai-mascot-80sfij45/eviq-ai-peeking-and-waving-868a6fe6.mov"
              type='video/mp4; codecs="hvc1"'
            />
            {/* 3. Fallback to transparent PNG */}
            <img
              src="/mascot/eviq-mascot-peek-wave.png"
              alt="Eviq AI Mascot"
              className="size-full object-contain"
            />
          </video>
        ) : (
          <img
            src="/mascot/eviq-mascot-peek-wave.png"
            alt="Eviq AI Mascot"
            className="size-full object-contain pointer-events-none select-none"
          />
        )}
      </div>
    </div>
  );
};

export default Robot3DMascot;
