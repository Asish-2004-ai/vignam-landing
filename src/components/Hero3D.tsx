// components/Hero3D.tsx
'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useProgress, Html, Environment, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

// If you setup Draco, uncomment and configure this block in your entry file or here
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
// (See Draco instructions below.)

type ModelProps = {
  path?: string;
  rotationSpeed?: number;
  envIntensity?: number;
};

function Model({ path = '/models/product.glb', rotationSpeed = 0.25, envIntensity = 1 }: ModelProps) {
  const group = useRef<THREE.Group | null>(null);
  const { scene, animations } = useGLTF(path) as any;
  const { actions } = useAnimations(animations, group);

  // Play first animation if available
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]] as THREE.AnimationAction;
      firstAction.reset().fadeIn(0.5).play();
      return () => {
        firstAction.fadeOut(0.2);
      };
    }
  }, [actions]);

  // Ensure materials are metallic and tuned for environment
  useEffect(() => {
    scene.traverse((node: any) => {
      if (node.isMesh) {
        const mat = node.material;
        if (mat && mat.isMeshStandardMaterial) {
          mat.metalness = Math.min(mat.metalness ?? 1, 1);
          mat.roughness = typeof mat.roughness === 'number' ? Math.min(mat.roughness, 0.4) : 0.15;
          (mat as any).envMapIntensity = envIntensity;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene, envIntensity]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += rotationSpeed * delta;
  });

  return <primitive ref={group} object={scene} position={[0, -0.15, 0]} />;
}

// Component that loads EXR and sets it as environment safely
function SceneEnvironment({ exrPath = '/env/metal.exr', intensity = 1 }: { exrPath?: string; intensity?: number }) {
  const { gl, scene } = useThree();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let pmrem: THREE.PMREMGenerator | null = null;
    const loader = new EXRLoader();

    loader.load(
      exrPath,
      (texture) => {
        try {
          pmrem = new THREE.PMREMGenerator(gl);
          const envMap = pmrem.fromEquirectangular(texture).texture;
          scene.environment = envMap;
          scene.traverse((node: any) => {
            if (node.isMesh && node.material && node.material.envMapIntensity !== undefined) {
              node.material.envMapIntensity = intensity;
            }
          });
          texture.dispose();
          setLoaded(true);
        } catch (err) {
          console.error('EXR -> PMREM conversion failed', err);
        }
      },
      undefined,
      (err) => {
        console.warn('Failed to load EXR', err);
      }
    );

    return () => {
      if (pmrem) pmrem.dispose();
    };
  }, [exrPath, gl, scene, intensity]);

  return null;
}

export default function Hero3D() {
  // responsive camera state
  const [cameraPos, setCameraPos] = useState<[number, number, number]>([0, 0.4, 1.8]);
  const [fov, setFov] = useState<number>(40);
  const [controlsEnabled, setControlsEnabled] = useState<boolean>(true);

  useEffect(() => {
    function update() {
      if (window.innerWidth < 640) {
        setCameraPos([0, 0.35, 2.6]);
        setFov(50);
        setControlsEnabled(false);
      } else if (window.innerWidth < 1024) {
        setCameraPos([0, 0.4, 2.0]);
        setFov(45);
        setControlsEnabled(true);
      } else {
        setCameraPos([0, 0.4, 1.8]);
        setFov(40);
        setControlsEnabled(true);
      }
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 560, md: 720 },
        display: 'grid',
        gridTemplateColumns: { md: '1.2fr 1fr' },
        alignItems: 'center',
        gap: 4,
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
      }}
    >
      <Box>
        <Typography variant="h1" sx={{ fontSize: { xs: 36, md: 64 }, lineHeight: 1.05 }}>
                The Future of Electric Mobility

        </Typography>
        <Typography sx={{ mt: 2, maxWidth: 560, color: 'text.secondary' }}>
      Powerful, reliable, and sustainable EV solutions for everyone.
        </Typography>
      </Box>

      <Box sx={{ height: { xs: 360, md: 560 }, width: '100%' }}>
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: cameraPos, fov }}
            dpr={[1, 2]}
            gl={{ antialias: true }}
          >
            <Suspense>
              <SceneEnvironment exrPath="/env/metal.exr" intensity={1.2} />
              <ambientLight intensity={0.4} />
              <directionalLight position={[2, 2, 3]} intensity={0.6} />
              <Model path="/models/product.glb" rotationSpeed={0.18} envIntensity={1.2} />
            </Suspense>

            {/* OrbitControls: toggle for mobile */}
            <OrbitControls enablePan={false} enableZoom={controlsEnabled} enabled={controlsEnabled} />
          </Canvas>
        </Suspense>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          right: '-15%',
          top: '-20%',
          width: 560,
          height: 560,
          borderRadius: '50%',
          filter: 'blur(90px)',
          opacity: 0.25,
          pointerEvents: 'none',
          background: 'radial-gradient(closest-side, #00d2ff, transparent 70%)',
        }}
      />
    </Box>
  );
}
