let map;
let service;
let infoWindow;

window.onload = () =>
{

    let services_centre_location = {lat: 54.00428271, lng: -6.40210535}

    const CONTENT = 0,
        LATITUDE = 1,
        LONGITUDE = 2

    let perryContent = `<div id=perry-content>
                                    <h1 id=perry-h1>Travelodge Perry Bar</h1>
                                    <div id=content>
                                        <img src = './images/mainHotel.jpg'>
                                        <p>Main stay location for Indian tourists in Birmingham. A luxurious place to relax and enjoy your stay to the fullest.</p>
                                        <p>For more information, see our website<br><a href=https://www.travelodge.co.uk/hotels/415/Birmingham-Perry-Barr-hotel>Official Website</a></p>
                                    </div>
                                </div>`

    let locations = [
        [perryContent, 52.5277, -1.89639]
    ]

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: new google.maps.LatLng(52.4796992,-1.9026911),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            mapTypeIds: ["roadmap", "satellite", "hide_poi"]
        }
    })

    new google.maps.places.Autocomplete(start)
    new google.maps.places.Autocomplete(end)
    directionsRenderer = new google.maps.DirectionsRenderer()
    directionsRenderer.setMap(map)
    directionsRenderer.setPanel(document.getElementById("directions"))
    calculateRoute("DRIVING")

    hidePointsOfInterest(map);

    service = new google.maps.places.PlacesService(map)




    infoWindow = new google.maps.InfoWindow()

    locations.map(location =>
    {
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(location[LATITUDE], location[LONGITUDE]),
            // icon: "images/hotelMarker.png",
            map: map
        })

        google.maps.event.addListener(marker, "click", () =>
        {
            infoWindow.setContent(location[CONTENT])
            infoWindow.open(map, marker)
        })
    })

    // service.nearbySearch({
    //     location: {lat: locations[0][LATITUDE], lng:  locations[0][LONGITUDE]}, // centre of the search
    //     radius: 500, // radius (in metres) of the search
    //     type: "cafe"
    // }, getNearbyServicesMarkers)
}

function hidePointsOfInterest(map)
{
    let styles = [
        {
            "featureType": "poi",
            "stylers": [{"visibility": "off"}]
        }
    ]

    let styledMapType = new google.maps.StyledMapType(styles, {name: "POI Hidden", alt: "Hide Points of Interest"})
    map.mapTypes.set("hide_poi", styledMapType)

    map.setMapTypeId("hide_poi")
}

function getNearbyServicesMarkers(results, status)
{
    if (status === google.maps.places.PlacesServiceStatus.OK)
    {
        results.map(result =>
        {
            createMarker(result)
        })
    }
}

function createMarker(place)
{
    let icon = {
        url: place.icon, // url
        scaledSize: new google.maps.Size(30, 30) // scale the image to an icon size
    }

    let marker = new google.maps.Marker({
        map: map,
        icon: icon,
        position: place.geometry.location
    })

    google.maps.event.addListener(marker, "click", () =>
    {
        infoWindow.setContent(place.name)
        infoWindow.open(map, marker)
    })
}

function calculateRoute(travelMode) {
    let start = document.getElementById("start").value
    let end = document.getElementById("end").value

    if (start === "" || end === "") {
        return
    }

    let request = {
        origin: start,
        destination: end,
        travelMode: travelMode
    }

    directionsService = new google.maps.DirectionsService()
    directionsService.route(request, (route, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(route)
        }
    })
}

function displayMap(type) {

    if (type != null) {
        let placeType = type;

        let qwe = new google.maps.LatLng(52.4796992, -1.9026911)
        let service = new google.maps.places.PlacesService(map)

        service.nearbySearch({
            location: qwe.toJSON(),
            radius: 1000,
            type: placeType
        }, getNearbyServicesMarkers)


        map.setZoom(15)
        map.panTo(qwe)
    }
}

