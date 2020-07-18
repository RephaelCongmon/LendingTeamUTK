function initMap() {
    // The location of Uluru
    var knox = {lat: 35.964668, lng: -83.926453};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: knox});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: knox, map: map});
  }
