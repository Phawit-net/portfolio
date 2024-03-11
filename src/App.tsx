import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
// import Experience from "./components/Experience";
import * as THREE from "three";
// import PhysicExperience from "./components/PhysicExperience";
import CharacterExperience from "./components/CharacterExperience";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    // ปรับขนาดของ canvas ใน css root ได้เลย
    // เราไม่ต้อง create scene
    // เราไม่ต้อง create WebRenderer
    // Scene กำลังถูกเรนเดอร์ในแต่ละ frame
    // ไม่ต้องใส่ Perspective Camera เพราะมี default ใน canvas แล้ว
    // และ default กล้องของ R3F มันเลื่อนแกน Z ให้เห็น object ตรงกลางให้เลย
    // resize viewport ให้ อัตโนมัติแล้ว
    // สามารถใช้ Hook ได้เหมือน react ปกติเลย แต่ไม่สามารถใช้ในไฟล์นี้ได้ ต้องใช้ใน <Canvas> เราจึงสร้างไฟล์ Experiment ขึ้นมา

    <Canvas
      gl={{
        // ช่วยในเรื่องของ ความคมชัดของ object ไม่เป็นขั้นบรรได
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      shadows
      // ทำให้มีการ castShadow
      camera={{
        name: "CANVAS CAMERA",
        fov: 65,
        near: 0.1,
        far: 1000,
      }}
    >
      <Suspense>
        {/* <OrbitControls enablePan /> */}
        {/* <Experience /> */}
        {/* <PhysicExperience /> */}
        <CharacterExperience />
      </Suspense>
    </Canvas>
  );
}

export default App;
