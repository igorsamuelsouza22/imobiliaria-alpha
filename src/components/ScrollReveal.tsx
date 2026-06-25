import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: string;
  duration?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = '2rem',
  duration = 800,
  className = '',
}: ScrollRevealProps) {
  const ref = useScrollReveal({ delay, direction, distance, duration });

  return <div ref={ref} className={className}>{children}</div>;
}
