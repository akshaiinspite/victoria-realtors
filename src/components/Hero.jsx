import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, ChevronRight } from 'lucide-react';

export default function Hero({ setCurrentPage }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.hero-word', { y: 80, opacity: 0, rotateX: 45 });
      gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
      gsap.set(descRef.current, { y: 30, opacity: 0 });
      gsap.set(ctaRef.current, { y: 30, opacity: 0 });
      gsap.set(scrollIndicatorRef.current, { y: 20, opacity: 0 });
      gsap.set('.hero-overlay-line', { scaleX: 0 });

      // Master timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Subtitle reveal
      tl.to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Decorative lines
      tl.to('.hero-overlay-line', {
        scaleX: 1,
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.15
      }, '-=0.4');

      // Word-by-word title reveal
      tl.to('.hero-word', {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08
      }, '-=0.7');

      // Description
      tl.to(descRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.3');

      // CTAs
      tl.to(ctaRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.3');

      // Scroll indicator
      tl.to(scrollIndicatorRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.2');

      // Parallax on scroll
      const handleScroll = () => {
        if (bgRef.current) {
          const scrollY = window.scrollY;
          const heroHeight = heroRef.current?.offsetHeight || 900;
          if (scrollY < heroHeight) {
            bgRef.current.style.transform = `translateY(${scrollY * 0.35}px) scale(1.1)`;
          }
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Split title into words for animation
  const titleLine1 = 'Crafting Homes of';
  const titleLine2 = 'Timeless Heritage';
  const titleLine3 = '& Comfort';

  const renderWords = (text, highlight = false) => {
    return text.split(' ').map((word, i) => (
      <span
        key={i}
        className={`hero-word ${highlight ? 'hero-word--accent' : ''}`}
        style={{ display: 'inline-block', perspective: '600px' }}
      >
        {word}&nbsp;
      </span>
    ));
  };

  return (
    <section className="hero-section-v2" ref={heroRef} id="hero-section">
      {/* Background Image with Parallax */}
      <div className="hero-bg-wrapper">
        <div className="hero-bg-image" ref={bgRef}></div>
        <div className="hero-bg-overlay"></div>
        {/* Decorative accent lines */}
        <div className="hero-overlay-line hero-line-1"></div>
        <div className="hero-overlay-line hero-line-2"></div>
      </div>

      {/* Main Content */}
      <div className="container hero-v2-content">
        <div className="hero-v2-text">
          <span className="hero-v2-subtitle" ref={subtitleRef}>
            <span className="hero-v2-subtitle-line"></span>
            Spectacular Living down South
            <span className="hero-v2-subtitle-line"></span>
          </span>

          <h1 className="hero-v2-title" ref={titleRef}>
            {renderWords(titleLine1)}
            <br />
            {renderWords(titleLine2, true)}
            <br />
            {renderWords(titleLine3)}
          </h1>

          <p className="hero-v2-description" ref={descRef}>
            For over two decades, Victoria Realtors has been Kerala's trusted partner in designing 
            state-of-the-art premium villas and apartments. Discover a sanctuary that nurtures 
            togetherness, peace, and family life.
          </p>

          <div className="hero-v2-ctas" ref={ctaRef}>
            <button
              className="hero-cta-primary"
              onClick={() => setCurrentPage('projects')}
            >
              <span>Explore Properties</span>
              <ChevronRight size={18} />
            </button>
            <a
              href="https://wa.me/919159165893?text=Hi,%20I%20would%20like%20to%20enquire%20about%20Victoria%20Realtors%20properties."
              target="_blank"
              rel="noreferrer"
              className="hero-cta-secondary"
            >
              Enquire Now
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
        <span>Scroll to explore</span>
        <div className="scroll-arrow-wrapper">
          <ArrowDown size={16} />
        </div>
      </div>
    </section>
  );
}
