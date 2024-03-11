import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
  type RigidBodyProps,
  useRapier,
} from "@react-three/rapier";
import {
  type ReactNode,
  type RefObject,
  forwardRef,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RayColliderToi } from "@dimforge/rapier3d-compat";

// ไปทวน forwardRef -> เป็นการ pass props ไปพร้อมกับ ref ด้วย
const SimpleRigid = forwardRef<RapierRigidBody, SimpleProps>(
  ({ children, ...props }: SimpleProps, ref) => {
    const rigidCharacterRef =
      (ref as RefObject<RapierRigidBody>) || useRef<RapierRigidBody>();

    const [subscribeKeys, getKeys] = useKeyboardControls();
    const { rapier, world } = useRapier();
    const rapierWorld = world;

    const jump = () => {
      if (rigidCharacterRef.current) {
        const origin = rigidCharacterRef.current.translation();
        const direction = { x: 0, y: -1, z: 0 };
        origin.y -= 0.31;
        const ray = new rapier.Ray(origin, direction);
        const hit = rapierWorld.castRay(ray, 10, true) as RayColliderToi;

        if (hit.toi <= 0.15) {
          rigidCharacterRef.current?.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
        }
      }
    };

    useEffect(() => {
      const unsubscribeJump = subscribeKeys(
        //selector
        (state) => state.jump,
        (value) => {
          if (value) jump();
        }
      );
      // prevent duble jump เนื่องจาก cache เลยเขียน clear state
      return () => {
        unsubscribeJump();
      };
    }, []);

    //ballModel
    useFrame((state, delta) => {
      // บอกทุก keys ว่าตัวไหน true false บ้าง
      const { forward, backward, leftward, rightward, jump, run } = getKeys();
      // set ค่า impulse ครั้งแรกให้เป็น 0
      const impulse = { x: 0, y: 0, z: 0 };
      const torque = { x: 0, y: 0, z: 0 };

      const impulseStrength = 0.6 * delta;
      const torqueStrength = 0.2 * delta;

      if (forward) {
        impulse.z -= impulseStrength;
        torque.x -= torqueStrength;
      }
      if (rightward) {
        impulse.x += impulseStrength;
        torque.z -= torqueStrength;
      }
      if (backward) {
        impulse.z += impulseStrength;
        torque.x += torqueStrength;
      }
      if (leftward) {
        impulse.x -= impulseStrength;
        torque.z += torqueStrength;
      }

      rigidCharacterRef.current?.applyImpulse(impulse, true);
      rigidCharacterRef.current?.applyTorqueImpulse(torque, true);
    });

    return (
      // ecctrlModel
      //   <RigidBody
      //     colliders={false}
      //     // canSleep={false}
      //     ref={rigidCharacterRef}
      //     restitution={0.2}
      //     friction={1}
      //     linearDamping={0.5}
      //     angularDamping={0.5}
      //     // colliders="hull"
      //     // position={[0, 5, 0]}
      //   >
      //     <CapsuleCollider name="character-capsule-collider" args={[0.35, 0.3]} />
      //     {children}
      //   </RigidBody>

      //ballModel
      <RigidBody
        canSleep={false}
        colliders="ball"
        ref={rigidCharacterRef}
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
        position={[0, 1, 0]}
      >
        {children}
      </RigidBody>
    );
  }
);

export default SimpleRigid;

export interface SimpleProps extends RigidBodyProps {
  children?: ReactNode;
}
