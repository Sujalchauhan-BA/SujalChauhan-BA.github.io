import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Calendar, ExternalLink, Download } from 'lucide-react';
import { profile, experience, skills, projects } from './data';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <div className="logo">{profile.name}</div>

          <div className="desktop-nav">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>

          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={toggleMenu}>About</a>
          <a href="#experience" onClick={toggleMenu}>Experience</a>
          <a href="#skills" onClick={toggleMenu}>Skills</a>
          <a href="#projects" onClick={toggleMenu}>Projects</a>
          <a href="#contact" onClick={toggleMenu}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="hero-section">
        <div className="hero-content">
          <h2 className="hero-greeting">Hello, I'm</h2>
          <h1 className="hero-name">{profile.name}</h1>
          <h3 className="hero-title">{profile.title}</h3>
          <p className="hero-summary">{profile.summary}</p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="/Resume_Sujal_Chauhan.pdf" target="_blank" className="btn btn-outline">
              <Download size={18} />
              Download Resume
            </a>
          </div>

          <div className="hero-socials">
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer"><Github /></a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin /></a>
            <a href={`mailto:${profile.social.email}`}><Mail /></a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-container">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {experience.map((job) => (
            <div key={job.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{job.role}</h3>
                  <span className="company">{job.company}</span>
                </div>
                <div className="timeline-date">
                  <Calendar size={14} />
                  <span>{job.date}</span>
                </div>
                <p>{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-container bg-darker">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-card">
              <h3>{category}</h3>
              <div className="skill-tags">
                {items.map((skill) => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link">
                  View Project <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <h3>Let's Connect</h3>
          <p>Open for new opportunities and collaborations.</p>
          <div className="footer-socials">
             <a href={profile.social.github} target="_blank" rel="noopener noreferrer"><Github size={20} /></a>
             <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
             <a href={`mailto:${profile.social.email}`}><Mail size={20} /></a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
