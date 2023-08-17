const handleScrollHeader = () => {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 90) {
      document.querySelector('.header').classList.add('header-sticky');
      document.querySelector<HTMLElement>('.logo-img').style.display = 'none';
      document.querySelector<HTMLElement>('.header-action-list').style.display = 'none';
      document.querySelector<HTMLElement>('.mobile-logo-img').style.display = 'block';
      document.querySelector<HTMLElement>('.header-mobile-action-list').style.display = 'flex';
    } else {
      document.querySelector('.header').classList.remove('header-sticky');
      document.querySelector<HTMLElement>('.logo-img').style.display = 'block';
      document.querySelector<HTMLElement>('.header-action-list').style.display = 'flex';
      document.querySelector<HTMLElement>('.mobile-logo-img').style.display = 'none';
      document.querySelector<HTMLElement>('.header-mobile-action-list').style.display = 'none';
    }
  });
};

export default handleScrollHeader;
