'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-in' | 'slide-in-up' | 'slide-in-left' | 'slide-in-right';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: string;
  as?: keyof JSX.IntrinsicElements;
  stagger?: number; // Stagger delay in ms for children
}

export function AnimateOnScroll({
  children,
  className,
  animation = 'fade-in',
  delay,
  as: Component = 'div',
  stagger,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  const animationClasses: Record<AnimationType, string> = {
    'fade-in': 'opacity-0',
    'slide-in-up': 'opacity-0 translate-y-8',
    'slide-in-left': 'opacity-0 -translate-x-8',
    'slide-in-right': 'opacity-0 translate-x-8',
  };
  
  const inViewClasses = 'opacity-100 translate-y-0 translate-x-0';
  
  const childNodes = stagger ? React.Children.toArray(children) : [children];

  return (
    <Component
      ref={ref}
      className={cn(
        !stagger && 'transition-all duration-700 ease-out',
        !stagger && (isInView ? inViewClasses : animationClasses[animation]),
        className
      )}
      style={!stagger ? { transitionDelay: delay } : {}}
    >
      {stagger
        ? childNodes.map((child, i) => (
            <div
              key={i}
              className={cn(
                'transition-all duration-700 ease-out',
                isInView ? inViewClasses : animationClasses[animation]
              )}
              style={{ transitionDelay: `${(delay ? parseInt(delay) : 0) + i * stagger}ms` }}
            >
              {child}
            </div>
          ))
        : children}
    </Component>
  );
}
