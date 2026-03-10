import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { LayoutGroup } from "motion/react";
import photo from '@/assets/photo.png';
import photo2 from '@/assets/photo2.png';

const ORBIT_RADIUS = 240;

const icons: Record<string, JSX.Element> = {
  'About Me': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  'Contact': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  'Skills': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
  'Certifications': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  'Experiences': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  ),
  'Projects': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
    </svg>
  ),
};

function FloatingParticle({ delay, size, color }: { delay: number; size: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, background: color, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, filter: 'blur(1px)' }}
      animate={{ y: [0, -30, 0], x: [0, 15, -10, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => { if ((e.target as HTMLElement).closest('[data-hoverable]')) setHovered(true); };
    const out = () => setHovered(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); window.removeEventListener('mouseout', out); };
  }, []);
  return (
    <>
      <motion.div className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference" style={{ width: 12, height: 12, background: 'white', marginLeft: -6, marginTop: -6 }} animate={{ x: pos.x, y: pos.y, scale: hovered ? 2 : 1 }} transition={{ type: 'spring', stiffness: 800, damping: 30 }} />
      <motion.div className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-pink-400/60" style={{ width: 40, height: 40, marginLeft: -20, marginTop: -20 }} animate={{ x: pos.x, y: pos.y, scale: hovered ? 1.5 : 1, opacity: hovered ? 0.8 : 0.4 }} transition={{ type: 'spring', stiffness: 200, damping: 25 }} />
    </>
  );
}

function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span key={i} style={{ display: 'inline-block' }} initial={{ y: 80, opacity: 0, rotateX: -90 }} animate={{ y: 0, opacity: 1, rotateX: 0 }} transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 w-full" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(236,72,153,0.06) 0%, transparent 70%)' }}
      />
      <div className="relative max-w-6xl mx-auto px-8 py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-12">
          {/* Brand */}
          <div>
            <p
              className="text-3xl font-black tracking-tight"
              style={{
                fontFamily: 'Playfair Display, serif',
                background: 'linear-gradient(90deg, #fff 0%, #f9a8d4 50%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Michelle
            </p>
            <p
              className="text-white/30 text-xs tracking-[0.3em] uppercase mt-1"
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}
            >
              Portfolio · 2025
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6">
            {[
              { label: 'About', path: '/about' },
              { label: 'Skills', path: '/skills' },
              { label: 'Experiences', path: '/experiences' },
              { label: 'Projects', path: '/projects' },
              { label: 'Certifications', path: '/certifications' },
              { label: 'Contact', path: '/contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.path}
                data-hoverable
                className="text-white/40 hover:text-white transition-colors duration-300 text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <motion.a
              href="https://github.com/Fanomezana401"
              data-hoverable
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/50 hover:text-white">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </motion.a>
            {/* LinkedIn */}
            <motion.a
              href="www.linkedin.com/in/fanomezana-razafindrakoto-6ba59a307"
              data-hoverable
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/50 hover:text-white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
            {/* Email */}
            <motion.a
              href="fanomsarobidy@gmail.com"
              data-hoverable
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-white/50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-white/20 text-xs tracking-widest"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            © 2025 Michelle. All rights reserved.
          </p>
          <p
            className="text-white/15 text-xs tracking-widest"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Designed &amp; built with ♥
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitSectionRef = useRef<HTMLDivElement>(null);
  const smoothScroll = useSpring(scrollY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrollProgress(Math.min(v / 1000, 1)));
    return () => unsub();
  }, [scrollY]);

  const cards = [
    { title: 'About Me',       color: 'from-rose-500 to-fuchsia-600',   glowColor: '#e879f9', angle: 0,   path: '/about' },
    { title: 'Contact',        color: 'from-fuchsia-500 to-violet-600', glowColor: '#8b5cf6', angle: 60,  path: '/contact' },
    { title: 'Skills',         color: 'from-violet-500 to-indigo-600',  glowColor: '#6366f1', angle: 120, path: '/skills' },
    { title: 'Certifications', color: 'from-emerald-500 to-teal-500',   glowColor: '#10b981', angle: 180, path: '/certifications' },
    { title: 'Experiences',    color: 'from-amber-500 to-orange-500',   glowColor: '#f59e0b', angle: 240, path: '/experiences' },
    { title: 'Projects',       color: 'from-orange-500 to-rose-500',    glowColor: '#f43f5e', angle: 300, path: '/projects' },
  ];

  const heroOpacity = useTransform(smoothScroll, [0, 350], [1, 0]);
  const heroScale   = useTransform(smoothScroll, [0, 350], [1, 0.85]);
  const photoScale  = useTransform(smoothScroll, [0, 600], [1, 0.6]);
  const photoY      = useTransform(smoothScroll, [0, 600], [0, -60]);

  const handleCardClick = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(path);
  };

  const handleWannaKnowMore = () => {
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  return (
    <LayoutGroup>
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Syne:wght@400;600;700;800&display=swap');
        * { cursor: none !important; }
        ::selection { background: rgba(236,72,153,0.35); color: white; }
        body { overflow-x: hidden; }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #f9a8d4 30%, #fff 50%, #a78bfa 70%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.6); opacity: 0; } }
        .pulse-ring { animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 33% { transform: translateY(-12px) rotate(1deg); } 66% { transform: translateY(-6px) rotate(-1deg); } }
        .floating { animation: float 6s ease-in-out infinite; }
        @keyframes grain {
          0%, 100% { transform: translate(0,0); } 10% { transform: translate(-2%,-3%); } 20% { transform: translate(3%,2%); }
          30% { transform: translate(-1%,4%); } 40% { transform: translate(4%,-1%); } 50% { transform: translate(-3%,3%); }
          60% { transform: translate(2%,-4%); } 70% { transform: translate(-4%,2%); } 80% { transform: translate(3%,1%); } 90% { transform: translate(-1%,-3%); }
        }
        .grain::after {
          content: ''; position: fixed; inset: -200%; width: 400%; height: 400%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.03; animation: grain 0.5s steps(1) infinite; pointer-events: none; z-index: 9000;
        }
        @keyframes coinSpin {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .coin-spin {
          animation: coinSpin 4s linear infinite;
          transform-style: preserve-3d;
        }
        @keyframes btnPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(236,72,153,0.4); }
          50%       { box-shadow: 0 0 0 12px rgba(236,72,153,0); }
        }
        .wanna-btn { animation: btnPulse 2.5s ease-in-out infinite; }
      `}</style>

      <CustomCursor />
      <div className="grain fixed inset-0 pointer-events-none z-50" />

      <div className="fixed inset-0 bg-[#050505] z-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(236,72,153,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(139,92,246,0.10) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />
      </div>

      <div ref={containerRef} className="min-h-[190vh] relative z-10 overflow-x-hidden">

        {/* ========== HERO ========== */}
        <div className="h-screen flex items-center justify-center sticky top-0">
          <motion.div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)', top: '-10%', left: '-10%' }} animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', bottom: '-10%', right: '-10%' }} animate={{ x: [0, -30, 0], y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />

          {[...Array(18)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.4} size={i % 3 === 0 ? 4 : i % 3 === 1 ? 3 : 2} color={i % 4 === 0 ? 'rgba(236,72,153,0.6)' : i % 4 === 1 ? 'rgba(139,92,246,0.6)' : i % 4 === 2 ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.4)'} />
          ))}

          {/* WELCOME — z-10, DERRIÈRE la photo (z-20) */}
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute z-10 text-center top-[8%] w-full px-4">
            <div style={{ fontFamily: 'Syne, sans-serif', perspective: '600px' }}>
              <div className="overflow-hidden">
                <AnimatedTitle text="WELCOME" className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-white block" />
              </div>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="mx-auto mt-3 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" style={{ width: '40%' }} />
            </div>
          </motion.div>

          {/* PHOTO — z-20, DEVANT "WELCOME" */}
          <motion.div style={{ scale: photoScale, y: photoY }} className="relative z-20">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="pulse-ring w-[120%] h-[120%] rounded-full border border-pink-500/30 absolute" />
              <div className="pulse-ring w-[140%] h-[140%] rounded-full border border-purple-500/20 absolute" style={{ animationDelay: '0.5s' }} />
            </div>
            <div className="floating relative">
              <motion.div className="absolute inset-[-12px] rounded-full" style={{ background: 'conic-gradient(from 0deg, #ec4899, #8b5cf6, #06b6d4, #ec4899)', padding: '2px' }} animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                <div className="w-full h-full rounded-full bg-[#050505]" />
              </motion.div>
              <motion.img
                layoutId="profile-photo"
                data-hoverable
                src={photo}
                alt="Profile"
                className="w-72 h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] object-cover rounded-full relative z-10"
                style={{ filter: 'drop-shadow(0 0 60px rgba(236,72,153,0.4)) drop-shadow(0 0 120px rgba(139,92,246,0.2))' }}
                transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.8 }}
              />
            </div>
          </motion.div>

          {/* "Hi, my name is Michelle" */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-30 right-[6%] top-1/2 -translate-y-1/2 text-right pointer-events-none"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            <p className="text-white/40 text-xs tracking-[0.35em] uppercase mb-2" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>
              Hi,
            </p>
            <h2 className="shimmer-text text-3xl md:text-4xl lg:text-5xl font-black italic leading-tight">
              my name is<br />Michelle
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mt-3 h-px bg-gradient-to-l from-pink-500 to-transparent ml-auto"
              style={{ width: '70%' }}
            />
          </motion.div>

         {/* "Wanna know more?" button */}
<motion.button
  data-hoverable
  onClick={handleWannaKnowMore}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }} // apparition initiale
  transition={{ delay: 2.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  whileHover={{ scale: 1.06, y: -2 }}
  whileTap={{ scale: 0.97 }}
  style={{
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(236,72,153,0.35)',
    fontFamily: 'Syne, sans-serif',
    fontWeight: 700,
    fontSize: '0.78rem',
    letterSpacing: '0.2em',
    color: 'white',
    textTransform: 'uppercase',
    opacity: heroOpacity, // ceci va réagir au scroll
  }}
  className="wanna-btn fixed bottom-10 right-10 z-[200] flex items-center gap-3 px-6 py-3.5 rounded-full"
>
  Wanna know more?
</motion.button>

          {/* Scroll indicator */}
          <motion.div style={{ opacity: heroOpacity }} className="absolute z-30 text-center bottom-[5%] w-full pointer-events-none">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }} className="text-white/40 text-sm tracking-[0.4em] uppercase" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>
              Scroll to explore
            </motion.p>
            <motion.div className="mx-auto mt-4 w-[1px] bg-gradient-to-b from-pink-500 to-transparent" initial={{ height: 0, opacity: 0 }} animate={{ height: 48, opacity: 1 }} transition={{ delay: 2, duration: 1 }} />
          </motion.div>
        </div>

        {/* ========== COIN + ORBIT ========== */}
        <div ref={orbitSectionRef} className="min-h-screen flex items-center justify-center relative">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />

          <AnimatePresence>
            {scrollProgress > 0.28 && scrollProgress < 0.42 && (
              <motion.div key="flash" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 0.6, 0], scale: [0, 6, 12] }} exit={{ opacity: 0 }} transition={{ duration: 1.4, ease: 'easeOut' }} className="absolute z-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(139,92,246,0.3) 50%, transparent 70%)' }} />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {scrollProgress > 0.38 && (
              <motion.div
                key="coin"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.5 } }}
                className="relative z-50"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="absolute inset-[-6px] rounded-full"
                  style={{ background: 'conic-gradient(from 0deg, #ec4899, #8b5cf6, #f59e0b, #ec4899)', zIndex: -1 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <div className="coin-spin w-44 h-44" style={{ transformStyle: 'preserve-3d', position: 'relative' }}>
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-pink-400 shadow-[0_0_40px_rgba(236,72,153,0.7)]"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <motion.img layoutId="profile-photo" src={photo} alt="Face 1" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent" />
                  </div>
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-violet-400 shadow-[0_0_40px_rgba(139,92,246,0.7)]"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <img src={photo2} alt="Face 2" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ORBITING CARDS — ORBIT_RADIUS = 180 (proche du coin) */}
          <AnimatePresence>
            {scrollProgress > 0.48 && (
              <div className="absolute" key="orbit">
                {cards.map((card, index) => {
                  const rotationOffset = scrollProgress * 180;
                  const currentAngle = card.angle + rotationOffset;
                  const x = Math.cos((currentAngle * Math.PI) / 180) * ORBIT_RADIUS;
                  const y = Math.sin((currentAngle * Math.PI) / 180) * ORBIT_RADIUS;

                  return (
                    <motion.div
                      key={card.title}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, x, y }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        scale:   { delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                        opacity: { delay: index * 0.08, duration: 0.4 },
                        x: { type: 'spring', stiffness: 80, damping: 20 },
                        y: { type: 'spring', stiffness: 80, damping: 20 },
                      }}
                      className="absolute"
                      style={{ left: '50%', top: '50%', marginLeft: -56, marginTop: -72 }}
                    >
                      <motion.div
                        data-hoverable
                        onClick={() => handleCardClick(card.path)}
                        whileHover={{ scale: 1.12, y: -8 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative w-28 h-36 cursor-pointer"
                      >
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-70 transition-all duration-500 -z-10"
                          style={{ background: card.glowColor, filter: 'blur(18px)', transform: 'scale(0.8) translateY(12px)' }}
                        />
                        <div
                          className="w-full h-full rounded-2xl flex flex-col items-center justify-center gap-2.5 p-4 relative overflow-hidden transition-all duration-300"
                          style={{
                            background: 'rgba(255,255,255,0.07)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            border: '1px solid rgba(255,255,255,0.14)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.2)',
                          }}
                        >
                          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.glowColor}25 0%, transparent 65%)` }} />
                          <div className={`absolute top-0 left-3 right-3 h-[1.5px] bg-gradient-to-r ${card.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300 rounded-full`} />
                          <div className="relative z-10" style={{ color: card.glowColor, filter: `drop-shadow(0 0 8px ${card.glowColor}bb)` }}>
                            {icons[card.title]}
                          </div>
                          <h3 className="relative z-10 text-white/70 group-hover:text-white text-center font-semibold text-[10px] tracking-[0.18em] uppercase leading-tight transition-colors duration-300" style={{ fontFamily: 'Syne, sans-serif' }}>
                            {card.title}
                          </h3>
                          <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0" style={{ color: card.glowColor }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Orbit ring */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.08, scale: 1 }}
                  className="absolute rounded-full border border-white/20 pointer-events-none"
                  style={{
                    width: ORBIT_RADIUS * 2 + 128,
                    height: ORBIT_RADIUS * 2 + 128,
                    left: '50%', top: '50%',
                    marginLeft: -(ORBIT_RADIUS + 64),
                    marginTop: -(ORBIT_RADIUS + 64),
                  }}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ========== FOOTER ========== */}
      <Footer />
    </>
    </LayoutGroup>
  );
}