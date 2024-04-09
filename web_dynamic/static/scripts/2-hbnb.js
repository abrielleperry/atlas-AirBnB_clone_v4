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
    $("#checkedAmenitiesList").text(amenitiesList);
  });

  checkAPIStatus();
});

function checkAPIStatus() {
  $.get("http://0.0.0.0:5001/api/v1/status/", { type: "GET" }, function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
}
