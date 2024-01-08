// Enhanced Cursor Follower module with maximum followerSpeed
const CursorFollower = {
  cursorElement: null,
  options: {
      shape: 'circle',
      color: '#e74c3c',
      size: '20px',
      opacity: 0.8,
      followerSpeed: 0.1, // Follower speed (adjust as needed)
      hoverEffect: false,
      clickEffect: false,
  },

  initialize: (customOptions = {}) => {
      CursorFollower.options = { ...CursorFollower.options, ...customOptions };
      CursorFollower.createCursor();
      CursorFollower.initFollower();
      CursorFollower.attachEventListeners();
  },

  createCursor: () => {
      CursorFollower.cursorElement = document.createElement('div');
      document.body.appendChild(CursorFollower.cursorElement);
      CursorFollower.setStyle();
  },

  setStyle: () => {
      const { cursorElement, options } = CursorFollower;

      cursorElement.style.position = 'fixed';
      cursorElement.style.width = options.size;
      cursorElement.style.height = options.size;
      cursorElement.style.backgroundColor = options.color;
      cursorElement.style.borderRadius = options.shape === 'square' ? '0' : '50%';
      cursorElement.style.pointerEvents = 'none';
      cursorElement.style.transform = 'translate(-50%, -50%)';
      cursorElement.style.transition = 'opacity .3s, color .4s';

      CursorFollower.updateCursorOpacity();
  },

  updateCursorOpacity: () => {
      CursorFollower.cursorElement.style.opacity = CursorFollower.options.opacity;
  },

  attachEventListeners: () => {
      if (CursorFollower.options.hoverEffect) {
          window.addEventListener('mouseover', CursorFollower.enableHoverEffect);
          window.addEventListener('mouseout', CursorFollower.disableHoverEffect);
      }

      if (CursorFollower.options.clickEffect) {
          window.addEventListener('mousedown', CursorFollower.enableClickEffect);
          window.addEventListener('mouseup', CursorFollower.disableClickEffect);
      }
  },

  initFollower: () => {
      let mouseX = 0;
      let mouseY = 0;

      window.addEventListener('mousemove', (event) => {
          mouseX = event.clientX;
          mouseY = event.clientY;
      });

      const updateFollower = () => {
          const dx = mouseX - CursorFollower.cursorElement.offsetLeft;
          const dy = mouseY - CursorFollower.cursorElement.offsetTop;

          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          let targetSpeed = CursorFollower.options.followerSpeed;

          // Ensure that the followerSpeed does not exceed 1
          if (targetSpeed > 1) {
              targetSpeed = 1;
          }

          const targetX = Math.cos(angle) * distance * targetSpeed;
          const targetY = Math.sin(angle) * distance * targetSpeed;

          CursorFollower.cursorElement.style.left = `${CursorFollower.cursorElement.offsetLeft + targetX}px`;
          CursorFollower.cursorElement.style.top = `${CursorFollower.cursorElement.offsetTop + targetY}px`;

          requestAnimationFrame(updateFollower);
      };

      updateFollower();
  },

  enableHoverEffect: () => {
      CursorFollower.cursorElement.classList.add('hover-effect');
  },

  disableHoverEffect: () => {
      CursorFollower.cursorElement.classList.remove('hover-effect');
  },

  enableClickEffect: () => {
      CursorFollower.cursorElement.classList.add('click-effect');
  },

  disableClickEffect: () => {
      CursorFollower.cursorElement.classList.remove('click-effect');
  },
};

// Example usage with Enhanced Cursor Follower module:
CursorFollower.initialize({
  shape: 'circle',
  color: '#e74c3c',
  size: '20px',
  opacity: 0.8,
  followerSpeed: 0.1, // Set the followerSpeed (maximum 1)
  hoverEffect: true,
  clickEffect: true,
});
