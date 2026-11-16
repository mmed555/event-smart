import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RobotState } from '../../context/AIChatContext';

interface PeekingRobotProps {
  state: RobotState;
  isHovered: boolean;
}

// 3D Eviq AI Mascot - Cute rounded companion robot (Eve / Astro Bot style)
const CuteCompanionRobot: React.FC<PeekingRobotProps> = ({ state, isHovered }) => {
  const rootRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const antennaOrbRef = useRef<THREE.Mesh>(null);

  useFrame((clockState) => {
    const t = clockState.clock.getElapsedTime();

    if (!rootRef.current) return;

    // Gentle hovering floating motion
    const hoverY = Math.sin(t * 2) * 0.05;
    rootRef.current.position.y = hoverY;

    // Organic head tilt following cursor or in peeking angle
    if (headRef.current) {
      if (state === 'peek') {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, -0.4, 0.1);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0.15, 0.1);
      } else if (state === 'wave' || isHovered) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, -0.2, 0.1);
        headRef.current.rotation.x = Math.sin(t * 4) * 0.06;
      } else {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, -0.3 + Math.sin(t * 1.5) * 0.08, 0.06);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0.08, 0.06);
      }
    }

    // Right arm waving animation
    if (rightArmRef.current) {
      if (state === 'wave' || isHovered) {
        // Wave arm up and oscillation
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.z,
          2.1 + Math.sin(t * 7) * 0.4,
          0.14
        );
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, -0.4, 0.1);
      } else if (state === 'point') {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 1.2, 0.1);
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, -0.7, 0.1);
      } else {
        // Natural resting angle along the body
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.35 + Math.sin(t * 2) * 0.05, 0.08);
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, -0.2, 0.08);
      }
    }

    // Left arm gentle idle balance
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.3 - Math.sin(t * 2) * 0.05, 0.08);
    }

    // Antenna pulse
    if (antennaOrbRef.current) {
      const mat = antennaOrbRef.current.material as THREE.MeshStandardMaterial;
      if (mat) mat.emissiveIntensity = 2.2 + Math.sin(t * 3.5) * 0.9;
    }
  });

  return (
    <group ref={rootRef} position={[0.05, -0.05, 0]} rotation={[0.04, -0.25, 0.04]} scale={1.2}>
      {/* ================= 1. TORSO & REACTOR ================= */}
      <group position={[0, -0.2, 0]}>
        {/* Main Torso (Smooth Glossy White Capsule) */}
        <mesh castShadow>
          <capsuleGeometry args={[0.3, 0.34, 16, 32]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.12}
            metalness={0.2}
          />
        </mesh>

        {/* Central Glowing Cyan Reactor */}
        <mesh position={[0, 0.04, 0.28]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={3}
            roughness={0.1}
          />
        </mesh>

        {/* Cyan Waist Ring */}
        <mesh position={[0, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.28, 0.025, 16, 32]} />
          <meshStandardMaterial color="#0284C7" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>

      {/* ================= 2. HEAD & SCREEN ================= */}
      <group ref={headRef} position={[0, 0.42, 0]}>
        {/* Head Shell (Glossy White Rounded Sphere) */}
        <mesh castShadow>
          <sphereGeometry args={[0.42, 36, 36]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.08}
            metalness={0.25}
          />
        </mesh>

        {/* Curved Glossy Dark Visor (Scaled sphere curved smoothly into helmet) */}
        <mesh position={[0, 0.01, 0.22]} scale={[0.95, 0.62, 0.58]}>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshStandardMaterial
            color="#0A101D"
            roughness={0.05}
            metalness={0.85}
          />
        </mesh>

        {/* Visor Cyan Border Glow Ring */}
        <mesh position={[0, 0.01, 0.38]}>
          <ringGeometry args={[0.22, 0.24, 32]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0EA5E9"
            emissiveIntensity={1.4}
          />
        </mesh>

        {/* LEFT EYE (Smiling Happy Arc ^ / ⌒) */}
        <mesh position={[-0.12, 0.03, 0.4]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.052, 0.016, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={4}
          />
        </mesh>

        {/* RIGHT EYE (Smiling Happy Arc ^ / ⌒) */}
        <mesh position={[0.12, 0.03, 0.4]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.052, 0.016, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={4}
          />
        </mesh>

        {/* Antenna Stalk & Glowing Cyan Orb */}
        <mesh position={[0, 0.43, 0]}>
          <cylinderGeometry args={[0.018, 0.02, 0.12, 16]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh ref={antennaOrbRef} position={[0, 0.52, 0]}>
          <sphereGeometry args={[0.055, 24, 24]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={2.5}
          />
        </mesh>

        {/* Earphone Pods on sides */}
        <mesh position={[-0.41, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.06, 24]} />
          <meshStandardMaterial color="#0284C7" metalness={0.7} />
        </mesh>
        <mesh position={[0.41, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.06, 24]} />
          <meshStandardMaterial color="#0284C7" metalness={0.7} />
        </mesh>
      </group>

      {/* ================= 3. RIGHT ARM (Waving Arm) ================= */}
      <group ref={rightArmRef} position={[-0.34, 0.02, 0.06]}>
        {/* Shoulder Joint */}
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#38BDF8" metalness={0.5} />
        </mesh>
        {/* Arm Segment */}
        <mesh position={[-0.08, -0.14, 0.04]} rotation={[0.2, -0.2, 0.2]}>
          <capsuleGeometry args={[0.058, 0.18, 12, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.2} />
        </mesh>
        {/* Hand Mitten */}
        <mesh position={[-0.14, -0.28, 0.06]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* ================= 4. LEFT ARM ================= */}
      <group ref={leftArmRef} position={[0.34, 0.02, 0.06]}>
        {/* Shoulder Joint */}
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#38BDF8" metalness={0.5} />
        </mesh>
        {/* Arm Segment */}
        <mesh position={[0.08, -0.14, 0.04]} rotation={[-0.2, 0.2, -0.2]}>
          <capsuleGeometry args={[0.058, 0.18, 12, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.2} />
        </mesh>
        {/* Hand */}
        <mesh position={[0.12, -0.28, 0.04]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#38BDF8" />
        </mesh>
      </group>
    </group>
  );
};

export interface Robot3DMascotProps {
  state?: RobotState;
  className?: string;
  onClick?: () => void;
}

export const Robot3DMascot: React.FC<Robot3DMascotProps> = ({
  state = 'peek',
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
        camera={{ position: [0, 0.1, 2.5], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 3]} intensity={1.7} />
        <directionalLight position={[-3, 1, -1]} intensity={0.7} color="#38BDF8" />
        <pointLight position={[0, -0.2, 1.6]} intensity={1.2} color="#00F0FF" />

        <CuteCompanionRobot state={state} isHovered={isHovered} />
      </Canvas>
    </div>
  );
};

export default Robot3DMascot;
