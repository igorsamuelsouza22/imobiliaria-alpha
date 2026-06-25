import { useCallback } from 'react';

interface ScrollRevealOptions {
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: string;
  duration?: number;
}

export function useScrollReveal({
  delay = 0,
  direction = 'up',
  distance = '2rem',
  duration = 800,
}: ScrollRevealOptions = {}) {
  const nodeRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      let transformBase = '';
      switch (direction) {
        case 'up': transformBase = `translateY(${distance})`; break;
        case 'down': transformBase = `translateY(-${distance})`; break;
        case 'left': transformBase = `translateX(${distance})`; break;
        case 'right': transformBase = `translateX(-${distance})`; break;
        case 'none': transformBase = `translate(0)`; break;
      }

      node.style.opacity = '0';
      node.style.transform = transformBase;
      node.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      node.style.willChange = 'opacity, transform';

      if (delay > 0) {
        node.style.transitionDelay = `${delay}ms`;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            node.style.opacity = '1';
            node.style.transform = 'translate(0)';
            observer.unobserve(node);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      });

      setTimeout(() => {
        observer.observe(node);
      }, 50);
    }
  }, [direction, distance, duration, delay]);

  return nodeRef;
}
