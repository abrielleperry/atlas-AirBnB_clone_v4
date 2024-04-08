$(document).ready(function () {
  $("#search").click(placesSearch);
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

  checkAPIStatus();
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
  const checkedAmenities = {};
  $('input[type="checkbox"]:checked').each(function () {
    const amenityId = $(this).data("id");
    const amenityName = $(this).data("name");
    checkedAmenities[amenityId] = amenityName;
  });

  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(checkedAmenities),
    dataType: "json",
    success: function (response) {
      $("section.places").empty();
      response.map((place) => {
        $("section.places").append(
          `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest(s)</div>
              <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
              <div class="number_bathrooms">
                ${place.number_bathrooms} Bathroom(s)
              </div>
            </div>
            <div class="description">${place.description}</div>
          </article>`
        );
      });
    },
  });
}
