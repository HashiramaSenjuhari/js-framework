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


///----------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  //it will Reset the scroll position to the top of the page
  window.scrollTo(0, 0);

  const sections = document.querySelectorAll('[data-scroll-speed]');
  const scrollContainer = document.getElementById('your-container-id'); //container id

  let totalHeight = 0;

  sections.forEach((section) => {
    const speedFactor = parseFloat(section.getAttribute("data-scroll-speed")) || 1;

    const clampedSpeedFactor = clamp(speedFactor, 0, 1);

    //it will Adjust speed based on window size
    const speed = getSpeedBasedOnWindowSize(clampedSpeedFactor);

    //it will Store the original position for later adjustments
    section.style.transform = `translateY(0)`;

    //it will Add the section's height to the total height
    totalHeight += section.clientHeight;

    // it will Listen for scroll events
    window.addEventListener("scroll", () => handleScroll(section, speed));
  });

  //it will Set the total height of the scroll container to the specified container's height
  if (scrollContainer) {
    scrollContainer.style.height = `${totalHeight}px`;
  }

  //it will Update the speed when the window is resized
  window.addEventListener('resize', function () {
    sections.forEach((section) => {
      const speedFactor = parseFloat(section.getAttribute("data-scroll-speed")) || 1;
      const clampedSpeedFactor = clamp(speedFactor, 0, 1);
      const updatedSpeed = getSpeedBasedOnWindowSize(clampedSpeedFactor);

      section.style.transform = `translateY(0)`;
      window.removeEventListener("scroll", () => handleScroll(section, speed)); //it Remove the previous scroll event listener
      window.addEventListener("scroll", () => handleScroll(section, updatedSpeed)); //it Add a new scroll event listener with the updated speed
    });
  });

  function handleScroll(element, speed) {
    const scrollY = window.scrollY;
    const translateY = scrollY * speed;

    //it Apply the parallax effect to the element
    element.style.transform = `translateY(-${translateY}px)`;
  }

  //it will Function to map a value from one range to another
  function mapSpeedToRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  }

  //it will Clamp function
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getSpeedBasedOnWindowSize(speedFactor) {
    //it will Adjust speed based on window size
    const windowWidth = window.innerWidth;

    if (windowWidth < 600) {
      // Small screens: Increase speed 
      return mapSpeedToRange(speedFactor, 0, 1, 0, 6);
    } else if (windowWidth < 1200) {
      // Medium screens:default speed
      return speedFactor;
    } else {
      // Large screens: Decrease speed
      return mapSpeedToRange(speedFactor, 0, 1, 0, 0.5);
    }
  }
});
