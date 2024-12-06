import { FC } from "react";
import { useCamera } from "./use-camera";
import { animated } from "@react-spring/three";

import { PerspectiveCamera } from "@react-three/drei";

const Cam = animated(PerspectiveCamera);

export const AnimatedCamera: FC = () => {
  const { springs } = useCamera();
  return (
    <Cam makeDefault position={springs.position.to((x, y, z) => [x, y, z])} />
  );
};
