import { useRef, useEffect, useState } from 'react';
import { Code2, Palette, Rocket, Users } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable, and efficient code is my priority.',
    color: 'from-pink-500 to-purple-500',
  },
  {
    icon: Palette,
    title: 'Design Focused',
    description: 'Creating beautiful interfaces with attention to detail and user experience.',
    color: 'from-purple-500 to-blue-500',
  },
  
  {
    icon: Users,
    title: 'Team Player',
    description: 'Collaborative approach with excellent communication skills.',
    color: 'from-cyan-500 to-pink-500',
  },
];

function useVisible(ref: React.RefObject<HTMLElement>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return visible;
}

export function About() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const featuresVisible = useVisible(featuresRef as React.RefObject<HTMLElement>);
  const storyVisible = useVisible(storyRef as React.RefObject<HTMLElement>);

  return (
    <section className="min-h-screen bg-black relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-pink-900/10 to-black pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/5 w-[300px] h-[300px] bg-pink-500/8 blur-[100px] rounded-full pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-pink-500 tracking-[0.4em] text-xs uppercase mb-4 font-medium">Who I am</p>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">
              Me
            </span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6" />
          <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
           Fourth-year student at ENSAM Meknes, passionate about turning complex problems into beautiful, intuitive experiences.
          </p>
        </div>

        {/* Feature Cards */}
        <div
          ref={featuresRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 transition-all duration-500 hover:-translate-y-2"
                style={{
                  opacity: featuresVisible ? 1 : 0,
                  transform: featuresVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
                  boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
                }}
              >
                {/* Top gradient border on hover */}
                <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 p-[1px]`}
                >
                  <div className="w-full h-full rounded-[10px] bg-black/60 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-white font-semibold text-base mb-2 tracking-wide">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* My Journey */}
        <div
          ref={storyRef}
          className="relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
          style={{
            opacity: storyVisible ? 1 : 0,
            transform: storyVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5 pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-0">
            {/* Text Side */}
            <div className="relative p-10 md:p-12 border-b md:border-b-0 md:border-r border-white/5">
              {/* Vertical accent line */}
              <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-pink-500 via-purple-500 to-transparent rounded-full" />

              <p className="text-pink-500 tracking-[0.3em] text-xs uppercase mb-4 font-medium">My Journey</p>
              <h3 className="text-white text-2xl font-bold mb-6 tracking-wide">From Curiosity to Craft</h3>

              <div className="space-y-4 text-white/50 text-sm leading-relaxed">
                <p>
                  I started my journey in web development back in 2022, and I haven't looked back since.
                  What began as a curiosity quickly turned into a passion for creating digital experiences
                  that make a difference.
                </p>
                
                <p>
                  When I'm not coding, you'll find me exploring new technologies 
                </p>
              </div>

              {/* Stats row */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: "1", label: "Intership" },
                  { value: "5+", label: "Projects" },
                  { value: "2", label: "Certification" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">
                      {stat.value}
                    </p>
                    <p className="text-white/30 text-xs uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="relative min-h-[300px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1760536928911-40831dacdbc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc3MTAyMTQzNHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Workspace"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/30 to-pink-900/20" />

              {/* Floating badge */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-md p-4">
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Currently exploring</p>
                  <div className="flex gap-2 flex-wrap">
                    {["Deep Learning", "React JS", "Spring Boot"].map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full border border-pink-500/30 text-pink-400 bg-pink-500/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}