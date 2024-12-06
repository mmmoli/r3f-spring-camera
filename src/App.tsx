import { ContactShadows, Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useCallback, useEffect } from "react";
import { useCamera } from "./features/camera/use-camera";
import { AnimatedCamera } from "./features/camera/animated-camera";
import { useCameraStore } from "./shared";

export function App() {
  const { springs } = useCamera();
  const position = useCameraStore((state) => state.position);
  const setPosition = useCameraStore((state) => state.setPosition);

  useEffect(() => {
    springs.position.to((x, y, z) => console.log([x, y, z]));
  }, [springs]);

  const handleClick = useCallback(() => {
    setPosition([
      5 * Math.random() - 2.5,
      5 * Math.random() - 2.5,
      5 + 5 * Math.random(),
    ]);
  }, [setPosition]);

  return (
    <div>
      <pre>{JSON.stringify(position, null, 2)}</pre>
      <button onClick={handleClick}>Move</button>
      <Canvas
        style={{
          border: "2px solid red",
          height: "100vh",
        }}
      >
        <ambientLight intensity={0.5} />

        <Box>
          <meshPhysicalMaterial color="hotpink" />
        </Box>

        <ContactShadows
          position={[0, -1.5, 0]}
          scale={10}
          blur={3}
          opacity={0.25}
          far={10}
        />
        <AnimatedCamera />
      </Canvas>
    </div>
  );
}
