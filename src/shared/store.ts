import { create } from "zustand";

export type Position = [number, number, number];

interface CameraState {
  position: Position;
  setPosition: (to: Position) => void;
}

export const DEFAULT_POSITION: Position = [0, 0, 5];

export const useCameraStore = create<CameraState>()((set) => ({
  position: DEFAULT_POSITION,
  setPosition: (to) => set({ position: to }),
}));
