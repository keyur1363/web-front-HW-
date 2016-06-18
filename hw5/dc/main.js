

        var source, destination;

        var directionsService = new google.maps.DirectionsService();

        google.maps.event.addDomListener(window, 'load', function () {
            new google.maps.places.SearchBox(document.getElementById('add1'));
            new google.maps.places.SearchBox(document.getElementById('add2'));
        });

        function GetRoute() {

            //*********DIRECTIONS AND ROUTE**********************//
            source = document.getElementById("add1").value;
            destination = document.getElementById("add2").value;

            var request = {
                origin: source,
                destination: destination,
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });

            //*********DISTANCE***********//
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins: [source],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.Imperial,
            }, function (response, status) {
                if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                    var distance = response.rows[0].elements[0].distance.text;
                    var duration = response.rows[0].elements[0].duration.text;
                    var dis = document.getElementById("dis");
                    dis.innerHTML = "";
                    dis.innerHTML += "" + distance + "<br />";
                    //dis.innerHTML += "Duration:" + duration;

                } else {
                    alert("Unable to find the distance via road.");
                }
            });
        }
    
