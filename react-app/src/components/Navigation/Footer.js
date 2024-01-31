import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h4>Saman Rana</h4>
                <a href="https://github.com/samanarana" target="_blank" rel="noopener noreferrer">Github</a>
                <a href="https://www.linkedin.com/in/samanarana/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://samanarana.github.io/portfolio/" target="_blank" rel="noopener noreferrer">Portfolio</a>
            </div>
            <div className="footer-section">
                <h4>Chris Gomez</h4>
                <a href="https://github.com/BigDogEnergy" target="_blank" rel="noopener noreferrer">Github</a>
                <a href="https://www.linkedin.com/in/chris-gomez-714508158/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://bigdogenergy.github.io/" target="_blank" rel="noopener noreferrer">Portfolio</a>
            </div>
            <div className="footer-section">
                <h4>Carlos Stich</h4>
                <a href="https://github.com/carlosstich" target="_blank" rel="noopener noreferrer">Github</a>
                <a href="https://www.linkedin.com/in/carlos-stich/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                {/* <a href="https://bigdogenergy.github.io/" target="_blank" rel="noopener noreferrer">Portfolio</a> */}
            </div>
        </footer>
    );
};

export default Footer;
