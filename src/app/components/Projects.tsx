import { useState } from 'react';
import { ExternalLink, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Hospital Information System (HIS) - Odoo ERP',
    description: `A fully integrated Hospital Information System built with Odoo ERP, designed using the TOGAF ADM framework. Manages patient data, appointments, medical consultations, and invoicing with strict access control.`,
    image: 'https://images.unsplash.com/photo-1687524690542-2659f268cde8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MTA0MDI5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Odoo 17'],
    color: 'from-pink-500 to-purple-500',
    liveUrl: '#',
    githubUrl: 'https://github.com/Fanomezana401/odoo-hospital',
    linkedinUrl: 'https://www.linkedin.com/posts/fanomezana-razafindrakoto-6ba59a307_odoo-erp-healthcareit-ugcPost-7413273620082470913-ac77',
  },
  {
    title: 'Academic Project Management',
    description: 'Agile-based platform for academic project management, featuring task and subtask tracking, Kanban boards, and internal messaging. Professors can monitor and evaluate student performance in real time.',
    image: 'https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3QlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzcxMDExNTYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Spring Boot', 'React Js', 'PostgreSQL', 'Docker'],
    color: 'from-purple-500 to-cyan-500',
    liveUrl: '#',
    githubUrl: 'https://github.com/Fanomezana401/Gestion-Projet-Etudiants',
  },
  {
    title: 'Smart City: IoT Intelligent Waste Management',
    description: 'A Smart City initiative leveraging IoT to optimize urban waste collection. Remote monitoring and automation through connected sensors for more efficient city operations.',
    image: 'https://images.unsplash.com/photo-1707836868495-3307d371aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzcxMDQwNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Arduino Uno', 'Esp32', 'Arduino IDE', 'Blink Dashboard'],
    color: 'from-cyan-500 to-pink-500',
    liveUrl: '#',
    githubUrl: 'https://github.com/Fanomezana401/SmartBin',
    linkedinUrl: 'https://www.linkedin.com/posts/fanomezana-razafindrakoto-6ba59a307_ravie-de-vous-partager-mon-dernier-projet-ugcPost-7412805308227567616-GPyw',
  },
];

export function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="min-h-screen bg-black relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/10 to-black pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-pink-500 tracking-[0.4em] text-xs uppercase mb-4 font-medium">What I've built</p>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">
              Projects
            </span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6" />
          <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            A selection of projects showcasing my range across full-stack development, IoT, and enterprise systems.
          </p>
        </div>

        {/* Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-500"
              style={{
                boxShadow:
                  hovered === index
                    ? `0 0 60px rgba(236,72,153,0.15), 0 0 120px rgba(168,85,247,0.08)`
                    : "0 4px 30px rgba(0,0,0,0.4)",
                transform: hovered === index ? "translateY(-6px)" : "translateY(0)",
              }}
            >
              {/* Gradient top border */}
              <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${project.color} opacity-60`} />

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Arrow icon on hover */}
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                >
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-xs px-3 py-1 rounded-full border bg-gradient-to-r ${project.color} bg-clip-text text-transparent border-white/10 font-medium`}
                      style={{ WebkitBackgroundClip: "text" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-white font-semibold text-base leading-snug mb-3 tracking-wide">
                  {project.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/50 hover:text-white text-xs uppercase tracking-widest transition-colors duration-200 font-medium"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  <span className="text-white/10">|</span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-transparent bg-clip-text bg-gradient-to-r ${project.color} transition-opacity hover:opacity-70`}
                  >
                    <ExternalLink className="w-4 h-4 text-pink-500" />
                    Live Demo
                  </a>
                  {project.linkedinUrl && (
                    <>
                      <span className="text-white/10">|</span>
                      <a
                        href={project.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/50 hover:text-blue-400 text-xs uppercase tracking-widest transition-colors duration-200 font-medium"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}