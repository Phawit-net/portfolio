import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
  type RigidBodyProps,
} from "@react-three/rapier";
import {
  type ReactNode,
  type RefObject,
  forwardRef,
  useRef,
  useMemo,
} from "react";
import * as THREE from "three";

// Retrieve current moving direction of the character
// รับทิศทางการเคลื่อนที่ปัจจุบันของตัวละคร
// const getMovingDirection = (
//   forward: boolean,
//   backward: boolean,
//   leftward: boolean,
//   rightward: boolean,
//   pivot: THREE.Object3D
// ): number | null => {
//   if (!forward && !backward && !leftward && !rightward) return null;
//   if (forward && leftward) return pivot.rotation.y + Math.PI / 4;
//   if (forward && rightward) return pivot.rotation.y - Math.PI / 4;
//   if (backward && leftward) return pivot.rotation.y - Math.PI / 4 + Math.PI;
//   if (backward && rightward) return pivot.rotation.y + Math.PI / 4 + Math.PI;
//   if (backward) return pivot.rotation.y + Math.PI;
//   if (leftward) return pivot.rotation.y + Math.PI / 2;
//   if (rightward) return pivot.rotation.y - Math.PI / 2;
//   if (forward) return pivot.rotation.y;
// };

// ไปทวน forwardRef -> เป็นการ pass props ไปพร้อมกับ ref ด้วย
const EcctrlRigid = forwardRef<RapierRigidBody, EcctrlProps>(
  (
    {
      children,
      capsuleHalfHeight = 0.35,
      capsuleRadius = 0.3,
      rayOriginOffest = { x: 0, y: -capsuleHalfHeight, z: 0 },
      slopeRayOriginOffest = capsuleRadius - 0.03,
      showSlopeRayOrigin = false,
      ...props
    }: EcctrlProps,
    ref
  ) => {
    const characterRef =
      (ref as RefObject<RapierRigidBody>) || useRef<RapierRigidBody>();
    const characterModelRef = useRef<THREE.Group>(null!);
    // const slopeRayOriginRef = useRef<THREE.Mesh>(null!);

    const currentPos = useMemo(() => new THREE.Vector3(), []);

    /**
     * Check if inside keyboardcontrols
     */
    function useIsInsideKeyboardControls() {
      try {
        return !!useKeyboardControls();
      } catch {
        return false;
      }
    }
    const isInsideKeyboardControls = useIsInsideKeyboardControls();
    const [subscribeKeys, getKeys] = isInsideKeyboardControls
      ? useKeyboardControls()
      : [null];

    const presetKeys = {
      forward: false,
      backward: false,
      leftward: false,
      rightward: false,
      jump: false,
      run: false,
    };

    useFrame((state, delta) => {
      console.log("??");
      if (characterRef.current) {
        currentPos.copy(characterRef.current.translation() as THREE.Vector3);
      }

      //   const { forward, backward, leftward, rightward, jump, run } =
      //     isInsideKeyboardControls ? getKeys?.() : presetKeys;
    });

    return (
      <RigidBody ref={characterRef}>
        {/* collider ส่วน body  */}
        <CapsuleCollider
          name="character-capsule-collider"
          args={[capsuleHalfHeight, capsuleRadius]}
        />

        <group ref={characterModelRef} userData={{ camExcludeCollision: true }}>
          {/* ยังไม่รู้ว่าคืออะไร */}
          {/* <mesh
            position={[
              rayOriginOffest.x,
              rayOriginOffest.y,
              rayOriginOffest.z + slopeRayOriginOffest,
            ]}
            ref={slopeRayOriginRef}
            visible={showSlopeRayOrigin}
            userData={{ camExcludeCollision: true }} // this won't be collide by camera ray
          >
            <boxGeometry args={[0.15, 0.15, 0.15]} />
          </mesh> */}

          {/* ไฟล์ ecctrlModel */}
          {children}
        </group>
      </RigidBody>
    );
  }
);

export default EcctrlRigid;

export interface EcctrlProps extends RigidBodyProps {
  children?: ReactNode;
  capsuleHalfHeight?: number;
  capsuleRadius?: number;
  rayOriginOffest?: { x: number; y: number; z: number };
  slopeRayOriginOffest?: number;
  showSlopeRayOrigin?: boolean;
}
