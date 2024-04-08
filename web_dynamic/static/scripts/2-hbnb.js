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

// Function to check API status and update the div#api_status accordingly
function checkAPIStatus() {
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/status/",
    type: "GET",
    success: function (response) {
      if (response.status === "OK") {
        $("div#api_status").addClass("available");
      } else {
        $("div#api_status").removeClass("available");
      }
    },
    error: function () {
      $("div#api_status").removeClass("available");
    },
  });

  checkAPIStatus();
}
