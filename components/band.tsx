import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { useGLTF, useTexture, Text } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: any;
    meshLineMaterial: any;
  }
}

const segmentProps = {
  type: "dynamic",
  canSleep: true,
  colliders: false,
  angularDamping: 2,
  linearDamping: 2,
} as const;

export default function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef<THREE.Mesh<MeshLineGeometry, MeshLineMaterial>>(null);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);

  const card = useRef<RapierRigidBody>(null!);
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  const { nodes, materials } = useGLTF("/assets/3d/card.glb");
  const texture = useTexture("/assets/images/tag_texture.png");
  const portrait = useTexture("/assets/images/ancog.png");
  const baseTexture = (materials.base as THREE.MeshStandardMaterial).map!;
  const cardTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const image = baseTexture.image;
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Unable to prepare the badge photo.");

    context.drawImage(image, 0, 0);
    // The atlas has the front on the left and the back on the right.
    const frontWidth = canvas.width / 2;
    const frontHeight = Math.round(canvas.height * 0.755);
    const backgroundStart = Math.round(canvas.height / 9);
    const stripHeight = Math.round(canvas.height * 0.09);
    context.save();
    context.beginPath();
    context.rect(0, 0, frontWidth, frontHeight);
    context.clip();
    // Reuse the clean background to cover the old photo, logo, and CTO label.
    for (let y = 0; y < frontHeight; y += stripHeight) {
      context.drawImage(
        image,
        0,
        backgroundStart,
        frontWidth,
        stripHeight,
        0,
        y,
        frontWidth,
        stripHeight,
      );
    }
    const portraitSize = frontWidth * 1.08;
    context.drawImage(
      portrait.image,
      (frontWidth - portraitSize) / 2,
      frontHeight - portraitSize,
      portraitSize,
      portraitSize,
    );
    context.restore();

    context.font = `600 ${Math.round(frontWidth * 0.12)}px Arial, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "white";
    context.fillText("Developer", frontWidth / 2, frontHeight * 0.16);

    // Replace the branding on the back as well when the card rotates.
    context.fillRect(frontWidth, 0, frontWidth, frontHeight);
    context.fillStyle = "#202020";
    context.fillText("Developer", frontWidth * 1.5, frontHeight / 2);

    const result = new THREE.CanvasTexture(canvas);
    result.flipY = baseTexture.flipY;
    result.colorSpace = baseTexture.colorSpace;
    return result;
  }, [baseTexture, portrait]);

  useEffect(() => () => cardTexture.dispose(), [cardTexture]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);

  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
    return () => void (document.body.style.cursor = "auto");
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (
      !fixed.current ||
      !j1.current ||
      !j2.current ||
      !j3.current ||
      !band.current ||
      !card.current
    )
      return;

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      const [j1Lerped, j2Lerped] = [j1, j2].map((ref) => {
        if (ref.current) {
          const lerped = new THREE.Vector3().copy(ref.current.translation());

          const clampedDistance = Math.max(
            0.1,
            Math.min(1, lerped.distanceTo(ref.current.translation())),
          );

          return lerped.lerp(
            ref.current.translation(),
            delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
          );
        }
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2Lerped ?? j2.current.translation());
      curve.points[2].copy(j1Lerped ?? j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel(
        { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
        false,
      );
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4.6, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.25, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (
              (e.target as Element)?.releasePointerCapture(e.pointerId),
              drag(false)
            )}
            onPointerDown={(e) => (
              (e.target as Element)?.setPointerCapture(e.pointerId),
              card.current &&
                drag(
                  new THREE.Vector3()
                    .copy(e.point)
                    .sub(vec.copy(card.current.translation())),
                )
            )}
          >
            {/* @ts-expect-error geometry/map are not declared? */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardTexture}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            <Text
              position={[-0.3, 0.1, 0.01]}
              fontSize={0.06}
              color="white"
              outlineWidth={0.003}
              outlineColor="#151515"
              anchorX="left"
              anchorY="bottom"
              font="/assets/fonts/inter.ttf"
            >
              Domingo Ancog
            </Text>
            <mesh
              // @ts-expect-error geometry/map are not declared?
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            {/* @ts-expect-error geometry/map are not declared? */}
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={new THREE.Vector2(2, 1)}
          useMap={1}
          map={texture}
          repeat={new THREE.Vector2(-3, 1)}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
