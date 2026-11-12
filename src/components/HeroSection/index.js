import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { FiArrowUpRight, FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi';
import { Bio, projects, experiences, skills } from '../../data/constants';
import { Button, spawnRipple } from '../ui';
import PortraitImg from '../../images/HeroCutout.webp';

const Wrap = styled.section`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 130px 24px 60px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 24px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 110px 16px 40px;
    text-align: center;
  }
`;

/* water ripples that follow the cursor across the hero section */
const spread = keyframes`
  from { transform: translate(-50%, -50%) scale(0.15); opacity: 0.75; }
  to { transform: translate(-50%, -50%) scale(1); opacity: 0; }
`;

const Outer = styled.div`
  position: relative;
  overflow: hidden;
`;

const RippleLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  span {
    position: absolute;
    border-radius: 50%;
    border: 1.5px solid rgba(34, 211, 238, 0.55);
    box-shadow: 0 0 22px rgba(139, 108, 255, 0.35), inset 0 0 22px rgba(34, 211, 238, 0.12);
    animation: ${spread} 1.5s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
    will-change: transform, opacity;
  }
`;

const Hello = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #34d399;
    box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.2);
  }
`;

const Name = styled.h1`
  margin-top: 22px;
  font-size: clamp(44px, 6.6vw, 84px);
  line-height: 0.98;
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

const Role = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  font-size: clamp(18px, 2.4vw, 26px);
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  .Typewriter { color: ${({ theme }) => theme.accent}; }
  @media (max-width: 960px) { justify-content: center; }
`;

const About = styled.p`
  margin-top: 18px;
  max-width: 540px;
  font-size: 17px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 960px) { margin-left: auto; margin-right: auto; }
`;

const Actions = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  @media (max-width: 960px) { justify-content: center; }
`;

const Social = styled.a`
  position: relative;
  overflow: hidden;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 19px;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  transition: transform 0.25s, border-color 0.25s, color 0.25s;
  &:hover {
    transform: translateY(-3px);
    color: ${({ theme }) => theme.accent};
    border-color: ${({ theme }) => theme.accent};
  }
`;

const Stats = styled.div`
  margin-top: 44px;
  display: flex;
  gap: 40px;
  @media (max-width: 960px) { justify-content: center; gap: 28px; }
`;

const Stat = styled.div`
  b {
    display: block;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 34px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
  }
  small {
    font-size: 13px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const StageWrap = styled(motion.div)`
  @media (max-width: 960px) { order: -1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

const Stage = styled.div`
  --rx: 0deg;
  --ry: 0deg;
  --px: 0px;
  --py: 0px;
  position: relative;
  width: 100%;
  max-width: 540px;
  aspect-ratio: 1;
  margin: 0 auto;
  perspective: 1100px;
  @media (max-width: 960px) { max-width: 380px; }
`;

const Tilt = styled.div`
  position: absolute;
  inset: 0;
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  transform-style: preserve-3d;
  transition: transform 0.35s ease-out;
`;

/* themed backdrop disc that sits behind the photo */
const Disc = styled.div`
  position: absolute;
  inset: 8% 6% 4%;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 38%, rgba(139, 108, 255, 0.55), rgba(34, 211, 238, 0.22) 55%, rgba(13, 15, 26, 0.2) 75%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 80px -10px rgba(139, 108, 255, 0.55), inset 0 0 60px rgba(34, 211, 238, 0.12);
  transform: translate3d(calc(var(--px) * -0.6), calc(var(--py) * -0.6), -40px);
  transition: transform 0.35s ease-out;
`;

const Ring = styled.div`
  position: absolute;
  inset: 2% 0 -2%;
  border-radius: 50%;
  border: 1px dashed rgba(34, 211, 238, 0.28);
  transform: translate3d(calc(var(--px) * -1), calc(var(--py) * -1), -70px);
  transition: transform 0.35s ease-out;
`;

const Photo = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: bottom;
  user-select: none;
  -webkit-user-drag: none;
  filter: drop-shadow(0 24px 40px rgba(0, 0, 0, 0.55));
  transform: translate3d(var(--px), var(--py), 30px);
  transition: transform 0.35s ease-out;
  mask-image: linear-gradient(#000 82%, transparent 99%);
  -webkit-mask-image: linear-gradient(#000 82%, transparent 99%);
`;

const Tag = styled.div`
  position: absolute;
  z-index: 2;
  padding: 10px 16px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  background: rgba(13, 15, 26, 0.9);
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 16px 40px -18px rgba(0, 0, 0, 0.9);
  animation: ${float} ${({ $dur }) => $dur}s ease-in-out infinite;
  pointer-events: none;
  em { font-style: normal; color: ${({ theme }) => theme.accent}; }
  @media (max-width: 520px) { font-size: 11px; padding: 7px 11px; }
`;

const ScrollCue = styled.a`
  position: absolute;
  left: 24px;
  bottom: 26px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.text_secondary};
  svg { animation: ${float} 1.8s ease-in-out infinite; }
  @media (max-width: 960px) { display: none; }
`;

const rise = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const HeroSection = () => {
  const layer = useRef(null);
  const stage = useRef(null);
  const last = useRef({ t: 0, x: 0, y: 0 });

  const addRipple = (x, y, size) => {
    const host = layer.current;
    if (!host || host.childElementCount > 14) return;
    const ring = document.createElement('span');
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.style.width = ring.style.height = `${size}px`;
    host.appendChild(ring);
    ring.addEventListener('animationend', () => ring.remove());
  };

  const onMove = (e) => {
    const now = performance.now();
    const rect = e.currentTarget.getBoundingClientRect();
    // gentle tilt and parallax on the portrait (a few degrees only, so the face never distorts)
    if (stage.current && e.pointerType === 'mouse') {
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      const st = stage.current.style;
      st.setProperty('--ry', `${nx * 9}deg`);
      st.setProperty('--rx', `${-ny * 6}deg`);
      st.setProperty('--px', `${nx * 14}px`);
      st.setProperty('--py', `${ny * 10}px`);
    }
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moved = Math.hypot(x - last.current.x, y - last.current.y);
    if (now - last.current.t < 140 || moved < 40) return;
    last.current = { t: now, x, y };
    addRipple(x, y, 180);
  };

  const onDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    [260, 420, 600].forEach((size, i) => setTimeout(() => addRipple(e.clientX - rect.left, e.clientY - rect.top, size), i * 130));
  };

  const [first, ...rest] = Bio.name.split(' ');
  const skillCount = skills.reduce((n, group) => n + group.skills.length, 0);
  return (
    <Outer id="about" onPointerMove={onMove} onPointerDown={onDown}>
      <RippleLayer ref={layer} />
      <Wrap>
        <div>
          <motion.div {...rise(0.05)}>
            <Hello><i /> Hi, I am</Hello>
          </motion.div>
          <motion.div {...rise(0.15)}>
            <Name>{first} <span>{rest.join(' ')}</span></Name>
          </motion.div>
          <motion.div {...rise(0.25)}>
            <Role>
              I am a
              <Typewriter options={{ strings: Bio.roles, autoStart: true, loop: true }} />
            </Role>
          </motion.div>
          <motion.div {...rise(0.35)}>
            <About>{Bio.description}</About>
          </motion.div>
          <motion.div {...rise(0.45)}>
            <Actions>
              <Button href={Bio.resume} target="_blank" rel="noreferrer">Check Resume <FiArrowUpRight /></Button>
              <Button variant="ghost" href="#projects">View Projects</Button>
              <Social href={Bio.github} target="_blank" rel="noreferrer" aria-label="GitHub" onPointerDown={spawnRipple}><FiGithub /></Social>
              <Social href={Bio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" onPointerDown={spawnRipple}><FiLinkedin /></Social>
            </Actions>
          </motion.div>
          <motion.div {...rise(0.55)}>
            <Stats>
              <Stat><b>{projects.length}+</b><small>Projects</small></Stat>
              <Stat><b>{experiences.length}</b><small>Roles</small></Stat>
              <Stat><b>{skillCount}+</b><small>Technologies</small></Stat>
            </Stats>
          </motion.div>
        </div>

        <StageWrap initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <Stage ref={stage}>
            <Tilt>
              <Ring />
              <Disc />
              <Photo src={PortraitImg} alt={Bio.name} draggable="false" />
            </Tilt>
            <Tag $dur={5} style={{ top: '9%', left: '-2%' }}><em>&lt;/&gt;</em> MERN Stack</Tag>
            <Tag $dur={6.5} style={{ top: '20%', right: '-3%', animationDelay: '-2s' }}><em>▲</em> Next.js</Tag>
            <Tag $dur={5.8} style={{ bottom: '13%', left: '0%', animationDelay: '-3s' }}><em>◆</em> React</Tag>
          </Stage>
        </StageWrap>

        <ScrollCue href="#skills"><FiArrowDown /> Scroll</ScrollCue>
      </Wrap>
    </Outer>
  );
};

export default HeroSection;
