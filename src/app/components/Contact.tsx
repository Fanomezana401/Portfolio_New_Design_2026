import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'fanomsarobidy@gmail.com',
    link: 'mailto:fanomsarobidy@gmail.com',
    color: 'from-pink-500 to-purple-500',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+212 657 240 168',
    link: 'tel:+212657240168',
    color: 'from-purple-500 to-cyan-500',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Meknès, Morocco',
    link: null,
    color: 'from-cyan-500 to-pink-500',
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const result = await emailjs.send(
      'service_5g7i6e2',    // → EmailJS Service ID
      'template_0c77a8s',   // → EmailJS Template ID
      formData,            // { name, email, subject, message }
      'E8TzG9HR-q7vVyyc1'      // → EmailJS Public Key
    );

    console.log(result.text);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  } catch (error) {
    console.error(error);
    alert('Oops! Something went wrong.');
  }

  setIsSubmitting(false);
  setTimeout(() => setSubmitted(false), 4000);
};

  const inputClass = (name: string) =>
    `w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all duration-300 ${
      focused === name
        ? 'border-pink-500/60 shadow-[0_0_20px_rgba(236,72,153,0.15)]'
        : 'border-white/10 hover:border-white/20'
    }`;

  return (
    <section className="min-h-screen bg-black relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/10 to-black pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-pink-500/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-600/8 blur-[140px] rounded-full pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-pink-500 tracking-[0.4em] text-xs uppercase mb-4 font-medium">Let's talk</p>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Get In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">
              Touch
            </span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6" />
          <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
            Have a project in mind or want to collaborate? Feel free to reach out — I'd love to hear from you.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            const inner = (
              <div
                key={index}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 text-center transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.4)' }}
              >
                {/* Top border on hover */}
                <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} p-[1px] mx-auto mb-4`}>
                  <div className="w-full h-full rounded-[10px] bg-black/70 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{info.title}</p>
                <p className={`text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r ${info.color}`}>
                  {info.value}
                </p>
              </div>
            );

            return info.link ? (
              <a key={index} href={info.link} className="block">
                {inner}
              </a>
            ) : (
              <div key={index}>{inner}</div>
            );
          })}
        </div>

        {/* Form */}
        <div
          className="relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-12 overflow-hidden"
          style={{ boxShadow: '0 0 80px rgba(236,72,153,0.04), inset 0 1px 0 rgba(255,255,255,0.04)' }}
        >
          {/* Corner glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Success message */}
          {submitted && (
            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/80 backdrop-blur-md">
              <div className="text-center">
                <CheckCircle className="w-14 h-14 text-pink-500 mx-auto mb-4" />
                <p className="text-white text-xl font-semibold mb-1">Message Sent!</p>
                <p className="text-white/40 text-sm">I'll get back to you soon.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Name</label>
                <input
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  required
                  className={inputClass('name')}
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  required
                  className={inputClass('email')}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Subject</label>
              <input
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocused('subject')}
                onBlur={() => setFocused(null)}
                required
                className={inputClass('subject')}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Message</label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                required
                className={`${inputClass('message')} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full py-4 rounded-xl font-semibold text-sm uppercase tracking-widest text-white overflow-hidden group disabled:opacity-60 transition-opacity"
            >
              {/* Gradient background */}
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 transition-opacity duration-300" />
              {/* Hover shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Glow */}
              <span className="absolute inset-0 blur-xl bg-gradient-to-r from-pink-500/40 to-purple-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}