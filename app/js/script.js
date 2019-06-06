var map = document.getElementById("map");

window.onload = function () {
    if (window.innerWidth >= 991) {
        map.addEventListener('mousemove', function (event) {
            var x = -(event.pageX + map.offsetLeft) / 70;
            var y = -(event.pageY + map.offsetTop) / 70;
            map.style.backgroundPosition = x + 'px ' + y + 'px';
        });
    }
};
window.addEventListener('resize', function () {
    if (window.innerWidth >= 991) {
        map.addEventListener('mousemove', function (event) {
            var x = -(event.pageX + map.offsetLeft) / 70;
            var y = -(event.pageY + map.offsetTop) / 70;
            map.style.backgroundPosition = x + 'px ' + y + 'px';
        });
    }
});

