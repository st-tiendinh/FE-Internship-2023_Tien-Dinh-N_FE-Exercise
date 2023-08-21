const handleScrollHeader = () => {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 74) {
      document.querySelector('.header').classList.add('bg-light');
      document.querySelector('.nav-link.btn.btn-primary').classList.add('bg-primary');
    } else {
      document.querySelector('.header').classList.remove('bg-light');
      document.querySelector('.nav-link.btn.btn-primary').classList.remove('bg-primary');
    }
  });
};
export default handleScrollHeader;
