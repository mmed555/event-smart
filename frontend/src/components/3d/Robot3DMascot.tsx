import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RobotState } from '../../context/AIChatContext';

interface ChibiRobotProps {
  state: RobotState;
  isHovered: boolean;
}

// Procedural Humanoid Chibi Android Robot with animated joints, expressive eyes, and glossy materials
const ChibiHumanoidRobot: React.FC<ChibiRobotProps> = ({ state, isHovered }) => {
  const rootRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Mesh>(null);

  useFrame((clockState) => {
    const t = clockState.clock.getElapsedTime();

    if (!rootRef.current) return;

    // Organic levitation breathing
    rootRef.current.position.y = Math.sin(t * 2.2) * 0.04;

    // Dynamic head tilt
    if (headRef.current) {
      if (state === 'wave' || isHovered) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, -0.25, 0.1);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0.08 + Math.sin(t * 3) * 0.04, 0.1);
      } else {
        // Looking inquisitively from the edge into the screen center
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, -0.38 + Math.sin(t * 1.5) * 0.05, 0.08);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0.12, 0.08);
      }
    }

    // Right arm waving animation
    if (rightArmRef.current) {
      if (state === 'wave' || isHovered) {
        // High enthusiastic wave
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.z,
          2.2 + Math.sin(t * 8) * 0.45,
          0.16
        );
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, -0.4, 0.1);
      } else {
        // Peeking hand resting or raised slightly
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.5 + Math.sin(t * 2) * 0.05, 0.08);
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, -0.2, 0.08);
      }
    }

    // Left arm resting balance
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.35 - Math.sin(t * 2) * 0.04, 0.08);
    }

    // Antenna pulse
    if (antennaRef.current) {
      const mat = antennaRef.current.material as THREE.MeshStandardMaterial;
      if (mat) mat.emissiveIntensity = 2.4 + Math.sin(t * 4) * 0.8;
    }
  });

  return (
    <group ref={rootRef} position={[0.08, -0.05, 0]} rotation={[0.05, -0.25, 0.04]} scale={1.22}>
      {/* ================= 1. CHIBI TORSO ================= */}
      <group position={[0, -0.16, 0]}>
        {/* Upper Chest (Glossy White Ceramic) */}
        <mesh castShadow>
          <capsuleGeometry args={[0.26, 0.28, 16, 32]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>

        {/* Chest Glowing Cyan Core */}
        <mesh position={[0, 0.05, 0.25]}>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={3}
            roughness={0.1}
          />
        </mesh>

        {/* Waist Accent Belt */}
        <mesh position={[0, -0.14, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.24, 0.025, 16, 32]} />
          <meshStandardMaterial color="#0284C7" metalness={0.7} />
        </mesh>
      </group>

      {/* ================= 2. OVERSIZED CHIBI HEAD ================= */}
      <group ref={headRef} position={[0, 0.38, 0]}>
        {/* Head Sphere (Cute Rounded proportions) */}
        <mesh castShadow>
          <sphereGeometry args={[0.42, 36, 36]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.08}
            metalness={0.2}
          />
        </mesh>

        {/* Face Visor Area (Curved Smooth Indented Glass) */}
        <mesh position={[0, 0.02, 0.22]} scale={[0.92, 0.64, 0.55]}>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshStandardMaterial
            color="#080E1C"
            roughness={0.04}
            metalness={0.9}
          />
        </mesh>

        {/* LEFT EXPRESSIVE CYAN EYE */}
        <mesh position={[-0.13, 0.04, 0.4]}>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={3.6}
          />
        </mesh>
        {/* Left Eye Sparkle / Highlight */}
        <mesh position={[-0.11, 0.06, 0.44]}>
          <sphereGeometry args={[0.016, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={2} />
        </mesh>

        {/* RIGHT EXPRESSIVE CYAN EYE */}
        <mesh position={[0.13, 0.04, 0.4]}>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={3.6}
          />
        </mesh>
        {/* Right Eye Sparkle / Highlight */}
        <mesh position={[0.15, 0.06, 0.44]}>
          <sphereGeometry args={[0.016, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={2} />
        </mesh>

        {/* Antenna with Glowing Cyan Orb */}
        <mesh position={[0, 0.43, 0]}>
          <cylinderGeometry args={[0.018, 0.02, 0.12, 16]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.8} />
        </mesh>
        <mesh ref={antennaRef} position={[0, 0.52, 0]}>
          <sphereGeometry args={[0.055, 24, 24]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F0FF"
            emissiveIntensity={2.5}
          />
        </mesh>

        {/* Side Earphone Dials */}
        <mesh position={[-0.41, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.06, 24]} />
          <meshStandardMaterial color="#0284C7" metalness={0.7} />
        </mesh>
        <mesh position={[0.41, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.06, 24]} />
          <meshStandardMaterial color="#0284C7" metalness={0.7} />
        </mesh>
      </group>

      {/* ================= 3. RIGHT ARM (Waving Chibi Hand) ================= */}
      <group ref={rightArmRef} position={[-0.32, 0.02, 0.06]}>
        {/* Shoulder Joint */}
        <mesh>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color="#0284C7" metalness={0.6} />
        </mesh>
        {/* Upper Arm */}
        <mesh position={[-0.06, -0.12, 0.04]} rotation={[0.2, -0.2, 0.2]}>
          <capsuleGeometry args={[0.052, 0.16, 12, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.2} />
        </mesh>
        {/* Hand Mitten */}
        <mesh position={[-0.12, -0.26, 0.06]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* ================= 4. LEFT ARM ================= */}
      <group ref={leftArmRef} position={[0.32, 0.02, 0.06]}>
        {/* Shoulder Joint */}
        <mesh>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color="#0284C7" metalness={0.6} />
        </mesh>
        {/* Upper Arm */}
        <mesh position={[0.06, -0.12, 0.04]} rotation={[-0.2, 0.2, -0.2]}>
          <capsuleGeometry args={[0.052, 0.16, 12, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.2} />
        </mesh>
        {/* Hand Mitten */}
        <mesh position={[0.1, -0.26, 0.04]}>
          <sphereGeometry args={[0.065, 16, 16]} />
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
        <directionalLight position={[3, 4, 3]} intensity={1.8} />
        <directionalLight position={[-3, 1, -1]} intensity={0.7} color="#38BDF8" />
        <pointLight position={[0, -0.1, 1.6]} intensity={1.3} color="#00F0FF" />

        <ChibiHumanoidRobot state={state} isHovered={isHovered} />
      </Canvas>
    </div>
  );
};

export default Robot3DMascot;
