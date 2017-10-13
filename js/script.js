const version = '?v=20170901';
const clientid = '&client_id=GZWWGV5KDNWWOJ4J2A222QLPHH2LG1AGAC0QZA1OCQAY5PHK';
const clientSecret = '&client_secret=KBEIA0BKMVHQEVAGH1ONVD51L2SXVOJYRFXBOI34G4Z4FTBU';
const key = version + clientid + clientSecret;
const googleKey = 'AIzaSyB-YvhFo-QJIakIOwNjXgTI5SOJIix8ckU';

$(function() {
    
    //----GOOGLE URLS----
        let gAccomURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.7852,174.7659&radius=2000&type=lodging&key='+googleKey;
        let gEatURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.7852,174.7659&radius=2000&type=food&key='+googleKey;
        let gNightURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.7852,174.7659&radius=2000&type=bar&key='+googleKey;
        let gShopURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.7852,174.7659&radius=2000&type=store&key='+googleKey;
        let gTransportURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.7852,174.7659&radius=2000&type=bus_station&key='+googleKey;
        let gPoiURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.7852,174.7659&radius=2000&type=point_of_interest&key='+googleKey;
        let gEducationURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.7852,174.7659&radius=2000&type=school&key='+googleKey;
        let gEntertainmentURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.7852,174.7659&radius=2000&type=movie_rental&key='+googleKey;

    //----FOURSQUARE URLS----
        let accomURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.7852,174.7659&query=hotel&limit=50&radius=2000';
        let eatURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.7852, 174.7659&section=food&limit=50&radius=2000';
        let nightURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.7852, 174.7659&query=bars&limit=50&radius=2000';
        let shopURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.7852, 174.7659&section=shops&limit=50&radius=2000';
        let transportURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.7852, 174.7659&query=bus&limit=50&radius=2000';
        let parkURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.7852, 174.7659&query=parks&limit=50&radius=2000';
        let beachURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.7852, 174.7659&query=beach&limit=50&radius=2000';
        let educationURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.7852, 174.7659&query=school+college+education&limit=50&radius=2000';
        let entertainmentURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.7852, 174.7659&query=fun&limit=50&radius=2000';

    //----MAP SETUP----
        let center = [-36.78529801780085, 174.76595878601074];
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

    //----TAKAPUNA POLYGON---- 
        let takapunaPoly = {
            latlngs: [
                [-36.77993607001704, 174.74793434143066],
                [-36.79373545150328, 174.75709676742554],
                [-36.79535065870498, 174.7591781616211],
                [-36.79792804647051, 174.76211786270142],
                [-36.797721858640735, 174.76516485214233],
                [-36.79634725892455, 174.7668385505676],
                [-36.79655345045458, 174.7676968574524],
                [-36.79729229887935, 174.7680401802063],
                [-36.79718920417815, 174.768705368042],
                [-36.797275116438776, 174.7690486907959],
                [-36.79670809373787, 174.76975679397583],
                [-36.796123884140684, 174.76977825164795],
                [-36.79596923967795, 174.77089405059814],
                [-36.79706892685138, 174.7729754447937],
                [-36.7949554515793, 174.77685928344727],
                [-36.795848960435535, 174.77761030197144],
                [-36.79244669792634, 174.78029251098633],
                [-36.78878651955129, 174.77630138397217],
                [-36.78662126129863, 174.77503538131714],
                [-36.785401128504695, 174.77479934692383],
                [-36.78442157121647, 174.7754430770874],
                [-36.78473090644969, 174.77630138397217, ],
                [-36.78440438588912, 174.77673053741455],
                [-36.78373415511651, 174.77640867233276],
                [-36.782703019404906, 174.7772240638733],
                [-36.78218744634638, 174.77692365646362],
                [-36.780846940161865, 174.77694511413574],
                [-36.779626715429806, 174.77784633636475],
                [-36.77873301738629, 174.77763175964355],
                [-36.777942429661536, 174.7763442993164],
                [-36.773508112603324, 174.77587223052979],
                [-36.77199557370019, 174.77402687072754],
                [-36.77467687222591, 174.77295398712158],
                [-36.77594014383787, 174.77242827415466],
                [-36.77575967773931, 174.77149486541748],
                [-36.776077641532574, 174.7705614566803],
                [-36.777684627553455, 174.76943492889404],
                [-36.77711745986356, 174.76810455322266],
                [-36.77605186073361, 174.7668707370758],
                [-36.77551905561366, 174.76574420928955],
                [-36.77534718220434, 174.76428508758545],
                [-36.77567374135257, 174.76297616958618],
                [-36.77630966833312, 174.7609806060791],
                [-36.77704871197962, 174.75954294204712],
                [-36.77847521793724, 174.75922107696533],
                [-36.78057196163621, 174.75922107696533],
                [-36.78041728578198, 174.7580623626709],
                [-36.77916268120784, 174.75632429122922],
                [-36.781070359487515, 174.7542428970337],
                [-36.78263427653083, 174.75297689437866],
                [-36.78005637424152, 174.7497797012329],
                [-36.77993607001704, 174.74793434143066]
            ]
        };

    //----ADD POLYGONS TO MAP----
        let polygon = L.polygon(takapunaPoly.latlngs, { color: '#394263', fillColor: '#394263', fillOpacity: 0.2, weight: 1, opacity:0 });
        let polygonZoom = L.polygon(takapunaPoly.latlngs, { color: '#394263', fillColor: '#394263', fillOpacity: 0, weight: 1, opacity:0 });
        map.addLayer(polygon);
        map.on('zoomend', function(e) {

            let zoomLevel = map.getZoom();

            if (zoomLevel <= 15) {
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
        let suburb = L.geoJSON(takapunaBound, {
            style: function(feature) {
                return {color: "#394263",fillOpacity:0, opacity:0};
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
            let gSearchURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.7852,174.7659&radius=2000&keyword='+firstWord+'&key='+googleKey;
            google(gSearchURL,'marker2.svg');
        });

        $(document).keydown(function(e) {
            if(e.keyCode==13){
                group.clearLayers();
                let keyword = $('.input-lg').val();
                let firstWord = _.first(keyword.split(" "));
                let gSearchURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-36.7852,174.7659&radius=2000&keyword='+firstWord+'&key='+googleKey;
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
        });
        $('#eateries').on('click',function(){
            $('.button').removeClass('hovered');
            $('.eateries').addClass('hovered');
            group.clearLayers();
            google(gEatURL,'marker-food.svg');
            map.setView(center, 15);
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
