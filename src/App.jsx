import { useState } from 'react';
import './App.css';
import GeminiChat from './components/GeminiChat';
import GitHubProjects from './components/GitHubProjects';
import MarketRatesWidget from './components/MarketRatesWidget';

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
            <span className="eyebrow">Recent Work</span>
            <h2>GitHub Projects</h2>
            <div style={{ width: '50px', height: '3px', background: 'var(--accent)', margin: '20px auto 60px' }}></div>
            <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '-40px auto 40px' }}>
              A selection of my latest technical repositories and automation scripts.
            </p>
          </div>

          <GitHubProjects />

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
            <div className="timeline-item">
              <div className="role-header">
                <span className="role-date">March 2025 - Present</span>
                <h3 className="role-title">Senior Business Analyst</h3>
                <span className="role-company">BigLop | Mississauga, ON</span>
              </div>
              <div className="role-details">
                <ul>
                  <li>Spearheaded technical requirements gathering for migrating 12 mission-critical banking apps to Azure, ensuring 99.9% uptime.</li>
                  <li>Architected business logic using Azure Logic Apps to automate KYC workflows, reducing verification time by 45%.</li>
                  <li>Designed Power BI dashboards for C-suite executives, reducing manual compliance reporting by 40 hours/month.</li>
                  <li>Led functional decomposition for a modern ERP system, facilitating JAD sessions to ensure regulatory compliance.</li>
                  <li>Acted as Proxy Product Owner, facilitating sprint planning and backlog refinement which improved team velocity by 25%.</li>
                  <li>Managed end-to-end User Acceptance Testing (UAT) cycles with 20+ business users, ensuring zero critical defects.</li>
                  <li>Developed and maintained RACI charts to clarify roles across IT, Compliance, and Operations teams.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="role-header">
                <span className="role-date">April 2021 - Feb 2025</span>
                <h3 className="role-title">Senior Business Analyst & Process Lead</h3>
                <span className="role-company">Quantum Lifecycle Partners LP | Brampton, ON</span>
              </div>
              <div className="role-details">
                <ul>
                  <li>Spearheaded requirements and functional design for a high-volume B2C resale platform, driving a 25% revenue increase.</li>
                  <li>Led gap analysis for Microsoft Dynamics 365 integration, ensuring seamless data synchronization across workflows.</li>
                  <li>Deployed Power BI dashboards to track Customer Lifecycle KPIs, improving revenue forecast accuracy by 30%.</li>
                  <li>Defined functional requirements for ITAD workflows (asset tracking/security), creating detailed BPMN maps.</li>
                  <li>Established Agile requirements governance that reduced overall project delivery timelines by 15-20%.</li>
                  <li>Managed relationships with 3rd-party logistics providers, negotiating SLAs for API integrations.</li>
                  <li>Conducted comprehensive risk assessments for asset recovery workflows, reducing operational risk by 15%.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="role-header">
                <span className="role-date">Nov 2019 - April 2021</span>
                <h3 className="role-title">Process Improvement Supervisor</h3>
                <span className="role-company">Teleperformance | Toronto, ON</span>
              </div>
              <div className="role-details">
                <ul>
                  <li>Analyzed support metrics to identify bottlenecks, implementing improvements that reduced resolution time by 20%.</li>
                  <li>Created centralized SOPs and knowledge bases, directly resulting in a 15% increase in First Contact Resolution (FCR).</li>
                  <li>Supervised a team of 15 agents, conducting performance audits to maintain high service standards for Apple.</li>
                  <li>Analyzed call volume patterns to optimize shift scheduling, ensuring 95% SLA adherence during peaks.</li>
                  <li>Monitored compliance with client SLAs, proactively identifying and resolving escalation risks.</li>
                  <li>Maintained CSAT scores above 85% through targeted coaching and real-time intervention.</li>
                  <li>Acted as the cross-functional bridge between front-line support and engineering teams for technical issues.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="role-header">
                <span className="role-date">Jan 2014 - Sept 2018</span>
                <h3 className="role-title">Senior Business Analyst (Strategic Projects)</h3>
                <span className="role-company">Progressive Telecom LLC | India</span>
              </div>
              <div className="role-details">
                <ul>
                  <li>Conducted Cost-Benefit Analysis (CBA) for international market expansions, presenting recommendations to executives.</li>
                  <li>Defined technical and commercial requirements for telecom interconnection projects, bridging Network and Finance teams.</li>
                  <li>Mapped "As-Is" vs. "To-Be" deployment workflows, identifying bottlenecks and implementing SOPs to enhance quality.</li>
                  <li>Performed benchmarking to identify pricing gaps, informing a strategy that captured 10% additional market share.</li>
                  <li>Spearheaded negotiation of bilateral agreements, defining SLAs and KPIs for long-term partnership stability.</li>
                  <li>Analyzed international telecom regulations to define compliance requirements for new market entries.</li>
                  <li>Managed full-cycle interconnection projects from feasibility analysis to final testing and deployment.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="role-header">
                <span className="role-date">Aug 2012 - Nov 2013</span>
                <h3 className="role-title">Carrier Relations Manager</h3>
                <span className="role-company">Axistel FZE | UAE</span>
              </div>
              <div className="role-details">
                <ul>
                  <li>Led and managed international carrier interconnection projects, ensuring seamless integration and compliance.</li>
                  <li>Negotiated and finalized interconnection agreements with global carriers, increasing revenue margins.</li>
                  <li>Managed end-to-end project workflows, aligning Agile methodologies with business objectives for efficiency.</li>
                  <li>Monitored revenue streams and traffic patterns to optimize routing and exceed financial targets.</li>
                  <li>Collaborated with Finance and Technical Operations to ensure seamless service execution and billing.</li>
                  <li>Led risk management initiatives, identifying potential failure points in interconnection processes.</li>
                  <li>Developed key carrier relationships to improve retention rates and ensure long-term partnerships.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="role-header">
                <span className="role-date">Nov 2011 - Aug 2012</span>
                <h3 className="role-title">Account Manager</h3>
                <span className="role-company">Spactron Limited | Various Locations</span>
              </div>
              <div className="role-details">
                <ul>
                  <li>Managed account onboarding and technical setup, ensuring seamless integration for new partners.</li>
                  <li>Negotiated traffic flow and prioritized high-quality CLI routes to enhance service reliability.</li>
                  <li>Collaborated with Sales and Technical teams to align services with specific client requirements.</li>
                  <li>Conducted market analysis and route optimization strategies to improve cost efficiency.</li>
                  <li>Led client communications and contract discussions to ensure smooth implementation of agreements.</li>
                  <li>Coordinated internal quality assurance processes, reducing service disruptions.</li>
                  <li>Identified and capitalized on new revenue opportunities through proactive business development.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="role-header">
                <span className="role-date">June 2010 - Oct 2011</span>
                <h3 className="role-title">Director of Business Development</h3>
                <span className="role-company">Progressive Telecom LLC | India</span>
              </div>
              <div className="role-details">
                <ul>
                  <li>Developed strategic business expansion initiatives, identifying and onboarding new telecom partners.</li>
                  <li>Led end-to-end interconnection projects, managing negotiations, agreements, and technical provisioning.</li>
                  <li>Negotiated multimillion-dollar bilateral agreements, significantly improving company margins.</li>
                  <li>Managed cross-functional collaboration between Sales, Network Ops, and Finance to streamline workflows.</li>
                  <li>Implemented customer retention strategies, fostering strong relationships with key providers.</li>
                  <li>Led resolution of complex interconnection challenges, troubleshooting network traffic flow with technical teams.</li>
                  <li>Represented the company at global industry events to drive lead generation and brand presence.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="role-header">
                <span className="role-date">June 2009 - March 2010</span>
                <h3 className="role-title">Carrier Relations Manager</h3>
                <span className="role-company">Bridgevoice Inc. | India</span>
              </div>
              <div className="role-details">
                <ul>
                  <li>Developed strategic relationships with international telecom carriers to ensure smooth interconnection.</li>
                  <li>Led market research and business case evaluations to identify new partnership opportunities.</li>
                  <li>Negotiated interconnect agreements, ensuring cost-effective routing and improved margins.</li>
                  <li>Monitored traffic flow to ensure optimal performance and revenue growth.</li>
                  <li>Collaborated with technical and finance teams to streamline operational workflows.</li>
                  <li>Oversaw revenue tracking and reporting for accurate financial forecasting.</li>
                  <li>Implemented account management strategies to strengthen vendor relationships.</li>
                </ul>
              </div>
            </div>

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
                    <a href="tel:+16476679819" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>+1 647 667 9819</a>
                  </div>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--white)', fontSize: '0.9rem' }}>Email Me</strong>
                    <a href="mailto:sujal.chauhan@live.in" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>sujal.chauhan@live.in</a>
                  </div>
                </li>
                <li>
                  <i className="fab fa-linkedin-in"></i>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--white)', fontSize: '0.9rem' }}>Connect</strong>
                    <a href="https://linkedin.com/in/sujalchauhan" target="_blank" rel="noreferrer" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>linkedin.com/in/sujalchauhan</a>
                  </div>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--white)', fontSize: '0.9rem' }}>Location</strong>
                    Greater Toronto Area, Ontario
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

      <MarketRatesWidget />
      <GeminiChat />
    </div>
  );
}

export default App;
