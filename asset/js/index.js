// Fonction pour attendre que le DOM soit chargé
function onDOMContentLoaded(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

// Fonction pour créer un scroller LocomotiveScroll
function createScroller() {
    const scrollContainer = document.querySelector('[data-scroll-container]');
    return new LocomotiveScroll({
        el: scrollContainer,
        smooth: true
    });
}

// Fonction pour créer un scroller proxy pour ScrollTrigger
function createScrollerProxy(scroller) {
    const containers = document.querySelector('.containers');
    ScrollTrigger.scrollerProxy(containers, {
        scrollTop(value) {
            return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });
}

// Fonction pour gérer le rafraîchissement sur l'événement refresh de ScrollTrigger
function handleRefresh(scroller) {
    ScrollTrigger.addEventListener('refresh', () => scroller.update());
}

// Fonction pour gérer le rafraîchissement initial de ScrollTrigger
function initialRefresh() {
    ScrollTrigger.refresh();
}

// Fonction pour gérer le comportement de la navbar
function setupNavbar() {
    let navbarCollapse = document.querySelector('#navbarSideCollapse');
    let offcanvasCollapse = document.querySelector('.offcanvas-collapse');
    let closeIcon = document.querySelector('.close-icon');

    navbarCollapse.addEventListener('click', function () {
        offcanvasCollapse.classList.toggle('open');
        closeIcon.style.display = 'block';
    });

    closeIcon.addEventListener('click', function () {
        offcanvasCollapse.classList.remove('open');
        closeIcon.style.display = 'none';
    });
}

// Code principal
onDOMContentLoaded(() => {
    const scroller = createScroller();
    createScrollerProxy(scroller);
    handleRefresh(scroller);
    initialRefresh();
    setupNavbar();
});
