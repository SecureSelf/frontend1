import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ExpertSection.css';
import ghan from '../img/ghanshyam.jpg'
import mohit from '../img/mohit.jpg'
import dipansh from '../img/dipansh.png'

const ExpertSection = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const expertData = [
    {
      id: "professional1",
      name: "Ghanshyam Patidar",
      description: "I design user-friendly, responsive interfaces that offer seamless user experiences across mobile platforms. The MERN stack empowers me to create full-stack applications, React Native allows me to bring the same level of responsiveness to mobile applications.",
      linkedin: "https://www.linkedin.com/in/ghanshyam-patidar-6714a1256",
      image: ghan
    },
    {
      id: "professional2",
      name: "Mohit Yadav",
      description: "As a graphic designer at GDSC JEC Jabalpur. I use my skills in React.js, object-oriented programming, and data structures and algorithms to design and develop user-friendly and responsive interfaces that enhance the user experience.",
      linkedin: "https://www.linkedin.com/in/mohit-yadav-33811024a",
      image: mohit
    },
    {
      id: "professional3",
      name: "Dipansh Gupta",
      description: "Leveraging my expertise in frontend technologies and children's engaging game development, My focus is on building innovative solutions, such as a robo speaker using Python, that simplify complex tasks and provide an immersive experience for young users.",
      linkedin: "https://www.linkedin.com/in/dipansh-gupta-1006842a4",
      image: dipansh
    }
  ];

  useEffect(() => {
    const backgroundAnimation = document.querySelector('.pro-background-animation');
    const colors = ['#ff6b6b', '#0985c8', '#4ecdc4', '#45b7d1', '#f7fff7'];
    for (let i = 0; i < 15; i++) {
      const circle = document.createElement('div');
      circle.classList.add('pro-circle');
      const size = Math.random() * 100 + 50;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.left = `${Math.random() * 100}%`;
      circle.style.top = `${Math.random() * 100}%`;
      circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      circle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      circle.style.animationDelay = `${Math.random() * 5}s`;
      backgroundAnimation.appendChild(circle);
    }
  }, []);

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % expertData.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + expertData.length) % expertData.length);
  };

  return (
    <>
      <section className="pro-section">
        <div className="pro-background-animation"></div>
        <h2 className="pro-title">Meet Our Professionals</h2>
        <div className="pro-slider">
          {expertData.map((expert, index) => (
            <div
              key={expert.id}
              className={`pro-card ${index === currentSlideIndex ? 'active' : ''}`}
              style={{ display: index === currentSlideIndex ? 'block' : 'none' }}
            >
              <img src={expert.image} alt={expert.name} className="pro-img" />
              <h3 className="pro-name">{expert.name}</h3>
              <p className="pro-description">{expert.description}</p>
              <a href={expert.linkedin} target="_blank" rel="noopener noreferrer" className="pro-linkedin-btn">
                LinkedIn
              </a>
              <button className="pro-contact-btn">Contact</button>
            </div>
          ))}
        </div>
        <div className="pro-slider-controls">
          <button className="pro-prev-slide" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>
          <button className="pro-next-slide" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>
        </div>
      </section>
    </>
  );
};

export default ExpertSection;
