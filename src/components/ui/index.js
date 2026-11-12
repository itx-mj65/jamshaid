import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

/* ---------- ripple ---------- */
export const spawnRipple = (e) => {
  const host = e.currentTarget;
  const rect = host.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2.2;
  const ink = document.createElement('span');
  ink.className = 'ripple-ink';
  ink.style.width = ink.style.height = `${size}px`;
  ink.style.left = `${e.clientX - rect.left - size / 2}px`;
  ink.style.top = `${e.clientY - rect.top - size / 2}px`;
  host.appendChild(ink);
  ink.addEventListener('animationend', () => ink.remove());
};

/* ---------- scroll reveal ---------- */
export const Reveal = ({ children, delay = 0, y = 36, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    {...rest}
  >
    {children}
  </motion.div>
);

/* ---------- section scaffolding ---------- */
export const Section = styled.section`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 110px 24px 20px;
  @media (max-width: 768px) {
    padding: 80px 16px 10px;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: ${({ theme }) => theme.accent};
  }
`;

const Heading = styled.h2`
  margin-top: 14px;
  font-size: clamp(34px, 5vw, 56px);
  line-height: 1.05;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  span {
    font-family: inherit;
    background: ${({ theme }) => theme.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const Sub = styled.p`
  margin-top: 16px;
  max-width: 620px;
  font-size: 17px;
  line-height: 1.65;
  color: ${({ theme }) => theme.text_secondary};
`;

export const SectionHeader = ({ eyebrow, title, accent, children }) => (
  <Reveal>
    <Eyebrow>{eyebrow}</Eyebrow>
    <Heading>
      {title} {accent && <span>{accent}</span>}
    </Heading>
    {children && <Sub>{children}</Sub>}
  </Reveal>
);

/* ---------- glass card with cursor spotlight and 3D tilt ---------- */
const CardShell = styled.div`
  --mx: 50%;
  --my: 50%;
  --rx: 0deg;
  --ry: 0deg;
  position: relative;
  border-radius: 22px;
  background: rgba(15, 17, 29, 0.78);
  border: 1px solid ${({ theme }) => theme.border};
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.25s ease-out, border-color 0.3s, box-shadow 0.3s;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(420px circle at var(--mx) var(--my), rgba(139, 108, 255, 0.2), rgba(34, 211, 238, 0.07) 40%, transparent 65%);
    opacity: 0;
    transition: opacity 0.35s;
  }
  &:hover {
    border-color: rgba(139, 108, 255, 0.45);
    box-shadow: 0 30px 60px -30px rgba(139, 108, 255, 0.45);
  }
  &:hover::before { opacity: 1; }
  > *:not(.ripple-ink) { position: relative; }
`;

export const GlowCard = ({ children, tilt = 0, onClick, ...rest }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    if (tilt) {
      el.style.setProperty('--ry', `${(px - 0.5) * tilt}deg`);
      el.style.setProperty('--rx', `${(0.5 - py) * tilt}deg`);
    }
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };
  return (
    <CardShell ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} {...rest}>
      {children}
    </CardShell>
  );
};

/* ---------- buttons and chips ---------- */
const ButtonBase = styled.a`
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 26px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition: transform 0.25s, box-shadow 0.25s, background 0.25s, border-color 0.25s;
  &:hover { transform: translateY(-2px); }
  &:active { transform: translateY(0) scale(0.98); }
`;

const Primary = styled(ButtonBase)`
  color: #07080f;
  background: ${({ theme }) => theme.gradient};
  box-shadow: 0 12px 34px -12px rgba(139, 108, 255, 0.8);
  &:hover { box-shadow: 0 18px 44px -12px rgba(34, 211, 238, 0.7); }
`;

const Ghost = styled(ButtonBase)`
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.surface};
  border-color: ${({ theme }) => theme.border};
  &:hover { border-color: rgba(139, 108, 255, 0.6); background: rgba(139, 108, 255, 0.1); }
`;

export const Button = ({ variant = 'primary', children, ...rest }) => {
  const Comp = variant === 'primary' ? Primary : Ghost;
  return (
    <Comp onPointerDown={spawnRipple} {...rest}>
      {children}
    </Comp>
  );
};

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  background: rgba(139, 108, 255, 0.1);
  border: 1px solid rgba(139, 108, 255, 0.25);
  white-space: nowrap;
`;
