import { useThree } from "@react-three/fiber";
// import { useRapier } from "@react-three/rapier";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

export const useFollowCam = function (props: UseFollowCamProps) {
  const { scene, camera } = useThree();
  // const { rapier, world } = useRapier();

  let isMouseDown = false;
  let previousTouch1: Touch = null;
  let previousTouch2: Touch = null;

  let originZDis = props.camInitDis;
  const camMaxDis = props.camMaxDis;
  const camMinDis = props.camMinDis;
  const camMoveSpeed = props.camMoveSpeed;
  const camZoomSpeed = props.camZoomSpeed;
  const camCollisionOffset = props.camCollisionOffset;
  const pivot = useMemo(() => new THREE.Object3D(), []);
  const followCam = useMemo(() => {
    const origin = new THREE.Object3D();
    origin.position.set(0, 0, originZDis);
    return origin;
  }, []);

  /** Camera collison detect setups */
  let smallestDistance = null;
  let cameraDistance = null;
  let intersects = null;
  let intersectObjects: THREE.Object3D[] = [];
  const cameraRayDir = useMemo(() => new THREE.Vector3(), []);
  const cameraRayOrigin = useMemo(() => new THREE.Vector3(), []);
  const cameraPosition = useMemo(() => new THREE.Vector3(), []);
  const camLerpingPoint = useMemo(() => new THREE.Vector3(), []);
  const camRayCast = new THREE.Raycaster(
    cameraRayOrigin,
    cameraRayDir,
    0,
    -camMaxDis
  );
  // Rapier ray setup (optional)
  // const rayCast = new rapier.Ray(cameraRayOrigin, cameraRayDir);
  // let rayLength = null;
  // let rayHit = null;

  // Mouse move event เวลากดเมาส์ลากเปลี่ยนมุมกล้อง
  const onDocumentMouseMove = (e: MouseEvent) => {
    // PIVOT แกนหมุนแนวนอน, FOLLOWCAM แกนหมุนแนวตั้ง

    if (document.pointerLockElement || isMouseDown) {
      // เข้า function ตอนกด mouseDown
      // e.movementX คือ การเลื่อนเมาส์แกน X เลื่อนไปทาง -> ค่า+ , เลื่อนไปทาง <- ค่า-
      pivot.rotation.y -= e.movementX * 0.002 * camMoveSpeed;
      // pivot.rotation.y เป็นการ set ค่าการหมุนแกน Y แนวนอนซ้ายขวา

      const vy = followCam.rotation.x + e.movementY * 0.002 * camMoveSpeed;
      // followCam.rotation.x เป็นการ set ค่าการหมุนแกน X แนวตั้งบนล่าง ค่าเริ่ม (0,0,0)
      // vy เป็นค่าตัวเลข ที่เลื่อนในแนวแกนตั้งเท่านั้น (เลื่อนเมาส์ขึ้นลง)

      cameraDistance = followCam.position.length();
      // followCam.position.length() -> หาค่าความยาวมาจาก (0,0,5) = 5 link ค่า Z จาก Scrollเมาส์กลางเข้าออก
      // ตั้งขอบเขตมุมกล้องแกมแนวตั้งไม่ให้ฟมุนได้เกินนี้
      if (vy >= -0.5 && vy <= 1.5) {
        followCam.rotation.x = vy;
        // set ค่าหมุนเข้าไปที่ followCam ถ้าไม่ set ตรงนี้ เวลาเลื่อนเมาส์ขึ้นลง มันไม่ได้หมุนแกนขึ้นลงด้วย

        followCam.position.y = -cameraDistance * Math.sin(-vy);
        followCam.position.z = -cameraDistance * Math.cos(-vy);
        // กล้องจะ smooth มากขึ้นอะ
      }
    }
    return false;
  };

  // Mouse scroll event เวลา scroll เมาส์ Zoom
  const onDocumentMouseWheel = (e: Event) => {
    const vz = originZDis - (e as WheelEvent).deltaY * 0.002 * camZoomSpeed;
    // e.deltaY เลื่อนขึ้นzoomเข้า ค่า -100 , เลื่อนลงzoomออก ค่า 100
    // originZDis ค่าจะเป็นค่าแกน Z ของกล้อง default = 5
    const vy = followCam.rotation.x;

    // ถ้าไม่มี if ขึ้นจะไม่เกิดการ zoom เข้าออก นะ ใช่ limit ขอบเขตของการ zoom เข้าออก
    if (vz >= camMaxDis && vz <= camMinDis) {
      originZDis = vz;
      // เลื่อนscroll เมาส์ 1 ครั้งก็ set ค่าแกน Z ใหม่

      followCam.position.z = originZDis * Math.cos(-vy);
      followCam.position.y = originZDis * Math.sin(-vy);
      // กล้องจะ scroll เป็น step มากขึ้นอะ
    }
    return false;
  };

  // Touch end event
  const onTouchEnd = (e: TouchEvent) => {
    previousTouch1 = null;
    previousTouch2 = null;
  };

  // Touch move event
  const onTouchMove = (e: TouchEvent) => {
    // prevent swipe to navigate gesture
    e.preventDefault();
    e.stopImmediatePropagation();

    const touch1 = e.targetTouches[0];
    const touch2 = e.targetTouches[1];

    // One finger touch to rotate camera
    if (previousTouch1 && !previousTouch2) {
      const touch1MovementX = touch1.pageX - previousTouch1.pageX;
      const touch1MovementY = touch1.pageY - previousTouch1.pageY;

      pivot.rotation.y -= touch1MovementX * 0.005 * camMoveSpeed;
      const vy = followCam.rotation.x + touch1MovementY * 0.005 * camMoveSpeed;

      cameraDistance = followCam.position.length();

      if (vy >= -0.5 && vy <= 1.5) {
        followCam.rotation.x = vy;
        followCam.position.y = -cameraDistance * Math.sin(-vy);
        followCam.position.z = -cameraDistance * Math.cos(-vy);
      }
    }

    // Two fingers touch to zoom in/out camera
    if (previousTouch2) {
      const prePinchDis = Math.hypot(
        previousTouch1.pageX - previousTouch2.pageX,
        previousTouch1.pageY - previousTouch2.pageY
      );
      const pinchDis = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );

      const vz = originZDis - (prePinchDis - pinchDis) * 0.01 * camZoomSpeed;
      const vy = followCam.rotation.x;

      if (vz >= camMaxDis && vz <= camMinDis) {
        originZDis = vz;
        followCam.position.z = originZDis * Math.cos(-vy);
        followCam.position.y = originZDis * Math.sin(-vy);
      }
    }

    previousTouch1 = touch1;
    previousTouch2 = touch2;
  };

  // Custom traverse function
  // Prepare intersect objects for camera collision
  function customTraverse(object: THREE.Object3D) {
    // Chekc if the object's userData camExcludeCollision is true
    if (object.userData && object.userData.camExcludeCollision === true) {
      return;
    }

    // Check if the object is a Mesh, and not Text ("InstancedBufferGeometry")
    if (
      (object as THREE.Mesh).isMesh &&
      (object as THREE.Mesh).geometry.type !== "InstancedBufferGeometry"
    ) {
      intersectObjects.push(object);
    }

    // Recursively traverse child objects
    object.children.forEach((child) => {
      customTraverse(child); // Continue the traversal for all child objects
    });
  }

  const cameraCollisionDetect = (delta: number) => {
    // Update collision detect ray origin and pointing direction
    // Which is from pivot point to camera position
    cameraRayOrigin.copy(pivot.position);
    camera.getWorldPosition(cameraPosition);
    cameraRayDir.subVectors(cameraPosition, pivot.position);
    // rayLength = cameraRayDir.length();

    // casting ray hit, if object in between character and camera,
    // change the smallestDistance to the ray hit toi
    // otherwise the smallestDistance is same as camera original position (originZDis)
    intersects = camRayCast.intersectObjects(intersectObjects);
    if (intersects.length && intersects[0].distance <= -originZDis) {
      smallestDistance =
        -intersects[0].distance * camCollisionOffset < -0.7
          ? -intersects[0].distance * camCollisionOffset
          : -0.7;
    } else {
      smallestDistance = originZDis;
    }

    // Rapier ray hit setup (optional)
    // rayHit = world.castRay(rayCast, rayLength + 1, true, null, null, character);
    // if (rayHit && rayHit.toi && rayHit.toi > originZDis) {
    //   smallestDistance = -rayHit.toi + 0.5;
    // } else if (rayHit == null) {
    //   smallestDistance = originZDis;
    // }

    // Update camera next lerping position, and lerp the camera
    camLerpingPoint.set(
      followCam.position.x,
      smallestDistance * Math.sin(-followCam.rotation.x),
      smallestDistance * Math.cos(-followCam.rotation.x)
    );

    followCam.position.lerp(camLerpingPoint, delta * 4); // delta * 2 for rapier ray setup
  };

  // Set camera position to (0,0,0)
  useEffect(() => {
    camera.position.set(0, 0, 0);
  }, []);

  useEffect(() => {
    // Prepare for camera ray intersect objects
    scene.children.forEach((child) => customTraverse(child));

    // Prepare for followCam and pivot point
    followCam.add(camera);
    pivot.add(followCam);

    document.addEventListener("mousedown", () => {
      isMouseDown = true;
    });
    document.addEventListener("mouseup", () => {
      isMouseDown = false;
    });
    document.addEventListener("mousemove", onDocumentMouseMove);
    document.addEventListener("mousewheel", onDocumentMouseWheel);
    // Touch event
    document.addEventListener("touchend", onTouchEnd);
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("mousedown", () => {
        isMouseDown = true;
      });
      document.removeEventListener("mouseup", () => {
        isMouseDown = false;
      });
      document.removeEventListener("mousemove", onDocumentMouseMove);
      document.removeEventListener("mousewheel", onDocumentMouseWheel);
      // Touch event
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("touchmove", onTouchMove);
      // Remove camera from followCam
      followCam.remove(camera);
    };
  });

  return { pivot, followCam, cameraCollisionDetect };
};

export type UseFollowCamProps = {
  camInitDis: number;
  camMaxDis: number;
  camMinDis: number;
  camMoveSpeed: number;
  camZoomSpeed: number;
  camCollisionOffset: number;
};
