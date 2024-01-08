const Perfect = {
  defaults: {
    strength: 100,
    draggable: false,
    magnetChildren: false,
  },
  magnets: null,

  magnet: (selector, customOptions = {}) => {
    Perfect.options = { ...Perfect.defaults, ...customOptions };
    Perfect.magnets = document.querySelectorAll(selector);

    if (Perfect.options.draggable) {
      Perfect.magnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', Perfect.moveMagnet);
        magnet.addEventListener('mouseleave', Perfect.resetMagnet);

        if (Perfect.options.magnetChildren) {
          const childMagnets = magnet.querySelectorAll('*');
          childMagnets.forEach((childMagnet) => {
            childMagnet.addEventListener('mousemove', Perfect.moveMagnet);
            childMagnet.addEventListener('mouseleave', Perfect.resetMagnet);
          });
        }
      });
    }
  },

  moveMagnet: (event) => {
    const magnetElement = event.currentTarget;
    const bounding = magnetElement.getBoundingClientRect();
    const magnetsStrength = Perfect.options.strength;

    gsap.to(magnetElement, 1.5, {
      x: (((event.clientX - bounding.left) / magnetElement.offsetWidth) - 0.5) * magnetsStrength,
      y: (((event.clientY - bounding.top) / magnetElement.offsetHeight) - 0.5) * magnetsStrength,
      rotate: "0.001deg",
      ease: Power4.easeOut
    });
  },

  resetMagnet: (event) => {
    gsap.to(event.currentTarget, 1.5, {
      x: 0,
      y: 0,
      ease: Elastic.easeOut
    });
  },
};

// Example 
Perfect.magnet('.custom-magnetic-container', {
  draggable: true,
  strength: 150,
  magnetChildren: true,
});
