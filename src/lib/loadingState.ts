// Shared loading state — singleton module
// Components signal readiness, PageLoader reads it

type Listener = () => void;

const listeners: Listener[] = [];

export const loadingState = {
  sceneReady: false,
  markReady() {
    this.sceneReady = true;
    listeners.forEach((fn) => fn());
  },
  subscribe(fn: Listener) {
    listeners.push(fn);
    return () => {
      const idx = listeners.indexOf(fn);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  },
};
