import {
  MutableRefObject, useCallback, useEffect, useRef, useState,
} from 'react';

interface UseModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  animationDelay?: number;
}

/**
 * @description Reused hook for modal (drawer/modal)
 * @param animationDelay - delay of execution in ms
 * @param isOpen - is modal opened
 * @param onClose - on close modal callback
 */

export function useModal({
  isOpen,
  onClose,
  animationDelay = 0,
}: UseModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const close = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, animationDelay);
    }
  }, [animationDelay, onClose]);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close();
    }
  }, [close]);

  useEffect(
    () => {
      if (isOpen) {
        window.addEventListener('keydown', onKeyDown);
      }
      return () => {
        clearTimeout(timerRef.current);

        window.removeEventListener('keydown', onKeyDown);
      };
    },
    [isOpen, onKeyDown],
  );

  return {
    isClosing,
    isMounted,
    close,
  };
}
