"use client";

import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Image from "next/image";
import Band from "@/components/band";

export function BadgeFallback() {
  return (
    <div
      className="badge-fallback"
      role="img"
      aria-label="Domingo Ancog's developer ID card"
    >
      <div className="fallback-strap" />
      <div className="fallback-card">
        <span>DEVELOPER</span>
        <Image
          src="/assets/images/ancog.png"
          alt="Domingo Ancog"
          width={260}
          height={260}
        />
        <strong>Domingo Ancog</strong>
        <small>BUILDING WITH CURIOSITY.</small>
      </div>
    </div>
  );
}

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <BadgeFallback /> : this.props.children;
  }
}

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    camera.position.z = size.width > 620 ? 12 : 8;
    camera.updateProjectionMatrix();
  }, [camera, size.width]);
  return null;
}

export default function BadgeScene() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container} className="scene-container">
      {reducedMotion ? (
        <BadgeFallback />
      ) : (
        <SceneBoundary>
          <Canvas
            role="img"
            camera={{ position: [0, 0, 8], fov: 25 }}
            dpr={[1, 1.5]}
            frameloop={visible ? "always" : "never"}
            gl={{ alpha: true, antialias: true }}
            fallback={<BadgeFallback />}
            aria-label="Interactive 3D ID card of Domingo Ancog. Drag the card to move it."
          >
            <ResponsiveCamera />
            <ambientLight intensity={Math.PI} />
            <Suspense fallback={null}>
              <Physics
                interpolate
                gravity={[0, -40, 0]}
                timeStep={1 / 60}
                paused={!visible}
              >
                <Band />
              </Physics>
              <Environment resolution={128} blur={0.75}>
                <Lightformer
                  intensity={2}
                  color="white"
                  position={[0, -1, 5]}
                  rotation={[0, 0, Math.PI / 3]}
                  scale={[100, 0.1, 1]}
                />
                <Lightformer
                  intensity={3}
                  color="white"
                  position={[-1, -1, 1]}
                  rotation={[0, 0, Math.PI / 3]}
                  scale={[100, 0.1, 1]}
                />
                <Lightformer
                  intensity={3}
                  color="white"
                  position={[1, 1, 1]}
                  rotation={[0, 0, Math.PI / 3]}
                  scale={[100, 0.1, 1]}
                />
                <Lightformer
                  intensity={8}
                  color="white"
                  position={[-10, 0, 14]}
                  rotation={[0, Math.PI / 2, Math.PI / 3]}
                  scale={[100, 10, 1]}
                />
              </Environment>
            </Suspense>
          </Canvas>
        </SceneBoundary>
      )}
    </div>
  );
}
