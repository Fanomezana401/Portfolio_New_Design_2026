import { Heart, Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-xl mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                John Doe
              </h3>
              <p className="text-gray-400">
                Full Stack Developer passionate about creating beautiful and functional web experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#skills" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-xl mb-4">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Fanomezana401"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/fanomezana-razafindrakoto-6ba59a307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/fanomezana.sarobidy.710"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-gray-400 flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> by John Doe © {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
