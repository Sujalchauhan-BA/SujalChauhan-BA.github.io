import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './App.css';

const quotes = [
  "Innovation distinguishes between a leader and a follower.",
  "Data is the new oil. It’s valuable, but if unrefined it cannot really be used.",
  "Efficiency is doing things right; effectiveness is doing the right things.",
  "The best way to predict the future is to create it.",
  "Technology is best when it brings people together.",
  "Automation applied to an efficient operation will magnify the efficiency."
];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [repoCount, setRepoCount] = useState(null);
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    // Fetch GitHub Repo Count
    fetch('https://api.github.com/users/sujalchauhan-ba')
      .then(response => {
        if (!response.ok) throw new Error("GitHub API failed");
        return response.json();
      })
      .then(data => {
        setRepoCount(data.public_repos);
      })
      .catch(error => {
        console.log('GitHub API Error:', error);
        setRepoCount("5+");
      });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="portfolio-container">
      <nav className="navbar">
        <div className="logo">Sujal Chauhan</div>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul
          className={`nav-links ${isMenuOpen ? 'active' : ''}`}
          style={isMenuOpen ? {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '70px',
            left: '0',
            width: '100%',
            background: '#fff',
            padding: '20px',
            boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
            zIndex: 1000
          } : {}}
        >
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main className="main-content">
        <section id="home" className="hero-section">
          <h1>Personal Portfolio</h1>
          <div className="profile-image-container">
            <img src="/Sujal-Profile.jpg" alt="Sujal Chauhan" className="profile-img" />
          </div>
          <div className="quote-container">
            <p id="dynamic-quote">"{quote}"</p>
          </div>
          <div className="resume-link">
             <a href="/Resume_Sujal_Chauhan.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
               Download Resume
             </a>
          </div>
        </section>

        <section id="stats" className="stats-section">
          <h2>GitHub Stats</h2>
          <div className="stat-card">
            <h3>Public Repositories</h3>
            <p id="repo-count" className="stat-number">{repoCount ?? 'Loading...'}</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; <span id="year">{new Date().getFullYear()}</span> Sujal Chauhan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
