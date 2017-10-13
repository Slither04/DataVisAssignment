const version = '?v=20170901';
const clientid = '&client_id=GZWWGV5KDNWWOJ4J2A222QLPHH2LG1AGAC0QZA1OCQAY5PHK';
const clientSecret = '&client_secret=KBEIA0BKMVHQEVAGH1ONVD51L2SXVOJYRFXBOI34G4Z4FTBU';
const key = version + clientid + clientSecret;
const googleKey = 'AIzaSyB-YvhFo-QJIakIOwNjXgTI5SOJIix8ckU';

$(function() {
    
    //----GOOGLE URLS----
        let gAccomURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.856556, 174.832381&radius=2000&type=lodging&key='+googleKey;
        let gEatURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.856556, 174.832381&radius=2000&type=food&key='+googleKey;
        let gNightURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.856556, 174.832381&radius=2000&type=bar&key='+googleKey;
        let gShopURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.856556, 174.832381&radius=2000&type=store&key='+googleKey;
        let gTransportURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.856556, 174.832381&radius=2000&type=bus_station&key='+googleKey;
        let gPoiURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.856556, 174.832381&radius=2000&type=point_of_interest&key='+googleKey;
        let gEducationURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.856556, 174.832381&radius=2000&type=school&key='+googleKey;
        let gEntertainmentURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.856556, 174.832381&radius=2000&type=movie_rental&key='+googleKey;

    //----FOURSQUARE URLS----
        let accomURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=hotel&limit=50&radius=2000';
        let eatURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&section=food&limit=50&radius=2000';
        let nightURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=bars&limit=50&radius=2000';
        let shopURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&section=shops&limit=50&radius=2000';
        let transportURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=bus&limit=50&radius=2000';
        let parkURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=parks&limit=50&radius=2000';
        let beachURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=beach&limit=50&radius=2000';
        let educationURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=school+college+education&limit=50&radius=2000';
        let entertainmentURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=fun&limit=50&radius=2000';

    //----MAP SETUP----
        let center = [-36.856556, 174.832381];
        let map = L.map('map', {zoomControl: false }).setView(center, 15);
        let light = L.tileLayer('https://api.mapbox.com/styles/v1/kevinjack/cj7tv1qng1q8c2soer7mhhrii/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2V2aW5qYWNrIiwiYSI6ImNqNmxncnVzYzBycGIzMnBkaG5zdGQ3c3cifQ.Q7hR9waEn5UHMWUQ1v4fGQ').addTo(map);

    //----ZOOM & CENTER MAP BUTTONS----(Michael Adamson)
        $('#in').click(function() {
            map.setZoom(map.getZoom() + 1);
            });
        $('#out').click(function() {
            map.setZoom(map.getZoom() - 1);
            });
        $('#center').click(function() {
            map.setView(center, 15);
            });

    //----MISSION BAY POLYGON---- 
        let missionBayPoly = {
            latlngs: [
                [-36.846160735224245,174.8284435272217],
                [-36.84736272867651,174.8288297653198],
                [-36.863879638583235,174.8266839981079],
                [-36.86377663357458,174.8286581039429],
                [-36.8647551755506,174.8311257362366],
                [-36.86518435667426,174.8350954055786],
                [-36.8617336722161,174.8354601860046],
                [-36.860720755155015,174.8350954055786],
                [-36.86042889520515,174.837155342102],
                [-36.85824849442977,174.8359107971191],
                [-36.85579332303736,174.8356533050537],
                [-36.85397335488382,174.8361253738403],
                [-36.8518271103428,174.8366618156433],
                [-36.85134634330474,174.837691783905],
                [-36.849749488229406,174.8381423950195],
                [-36.84918285421721,174.8390221595764],
                [-36.84822128385889,174.8391723632812],
                [-36.84696779005515,174.8360395431519],
                [-36.84775766525784,174.8349452018738],
                [-36.84763746738383,174.832820892334],
                [-36.846160735224245,174.8284435272217]
            ]
        }
        let polygon = L.polygon(missionBayPoly.latlngs, { color: '#394263', fillColor: '#394263', fillOpacity: 0.2, weight: 2 });
        let polygonZoom = L.polygon(missionBayPoly.latlngs, { color: '#394263', fillColor: '#394263', fillOpacity: 0, weight: 2 });

        map.addLayer(polygon);
        
        map.on('zoomend', function(e) {

            let zoomLevel = map.getZoom();

            if (zoomLevel == 15) {
                map.removeLayer(polygonZoom);
                map.addLayer(polygon);
                $('.logo').show();
            } else {
                map.removeLayer(polygon);
                map.addLayer(polygonZoom);
                $('.logo').hide();
            }
        });

    //----CREATE BOUNDARY FOR SEARCH RESULTS----
        let suburb = L.geoJSON(missionBayBound, {
            style: function(feature) {
                return {color: "#394263",fillOpacity:0};
                }
            }).addTo(map);
        let route;
        
    //----DROPDOWN MENU CONTROL----    
        $('#dropdown').hide();
        $('.hamburger').on('click',function() {
                $('#dropdown').slideToggle('quick');
                $('.hamburger').toggleClass('fa-bars');
                $('.hamburger').toggleClass('fa-times');
                $('.button').removeClass('hovered'); 
                $('.button').removeClass('current'); 
                group.clearLayers();      
        });
        map.on('click',function(){
            $('#dropdown').slideUp('quick');
            $('.hamburger').addClass('fa-bars');
            $('.hamburger').removeClass('fa-times');
            $('.button').removeClass('hovered'); 
            $('.button').removeClass('current');
        });    

    //----ADD CURRENT CLASS TO MENU ITEM----    
        $('.button').on('click',function(){
            $(this).addClass('current');
            $('#dropdown .button').not(this).removeClass('current');
        });

    //----CALLS GOOGLE URLS----
        function google(url,icon){
            $.ajax({
                url:'get.php',
                data:{url:url},
                dataType:'json',
                success:function(res){                  
                    let data = res.results;

                    let venues = _(data).map(function(item){
                        return  {
                                    latlng:[item.geometry.location.lat,item.geometry.location.lng],
                                    lnglat:[item.geometry.location.lng,item.geometry.location.lat],
                                    description:item.name,
                                    iconImage: icon,
                                    venueid: item.place_id
                        };
                    });

                    _(venues).each(function(venue){

                    let venueIcon = L.icon({
                                            iconUrl: venue.iconImage,
                                            iconSize:[45,45]
                                            });

                    let result = leafletPip.pointInLayer(venue.lnglat,suburb);

                        if(result.length > 0){
                            let marker = L.marker(venue.latlng,{icon:venueIcon});
                            group.addLayer(marker);

                            marker.venueid = venue.venueid;
                            
                            marker.on('click',function(){
                       
                            let venueURL = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+this.venueid+'&key='+googleKey;
                                $.ajax({
                                    url:'get.php',
                                    data:{url:venueURL},
                                    dataType:'json',
                                    success:function(res){
                                        console.log(res);
                                        $('.modal-title').empty();
                                        $('.modal-body').empty();
                                        $('.modal-section2').empty();
                                        $('#web').empty();
                                        $('.display-container').empty();


                                        let photos = [];
                                        if(res.result.photos){
                                            photos = res.result.photos;

                                            _(photos).each(function(photo,index){
                                                if(index<1){
                                                    let photoRef = photo.photo_reference;
                                                    let displayPhotoURL = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference='+photoRef+'&key='+googleKey;

                                                    $('<img src='+displayPhotoURL+'>').appendTo('.display-container');
                                                }
                                                if(index<8){
                                                    let photoRef = photo.photo_reference;

                                                    let photoURL = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference='+photoRef+'&key='+googleKey;

                                                    let largePhotoURL = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference='+photoRef+'&key='+googleKey;

                                                    $('<a href="'+largePhotoURL+'"target="blank"><img src='+photoURL+'></a>').appendTo('.modal-body');
                                               }
                                            });
                                        }else{
                                            $('<p>"no photos available."</p>').appendTo('.modal-body');
                                        }
                                            
                                        let reviews = [];
                                        if(res.result.reviews){ 
                                            $('<p>"'+res.result.reviews["0"].text+'"</p>').appendTo('.modal-section2');
                                         }else{
                                            $('<p>"no reviews available."</p>').appendTo('.modal-section2');
                                         }

                                        $('.modal-title').text(res.result.name);
                                        $('<a href="'+res.result.website+'" target="blank">'+res.result.website+'</a>').appendTo('#web');
                                        $('#phone').text(res.result.international_phone_number);
                                        $('#street').text(res.result.vicinity);
                                        $('#street').on('click',function(){
                                            group.clearLayers();
                                            let marker = L.marker(venue.latlng,{icon:venueIcon});
                                            group.addLayer(marker);
                                            let center = venue.latlng;
                                            map.setView(center, 15);
                                            });

                                        $('.gDirections').attr('href','https://maps.google.com?saddr=Current+Location&daddr='+venue.latlng);
                                        $('.lDirections').on('click',function(){
                                            
                                            group.clearLayers();
                                            let marker = L.marker(venue.latlng,{icon:venueIcon});
                                            group.addLayer(marker);
                                            let center = venue.latlng;
                                            map.locate({setView: true});
                                            
                                            function onLocationFound(e) {
                                                var radius = e.accuracy / 2;
                                                var customMarker = L.icon({
                                                                        iconUrl:'marker2.svg',
                                                                        iconSize:[45, 45]
                                                                        });
                                                let hereMarker = L.marker(e.latlng,{icon:customMarker}).addTo(map);
                                                route = L.Routing.control({
                                                                        waypoints: [
                                                                            L.latLng(venue.latlng),
                                                                            L.latLng(e.latlng)
                                                                        ],

                                                                        createMarker: function() { return null; }                                                   
                                                                    });
                                                route.addTo(map);

                                                let markerArray = [];
                                                markerArray.push(venue.latlng);
                                                markerArray.push(e.latlng);
                                                console.log(markerArray);
                                                if(markerArray.length>1){
                                                    map.fitBounds(markerArray,{padding: [80,80]});
                                                }     
                                            }
                                            map.on('locationfound', onLocationFound);
     
                                        });
                                        
                                        $('#customModal').modal('show');
                                    }
                                });
                            });
                        }
                    });           
                }
            });
        }

    //----CALLS FOURSQUARE URLS----
        function foursquare(url,icon){
            $.ajax({
                url:url,
                dataType:'jsonp',
                success:function(res){
                    
                    let data = res.response.groups[0].items;

                    let venues = _(data).map(function(item){
                        return  {
                                    latlng:[item.venue.location.lat,item.venue.location.lng],
                                    lnglat:[item.venue.location.lng,item.venue.location.lat],
                                    description: item.venue.name,
                                    iconImage: icon,
                                    venueid: item.venue.id
                        };
                    });

                    _(venues).each(function(venue){

                        let venueIcon = L.icon({
                                                iconUrl: venue.iconImage,
                                                iconSize:[45,45]
                                                });


                        let result = leafletPip.pointInLayer(venue.lnglat,suburb);
                     
                        if(result.length > 0){
                            let marker = L.marker(venue.latlng,{icon:venueIcon});
                            group.addLayer(marker);

                            marker.venueid = venue.venueid;
                            
                            marker.on('click',function(){
                            let venueURL = 'https://api.foursquare.com/v2/venues/'+this.venueid+key;

                                $.ajax({
                                    url:venueURL,
                                    dataType:'jsonp',
                                    success:function(res){
                                        $('.modal-body').empty();
                                        
                                        let photos = [];
                                        if(res.response.venue.photos.groups[0]){

                                            photos = res.response.venue.photos.groups[0].items;

                                            _(photos).each(function(photo){
                                                let photoPath = photo.prefix +'100x100'+ photo.suffix;
                                                
                                                $('<img src='+photoPath+'>').appendTo('.modal-body');
                                            });
                                         }else{
                                            photo = ['img/no_image100.jpg'];
                                            $('<img src='+photo+'>').appendTo('.modal-body');
                                         }


                                        $('.modal-title').text(res.response.venue.name);
                                        $('.modal-footer>.row').text(res.response.venue.location.address +', '+ res.response.venue.location.city);
                                        $('#customModal').modal('show');
                                    }
                                });
                            });  
                        }
                    });
                }
            });
        }

    //----PROMISE BITS----(unused)
        function showVenues(data,icon){


            let venues = _(data).map(function(item){
                return  {
                            latlng:[item.venue.location.lat,item.venue.location.lng],
                            lnglat:[item.venue.location.lng,item.venue.location.lat],
                            description: item.venue.name,
                            iconImage: icon,
                            venueid: item.venue.id
                };
            });
            

            _(venues).each(function(venue){

                let venueIcon = L.icon({
                                        iconUrl: venue.iconImage,
                                        iconSize:[45,45]
                                        });


                let result = leafletPip.pointInLayer(venue.lnglat,suburb);
             
                if(result.length > 0){
                    let marker = L.marker(venue.latlng,{icon:venueIcon});
                    group.addLayer(marker);

                    marker.venueid = venue.venueid;
                    
                    marker.on('click',function(){
                    let venueURL = 'https://api.foursquare.com/v2/venues/'+this.venueid+key;

                        $.ajax({
                            url:venueURL,
                            dataType:'jsonp',
                            success:function(res){
                                $('.modal-body').empty();
                                
                                let photos = [];
                                 if(res.response.venue.photos.groups[0]){

                                    photos = res.response.venue.photos.groups[0].items;

                                    _(photos).each(function(photo){
                                        let photoPath = photo.prefix +'100x100'+ photo.suffix;
                                        
                                        $('<img src='+photoPath+'>').appendTo('.modal-body');
                                    });
                                 }else{
                                    photo = ['img/no_image100.jpg'];
                                    $('<img src='+photo+'>').appendTo('.modal-body');
                                 }


                                $('.modal-title').text(res.response.venue.name);
                                $('.modal-footer>.row').text(res.response.venue.location.address +', '+ res.response.venue.location.city);
                                $('#customModal').modal('show');
                            }
                        });
                    });  
                }
            });
        }

    //----SEARCH FUNCTION----
        let group = L.layerGroup().addTo(map);
        $('.btn-sm').on('click',function(){
            group.clearLayers();
            let keyword = $('.input-lg').val();
            let firstWord = _.first(keyword.split(" "));
            let gSearchURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.856556, 174.832381&radius=2000&keyword='+firstWord+'&key='+googleKey;
            google(gSearchURL,'marker2.svg');
        });

        $(document).keydown(function(e) {
            if(e.keyCode==13){
                group.clearLayers();
                let keyword = $('.input-lg').val();
                let firstWord = _.first(keyword.split(" "));
                let gSearchURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.856556, 174.832381&radius=2000&keyword='+firstWord+'&key='+googleKey;
            google(gSearchURL,'marker2.svg');
            }
        });

    //----ADD VENUE MARKERS TO MAP----
        $('#accommodation').on('click',function(){
            $('.button').removeClass('hovered');
            $('.accommodation').addClass('hovered');
            group.clearLayers();
            google(gAccomURL,'marker-bed.svg');
            map.setView(center, 15);
            map.removeControl(route);

        });
        $('#eateries').on('click',function(){
            $('.button').removeClass('hovered');
            $('.eateries').addClass('hovered');
            group.clearLayers();
            google(gEatURL,'marker-food.svg');
            map.setView(center, 15);
            route.remove();
        });
        $('#nightlife').on('click',function(){
            $('.button').removeClass('hovered');
            $('.nightlife').addClass('hovered');
            group.clearLayers();
            google(gNightURL,'marker-glass1.svg');
            map.setView(center, 15);
        });
        $('#shopping').on('click',function(){
            $('.button').removeClass('hovered');
            $('.shopping').addClass('hovered');
            group.clearLayers();
            google(gShopURL,'marker-shopping1.svg');
            map.setView(center, 15);
        });
        $('#transport').on('click',function(){
            $('.button').removeClass('hovered');
            $('.transport').addClass('hovered');
            group.clearLayers();
            google(gTransportURL,'marker-bus.svg');
            map.setView(center, 15);
        });
        $('#poi').on('click',function(){
            $('.button').removeClass('hovered');
            $('.poi').addClass('hovered');
            group.clearLayers();
            google(gPoiURL,'marker-star.svg');
            map.setView(center, 15);
        });
        $('#education').on('click',function(){
            $('.button').removeClass('hovered');
            $('.education').addClass('hovered');
            group.clearLayers();
            google(gEducationURL,'marker-school1.svg');
            map.setView(center, 15);
        });
        $('#entertainment').on('click',function(){
            $('.button').removeClass('hovered');
            $('.entertainment').addClass('hovered');
            group.clearLayers();
            google(gEntertainmentURL,'marker-film.svg');
            map.setView(center, 15);
        }); 

    //----HIDE BOOTSTRAP MODAL BACKDROP----  
       $('#customModal').on('shown.bs.modal', function (e) {
          $('.modal-backdrop').hide();
        });
});
