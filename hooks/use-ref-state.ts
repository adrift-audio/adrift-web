import { useEffect, useRef, useState } from 'react';

export default function useRefState<T>(initialValue: T): [any, (value: any) => void] {
  const [state, setState] = useState<T>(initialValue);
  const refState = useRef<T>(state);
  useEffect(
    () => {
      refState.current = state;
    },
    [state],
  );

  return [refState, setState];
}
