import { useState } from 'react';
import { MapPin, Calendar, Briefcase, ExternalLink, ChevronDown } from 'lucide-react';

const experiences = [
  {
    role: 'Flutter Developer',
    company: 'CESAM CENTRALE',
    type: 'Internship',
    period: 'Jul 2025 – Aug 2025',
    duration: '2 months',
    location: 'Remote',
    color: 'from-pink-500 to-purple-500',
    glowColor: 'rgba(236,72,153,0.15)',
    icon: '📱',
    description:
      'Developed a mobile application within the Confederation of African Foreign Students and Trainees in Morocco (CESAM), dedicated to national and international students in Morocco. The app centralizes all information useful to their academic, professional, social, and personal journey.',
    highlights: [
      'Scholarship code management system for student grants',
      'Internship and job offer broadcasting platform',
      'Student news and events feed',
      'Communication bridge between students and administration',
    ],
    skills: ['Flutter', 'Laravel', 'Dart', 'REST API', 'Mobile Development'],
  },
];

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="min-h-screen bg-black relative overflow-hidden py-24">
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-pink-900/8 to-black pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/6 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/6 blur-[160px] rounded-full pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <p
            className="text-pink-500 tracking-[0.4em] text-xs uppercase mb-4 font-medium"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Career
          </p>
          <h2
            className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            My{' '}
            <span
              className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Experience
            </span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6" />
          <p
            className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Hands-on experience building real-world products — turning ideas into shipped software.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-pink-500/60 via-purple-500/30 to-transparent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative md:pl-24">

                {/* Timeline dot */}
                <div className="absolute left-[26px] top-10 hidden md:flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 z-10 shadow-[0_0_16px_rgba(236,72,153,0.6)]" />
                  <div className="absolute w-9 h-9 rounded-full border border-pink-500/30 animate-ping" style={{ animationDuration: '2.5s' }} />
                </div>

                {/* Card */}
                <div
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500"
                  style={{
                    boxShadow: hovered === index
                      ? `0 0 60px ${exp.glowColor}, 0 0 120px rgba(139,92,246,0.08)`
                      : '0 4px 30px rgba(0,0,0,0.4)',
                    transform: hovered === index ? 'translateY(-3px)' : 'translateY(0)',
                  }}
                >
                  {/* Top gradient border */}
                  <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${exp.color}`} />

                  {/* Left accent */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b ${exp.color} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="p-8 md:p-10">

                    {/* Top row */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">

                      {/* Icon */}
                      <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${exp.color} p-[1px]`}>
                        <div className="w-full h-full rounded-[13px] bg-black/70 flex items-center justify-center text-2xl">
                          {exp.icon}
                        </div>
                      </div>

                      {/* Title block */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3
                              className="text-white text-xl font-bold mb-1"
                              style={{ fontFamily: 'Syne, sans-serif' }}
                            >
                              {exp.role}
                            </h3>
                            <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
                              <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{exp.company}</span>
                            </div>
                          </div>

                          {/* Badge */}
                          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10`}>
                            <span
                              className="text-pink-400 text-xs uppercase tracking-widest font-medium"
                              style={{ fontFamily: 'Syne, sans-serif' }}
                            >
                              {exp.type}
                            </span>
                          </div>
                        </div>

                        {/* Meta info */}
                        <div className="flex flex-wrap gap-4 mt-3">
                          <div className="flex items-center gap-1.5 text-white/30 text-xs">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.period}</span>
                            <span className="text-white/15">·</span>
                            <span className="text-white/20">{exp.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-white/30 text-xs">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className="text-white/50 text-sm leading-relaxed mb-6"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {exp.description}
                    </p>

                    {/* Expandable highlights */}
                    <button
                      onClick={() => setExpanded(expanded === index ? null : index)}
                      className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors duration-200 mb-4"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      <ChevronDown
                        className="w-4 h-4 transition-transform duration-300"
                        style={{ transform: expanded === index ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                      {expanded === index ? 'Hide details' : 'Key contributions'}
                    </button>

                    {expanded === index && (
                      <ul className="mb-6 space-y-2 pl-1">
                        {exp.highlights.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
                            <span style={{ fontFamily: 'Syne, sans-serif' }}>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors duration-200"
                          style={{ fontFamily: 'Syne, sans-serif' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 relative rounded-2xl overflow-hidden p-[1px]">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-40" />
          <div className="relative bg-black/80 rounded-2xl p-8 backdrop-blur-md text-center">
            <p
              className="text-white/30 text-xs uppercase tracking-[0.3em] mb-2"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Open to opportunities
            </p>
            <h3
              className="text-white text-xl font-bold mb-2"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              More experiences being written
            </h3>
            <p
              className="text-white/40 text-sm max-w-md mx-auto"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Always looking for new challenges to grow as a developer and contribute to meaningful projects.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
