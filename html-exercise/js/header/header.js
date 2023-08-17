const handleScrollHeader = () => {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 90) {
            document.querySelector('.header').classList.add('header-sticky');
            document.querySelector('.logo-img').style.display = 'none';
            document.querySelector('.header-action-list').style.display = 'none';
            document.querySelector('.mobile-logo-img').style.display = 'block';
            document.querySelector('.header-mobile-action-list').style.display = 'flex';
        }
        else {
            document.querySelector('.header').classList.remove('header-sticky');
            document.querySelector('.logo-img').style.display = 'block';
            document.querySelector('.header-action-list').style.display = 'flex';
            document.querySelector('.mobile-logo-img').style.display = 'none';
            document.querySelector('.header-mobile-action-list').style.display = 'none';
        }
    });
};
export default handleScrollHeader;
