import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RobotState } from '../../context/AIChatContext';

interface ChibiRobotProps {
  state: RobotState;
  isHovered: boolean;
  isRtl?: boolean;
}

// Procedural Humanoid Chibi Android Mascot - Pixar-grade cute proportions, studio lighting, smooth curved surfaces
const ChibiHumanoidRobot: React.FC<ChibiRobotProps> = ({ state, isHovered, isRtl = false }) => {
  const rootRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const wavingArmRef = useRef<THREE.Group>(null);
  const restingArmRef = useRef<THREE.Group>(null);
  const antennaOrbRef = useRef<THREE.Mesh>(null);

  // Direction multiplier: if RTL, robot is on the left looking right (+); if LTR, on the right looking left (-)
  const dirSign = isRtl ? 1 : -1;

  useFrame((clockState) => {
    const t = clockState.clock.getElapsedTime();

    if (!rootRef.current) return;

    // Organic floating levitation
    rootRef.current.position.y = Math.sin(t * 2) * 0.035;

    // Head orientation looking inward toward the center of the screen
    if (headRef.current) {
      if (state === 'wave' || isHovered) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(
          headRef.current.rotation.y,
          dirSign * 0.22,
          0.1
        );
        headRef.current.rotation.z = THREE.MathUtils.lerp(
          headRef.current.rotation.z,
          -dirSign * (0.05 + Math.sin(t * 3) * 0.03),
          0.1
        );
      } else {
        // Inquisitive peeking look
        headRef.current.rotation.y = THREE.MathUtils.lerp(
          headRef.current.rotation.y,
          dirSign * (0.35 + Math.sin(t * 1.5) * 0.04),
          0.08
        );
        headRef.current.rotation.z = THREE.MathUtils.lerp(
          headRef.current.rotation.z,
          -dirSign * 0.1,
          0.08
        );
      }
    }

    // Waving Arm Animation
    if (wavingArmRef.current) {
      if (state === 'wave' || isHovered) {
        // High energetic wave
        wavingArmRef.current.rotation.z = THREE.MathUtils.lerp(
          wavingArmRef.current.rotation.z,
          dirSign * (2.1 + Math.sin(t * 8) * 0.45),
          0.16
        );
        wavingArmRef.current.rotation.y = THREE.MathUtils.lerp(
          wavingArmRef.current.rotation.y,
          dirSign * 0.35,
          0.1
        );
      } else {
        // Cute peeking arm raised slightly resting near edge
        wavingArmRef.current.rotation.z = THREE.MathUtils.lerp(
          wavingArmRef.current.rotation.z,
          dirSign * (0.45 + Math.sin(t * 2) * 0.04),
          0.08
        );
        wavingArmRef.current.rotation.y = THREE.MathUtils.lerp(
          wavingArmRef.current.rotation.y,
          dirSign * 0.15,
          0.08
        );
      }
    }

    // Resting Arm
    if (restingArmRef.current) {
      restingArmRef.current.rotation.z = THREE.MathUtils.lerp(
        restingArmRef.current.rotation.z,
        -dirSign * (0.35 + Math.sin(t * 2) * 0.03),
        0.08
      );
    }

    // Pulsing Antenna Orb
    if (antennaOrbRef.current) {
      const mat = antennaOrbRef.current.material as THREE.MeshStandardMaterial;
      if (mat) mat.emissiveIntensity = 2.4 + Math.sin(t * 4) * 0.9;
    }
  });

  return (
    <group
      ref={rootRef}
      position={[0, -0.04, 0]}
      rotation={[0.04, dirSign * 0.22, 0]}
      scale={0.95}
    >
      {/* ================= 1. TORSO & CORE ================= */}
      <group position={[0, -0.15, 0]}>
        {/* Torso Capsule (Glossy White Ceramic) */}
        <mesh castShadow>
          <capsuleGeometry args={[0.24, 0.24, 16, 32]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.12}
            metalness={0.15}
          />
        </mesh>

        {/* Chest Glowing Cyan Reactor Core */}
        <mesh position={[0, 0.04, 0.23]}>
          <sphereGeometry args={[0.065, 24, 24]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={3.2}
            roughness={0.1}
          />
        </mesh>

        {/* Waist Ring */}
        <mesh position={[0, -0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.02, 16, 32]} />
          <meshStandardMaterial color="#0284C7" metalness={0.6} />
        </mesh>
      </group>

      {/* ================= 2. OVERSIZED CHIBI HEAD ================= */}
      <group ref={headRef} position={[0, 0.35, 0]}>
        {/* Head Shell (Glossy White Ceramic Sphere) */}
        <mesh castShadow>
          <sphereGeometry args={[0.38, 36, 36]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.08}
            metalness={0.18}
          />
        </mesh>

        {/* Curved Glass Visor (Smooth scaled dome without sharp edges) */}
        <mesh position={[0, 0.01, 0.2]} scale={[0.92, 0.62, 0.52]}>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial
            color="#080E1C"
            roughness={0.04}
            metalness={0.9}
          />
        </mesh>

        {/* Visor Cyan Border Trim */}
        <mesh position={[0, 0.01, 0.34]}>
          <ringGeometry args={[0.19, 0.21, 32]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0EA5E9"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* LEFT EYE (Smiling Neon Cyan Arc ^) */}
        <mesh position={[-0.11, 0.03, 0.36]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.045, 0.014, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={4.5}
          />
        </mesh>

        {/* RIGHT EYE (Smiling Neon Cyan Arc ^) */}
        <mesh position={[0.11, 0.03, 0.36]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.045, 0.014, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={4.5}
          />
        </mesh>

        {/* Antenna Stalk & Glowing Cyan Orb */}
        <mesh position={[0, 0.39, 0]}>
          <cylinderGeometry args={[0.016, 0.018, 0.1, 16]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.8} />
        </mesh>
        <mesh ref={antennaOrbRef} position={[0, 0.47, 0]}>
          <sphereGeometry args={[0.048, 24, 24]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={2.8}
          />
        </mesh>

        {/* Side Earphone Dials */}
        <mesh position={[-0.37, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 24]} />
          <meshStandardMaterial color="#0284C7" metalness={0.7} />
        </mesh>
        <mesh position={[0.37, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 24]} />
          <meshStandardMaterial color="#0284C7" metalness={0.7} />
        </mesh>
      </group>

      {/* ================= 3. WAVING ARM ================= */}
      {/* On LTR (right edge), the inner waving arm is the left side (-X); on RTL (left edge), it is the right side (+X) */}
      <group
        ref={wavingArmRef}
        position={[dirSign * -0.28, 0.02, 0.05]}
      >
        {/* Shoulder */}
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#0284C7" metalness={0.6} />
        </mesh>
        {/* Upper Arm */}
        <mesh position={[dirSign * -0.05, -0.1, 0.03]} rotation={[0.2, dirSign * -0.2, 0.2]}>
          <capsuleGeometry args={[0.046, 0.14, 12, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.15} />
        </mesh>
        {/* Hand Mitten */}
        <mesh position={[dirSign * -0.1, -0.22, 0.05]}>
          <sphereGeometry args={[0.058, 16, 16]} />
          <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* ================= 4. RESTING ARM ================= */}
      <group
        ref={restingArmRef}
        position={[dirSign * 0.28, 0.02, 0.05]}
      >
        {/* Shoulder */}
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#0284C7" metalness={0.6} />
        </mesh>
        {/* Upper Arm */}
        <mesh position={[dirSign * 0.05, -0.1, 0.03]} rotation={[-0.2, dirSign * 0.2, -0.2]}>
          <capsuleGeometry args={[0.046, 0.14, 12, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.15} />
        </mesh>
        {/* Hand Mitten */}
        <mesh position={[dirSign * 0.08, -0.22, 0.03]}>
          <sphereGeometry args={[0.058, 16, 16]} />
          <meshStandardMaterial color="#38BDF8" />
        </mesh>
      </group>
    </group>
  );
};

export interface Robot3DMascotProps {
  state?: RobotState;
  className?: string;
  isRtl?: boolean;
  onClick?: () => void;
}

export const Robot3DMascot: React.FC<Robot3DMascotProps> = ({
  state = 'peek',
  className = '',
  isRtl = false,
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
        camera={{ position: [0, 0.05, 3.2], fov: 30 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 3]} intensity={1.6} />
        <directionalLight position={[-3, 2, -1]} intensity={0.9} color="#818CF8" />
        <pointLight position={[0, -0.1, 1.8]} intensity={1.4} color="#00F0FF" />

        <ChibiHumanoidRobot state={state} isHovered={isHovered} isRtl={isRtl} />
      </Canvas>
    </div>
  );
};

export default Robot3DMascot;
