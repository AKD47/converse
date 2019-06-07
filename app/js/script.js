// Mobile Menu
var burger = document.getElementById('mobile-trigger');
var menu = document.getElementById('main-menu');
burger.onclick = function (event) {
    event.preventDefault();
    if (this.classList.contains('header__trigger--active')) {
        this.classList.remove('header__trigger--active');
        menu.classList.remove('header__menu--show');
    } else {
        this.classList.add('header__trigger--active');
        menu.classList.add('header__menu--show');
    }
};
document.addEventListener('click', function(event) {
    var headerNav = document.getElementById('header-navigation');
    var isClickInside = headerNav.contains(event.target);
    if (!isClickInside) {
        burger.classList.remove('header__trigger--active');
        menu.classList.remove('header__menu--show');
    }
});

// Tabs
window.addEventListener('load', function () {
    var myTabs = document.querySelectorAll('ul.about__tabs > li');

    function myTabClicks(tabClickEvent) {
        for (var i = 0; i < myTabs.length; i++) {
            myTabs[i].classList.remove('about__tabs--active');
        }
        var clickedTab = tabClickEvent.currentTarget;
        clickedTab.classList.add('about__tabs--active');
        tabClickEvent.preventDefault();
        var myContentPanes = document.querySelectorAll('.about__pane');
        for (i = 0; i < myContentPanes.length; i++) {
            myContentPanes[i].classList.remove('about__pane--active');
        }
        var anchorReference = tabClickEvent.target;
        var activePaneId = anchorReference.getAttribute('href');
        var activePane = document.querySelector(activePaneId);
        activePane.classList.add('about__pane--active');
    }

    for (i = 0; i < myTabs.length; i++) {
        myTabs[i].addEventListener('click', myTabClicks);
    }
});

//Map
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.752210, lng: 37.617928},
        panControl: false,
        zoomControl: false,
        scaleControl: false,
        zoom: 11,
        styles: [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#444444"}]
        }, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"}]}, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"lightness": 45}]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
        }, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#46bcec"}, {"visibility": "on"}]}]
    });
    var marker = new google.maps.Marker({
        position: {lat: 55.664697, lng: 37.621201},
        map: map,
        icon: '../img/map-g-marker.png'
    });
};