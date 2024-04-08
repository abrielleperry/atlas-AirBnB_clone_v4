$(document).ready(function () {
  const checkedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data("id");
    const amenityName = $(this).data("name");

    if (this.checked) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }

    const amenitiesList = Object.values(checkedAmenities).join(", ");
    $(".amenities > h4").text(amenitiesList);
  });
});

// Task 3: Check API status
function checkAPIStatus() {
  $.get("http://0.0.0.0:5001/api/v1/status/", { type: "GET" }, function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
}

// Task 4: Fetch places from the API
function placesSearch() {
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search",
    type: "POST",
    contentType: "application/json",
    data: {},
    dataType: "json",
    success: function (response) {
      $("section.places").append(
        response.map((places) => {
          return (
            <article>
              <div class="title_box">
                <h2>{places.name}</h2>
                <div class="price_by_night">${places.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">{places.max_guest} Guest(s)</div>
                <div class="number_rooms">{places.number_rooms} Bedroom(s)</div>
                <div class="number_bathrooms">
                  {places.number_bathrooms} Bathroom(s)
                </div>
              </div>
              <div class="description">${places.description}</div>
            </article>
          );
        })
      );
    },
  });
}
