document.querySelectorAll('.lesson-toggle').forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    const nextSidebar = toggle.nextElementSibling;

    // Close any other open nested sidebars
    document.querySelectorAll('.nested-sidebar.active').forEach(activeSidebar => {
      if (activeSidebar !== nextSidebar) {
        activeSidebar.classList.remove('active');
      }
    });

    // Toggle the clicked nested sidebar
    nextSidebar.classList.toggle('active');
  });
});
