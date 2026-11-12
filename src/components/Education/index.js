import React from 'react';
import styled from 'styled-components';
import { education } from '../../data/constants';
import { GlowCard, Reveal, Section, SectionHeader } from '../ui';

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
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  object-fit: cover;
  background: #fff;
`;


const Initials = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 19px;
  font-weight: 700;
  color: #07080f;
  background: ${({ theme }) => theme.gradient};
`;

const initials = (name) => name.split(/[\s,]+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

const Degree = styled.h3`
  margin-top: 20px;
  font-size: 21px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const School = styled.div`
  margin-top: 6px;
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
`;

const Meta = styled.div`
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  span {
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.accent};
    background: rgba(34, 211, 238, 0.08);
    border: 1px solid rgba(34, 211, 238, 0.25);
  }
  span + span {
    color: ${({ theme }) => theme.primary};
    background: rgba(139, 108, 255, 0.1);
    border-color: rgba(139, 108, 255, 0.3);
  }
`;

const Desc = styled.p`
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
`;

const Education = () => (
  <Section id="education">
    <SectionHeader eyebrow="Education" title="How I" accent="learned">
      My degree and the training that got me into web development.
    </SectionHeader>
    <Grid>
      {education.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.1} style={{ height: '100%' }}>
          <GlowCard tilt={8} style={{ height: '100%' }}>
            <Inner>
              {item.img ? <Logo src={item.img} alt="" /> : <Initials>{initials(item.school)}</Initials>}
              <Degree>{item.degree}</Degree>
              <School>{item.school}</School>
              <Meta>
                <span>{item.date}</span>
                {item.grade && <span>Grade: {item.grade}</span>}
              </Meta>
              <Desc>{item.desc}</Desc>
            </Inner>
          </GlowCard>
        </Reveal>
      ))}
    </Grid>
  </Section>
);

export default Education;
