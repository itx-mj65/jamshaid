import React from 'react';
import styled from 'styled-components';
import { FiArrowUpRight } from 'react-icons/fi';
import { projects } from '../../data/constants';
import { Chip, GlowCard, Reveal, Section, SectionHeader, spawnRipple } from '../ui';

const Grid = styled.div`
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 26px;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`;

const Shot = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.bgLight};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(6, 7, 13, 0.75));
    opacity: 0;
    transition: opacity 0.4s;
  }
`;

const Open = styled.span`
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 2;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 20px;
  color: #07080f;
  background: ${({ theme }) => theme.gradient};
  transform: translateY(20px) scale(0.6);
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s;
`;

const Card = styled(GlowCard)`
  cursor: pointer;
  height: 100%;
  &:hover ${Shot} img { transform: scale(1.06); }
  &:hover ${Shot}::after { opacity: 1; }
  &:hover ${Open} { transform: none; opacity: 1; }
`;

const Info = styled.div`
  padding: 22px 24px 24px;
`;

const Top = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

const Title = styled.h3`
  font-size: 23px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const When = styled.span`
  font-size: 12.5px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ theme }) => theme.text_secondary};
`;

const Desc = styled.p`
  margin-top: 10px;
  font-size: 15px;
  line-height: 1.65;
  color: ${({ theme }) => theme.text_secondary};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Tags = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Projects = ({ setOpenModal }) => (
  <Section id="projects">
    <SectionHeader eyebrow="Projects" title="Selected" accent="work">
      Websites, portals and web apps I have built. Open any project for the full story, screenshots and live link.
    </SectionHeader>
    <Grid>
      {projects.map((project, i) => (
        <Reveal key={project.id} delay={(i % 2) * 0.1} style={{ height: '100%' }}>
          <Card
            tilt={5}
            className="ripple-host"
            onPointerDown={spawnRipple}
            onClick={() => setOpenModal({ state: true, project })}
          >
            <Shot>
              <img src={project.image} alt={project.title} />
              <Open><FiArrowUpRight /></Open>
            </Shot>
            <Info>
              <Top>
                <Title>{project.title}</Title>
                <When>{project.date}</When>
              </Top>
              <Desc>{project.description}</Desc>
              <Tags>
                {project.tags?.slice(0, 4).map((tag) => <Chip key={tag}>{tag}</Chip>)}
                {project.tags?.length > 4 && <Chip>+{project.tags.length - 4}</Chip>}
              </Tags>
            </Info>
          </Card>
        </Reveal>
      ))}
    </Grid>
  </Section>
);

export default Projects;
