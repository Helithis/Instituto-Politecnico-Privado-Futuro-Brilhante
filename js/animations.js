

document.addEventListener("DOMContentLoaded", () => {
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        
        document.documentElement.classList.add("reduced-motion");
        return;
    }

    
    gsap.registerPlugin(ScrollTrigger);

    
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    
    lenis.on('scroll', ScrollTrigger.update);

    
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    
    gsap.ticker.lagSmoothing(0);

    

    
    const scrollProgressBar = document.getElementById("scroll-progress-indicator");
    if (scrollProgressBar) {
        gsap.to(scrollProgressBar, {
            width: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3 
            }
        });
    }

    
    const fadeSelectors = [
        '.animate-fade-up', '.contact_form', '.contact_info',
        '.accordion', '.video_area', '.main_title p',
        '.course_details', '.blog_area', '.single-footer-widget',
        '.news_widget', '.event_details'
    ].join(', ');
    const fadeUpElements = gsap.utils.toArray(fadeSelectors);
    fadeUpElements.forEach((el) => {
        gsap.fromTo(el,
            {
                y: 40,
                autoAlpha: 0
            },
            {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", 
                    toggleActions: "play none none none"
                }
            }
        );
    });

    
    const textSelectors = [
        '.animate-text-reveal', '.banner_content h2',
        '.main_title h2', '.main_title h3', '.blog_info h2'
    ].join(', ');
    const textRevealElements = gsap.utils.toArray(textSelectors);
    textRevealElements.forEach((el) => {
        
        const splitText = new SplitType(el, { types: 'lines, words' });

        
        gsap.set(el, { autoAlpha: 1 }); 

        
        splitText.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.from(splitText.words, {
            yPercent: 130, 
            autoAlpha: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.03, 
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });

    
    const parallaxElements = gsap.utils.toArray('.parallax-bg');
    parallaxElements.forEach((el) => {
        gsap.to(el, {
            yPercent: 30, 
            ease: "none",
            scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true 
            }
        });
    });

    
    const imgReveals = gsap.utils.toArray('.img-reveal-zoom');
    imgReveals.forEach((el) => {
        const img = el.querySelector('img');
        if (img) {
            
            gsap.fromTo(el,
                { clipPath: "inset(100% 0 0 0)" }, 
                {
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1.2,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                    }
                }
            );

            
            gsap.to(img, {
                scale: 1, 
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                }
            });
        }
    });
});
