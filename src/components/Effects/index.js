import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';

/* ---------- scroll progress bar ---------- */
const Bar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  transform-origin: 0 50%;
  background: ${({ theme }) => theme.gradient};
  z-index: 200;
`;

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <Bar style={{ scaleX }} />;
};

/* ---------- ambient background (static: painted once, no blur filters or animation) ---------- */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(60vw 50vh at 0% 0%, rgba(109, 77, 255, 0.28), transparent 70%),
    radial-gradient(55vw 55vh at 100% 55%, rgba(14, 165, 183, 0.2), transparent 70%),
    radial-gradient(50vw 40vh at 40% 110%, rgba(184, 58, 138, 0.14), transparent 70%),
    ${({ theme }) => theme.bg};
`;

export const Background = () => <Backdrop />;

/* ---------- water-ring ripple on every click ---------- */
export const ClickRipple = () => {
  useEffect(() => {
    const onDown = (e) => {
      ['', 'second'].forEach((extra) => {
        const ring = document.createElement('span');
        ring.className = `click-ring ${extra}`;
        ring.style.left = `${e.clientX}px`;
        ring.style.top = `${e.clientY}px`;
        document.body.appendChild(ring);
        ring.addEventListener('animationend', () => ring.remove());
      });
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, []);
  return null;
};
