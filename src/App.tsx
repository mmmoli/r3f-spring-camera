import { ContactShadows, Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useCallback, useEffect } from "react";
import { useCamera } from "./features/camera/use-camera";
import { AnimatedCamera } from "./features/camera/animated-camera";
import { useCameraStore } from "./shared";

export function App() {
  const { to, springs } = useCamera();
  const position = useCameraStore((state) => state.position);

  useEffect(() => {
    springs.position.to((x, y, z) => console.log([x, y, z]));
  }, [springs]);

  const handleClick = useCallback(() => {
    to([1, 1, 5]);
  }, [to]);

  return (
    <div>
      <pre>{JSON.stringify(position, null, 2)}</pre>
      <button onClick={handleClick}>Move</button>
      <Canvas>
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
