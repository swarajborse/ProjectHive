// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('#filter-buttons .filter-btn');
  const galleryItems = document.querySelectorAll('#gallery-grid .gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update Active Button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter Gallery Items
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          item.classList.add('block');
        } else {
          item.classList.add('hidden');
          item.classList.remove('block');
        }
      });
    });
  });
});
