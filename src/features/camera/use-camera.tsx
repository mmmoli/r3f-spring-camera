import { SpringValue, useSpring } from "@react-spring/three";
import { useCameraStore, type Position } from "../../shared";
import { useCallback } from "react";

export interface UseCamera {
  to: (to: Position) => void;
  springs: {
    position: SpringValue<Position>;
  };
}

export const useCamera = (): UseCamera => {
  const position = useCameraStore((state) => state.position);
  const setPosition = useCameraStore((state) => state.setPosition);

  const [springs, api] = useSpring(
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

  const to = useCallback(
    (p: Position) => api.start({ position: [...p] }),
    [api],
  );

  return { to, springs };
};
