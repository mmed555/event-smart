import React, { useEffect } from 'react';
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
  const { rive, RiveComponent } = useRive({
    src: '/rive/robot.riv',
    artboard: 'Robot AI',
    stateMachines: 'robot_ai',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  // State machine inputs from the robot.riv rig
  const lookInput = useStateMachineInput(rive, 'robot_ai', 'look');
  const hoverInput = useStateMachineInput(rive, 'robot_ai', 'hover');

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
