import { useState, useEffect, useRef } from "react";

const skillsData = {
  frontend: [
    { name: "React.js", level: 95 },
    { name: "Tailwind CSS", level: 92 },
    { name: "HTML & CSS", level: 95 },
    { name: "JavaScript", level: 93 },
  ],
  backend: [
    { name: "Spring Boot", level: 92 },
    { name: "Laravel", level: 92 },
    { name: "Python", level: 92 },
    { name: "PostgreSQL", level: 82 },
    { name: "MongoDB", level: 85 },
    { name: "REST APIs", level: 92 },
  ],
  tools: [
    { name: "Git & GitHub", level: 93 },
    { name: "Docker", level: 78 },
    { name: "VS Code", level: 95 },
    { name: "Postman", level: 92 },
  ],
};

const tabGradients: Record<string, string> = {
  frontend: "from-pink-500 to-purple-500",
  backend: "from-purple-500 to-cyan-500",
  tools: "from-cyan-500 to-pink-500",
};

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
}

function SkillBar({ name, level, color }: SkillBarProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-8 group">
      <div className="flex justify-between mb-3 items-baseline">
        <span className="text-white font-medium tracking-wide text-sm uppercase">{name}</span>
        <span
          className={`text-transparent bg-clip-text bg-gradient-to-r ${color} font-bold text-lg tabular-nums`}
        >
          {animated ? level : 0}%
        </span>
      </div>
      {/* Track */}
      <div className="relative h-[3px] bg-white/10 rounded-full overflow-visible">
        {/* Glow line */}
        <div
          className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: animated ? `${level}%` : "0%" }}
        />
        {/* Dot at tip */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r ${color} shadow-lg transition-all duration-1000 ease-out`}
          style={{
            left: animated ? `calc(${level}% - 6px)` : "0%",
            boxShadow: animated ? "0 0 12px 4px rgba(236,72,153,0.5)" : "none",
          }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const [active, setActive] = useState<"frontend" | "backend" | "tools">("frontend");
  const skills = skillsData[active];
  const grad = tabGradients[active];

  return (
    <section className="min-h-screen bg-black relative overflow-hidden py-24">
      {/* Background glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-pink-900/10 to-black pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-pink-500 tracking-[0.4em] text-xs uppercase mb-4 font-medium">What I know</p>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Skills &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">
              Expertise
            </span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 mx-auto" />
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {(["frontend", "backend", "tools"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`relative px-6 py-3 text-sm uppercase tracking-widest font-medium rounded-full transition-all duration-300 ${
                active === tab
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {active === tab && (
                <span
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${tabGradients[tab]} opacity-20 border border-white/20`}
                />
              )}
              {active === tab && (
                <span
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${tabGradients[tab]} opacity-10 blur-md`}
                />
              )}
              <span className="relative">
                {tab === "tools" ? "Tools & Others" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Panel */}
        <div
          key={active}
          className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-10"
          style={{
            boxShadow: "0 0 60px rgba(236,72,153,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Corner accent */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${grad} opacity-5 rounded-bl-full`} />

          <div
            style={{
              animation: "fadeSlideIn 0.4s ease forwards",
            }}
          >
            {skills.map((skill, i) => (
              <SkillBar key={`${active}-${skill.name}`} name={skill.name} level={skill.level} color={grad} />
            ))}
          </div>
        </div>

        {/* Continuous Learning */}
        <div className="mt-12 relative rounded-2xl overflow-hidden p-[1px]">
          <div className={`absolute inset-0 bg-gradient-to-r ${grad} opacity-60`} />
          <div className="relative bg-black/80 rounded-2xl p-8 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${grad} flex-shrink-0 mt-1 flex items-center justify-center`}>
                <span className="text-white text-lg">⚡</span>
              </div>
              <div>
                <h3 className="text-white text-xl font-semibold mb-2 tracking-wide">Continuous Learning</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  Constantly expanding my stack — currently exploring{" "}
                  <span className="text-pink-400">WebAssembly</span>,{" "}
                  <span className="text-purple-400">GraphQL</span>, and{" "}
                  <span className="text-cyan-400">Advanced TypeScript patterns</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}