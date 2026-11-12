import React from 'react';
import styled from 'styled-components';
import { Modal } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiGithub, FiLinkedin, FiX } from 'react-icons/fi';
import { Button, Chip } from '../ui';

const Scroller = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  background: rgba(3, 4, 8, 0.86);
`;

const Panel = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 48px 12px;
  padding: 22px;
  border-radius: 26px;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 50px 120px -30px rgba(139, 108, 255, 0.45);
  @media (max-width: 600px) { padding: 14px; margin: 20px 8px; }
`;

const Close = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 3;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  background: rgba(6, 7, 13, 0.85);
  border: 1px solid ${({ theme }) => theme.border};
  transition: transform 0.25s, border-color 0.25s;
  &:hover { transform: rotate(90deg); border-color: ${({ theme }) => theme.accent}; }
`;

const Shot = styled.img`
  display: block;
  width: 100%;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const Body = styled.div`
  padding: 22px 8px 4px;
`;

const Title = styled.h2`
  font-size: clamp(26px, 4vw, 38px);
  font-weight: 700;
`;

const When = styled.div`
  margin-top: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Tags = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Desc = styled.div`
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.75;
  white-space: pre-line;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 600px) { font-size: 14.5px; }
`;

const Label = styled.h3`
  margin: 30px 0 14px;
  font-size: 20px;
  font-weight: 600;
`;

const Figure = styled.figure`
  margin: 0 0 18px;
  figcaption {
    margin-top: 8px;
    font-size: 13.5px;
    text-align: center;
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
  a { color: ${({ theme }) => theme.text_secondary}; font-size: 18px; display: grid; }
  a:hover { color: ${({ theme }) => theme.accent}; }
`;

const Actions = styled.div`
  margin-top: 26px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
  > a { flex: 1; min-width: 180px; }
`;

const ProjectDetails = ({ openModal, setOpenModal }) => {
  const project = openModal?.project;
  const close = () => setOpenModal({ state: false, project: null });
  if (!project) return null;
  return (
    <Modal open onClose={close}>
      <Scroller onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <Panel
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Close aria-label="Close" onClick={close}><FiX /></Close>
          <Shot src={project.image} alt={project.title} />
          <Body>
            <Title>{project.title}</Title>
            <When>{project.date}</When>
            <Tags>
              {project.tags?.map((tag) => <Chip key={tag}>{tag}</Chip>)}
            </Tags>
            <Desc>{project.description}</Desc>

            {project.images && (
              <>
                <Label>Screenshots</Label>
                {project.images.map((shot) => (
                  <Figure key={shot.src}>
                    <Shot src={shot.src} alt={shot.caption} />
                    <figcaption>{shot.caption}</figcaption>
                  </Figure>
                ))}
              </>
            )}

            {project.member && (
              <>
                <Label>Members</Label>
                {project.member.map((member) => (
                  <Member key={member.name}>
                    <img src={member.img} alt="" />
                    {member.name}
                    <a href={member.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
                    <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
                  </Member>
                ))}
              </>
            )}

            <Actions>
              {project.github && (
                <Button variant="ghost" href={project.github} target="_blank" rel="noreferrer"><FiGithub /> View Code</Button>
              )}
              {project.webapp && (
                <Button href={project.webapp} target="_blank" rel="noreferrer">View Live App <FiArrowUpRight /></Button>
              )}
            </Actions>
          </Body>
        </Panel>
      </Scroller>
    </Modal>
  );
};

export default ProjectDetails;
