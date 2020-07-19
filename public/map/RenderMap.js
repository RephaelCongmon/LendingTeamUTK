function generateLatLong() {
    
    let tripArray = []

    window.randomTestData.forEach(trip => {

        let geometryNumbers = []
        let subStr = (trip.geometry).substring(12, (trip.geometry).length - 2)
        let geometryLines = (subStr).split(" ")

        
        geometryLines.forEach(coordinate => {
            coordinate = coordinate.replace(',', '')
            geometryNumbers.push(parseFloat(coordinate))
        })
        tripArray.push(geometryNumbers)
    });

    return tripArray
}

function findStop() {
    
    let tripArray = []

    window.randomData.forEach(trip => {
        tripArray.push(trip.end_lat)
        tripArray.push(trip.end_lon)
    });
    console.log('trip array --------', tripArray)
    return tripArray
}


function initMap() {
    // The location of Knoxville
    var knox = {lat: 35.964668, lng: -83.926453};
    var tripArray = generateLatLong()

    var heatmapData = []
        
    // for (let i = 0; i < tripArray.length; i++) {

    //     if(i%2 === 0) {
    //         lat = tripArray[i]
    //     } else {
    //         long = tripArray[i]
    //         heatmapData.push(new google.maps.LatLng(lat, long))
    //     }
    // }
    tripArray.forEach(trip => {
        let lat
        let long
        for(var i = 0; i < trip.length; i++){  
            if(i%2 === 0) {
                lat = trip[i]
            } else {
                long = trip[i]
                heatmapData.push(new google.maps.LatLng(lat, long))
            }
        }
    })

    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 15, 
            center: knox,
            styles: [
                {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                },
                {
                  featureType: 'administrative.locality',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'poi',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'geometry',
                  stylers: [{color: '#263c3f'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#6b9a76'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry',
                  stylers: [{color: '#38414e'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#212a37'}]
                },
                {
                  featureType: 'road',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#9ca5b3'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry',
                  stylers: [{color: '#746855'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#1f2835'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#f3d19c'}]
                },
                {
                  featureType: 'transit',
                  elementType: 'geometry',
                  stylers: [{color: '#2f3948'}]
                },
                {
                  featureType: 'transit.station',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{color: '#17263c'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#515c6d'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.stroke',
                  stylers: [{color: '#17263c'}]
                }
              ]
        }
    );

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
      });

     heatmap.setMap(map);
     heatmap.set("radius", heatmap.get("radius") ? null : 5)
     heatmap.set("opacity", true)
    
    // var marker = new google.maps.Marker({position: knox, map: map});

}