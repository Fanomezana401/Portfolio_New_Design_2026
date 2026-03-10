import { useState } from 'react';
import { Award, ExternalLink, Clock, CheckCircle, Calendar, Building2 } from 'lucide-react';

const certifications = [
  {
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy',
    date: 'October 2024',
    status: 'completed',
    color: 'from-pink-500 to-purple-500',
    icon: '🐍',
    description: 'Foundational Python programming covering syntax, data structures, functions, and object-oriented concepts.',
    skills: ['Python', 'OOP', 'Data Structures', 'Algorithms'],
    credentialUrl: '#',
  },
  {
    title: 'Associate AI Engineer for Data Scientists',
    issuer: 'DataCamp',
    date: 'In Progress',
    status: 'ongoing',
    color: 'from-purple-500 to-cyan-500',
    icon: '🤖',
    description: 'Advanced certification covering machine learning pipelines, model deployment, and AI engineering best practices for data scientists.',
    skills: ['Machine Learning', 'AI Engineering', 'Model Deployment', 'Python', 'Data Science'],
    credentialUrl: null,
    progress: 60,
  },
];

export function Certifications() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="min-h-screen bg-black relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/10 to-black pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-pink-500/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/6 blur-[140px] rounded-full pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-pink-500 tracking-[0.4em] text-xs uppercase mb-4 font-medium">Credentials</p>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">
              Certifications
            </span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6" />
          <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
            Continuous learning through recognized programs — building expertise one certification at a time.
          </p>
        </div>

        {/* Certification Cards */}
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500"
              style={{
                boxShadow:
                  hovered === index
                    ? '0 0 60px rgba(236,72,153,0.1), 0 0 120px rgba(168,85,247,0.06)'
                    : '0 4px 30px rgba(0,0,0,0.4)',
                transform: hovered === index ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              {/* Top gradient border */}
              <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${cert.color}`} />

              {/* Left accent bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b ${cert.color} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start gap-6">

                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.color} p-[1px]`}>
                    <div className="w-full h-full rounded-[14px] bg-black/70 flex items-center justify-center text-2xl">
                      {cert.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-white text-xl font-bold tracking-wide mb-1">{cert.title}</h3>
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{cert.issuer}</span>
                        </div>
                      </div>

                      {/* Status badge */}
                      {cert.status === 'completed' ? (
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10">
                          <CheckCircle className="w-3.5 h-3.5 text-pink-400" />
                          <span className="text-pink-400 text-xs uppercase tracking-widest font-medium">Completed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10">
                          <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                          <span className="text-cyan-400 text-xs uppercase tracking-widest font-medium">In Progress</span>
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-white/30 text-xs mb-4">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{cert.date}</span>
                    </div>

                    <p className="text-white/50 text-sm leading-relaxed mb-5">{cert.description}</p>

                    {/* Progress bar (ongoing only) */}
                    {cert.status === 'ongoing' && cert.progress && (
                      <div className="mb-5">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white/30 text-xs uppercase tracking-widest">Progress</span>
                          <span className={`text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r ${cert.color}`}>
                            {cert.progress}%
                          </span>
                        </div>
                        <div className="relative h-[3px] bg-white/10 rounded-full overflow-visible">
                          <div
                            className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${cert.color} transition-all duration-1000 ease-out`}
                            style={{ width: `${cert.progress}%` }}
                          />
                          <div
                            className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r ${cert.color}`}
                            style={{
                              left: `calc(${cert.progress}% - 6px)`,
                              boxShadow: '0 0 10px 3px rgba(139,92,246,0.5)',
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {cert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Credential link */}
                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-transparent bg-clip-text bg-gradient-to-r ${cert.color} hover:opacity-70 transition-opacity`}
                      >
                        <Award className="w-4 h-4 text-pink-500" />
                        View Credential
                        <ExternalLink className="w-3 h-3 text-pink-500" />
                      </a>
                    ) : (
                      <p className="inline-flex items-center gap-2 text-xs text-white/20 uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5" />
                        Credential available upon completion
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 relative rounded-2xl overflow-hidden p-[1px]">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-40" />
          <div className="relative bg-black/80 rounded-2xl p-8 backdrop-blur-md text-center">
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-2">Always growing</p>
            <h3 className="text-white text-xl font-bold mb-2">More certifications on the way</h3>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              Committed to staying sharp and up-to-date with the latest technologies and industry standards.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
