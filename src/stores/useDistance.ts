import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  distanceA: number;
  setDistance: (value: number) => void;
}

const useDistance = create(
  subscribeWithSelector<CounterState>((set, get) => {
    return {
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      distanceA: 0,
      setDistance: (value) => set({ distanceA: value }),
    };
  })
);

export default useDistance;
