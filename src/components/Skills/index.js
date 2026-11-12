import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  SiReact, SiRedux, SiNextdotjs, SiHtml5, SiCss3, SiJavascript, SiBootstrap, SiTailwindcss, SiThreedotjs, SiGreensock,
  SiNodedotjs, SiExpress, SiMysql, SiMongodb, SiFirebase, SiPostgresql, SiPrisma,
  SiGit, SiGithub, SiNetlify, SiVisualstudiocode, SiPostman, SiVercel, SiStripe,
} from 'react-icons/si';
import { FiCloud, FiDroplet, FiLayers } from 'react-icons/fi';
import { skills } from '../../data/constants';
import { GlowCard, Reveal, Section, SectionHeader } from '../ui';

/* Brand icons ship with the site, so they never depend on outside image links. */
const ICONS = {
  'React Js': [SiReact, '#61dafb'],
  'Redux Toolkit': [SiRedux, '#a78bfa'],
  'Next Js': [SiNextdotjs, '#ffffff'],
  HTML: [SiHtml5, '#e34f26'],
  CSS: [SiCss3, '#2f9bf0'],
  JavaScript: [SiJavascript, '#f7df1e'],
  Bootstrap: [SiBootstrap, '#9461fb'],
  'Tailwind Css': [SiTailwindcss, '#38bdf8'],
  'Three.js': [SiThreedotjs, '#ffffff'],
  GSAP: [SiGreensock, '#88ce02'],
  'Node Js': [SiNodedotjs, '#6cc24a'],
  'Express Js': [SiExpress, '#ffffff'],
  MySQL: [SiMysql, '#5fa8d3'],
  MongoDB: [SiMongodb, '#4faa41'],
  Firebase: [SiFirebase, '#ffca28'],
  PostgreSQL: [SiPostgresql, '#6aa5d8'],
  Prisma: [SiPrisma, '#ffffff'],
  'Drizzle ORM': [FiDroplet, '#c5f74f'],
  'Payload CMS': [FiLayers, '#ffffff'],
  Git: [SiGit, '#f05032'],
  GitHub: [SiGithub, '#ffffff'],
  Netlify: [SiNetlify, '#32e6e2'],
  'VS Code': [SiVisualstudiocode, '#3aa7f2'],
  Postman: [SiPostman, '#ff6c37'],
  Vercel: [SiVercel, '#ffffff'],
  Stripe: [SiStripe, '#7a73ff'],
  Cloudinary: [FiCloud, '#6f9cf5'],
};

const SkillIcon = ({ item }) => {
  const entry = ICONS[item.name];
  if (entry) {
    const [Icon, color] = entry;
    return <Icon size={21} color={color} aria-hidden="true" />;
  }
  return item.image
    ? <img src={item.image} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
    : null;
};

const slide = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const Marquee = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  padding: 22px 0;
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: rgba(255, 255, 255, 0.02);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  gap: 48px;
  animation: ${slide} 38s linear infinite;
  span {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 600;
    white-space: nowrap;
    color: ${({ theme }) => theme.text_secondary};
    display: inline-flex;
    align-items: center;
    gap: 48px;
    &::after { content: '✦'; color: ${({ theme }) => theme.primary}; font-size: 14px; }
  }
`;

const Grid = styled.div`
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  @media (max-width: 960px) { grid-template-columns: 1fr; }
`;

const Inner = styled.div`
  padding: 28px;
  height: 100%;
`;

const GroupTitle = styled.h3`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  small {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const List = styled.div`
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Item = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 14.5px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${({ theme }) => theme.border};
  transition: transform 0.25s, border-color 0.25s, background 0.25s;
  img { width: 22px; height: 22px; object-fit: contain; }
  svg { flex-shrink: 0; }
  &:hover {
    transform: translateY(-4px) scale(1.04);
    border-color: ${({ theme }) => theme.accent};
    background: rgba(34, 211, 238, 0.08);
  }
`;

const Skills = () => {
  const names = skills.flatMap((group) => group.skills.map((item) => item.name));
  return (
    <>
      <Marquee aria-hidden="true">
        <Track>
          {[...names, ...names].map((name, i) => <span key={i}>{name}</span>)}
        </Track>
      </Marquee>
      <Section id="skills">
        <SectionHeader eyebrow="Skills" title="Tools I" accent="build with">
          The stack I have been working with over the past few years, from interfaces to APIs and databases.
        </SectionHeader>
        <Grid>
          {skills.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.1} style={{ height: '100%' }}>
              <GlowCard tilt={8} style={{ height: '100%' }}>
                <Inner>
                  <GroupTitle>{group.title} <small>0{i + 1}</small></GroupTitle>
                  <List>
                    {group.skills.map((item) => (
                      <Item key={item.name}>
                        <SkillIcon item={item} />
                        {item.name}
                      </Item>
                    ))}
                  </List>
                </Inner>
              </GlowCard>
            </Reveal>
          ))}
        </Grid>
      </Section>
    </>
  );
};

export default Skills;
