import { useEffect } from 'react';

export function useKeyPress(targetKey, callback, isActive = true) {
  useEffect(() => {
    if (!isActive) return;

    function handleKeyPress(event) {
      if (event.key === targetKey) {
        callback(event);
      }
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [targetKey, callback, isActive]);
}
