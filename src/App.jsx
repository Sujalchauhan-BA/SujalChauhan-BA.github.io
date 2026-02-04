import { useState } from 'react';
import './App.css';
import GeminiChat from './components/GeminiChat';
import MarketRatesWidget from './components/MarketRatesWidget';
import WeatherWidget from './components/WeatherWidget';
import { resumeData } from './resumeData';

function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  const togglePrivacy = () => {
    setShowPrivacy(!showPrivacy);
  };

  const closePrivacy = (e) => {
    if (e.target.className === 'privacy-modal') {
      setShowPrivacy(false);
    }
  };

  return (
    <div>
      <nav id="navbar">
        <div className="container nav-container">
          <a href="#" className="logo">SC<span>.</span></a>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#skills">Competencies</a></li>
            <li><a href="#projects">Work</a></li>
            <li><a href="#experience">Timeline</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="Resume_Sujal_Chauhan.pdf" className="btn-nav" style={{ border: '1px solid var(--accent)', padding: '8px 20px', borderRadius: '4px', color: 'var(--accent)' }}>Resume</a></li>
          </ul>
        </div>
      </nav>

      <section className="hero-section">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>

        <div className="container hero-grid">
          <div className="hero-content fade-in">
            <div className="status-badge">
              <div className="status-dot"></div>
              Available for Contract & Freelance
            </div>
            <h1>Strategic Insight.<br /><span className="highlight">Technical Execution.</span></h1>
            <p className="hero-desc">
              Senior Business Analyst & Consultant with 15+ years of experience bridging the gap between business goals and IT delivery. Specializing in Cloud Migration, Digital Transformation, and Process Automation.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">View Case Studies</a>
              <a href="Resume_Sujal_Chauhan.pdf" download className="btn btn-secondary"><i className="fas fa-download" style={{ marginRight: '10px' }}></i> Download CV</a>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <strong>15+</strong>
                <span>Years Exp.</span>
              </div>
              <div className="stat">
                <strong>$50M+</strong>
                <span>Portfolio Value</span>
              </div>
              <div className="stat">
                <strong>10+</strong>
                <span>Global Markets</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="image-wrapper">
              <img
                src="Sujal-Profile.jpg"
                alt="Sujal Chauhan"
                className="profile-img"
                onError={(e) => {e.target.src='https://via.placeholder.com/450x500/162032/ffffff?text=Sujal+Chauhan'}}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-padding bg-secondary">
        <div className="container">
          <div className="text-center">
            <span className="eyebrow">How I Can Help</span>
            <h2>Consulting Services</h2>
            <div style={{ width: '50px', height: '3px', background: 'var(--accent)', margin: '20px auto' }}></div>
            <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto' }}>
              Flexible engagement models tailored to your needs. Available for Remote, Hybrid (GTA), and Contract opportunities.
            </p>
          </div>

          <div className="service-grid">
            <div className="service-card">
              <i className="fas fa-network-wired"></i>
              <h4>Digital Transformation</h4>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                Leading end-to-end legacy modernization, from on-premise infrastructure to Cloud (Azure) migration.
              </p>
            </div>
            <div className="service-card">
              <i className="fas fa-sync-alt"></i>
              <h4>Process Automation</h4>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                Eliminating manual bottlenecks using Low-Code/No-Code solutions (Logic Apps) and Generative AI tools.
              </p>
            </div>
            <div className="service-card">
              <i className="fas fa-chart-pie"></i>
              <h4>Data Intelligence</h4>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                Designing Power BI dashboards and KPI frameworks to turn raw data into executive-level insights.
              </p>
            </div>
          </div>

          <div className="industry-tags">
            <span className="tag">Banking & Fintech</span>
            <span className="tag">Telecommunications</span>
            <span className="tag">Supply Chain & ITAD</span>
            <span className="tag">Service Industry</span>
            <span className="tag">Cloud Infrastructure</span>
            <span className="tag">Data Analytics</span>
            <span className="tag">E-Commerce</span>
          </div>
        </div>
      </section>

      <section id="skills" className="section-padding">
        <div className="container">
          <div className="text-center">
            <span className="eyebrow">Expertise</span>
            <h2>Core Competencies</h2>
            <div style={{ width: '50px', height: '3px', background: 'var(--accent)', margin: '20px auto 60px' }}></div>
          </div>

          <div className="skills-grid">
            <div className="skill-box">
              <h3><i className="fas fa-chess-knight"></i> Strategic Analysis</h3>
              <ul>
                <li>Requirement Elicitation (SDLC)</li>
                <li>Gap Analysis & Feasibility Studies</li>
                <li>Business Case Development</li>
                <li>ROI & Cost-Benefit Analysis</li>
                <li>Product Roadmapping</li>
              </ul>
            </div>
            <div className="skill-box">
              <h3><i className="fas fa-cogs"></i> Process Engineering</h3>
              <ul>
                <li>BPMN Modeling (Visio/Lucid)</li>
                <li>Workflow Automation (Logic Apps)</li>
                <li>AS-IS / TO-BE Process Mapping</li>
                <li>Value Stream Mapping</li>
                <li>Generative AI Implementation</li>
              </ul>
            </div>
            <div className="skill-box">
              <h3><i className="fas fa-code"></i> Technical Skills</h3>
              <ul>
                <li>Azure Fundamentals (AZ-900)</li>
                <li>SQL Data Querying & Manipulation</li>
                <li>API Integration (REST/SOAP)</li>
                <li>System Architecture Concepts</li>
                <li>Data Modeling</li>
              </ul>
            </div>
            <div className="skill-box">
              <h3><i className="fas fa-database"></i> Data & Tools</h3>
              <ul>
                <li>Power BI & Tableau</li>
                <li>JIRA & Confluence</li>
                <li>Microsoft Dynamics 365</li>
                <li>Salesforce CRM</li>
                <li>ServiceNow</li>
              </ul>
            </div>
            <div className="skill-box">
              <h3><i className="fas fa-users"></i> Soft Skills</h3>
              <ul>
                <li>Managing Ambiguity</li>
                <li>Stakeholder Negotiation</li>
                <li>Cross-Functional Leadership</li>
                <li>Conflict Resolution</li>
                <li>Change Management</li>
              </ul>
            </div>
            <div className="skill-box">
              <h3><i className="fas fa-globe"></i> Domain Expertise</h3>
              <ul>
                <li>Banking (KYC/AML)</li>
                <li>Telecom Interconnection</li>
                <li>IT Asset Disposition (ITAD)</li>
                <li>Regulatory Compliance</li>
                <li>Vendor Management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section-padding bg-secondary">
        <div className="container">
          <div className="text-center">
            <span className="eyebrow">Case Studies</span>
            <h2>Project Highlights</h2>
            <div style={{ width: '50px', height: '3px', background: 'var(--accent)', margin: '20px auto 60px' }}></div>
          </div>

          {resumeData.projects.map((project) => (
            <div key={project.title} className="project-card">
              <div className="project-content">
                <span className="project-meta">{project.category}</span>
                <h3>{project.title}</h3>
                <p style={{ color: '#cbd5e1', margin: '20px 0' }}>
                  <strong>Challenge:</strong> {project.challenge}
                </p>
                <p style={{ color: 'var(--text-gray)' }}>
                  <strong>Solution:</strong> {project.solution}
                </p>
              </div>
              <div className="project-stats">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="metric">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      <section id="experience" className="section-padding">
        <div className="container">
          <div className="text-center">
            <span className="eyebrow">Experience</span>
            <h2>Professional Timeline</h2>
            <div style={{ width: '50px', height: '3px', background: 'var(--accent)', margin: '20px auto 60px' }}></div>
          </div>

          <div className="timeline-wrapper">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="role-header">
                  <span className="role-date">{exp.date}</span>
                  <h3 className="role-title">{exp.role}</h3>
                  <span className="role-company">{exp.company} | {exp.location}</span>
                </div>
                <div className="role-details">
                  <ul>
                    {exp.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-padding">
        <div className="container">
          <div className="contact-split-container">

            <div className="contact-info-col">
              <span className="eyebrow">Get In Touch</span>
              <h2>Let's Start a Conversation</h2>
              <p style={{ color: 'var(--text-gray)', marginBottom: '2rem' }}>
                Ready to drive results? I am currently open to Contract, Freelance, and Full-time opportunities in the Greater Toronto Area (GTA) or Remote.
              </p>

              <ul className="contact-list">
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--white)', fontSize: '0.9rem' }}>Call Me</strong>
                    <a href={`tel:${resumeData.profile.contact.phone.replace(/ /g,'')}`} style={{ color: 'var(--text-light)', textDecoration: 'none' }}>{resumeData.profile.contact.phone}</a>
                  </div>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--white)', fontSize: '0.9rem' }}>Email Me</strong>
                    <a href={`mailto:${resumeData.profile.contact.email}`} style={{ color: 'var(--text-light)', textDecoration: 'none' }}>{resumeData.profile.contact.email}</a>
                  </div>
                </li>
                <li>
                  <i className="fab fa-linkedin-in"></i>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--white)', fontSize: '0.9rem' }}>Connect</strong>
                    <a href={`https://${resumeData.profile.contact.linkedin}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>{resumeData.profile.contact.linkedin}</a>
                  </div>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--white)', fontSize: '0.9rem' }}>Location</strong>
                    {resumeData.profile.location}
                  </div>
                </li>
              </ul>

              <div style={{ marginTop: '40px' }}>
                <a href="Resume_Sujal_Chauhan.pdf" download className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <i className="fas fa-file-pdf" style={{ marginRight: '10px' }}></i> Download Resume
                </a>
              </div>
            </div>

            <div className="contact-form-col">
              <form action="https://formspree.io/f/xblnyday" method="POST">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" className="form-control" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" className="form-control" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input type="text" id="subject" name="_subject" className="form-control" placeholder="Project Opportunity" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" className="form-control" rows="5" placeholder="Tell me about your project or opportunity..." required></textarea>
                </div>

                <input type="text" name="_gotcha" style={{ display: 'none' }} />

                <button type="submit" className="btn-submit">
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <footer>
        <div className="container text-center" style={{ padding: '40px 0', borderTop: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>
            &copy; 2025 Sujal Chauhan. All Rights Reserved. <br />
            <button
                onClick={togglePrivacy}
                style={{ background: 'none', border: 'none', color: 'var(--text-gray)', textDecoration: 'underline', marginTop: '10px', display: 'inline-block', cursor: 'pointer' }}
            >
                Privacy Policy
            </button>
          </p>
        </div>
      </footer>

      {showPrivacy && (
        <div id="privacyModal" className="privacy-modal" onClick={closePrivacy}>
          <div className="privacy-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={togglePrivacy}>&times;</span>
            <h3>Privacy Policy</h3>
            <div style={{ width: '50px', height: '3px', background: 'var(--accent)', margin: '10px 0 20px' }}></div>

            <p><strong>1. Data Collection</strong><br />
            This website collects data to improve user experience and facilitate communication. By using this site, you consent to the use of the following tools:</p>

            <ul>
              <li><strong>Google Analytics (GA4):</strong> Collects anonymous usage data (pages visited, session duration) to help analyze site traffic.</li>
              <li><strong>Microsoft Clarity:</strong> Records session heatmaps and interactions to understand user behavior and improve site usability.</li>
              <li><strong>Formspree:</strong> When you submit the contact form, your name, email, and message are securely transmitted to me via email for the purpose of replying to your inquiry.</li>
            </ul>

            <p><strong>2. Cookies</strong><br />
            We use cookies to ensure the proper functioning of analytics tools. You may disable cookies in your browser settings, though this may affect site performance.</p>

            <p><strong>3. Your Rights</strong><br />
            Your data is never sold to third parties. If you wish to request the deletion of your personal communication data, please contact me directly at <a href="mailto:sujal.chauhan@live.in" style={{ color: 'var(--accent)' }}>sujal.chauhan@live.in</a>.</p>
          </div>
        </div>
      )}

      <WeatherWidget />
      <MarketRatesWidget />
      <GeminiChat />
    </div>
  );
}

export default App;
