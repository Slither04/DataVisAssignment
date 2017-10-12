const version = '?v=20170901';
const clientid = '&client_id=GZWWGV5KDNWWOJ4J2A222QLPHH2LG1AGAC0QZA1OCQAY5PHK';
const clientSecret = '&client_secret=KBEIA0BKMVHQEVAGH1ONVD51L2SXVOJYRFXBOI34G4Z4FTBU';
const key = version + clientid + clientSecret;

$(function() {

    let accomURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.883783,174.755945&query=hotel&limit=50&radius=2000';
    let eatURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.883783,174.755945&section=food&limit=50&radius=2000';
    let nightURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.883783,174.755945&query=bars&limit=50&radius=2000';
    let shopURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.883783,174.755945&section=shops&limit=50&radius=2000';
    let transportURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.883783,174.755945&query=transport&limit=50&radius=2000';
    let parkURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.883783,174.755945&query=parks&limit=50&radius=2000';
    let edenURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.883783,174.755945&query=mountain&limit=50&radius=2000';
    let educationURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.883783,174.755945&query=school&limit=50&radius=2000';
    let entertainmentURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.883783,174.755945&query=cinema&limit=50&radius=2000';

    let center = [-36.883783,174.755945];
    // let mapSE = L.latLng(-36.877484,174.758376);
    // let mapNW = L.latLng(-36.862841,174.729258);
    // let bounds = L.latLngBounds(mapSE, mapNW);
    let map = L.map('map', {zoomControl: false }).setView(center, 15);
    let light = L.tileLayer('https://api.mapbox.com/styles/v1/kevinjack/cj7tv1qng1q8c2soer7mhhrii/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2V2aW5qYWNrIiwiYSI6ImNqNmxncnVzYzBycGIzMnBkaG5zdGQ3c3cifQ.Q7hR9waEn5UHMWUQ1v4fGQ', { minZoom: 14 }).addTo(map);
  
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
      //  Mt Eden 
    let mtEdenPoly = {
        latlngs: [
            [-36.86631738325782,174.76733207702637],
            [-36.868394555022846,174.76160287857053],
            [-36.867896725613114,174.75756883621216],
            [-36.869905189926264,174.7498655319214],
            [-36.87199942981202,174.74688291549683],
            [-36.87333833997931,174.7423553466797],
            [-36.87467722667795,174.73651885986328],
            [-36.875140681990274,174.73630428314206],
            [-36.876857158651724,174.74591732025146],
            [-36.89530684632337,174.74025249481198],
            [-36.90021457048956,174.7633409500122],
            [-36.89486067393149,174.76488590240479],
            [-36.894105607018865,174.76145267486572],
            [-36.87793851914176,174.7668170928955],
            [-36.86631738325782,174.76733207702637]
        ]
    }
    let polygon = L.polygon(mtEdenPoly.latlngs, { color: '#394263', fillColor: '#394263', fillOpacity: 0.2, weight: 2 });
    let polygonZoom = L.polygon(mtEdenPoly.latlngs, { color: '#394263', fillColor: '#394263', fillOpacity: 0, weight: 2 });

    map.addLayer(polygon);


    let suburb = L.geoJSON(mtEdenBound, {
        style: function(feature) {
            return {color: "#394263",fillOpacity:0};
        }
    }).addTo(map);
    
    map.on('zoomend', function(e) {

        let zoomLevel = map.getZoom();

        if (zoomLevel < 14) {
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
        let searchURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.870292,174.745115&query='+keyword+'&limit=50&radius=2000';
        selectURL(searchURL,'marker2.svg');

    });
    $(document).keydown(function(e) {
        if(e.keyCode==13){
            group.clearLayers();
            let keyword = $('.input-lg').val();
            let searchURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.870292,174.745115&query='+keyword+'&limit=50&radius=2000';
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
            url:edenURL,
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