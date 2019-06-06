document.addEventListener('mousemove', function (event) {
    var map = document.getElementById("map");
    var x = -(event.pageX + map.offsetLeft) / 40;
    var y = (event.pageY + map.offsetTop) / 50;
    map.style.backgroundPosition = x + 'px ' + y + 'px';
});