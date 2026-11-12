import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiMenu, FiX, FiGithub } from 'react-icons/fi';
import { Bio } from '../../data/constants';
import { spawnRipple } from '../ui';

const links = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Education', '#education'],
  ['Contact', '#contact'],
];

const Bar = styled.header`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: min(1100px, calc(100% - 24px));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 12px 10px 22px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ $solid }) => ($solid ? 'rgba(8, 9, 16, 0.94)' : 'rgba(12, 13, 24, 0.6)')};
  box-shadow: ${({ $solid }) => ($solid ? '0 18px 50px -24px rgba(0,0,0,0.9)' : 'none')};
  transition: background 0.3s, box-shadow 0.3s;
`;

const Logo = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 21px;
  font-weight: 700;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  span {
    font-family: inherit;
    background: ${({ theme }) => theme.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const Links = styled.nav`
  display: flex;
  gap: 4px;
  @media (max-width: 900px) { display: none; }
`;

const NavLink = styled.a`
  padding: 9px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme, $active }) => ($active ? theme.text_primary : theme.text_secondary)};
  background: ${({ $active }) => ($active ? 'rgba(139, 108, 255, 0.18)' : 'transparent')};
  transition: color 0.2s, background 0.2s;
  &:hover { color: ${({ theme }) => theme.text_primary}; background: rgba(255, 255, 255, 0.06); }
`;

const Cta = styled.a`
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  color: #07080f;
  background: ${({ theme }) => theme.gradient};
  @media (max-width: 900px) { display: none; }
`;

const Burger = styled.button`
  display: none;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text_primary};
  font-size: 20px;
  cursor: pointer;
  @media (max-width: 900px) { display: grid; place-items: center; }
`;

const Sheet = styled.div`
  position: fixed;
  top: 84px;
  left: 12px;
  right: 12px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px;
  border-radius: 22px;
  border: 1px solid ${({ theme }) => theme.border};
  background: rgba(8, 9, 16, 0.97);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? '0' : '-12px')});
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.25s, transform 0.25s;
  a { padding: 13px 14px; font-size: 16px; }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState('#about');

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 30);
      let current = '#about';
      links.forEach(([, href]) => {
        const el = document.querySelector(href);
        if (el && el.getBoundingClientRect().top <= 140) current = href;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [first, ...rest] = Bio.name.split(' ');
  return (
    <>
      <Bar $solid={solid || open}>
        <Logo href="#about">{first} <span>{rest.join(' ')}</span></Logo>
        <Links>
          {links.map(([label, href]) => (
            <NavLink key={href} href={href} $active={active === href}>{label}</NavLink>
          ))}
        </Links>
        <Cta href={Bio.github} target="_blank" rel="noreferrer" onPointerDown={spawnRipple}><FiGithub /> GitHub</Cta>
        <Burger aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</Burger>
      </Bar>
      <Sheet $open={open}>
        {links.map(([label, href]) => (
          <NavLink key={href} href={href} $active={active === href} onClick={() => setOpen(false)}>{label}</NavLink>
        ))}
        <NavLink href={Bio.github} target="_blank" rel="noreferrer">GitHub Profile</NavLink>
      </Sheet>
    </>
  );
};

export default Navbar;
