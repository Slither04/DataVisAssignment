const version = '?v=20170901';
const clientid = '&client_id=GZWWGV5KDNWWOJ4J2A222QLPHH2LG1AGAC0QZA1OCQAY5PHK';
const clientSecret = '&client_secret=KBEIA0BKMVHQEVAGH1ONVD51L2SXVOJYRFXBOI34G4Z4FTBU';
const key = version + clientid + clientSecret;

$(function() {

    let accomURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=hotel&limit=50&radius=2000';
    let eatURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&section=food&limit=50&radius=2000';
    let nightURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=bars&limit=50&radius=2000';
    let shopURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&section=shops&limit=50&radius=2000';
    let transportURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=transport&limit=50&radius=2000';
    let parkURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=parks&limit=50&radius=2000';
    let beachURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=beach&limit=50&radius=2000';
    let educationURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=school+college+education&limit=50&radius=2000';
    let entertainmentURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556, 174.832381&query=cinema&limit=50&radius=2000';


    let center = [-36.856556, 174.832381];
    // let mapSE = L.latLng(-36.870072, 174.861154);
    // let mapNW = L.latLng(-36.840198, 174.803304);
    // let bounds = L.latLngBounds(mapSE, mapNW);
    let map = L.map('map', {zoomControl: false }).setView(center, 15);
    let light = L.tileLayer('https://api.mapbox.com/styles/v1/kevinjack/cj7tv1qng1q8c2soer7mhhrii/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2V2aW5qYWNrIiwiYSI6ImNqNmxncnVzYzBycGIzMnBkaG5zdGQ3c3cifQ.Q7hR9waEn5UHMWUQ1v4fGQ', { minZoom: 15 }).addTo(map);
  
    // zoom in function
    $('#in').click(function() {
        map.setZoom(map.getZoom() + 1)
    });
    // zoom out function
    $('#out').click(function() {
        map.setZoom(map.getZoom() - 1)
    });
    // center map function
    $('#center').click(function() {
        map.setView(center, 15)
    });
      //  Mission Bay 
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


    let suburb = L.geoJSON(missionBayBound, {
        style: function(feature) {
            return {color: "#394263",fillOpacity:0};
        }
    }).addTo(map);
    
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

    $('#dropdown').hide();
    $('.hamburger').on('click',function() {
            $('#dropdown').slideToggle('quick');
            $('.hamburger').toggleClass('fa-bars');
            $('.hamburger').toggleClass('fa-times');
            $('.button').removeClass('hovered'); 
            group.clearLayers();      
    });

    $('.button').on('click',function(){
        $(this).addClass('current');
        $('#dropdown .button').not(this).removeClass('current');
    });
   
    let group = L.layerGroup().addTo(map);

    function selectURL(url,icon){
        $.ajax({
            url:url,
            dataType:'jsonp',
            success:function(res){
                
                let data = res.response.groups[0].items

                let venues = _(data).map(function(item){
                    return  {
                                latlng:[item.venue.location.lat,item.venue.location.lng],
                                lnglat:[item.venue.location.lng,item.venue.location.lat],
                                description: item.venue.name,
                                iconImage: icon,
                                venueid: item.venue.id
                    }
                });
                

                _(venues).each(function(venue){

                    let venueIcon = L.icon({
                                            iconUrl: venue.iconImage,
                                            iconSize:[40,40]
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
                                        photo = ['img/no_image100.jpg']
                                        $('<img src='+photo+'>').appendTo('.modal-body');
                                     }


                                    $('.modal-title').text(res.response.venue.name)
                                    $('.modal-footer>.row').text(res.response.venue.location.address +', '+ res.response.venue.location.city);
                                    $('#customModal').modal('show');


                                }
                            })
                        })  
                    }
                })
            }
        });
    };
    
     //promise bits
    function showVenues(data,icon){


            let venues = _(data).map(function(item){
                return  {
                            latlng:[item.venue.location.lat,item.venue.location.lng],
                            lnglat:[item.venue.location.lng,item.venue.location.lat],
                            description: item.venue.name,
                            iconImage: icon,
                            venueid: item.venue.id
                }
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
                                    photo = ['img/no_image100.jpg']
                                    $('<img src='+photo+'>').appendTo('.modal-body');
                                 }


                                $('.modal-title').text(res.response.venue.name)
                                $('.modal-footer>.row').text(res.response.venue.location.address +', '+ res.response.venue.location.city);
                                $('#customModal').modal('show');
                                console.log('hi');

                                // $('#customModal').on('show.bs.modal',function(){

                                //     console.log('bla');
                                //     //$('.modal-backdrop').removeClass('show');
                                // });

                            }
                        })
                    })  
                }
            })
    }

    $('.btn-sm').on('click',function(){
        group.clearLayers();
        let keyword = $('.input-lg').val();
        let searchURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556,174.832381&query='+keyword+'&limit=50&radius=2000';
        selectURL(searchURL,'marker2.svg');

    });

    $(document).keydown(function(e) {
        if(e.keyCode==13){
            group.clearLayers();
            let keyword = $('.input-lg').val();
            let searchURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.856556,174.832381&query='+keyword+'&limit=50&radius=2000';
            selectURL(searchURL,'marker2.svg');
        }
    });


    $('#accommodation').on('click',function(){
        $('.button').removeClass('hovered');
        $('.accommodation').addClass('hovered');
        group.clearLayers();
        selectURL(accomURL,'marker-bed.svg');
    });
    $('#eateries').on('click',function(){
        $('.button').removeClass('hovered');
        $('.eateries').addClass('hovered');
        group.clearLayers();
        selectURL(eatURL,'marker-food.svg');
    });
    $('#nightlife').on('click',function(){
        $('.button').removeClass('hovered');
        $('.nightlife').addClass('hovered');
        group.clearLayers();
        selectURL(nightURL,'marker-glass1.svg');
    });
    $('#shopping').on('click',function(){
        $('.button').removeClass('hovered');
        $('.shopping').addClass('hovered');
        group.clearLayers();
        selectURL(shopURL,'marker-shopping1.svg');
    });
    $('#transport').on('click',function(){
        $('.button').removeClass('hovered');
        $('.transport').addClass('hovered');
        group.clearLayers();
        selectURL(transportURL,'marker-bus.svg');
    });
    $('#poi').on('click',function(){
        $('.button').removeClass('hovered');
        $('.poi').addClass('hovered');
        group.clearLayers();
        
        let promisePark = $.ajax({
            url:parkURL,
            dataType:'jsonp'
        });

        let promiseBeach = $.ajax({
            url:beachURL,
            dataType:'jsonp'
        });

        $.when(promisePark,promiseBeach).done(function(res1,res2){

            let list1 = res1[0].response.groups["0"].items;
            let list2 = res2[0].response.groups["0"].items;
            let data = list1.concat(list2);
            showVenues(data,'marker-star.svg');
        });
    });
    $('#education').on('click',function(){
        $('.button').removeClass('hovered');
        $('.education').addClass('hovered');
        group.clearLayers();
        selectURL(educationURL,'marker-school1.svg');
    });
    $('#entertainment').on('click',function(){
        $('.button').removeClass('hovered');
        $('.entertainment').addClass('hovered');
        group.clearLayers();
        selectURL(entertainmentURL,'marker-film.svg');
    });
   

   $('#customModal').on('shown.bs.modal', function (e) {
      // do something...
      console.log('bla');
      $('.modal-backdrop').hide();
    })
    
});