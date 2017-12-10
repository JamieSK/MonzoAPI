let MapWrapper = function(container, centre, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: centre,
    zoom: zoom,
  });
  this.markers = [];
};

MapWrapper.prototype = {
  addMarker: function(centre, label, info) {
    let marker = new google.maps.Marker({
      position: centre,
      map: this.googleMap,
      label: label,
    });
    this.markers.push(marker);
    let infowindow = new google.maps.InfoWindow({
      content: info,
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  },
  addClickEvent: function() {
    google.maps.event.addListener(this.googleMap, 'click', (event) => {
      this.addMarker(event.latLng);
    });
  },
  bounceMarkers: function() {
    this.markers.forEach((marker) => {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  },
  whereAmI: function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      this.googleMap.setCenter({lat, lng});
    }.bind(this));
  },
};
