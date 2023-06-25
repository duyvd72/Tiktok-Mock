import { useRef } from "react";

type AnyFunction = (...args: any[]) => void;

const useThrottle = <Func extends AnyFunction>(func: Func, delay: number): Func => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldCallRef = useRef(false);

  const throttledFunction = (...args: Parameters<Func>) => {
    if (!timeoutRef.current) {
      func(...args);
      timeoutRef.current = setTimeout(() => {
        if (shouldCallRef.current) {
          func(...args);
          shouldCallRef.current = false;
          timeoutRef.current = null;
        }
      }, delay);
    } else {
      shouldCallRef.current = true;
    }
  };

  return throttledFunction as Func;
};

export default useThrottle;
