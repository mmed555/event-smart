import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { RobotState } from '../../context/AIChatContext';

interface ChibiRobotProps {
  state: RobotState;
  isHovered: boolean;
  isRtl?: boolean;
}

// React Error Boundary to catch any WebGL or asset loading crashes gracefully
class MascotErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    console.warn('3D Mascot asset error caught, rendering procedural fallback safely:', error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Loads external GLTF/GLB model from public/models/
function ExternalGLTFModel({ url, isRtl }: { url: string; isRtl?: boolean }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const dirSign = isRtl ? 1 : -1;

  const clonedScene = React.useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  useFrame((clockState) => {
    const t = clockState.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle floating levitation
      groupRef.current.position.y = -0.22 + Math.sin(t * 2) * 0.035;
      // Head tilt following direction
      groupRef.current.rotation.y = dirSign * (0.32 + Math.sin(t * 1.5) * 0.04);
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[0, dirSign * 0.32, 0]}
      position={[0, -0.22, 0]}
      scale={1.22}
    >
      <primitive object={clonedScene} />
    </group>
  );
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
  modelUrl?: string;
  mode?: 'auto' | 'masko' | 'canvas';
  onClick?: () => void;
}

export const Robot3DMascot: React.FC<Robot3DMascotProps> = ({
  state = 'peek',
  className = '',
  isRtl = false,
  modelUrl,
  mode = 'auto',
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeModelPath, setActiveModelPath] = useState<string | null>(null);
  const [hasMaskoAsset, setHasMaskoAsset] = useState<boolean>(true);
  const [videoError, setVideoError] = useState<boolean>(false);

  // Safely probe candidate model paths if canvas is requested
  useEffect(() => {
    let isMounted = true;
    const candidates = modelUrl
      ? [modelUrl]
      : ['/models/Friendly_Robot.glb', '/models/friendly-robot.glb'];

    const probe = async () => {
      for (const p of candidates) {
        try {
          const res = await fetch(p, { method: 'HEAD' });
          const ct = res.headers.get('content-type') || '';
          // Ensure it is NOT the Vite HTML SPA fallback (text/html)
          if (res.ok && !ct.includes('text/html')) {
            if (isMounted) setActiveModelPath(p);
            return;
          }
        } catch {
          // ignore network failure
        }
      }
      if (isMounted) setActiveModelPath(null);
    };

    probe();
    return () => {
      isMounted = false;
    };
  }, [modelUrl]);

  // Check if Masko asset exists
  useEffect(() => {
    let isMounted = true;
    fetch('/mascot/eviq-mascot-peek-wave.webm', { method: 'HEAD' })
      .then((res) => {
        const ct = res.headers.get('content-type') || '';
        if (isMounted) {
          setHasMaskoAsset(res.ok && !ct.includes('text/html'));
        }
      })
      .catch(() => {
        if (isMounted) setHasMaskoAsset(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const shouldUseMasko =
    (mode === 'masko' || mode === 'auto') && hasMaskoAsset && !videoError;

  return (
    <div
      className={`relative cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {shouldUseMasko ? (
        <div className="relative size-full flex items-center justify-center overflow-visible">
          <video
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            poster="/mascot/eviq-mascot-peek-wave.png"
            className={`size-full object-contain filter drop-shadow-[0_8px_20px_rgba(37,99,235,0.22)] transition-transform duration-300 pointer-events-none ${
              isRtl ? 'scale-x-[-1]' : 'scale-x-100'
            } ${isHovered ? 'scale-105' : 'scale-100'}`}
          >
            <source src="/mascot/eviq-mascot-peek-wave.webm" type="video/webm" />
            <source
              src="https://assets.masko.ai/b6501a9b/eviq-ai-mascot-80sfij45/eviq-ai-peeking-and-waving-868a6fe6.mov"
              type='video/mp4; codecs="hvc1"'
            />
            {/* Fallback to high-res transparent PNG */}
            <img
              src="/mascot/eviq-mascot-peek-wave.png"
              alt="Eviq AI Mascot"
              className={`size-full object-contain ${isRtl ? 'scale-x-[-1]' : 'scale-x-100'}`}
            />
          </video>
        </div>
      ) : (
        <MascotErrorBoundary
          fallback={
            <Canvas
              camera={{ position: [0, 0.05, 3.2], fov: 30 }}
              dpr={[1, 1.5]}
              gl={{ alpha: true, antialias: true }}
            >
              <ambientLight intensity={1.2} />
              <directionalLight position={[3, 4, 3]} intensity={1.6} />
              <pointLight position={[0, -0.1, 1.8]} intensity={1.4} color="#00F0FF" />
              <ChibiHumanoidRobot state={state} isHovered={isHovered} isRtl={isRtl} />
            </Canvas>
          }
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

            {activeModelPath ? (
              <React.Suspense
                fallback={<ChibiHumanoidRobot state={state} isHovered={isHovered} isRtl={isRtl} />}
              >
                <ExternalGLTFModel url={activeModelPath} isRtl={isRtl} />
              </React.Suspense>
            ) : (
              <ChibiHumanoidRobot state={state} isHovered={isHovered} isRtl={isRtl} />
            )}
          </Canvas>
        </MascotErrorBoundary>
      )}
    </div>
  );
};

export default Robot3DMascot;
