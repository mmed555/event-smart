import React, { useEffect, useState } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';

interface RiveRobotMascotProps {
  className?: string;
  isHovered?: boolean;
  isThinking?: boolean;
  isRtl?: boolean;
  onClick?: () => void;
}

export const RiveRobotMascot: React.FC<RiveRobotMascotProps> = ({
  className = '',
  isHovered = false,
  isThinking = false,
  isRtl = false,
  onClick,
}) => {
  const [loadError, setLoadError] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: '/rive/robot.riv',
    autoplay: true,
    stateMachines: 'robot_ai',
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    onLoadError: () => {
      console.warn('Rive asset failed to load');
      setLoadError(true);
    },
  });

  // State machine inputs if present
  const hoverInput = useStateMachineInput(rive, 'robot_ai', 'hover');
  const lookInput = useStateMachineInput(rive, 'robot_ai', 'look');

  useEffect(() => {
    if (hoverInput) {
      hoverInput.value = isHovered;
    }
  }, [isHovered, hoverInput]);

  useEffect(() => {
    if (lookInput) {
      lookInput.value = isThinking;
    }
  }, [isThinking, lookInput]);

  useEffect(() => {
    if (rive && !rive.isPlaying) {
      if (rive.stateMachineNames.length > 0) {
        rive.play(rive.stateMachineNames[0]);
      } else if (rive.animationNames.length > 0) {
        rive.play(rive.animationNames[0]);
      }
    }
  }, [rive]);

  if (loadError) {
    return (
      <div className="flex size-full items-center justify-center text-xs text-slate-400">
        Rive fallback
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative size-full select-none cursor-pointer flex items-center justify-center ${className}`}
    >
      <div
        className={`size-full transition-transform duration-300 filter drop-shadow-[0_8px_20px_rgba(37,99,235,0.25)] ${
          isRtl ? 'scale-x-[-1]' : 'scale-x-100'
        } ${isHovered ? 'scale-105' : 'scale-100'}`}
      >
        <RiveComponent className="size-full" />
      </div>
    </div>
  );
};

export default RiveRobotMascot;
