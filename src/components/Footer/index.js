import React from 'react';
import styled from 'styled-components';
import { FiFacebook, FiGithub, FiInstagram, FiLinkedin, FiTwitter, FiArrowUp } from 'react-icons/fi';
import { Bio } from '../../data/constants';
import { spawnRipple } from '../ui';

const Wrap = styled.footer`
  position: relative;
  z-index: 1;
  margin-top: 110px;
  border-top: 1px solid ${({ theme }) => theme.border};
  background: rgba(255, 255, 255, 0.02);
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 44px 24px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;

const Big = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(40px, 9vw, 110px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.04));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  user-select: none;
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 26px;
  a {
    font-size: 15px;
    text-decoration: none;
    color: ${({ theme }) => theme.text_secondary};
    transition: color 0.2s;
    &:hover { color: ${({ theme }) => theme.accent}; }
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 12px;
`;

const Icon = styled.a`
  position: relative;
  overflow: hidden;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  transition: transform 0.25s, color 0.25s, border-color 0.25s;
  &:hover { transform: translateY(-3px); color: ${({ theme }) => theme.accent}; border-color: ${({ theme }) => theme.accent}; }
`;

const Copy = styled.p`
  font-size: 13.5px;
  color: ${({ theme }) => theme.text_secondary};
`;

const isLink = (url) => url && url !== '#';

function Footer() {
  const socials = [
    [Bio.github, FiGithub, 'GitHub'],
    [Bio.linkedin, FiLinkedin, 'LinkedIn'],
    [Bio.insta, FiInstagram, 'Instagram'],
    [Bio.facebook, FiFacebook, 'Facebook'],
    [Bio.twitter, FiTwitter, 'Twitter'],
  ].filter(([url]) => isLink(url));
  return (
    <Wrap>
      <Inner>
        <Big>{Bio.name}</Big>
        <Nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </Nav>
        <Icons>
          {socials.map(([url, IconComp, label]) => (
            <Icon key={label} href={url} target="_blank" rel="noreferrer" aria-label={label} onPointerDown={spawnRipple}><IconComp /></Icon>
          ))}
          <Icon href="#about" aria-label="Back to top" onPointerDown={spawnRipple}><FiArrowUp /></Icon>
        </Icons>
        <Copy>&copy; {new Date().getFullYear()} {Bio.name}. All rights reserved.</Copy>
      </Inner>
    </Wrap>
  );
}

export default Footer;
