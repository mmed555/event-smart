import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RobotState } from '../../context/AIChatContext';

interface PeekingRobotProps {
  state: RobotState;
  isHovered: boolean;
}

// 3D Eviq AI Mascot - Custom sculpted to match the exact peeking & pointing reference
const PeekingEviqRobot: React.FC<PeekingRobotProps> = ({ state, isHovered }) => {
  const rootRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const antennaOrbRef = useRef<THREE.Mesh>(null);

  useFrame((clockState) => {
    const t = clockState.clock.getElapsedTime();

    if (!rootRef.current) return;

    // Organic floating levitation
    const hoverY = Math.sin(t * 1.8) * 0.04;
    const hoverRotZ = Math.sin(t * 1.2) * 0.02;
    rootRef.current.position.y = hoverY;
    rootRef.current.rotation.z = 0.05 + hoverRotZ;

    // Dynamic head tilt toward the viewer / center
    if (headRef.current) {
      if (isHovered) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, -0.45, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0.08, 0.1);
      } else {
        headRef.current.rotation.y = THREE.MathUtils.lerp(
          headRef.current.rotation.y,
          -0.35 + Math.sin(t * 1.5) * 0.05,
          0.06
        );
        headRef.current.rotation.x = THREE.MathUtils.lerp(
          headRef.current.rotation.x,
          0.04 + Math.cos(t * 1.2) * 0.03,
          0.06
        );
      }
    }

    // Right Arm (Pointing Gesture towards the launcher / bubble)
    if (rightArmRef.current) {
      if (state === 'wave' || isHovered) {
        // Playful waving motion when hovered or wave state
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.z,
          1.8 + Math.sin(t * 7) * 0.35,
          0.12
        );
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, -0.5, 0.1);
      } else {
        // Confident pointing pose towards the left (interface center)
        const breatheArm = Math.sin(t * 1.8) * 0.03;
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.z,
          0.95 + breatheArm,
          0.08
        );
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, -0.75, 0.08);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0.45, 0.08);
      }
    }

    // Left Arm (Rests naturally on the chat launcher button below)
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.z,
        -0.45 + Math.sin(t * 1.8) * 0.02,
        0.08
      );
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0.3, 0.08);
    }

    // Pulsing antenna glow
    if (antennaOrbRef.current) {
      const pulse = 1.8 + Math.sin(t * 3.5) * 0.8;
      const mat = antennaOrbRef.current.material as THREE.MeshStandardMaterial;
      if (mat) mat.emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={rootRef} position={[0.22, -0.05, 0]} rotation={[0.06, -0.32, 0.05]} scale={1.22}>
      {/* ================= 1. TORSO & BODY ================= */}
      <group position={[0, -0.12, 0]}>
        {/* Main Torso Shell (Glossy White Ceramic) */}
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.36, 0.38, 20, 32]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.12}
            metalness={0.25}
          />
        </mesh>

        {/* Chest Glowing Core (Eviq Cyan Reactor) */}
        <mesh position={[-0.08, 0.06, 0.35]}>
          <sphereGeometry args={[0.095, 24, 24]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={2.8}
            roughness={0.1}
          />
        </mesh>

        {/* Reactor Glow Ring */}
        <mesh position={[-0.08, 0.06, 0.34]} rotation={[0, 0, 0]}>
          <ringGeometry args={[0.1, 0.13, 32]} />
          <meshStandardMaterial
            color="#0284C7"
            emissive="#0284C7"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Soft Blue Collar Accent */}
        <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.26, 0.035, 16, 32]} />
          <meshStandardMaterial color="#38BDF8" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>

      {/* ================= 2. HEAD & VISOR ================= */}
      <group ref={headRef} position={[0, 0.52, 0]}>
        {/* Head Shell (Glossy White, Rounded Oval) */}
        <mesh castShadow>
          <sphereGeometry args={[0.46, 36, 36]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.08}
            metalness={0.25}
          />
        </mesh>

        {/* Visor Screen (Deep Blue Glass) */}
        <mesh position={[-0.06, -0.01, 0.32]} rotation={[-0.04, -0.05, 0]}>
          <boxGeometry args={[0.62, 0.32, 0.28]} />
          <meshStandardMaterial
            color="#080E1E"
            roughness={0.04}
            metalness={0.9}
          />
        </mesh>

        {/* Glowing Visor Rim */}
        <mesh position={[-0.06, -0.01, 0.44]}>
          <ringGeometry args={[0.28, 0.31, 32]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0EA5E9"
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* LEFT EYE (Smiling Happy Arc ^ / ⌒) */}
        <mesh position={[-0.2, 0.02, 0.46]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.062, 0.018, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={3.5}
          />
        </mesh>

        {/* RIGHT EYE (Smiling Happy Arc ^ / ⌒) */}
        <mesh position={[0.07, 0.02, 0.46]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.062, 0.018, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={3.5}
          />
        </mesh>

        {/* Head Antenna (Stalk + Glowing Sphere) */}
        <mesh position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.02, 0.022, 0.14, 16]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.8} />
        </mesh>
        <mesh ref={antennaOrbRef} position={[0, 0.58, 0]}>
          <sphereGeometry args={[0.06, 24, 24]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={2.2}
          />
        </mesh>

        {/* Earphone Pods on sides */}
        <mesh position={[-0.46, -0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.08, 24]} />
          <meshStandardMaterial color="#0284C7" metalness={0.7} />
        </mesh>
        <mesh position={[0.46, -0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.08, 24]} />
          <meshStandardMaterial color="#0284C7" metalness={0.7} />
        </mesh>
      </group>

      {/* ================= 3. RIGHT ARM & POINTING HAND ================= */}
      {/* Extends to the left pointing with index finger directly at the chat button / bubble */}
      <group ref={rightArmRef} position={[-0.38, 0.08, 0.08]}>
        {/* Shoulder */}
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#38BDF8" metalness={0.5} />
        </mesh>

        {/* Upper Arm Segment */}
        <mesh position={[-0.14, -0.02, 0.14]} rotation={[0.4, -0.6, 0.2]}>
          <capsuleGeometry args={[0.07, 0.2, 12, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.2} />
        </mesh>

        {/* Forearm extending forward */}
        <mesh position={[-0.32, -0.04, 0.32]} rotation={[0.2, -0.9, 0.1]}>
          <capsuleGeometry args={[0.065, 0.22, 12, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.2} />
        </mesh>

        {/* Hand Palm */}
        <mesh position={[-0.48, -0.05, 0.46]}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.2} />
        </mesh>

        {/* Extended Pointing Index Finger (👉) */}
        <mesh position={[-0.58, -0.04, 0.52]} rotation={[0, 0.6, -1.3]}>
          <capsuleGeometry args={[0.025, 0.14, 12, 20]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>

        {/* Thumb & curled fingers */}
        <mesh position={[-0.49, 0.02, 0.44]} rotation={[0.3, 0, 0]}>
          <capsuleGeometry args={[0.022, 0.08, 12, 16]} />
          <meshStandardMaterial color="#E2E8F0" />
        </mesh>
        <mesh position={[-0.47, -0.1, 0.46]}>
          <capsuleGeometry args={[0.025, 0.07, 12, 16]} />
          <meshStandardMaterial color="#E2E8F0" />
        </mesh>
      </group>

      {/* ================= 4. LEFT ARM (Resting on Launcher) ================= */}
      {/* Reaches downward-forward to rest its hand right on top of the glowing chat launcher */}
      <group ref={leftArmRef} position={[0.36, 0.02, 0.1]}>
        {/* Shoulder */}
        <mesh>
          <sphereGeometry args={[0.095, 16, 16]} />
          <meshStandardMaterial color="#38BDF8" metalness={0.5} />
        </mesh>

        {/* Arm segment descending */}
        <mesh position={[0.08, -0.18, 0.12]} rotation={[-0.2, 0.2, -0.3]}>
          <capsuleGeometry args={[0.07, 0.24, 12, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.2} />
        </mesh>

        {/* Resting Hand on Launcher */}
        <mesh position={[0.14, -0.36, 0.26]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={0.5} />
        </mesh>

        {/* Gentle fingers resting over the launcher edge */}
        <mesh position={[0.12, -0.42, 0.3]} rotation={[0.4, 0, 0]}>
          <capsuleGeometry args={[0.022, 0.08, 12, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.16, -0.42, 0.29]} rotation={[0.4, 0, 0]}>
          <capsuleGeometry args={[0.022, 0.08, 12, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
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
  state = 'point',
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
        camera={{ position: [0, 0.1, 2.7], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 5, 4]} intensity={1.8} />
        <directionalLight position={[-4, 2, -1]} intensity={0.8} color="#38BDF8" />
        <pointLight position={[0, -0.3, 1.8]} intensity={1.4} color="#00F0FF" />

        <PeekingEviqRobot state={state} isHovered={isHovered} />
      </Canvas>
    </div>
  );
};

export default Robot3DMascot;
