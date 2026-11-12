import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';
import { FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { Bio } from '../../data/constants';
import { GlowCard, Reveal, Section, SectionHeader, spawnRipple } from '../ui';

const Layout = styled.div`
  margin-top: 48px;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 26px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const Aside = styled.div`
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  h3 { font-size: 28px; line-height: 1.2; color: ${({ theme }) => theme.text_primary}; }
  p { margin-top: 14px; font-size: 16px; line-height: 1.7; color: ${({ theme }) => theme.text_secondary}; }
`;

const Links = styled.div`
  margin-top: auto;
  padding-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 13px 16px;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    color: ${({ theme }) => theme.text_primary};
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid ${({ theme }) => theme.border};
    transition: transform 0.25s, border-color 0.25s;
    svg { color: ${({ theme }) => theme.accent}; font-size: 18px; }
    &:hover { transform: translateX(6px); border-color: ${({ theme }) => theme.accent}; }
  }
`;

const Form = styled.form`
  padding: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  @media (max-width: 600px) { grid-template-columns: 1fr; padding: 22px; }
`;

const fieldStyles = `
  width: 100%;
  padding: 15px 16px;
  border-radius: 14px;
  font-size: 15.5px;
  outline: none;
  color: #eef0f6;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
  &::placeholder { color: #6f7690; }
  &:focus {
    border-color: #8b6cff;
    background: rgba(139, 108, 255, 0.07);
    box-shadow: 0 0 0 4px rgba(139, 108, 255, 0.18);
  }
`;

const Input = styled.input`${fieldStyles}`;
const Area = styled.textarea`
  ${fieldStyles}
  grid-column: 1 / -1;
  resize: vertical;
  min-height: 140px;
`;
const Wide = styled(Input)`grid-column: 1 / -1;`;

const Send = styled.button`
  grid-column: 1 / -1;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: #07080f;
  background: ${({ theme }) => theme.gradient};
  box-shadow: 0 14px 36px -14px rgba(139, 108, 255, 0.9);
  transition: transform 0.25s, opacity 0.25s;
  &:hover { transform: translateY(-2px); }
  &:disabled { opacity: 0.6; cursor: progress; }
`;

const Contact = () => {
  const [notice, setNotice] = useState('');
  const [sending, setSending] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs.sendForm('service_fmqvdfe', 'template_hn5sf1g', form.current, 'xjY11t7ttIIPDoCmo')
      .then(() => {
        setNotice('Message sent. Thank you!');
        form.current.reset();
      }, (error) => {
        console.log(error.text);
        setNotice('Could not send the message. Please try again.');
      })
      .finally(() => setSending(false));
  };

  return (
    <Section id="contact">
      <SectionHeader eyebrow="Contact" title="Let's build" accent="something">
        Feel free to reach out to me for any questions or opportunities.
      </SectionHeader>
      <Layout>
        <Reveal style={{ height: '100%' }}>
          <GlowCard style={{ height: '100%' }}>
            <Aside>
              <h3>Have a project in mind?</h3>
              <p>Send me a message with a few details and I will get back to you. You can also find me here:</p>
              <Links>
                <a href={Bio.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
                <a href={Bio.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
              </Links>
            </Aside>
          </GlowCard>
        </Reveal>
        <Reveal delay={0.1}>
          <GlowCard>
            <Form ref={form} onSubmit={handleSubmit}>
              <Input placeholder="Your Name" name="from_name" required />
              <Input placeholder="Your Email" name="from_email" type="email" required />
              <Wide placeholder="Subject" name="subject" />
              <Area placeholder="Message" name="message" rows="5" required />
              <Send type="submit" disabled={sending} onPointerDown={spawnRipple}>
                {sending ? 'Sending...' : 'Send Message'} <FiSend />
              </Send>
            </Form>
          </GlowCard>
        </Reveal>
      </Layout>
      <Snackbar open={!!notice} autoHideDuration={6000} onClose={() => setNotice('')} message={notice} />
    </Section>
  );
};

export default Contact;
