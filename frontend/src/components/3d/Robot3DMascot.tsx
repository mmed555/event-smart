import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { RobotState } from '../../context/AIChatContext';

interface RobotModelProps {
  state: RobotState;
  isHovered: boolean;
}

// Procedural 3D Robot Mascot with dynamic limb & eye animations
const ProceduralRobot: React.FC<RobotModelProps> = ({ state, isHovered }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);

  // Animation clocks and targets
  useFrame((clockState) => {
    const t = clockState.clock.getElapsedTime();

    if (!groupRef.current) return;

    // Base hovering bob motion
    const hoverOffset = Math.sin(t * 2) * 0.08;
    groupRef.current.position.y = hoverOffset;

    // Pointer-following or state-based head rotation
    if (headRef.current) {
      if (state === 'peek') {
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, -0.28, 0.1);
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0.35, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0.1, 0.1);
      } else if (state === 'welcome') {
        headRef.current.rotation.y = Math.sin(t * 5) * 0.15;
        headRef.current.rotation.x = Math.sin(t * 8) * 0.1;
      } else {
        // Idle tracking
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.1);
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, isHovered ? 0.25 : Math.sin(t * 0.8) * 0.15, 0.08);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, isHovered ? -0.1 : 0, 0.08);
      }
    }

    // Right arm waving/pointing animation
    if (rightArmRef.current) {
      if (state === 'wave' || isHovered) {
        // Wave arm up and oscillate
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 2.2 + Math.sin(t * 8) * 0.45, 0.15);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0.2, 0.1);
      } else if (state === 'point') {
        // Point sideways towards the screen
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 1.3, 0.12);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.6, 0.12);
      } else {
        // Idle arm rest
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.2 + Math.sin(t * 2) * 0.08, 0.1);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1);
      }
    }

    // Left arm gentle idle balance
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.2 - Math.sin(t * 2) * 0.08, 0.1);
    }

    // Blinking effect on digital eyes
    const blink = Math.sin(t * 1.5);
    const eyeScaleY = blink > 0.96 ? 0.1 : 1;
    if (eyeLeftRef.current && eyeRightRef.current) {
      eyeLeftRef.current.scale.y = eyeScaleY;
      eyeRightRef.current.scale.y = eyeScaleY;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} scale={1.15}>
      {/* 1. Torso / Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.38, 0.45, 16, 32]} />
        <meshStandardMaterial
          color="#F8FAFC"
          roughness={0.15}
          metalness={0.4}
        />
      </mesh>

      {/* Chest Glowing Core (Eviq Reactor) */}
      <mesh position={[0, 0.05, 0.36]}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#0EA5E9"
          emissiveIntensity={2}
          roughness={0.1}
        />
      </mesh>

      {/* Belt / Waist Ring */}
      <mesh position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.37, 0.035, 16, 32]} />
        <meshStandardMaterial color="#4F46E5" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 2. Head Group */}
      <group ref={headRef} position={[0, 0.58, 0]}>
        {/* Head Shell */}
        <mesh castShadow>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.12}
            metalness={0.3}
          />
        </mesh>

        {/* Visor Screen (Glossy Dark Glass) */}
        <mesh position={[0, 0.03, 0.28]} rotation={[-0.05, 0, 0]}>
          <boxGeometry args={[0.54, 0.26, 0.24]} />
          <meshStandardMaterial
            color="#0F172A"
            roughness={0.05}
            metalness={0.9}
          />
        </mesh>

        {/* Glowing Visor Frame Accent */}
        <mesh position={[0, 0.03, 0.38]}>
          <ringGeometry args={[0.26, 0.28, 32]} />
          <meshStandardMaterial
            color="#4F46E5"
            emissive="#6366F1"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Left Glowing Cyan Eye */}
        <mesh ref={eyeLeftRef} position={[-0.13, 0.04, 0.41]}>
          <sphereGeometry args={[0.048, 16, 16]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00E5FF"
            emissiveIntensity={3}
          />
        </mesh>

        {/* Right Glowing Cyan Eye */}
        <mesh ref={eyeRightRef} position={[0.13, 0.04, 0.41]}>
          <sphereGeometry args={[0.048, 16, 16]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00E5FF"
            emissiveIntensity={3}
          />
        </mesh>

        {/* Cute Head Antenna */}
        <mesh position={[0, 0.44, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.12, 16]} />
          <meshStandardMaterial color="#64748B" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.52, 0]}>
          <sphereGeometry args={[0.048, 16, 16]} />
          <meshStandardMaterial
            color="#6366F1"
            emissive="#4F46E5"
            emissiveIntensity={2}
          />
        </mesh>

        {/* Head Side Earphone Discs */}
        <mesh position={[-0.43, 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 24]} />
          <meshStandardMaterial color="#4F46E5" metalness={0.7} />
        </mesh>
        <mesh position={[0.43, 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 24]} />
          <meshStandardMaterial color="#4F46E5" metalness={0.7} />
        </mesh>
      </group>

      {/* 3. Floating Right Arm (Waving Arm) */}
      <group ref={rightArmRef} position={[0.46, 0.12, 0]}>
        {/* Shoulder Joint */}
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#4F46E5" metalness={0.6} />
        </mesh>
        {/* Arm Segment */}
        <mesh position={[0.08, -0.16, 0]}>
          <capsuleGeometry args={[0.065, 0.22, 12, 24]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Hand Mitten */}
        <mesh position={[0.1, -0.34, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#0284C7" emissive="#0369A1" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* 4. Floating Left Arm */}
      <group ref={leftArmRef} position={[-0.46, 0.12, 0]}>
        {/* Shoulder Joint */}
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#4F46E5" metalness={0.6} />
        </mesh>
        {/* Arm Segment */}
        <mesh position={[-0.08, -0.16, 0]}>
          <capsuleGeometry args={[0.065, 0.22, 12, 24]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Hand Mitten */}
        <mesh position={[-0.1, -0.34, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#0284C7" />
        </mesh>
      </group>

      {/* Floating Thruster Ring / Lower Base */}
      <mesh position={[0, -0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.04, 16, 32]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#0284C7"
          emissiveIntensity={1.8}
        />
      </mesh>
    </group>
  );
};

export interface Robot3DMascotProps {
  state?: RobotState;
  className?: string;
  onClick?: () => void;
}

export const Robot3DMascot: React.FC<Robot3DMascotProps> = ({
  state = 'idle',
  className = '',
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Canvas
        camera={{ position: [0, 0.2, 2.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 4, 3]} intensity={1.5} />
        <directionalLight position={[-3, -2, -2]} intensity={0.5} color="#818CF8" />
        <pointLight position={[0, 0, 1.5]} intensity={0.8} color="#38BDF8" />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <ProceduralRobot state={state} isHovered={isHovered} />
        </Float>
      </Canvas>
    </div>
  );
};

export default Robot3DMascot;
