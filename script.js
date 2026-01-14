document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // Requires simple CSS for .active
            if (navLinks.style.display === "flex") {
                navLinks.style.display = "none";
            } else {
                navLinks.style.display = "flex";
                navLinks.style.flexDirection = "column";
                navLinks.style.position = "absolute";
                navLinks.style.top = "70px";
                navLinks.style.left = "0";
                navLinks.style.width = "100%";
                navLinks.style.background = "#fff";
                navLinks.style.padding = "20px";
                navLinks.style.boxShadow = "0 5px 10px rgba(0,0,0,0.1)";
            }
        });
    }

    // 2. Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // 3. GitHub API: Get Public Repo Count
    const githubUsername = 'sujalchauhan-ba'; 
    const repoCountElement = document.getElementById('repo-count');

    if(repoCountElement) {
        fetch(`https://api.github.com/users/${githubUsername}`)
        .then(response => {
            if (!response.ok) throw new Error("GitHub API failed");
            return response.json();
        })
        .then(data => {
            repoCountElement.textContent = data.public_repos;
        })
        .catch(error => {
            console.log('GitHub API Error:', error);
            repoCountElement.textContent = "5+"; // Fallback
        });
    }

    // 4. Random Quote Generator
    const quotes = [
        "Innovation distinguishes between a leader and a follower.",
        "Data is the new oil. It’s valuable, but if unrefined it cannot really be used.",
        "Efficiency is doing things right; effectiveness is doing the right things.",
        "The best way to predict the future is to create it.",
        "Technology is best when it brings people together.",
        "Automation applied to an efficient operation will magnify the efficiency."
    ];

    const quoteElement = document.getElementById('dynamic-quote');
    if(quoteElement) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.textContent = `"${randomQuote}"`;
    }
});
