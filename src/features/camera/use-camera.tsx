import { SpringValue, useSpring } from "@react-spring/three";
import { useCameraStore, type Position } from "../../shared";

export interface UseCamera {
  springs: {
    position: SpringValue<Position>;
  };
}

export const useCamera = (): UseCamera => {
  const position = useCameraStore((state) => state.position);
  const setPosition = useCameraStore((state) => state.setPosition);

  const [springs] = useSpring(
    () => ({
      position,
      onRest: ({ value }) => setPosition(value.position),
      config: (key) => {
        switch (key) {
          case "position":
            return { mass: 2, tension: 180, friction: 12 };
          default:
            return {};
        }
      },
    }),
    [position],
  );

  return { springs };
};
