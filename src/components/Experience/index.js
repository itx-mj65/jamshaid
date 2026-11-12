import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FiFileText } from 'react-icons/fi';
import { experiences } from '../../data/constants';
import { Chip, GlowCard, Reveal, Section, SectionHeader } from '../ui';

const Timeline = styled.div`
  position: relative;
  margin-top: 54px;
  padding-left: 46px;
  @media (max-width: 600px) { padding-left: 30px; }
`;

const Rail = styled.div`
  position: absolute;
  left: 11px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: ${({ theme }) => theme.border};
  @media (max-width: 600px) { left: 5px; }
`;

const Fill = styled(motion.div)`
  position: absolute;
  inset: 0;
  transform-origin: 50% 0;
  background: linear-gradient(#8b6cff, #22d3ee);
  box-shadow: 0 0 14px rgba(34, 211, 238, 0.7);
`;

const Row = styled.div`
  position: relative;
  margin-bottom: 26px;
`;

const Dot = styled.span`
  position: absolute;
  left: -42px;
  top: 30px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bg};
  border: 2px solid ${({ theme }) => theme.accent};
  box-shadow: 0 0 0 5px rgba(34, 211, 238, 0.12), 0 0 16px rgba(34, 211, 238, 0.7);
  @media (max-width: 600px) { left: -32px; width: 14px; height: 14px; }
`;

const Inner = styled.div`
  padding: 26px 28px;
  @media (max-width: 600px) { padding: 20px 18px; }
`;

const Top = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Logo = styled.img`
  /* every company logo sits in the same size badge; the logo is fitted inside, never cropped */
  width: 112px;
  height: 56px;
  padding: 8px 12px;
  border-radius: 14px;
  object-fit: contain;
  background: ${({ $bg }) => $bg || '#fff'};
  flex-shrink: 0;
  @media (max-width: 600px) { width: 84px; height: 46px; padding: 6px 8px; }
`;


const Initials = styled.div`
  width: 112px;
  height: 56px;
  border-radius: 14px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 19px;
  font-weight: 700;
  color: #07080f;
  background: ${({ theme }) => theme.gradient};
  @media (max-width: 600px) { width: 84px; height: 46px; }
`;

const initials = (name) => name.split(/[\s,]+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

const Role = styled.h3`
  font-size: 21px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 600px) { font-size: 17px; }
`;

const Company = styled.div`
  margin-top: 2px;
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
`;

const When = styled.div`
  margin-left: auto;
  align-self: flex-start;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ theme }) => theme.accent};
  background: rgba(34, 211, 238, 0.08);
  border: 1px solid rgba(34, 211, 238, 0.25);
  @media (max-width: 760px) { display: none; }
`;

const WhenMobile = styled.div`
  display: none;
  margin-top: 4px;
  font-size: 12.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.accent};
  @media (max-width: 760px) { display: block; }
`;

const Desc = styled.p`
  margin-top: 16px;
  font-size: 15.5px;
  line-height: 1.7;
  white-space: pre-line;
  color: ${({ theme }) => theme.text_secondary};
`;

const Tags = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const DocLink = styled.a`
  margin-top: 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  &:hover { color: ${({ theme }) => theme.accent}; }
`;

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  return (
    <Section id="experience">
      <SectionHeader eyebrow="Experience" title="Where I have" accent="worked">
        My work as a web developer and instructor across companies and projects.
      </SectionHeader>
      <Timeline ref={ref}>
        <Rail><Fill style={{ scaleY }} /></Rail>
        {experiences.map((exp, i) => (
          <Row key={exp.id}>
            <Dot />
            <Reveal delay={Math.min(i * 0.05, 0.2)}>
              <GlowCard>
                <Inner>
                  <Top>
                    {exp.img ? <Logo src={exp.img} alt="" $bg={exp.logoBg} /> : <Initials>{initials(exp.company)}</Initials>}
                    <div>
                      <Role>{exp.role}</Role>
                      <Company>{exp.company}</Company>
                      <WhenMobile>{exp.date}</WhenMobile>
                    </div>
                    <When>{exp.date}</When>
                  </Top>
                  {exp.desc && <Desc>{exp.desc}</Desc>}
                  {exp.skills && (
                    <Tags>
                      {exp.skills.map((skill) => <Chip key={skill}>{skill}</Chip>)}
                    </Tags>
                  )}
                  {exp.doc && (
                    <DocLink href={exp.doc} target="_blank" rel="noreferrer"><FiFileText /> View certificate</DocLink>
                  )}
                </Inner>
              </GlowCard>
            </Reveal>
          </Row>
        ))}
      </Timeline>
    </Section>
  );
};

export default Experience;
