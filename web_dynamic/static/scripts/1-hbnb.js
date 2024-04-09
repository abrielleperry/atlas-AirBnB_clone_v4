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

    localStorage.setItem("checkedAmenities", JSON.stringify(checkedAmenities));
    updateAmenitiesList();
  });

  function updateAmenitiesList() {
    const amenitiesList = Object.values(checkedAmenities).join(", ");
    $(".amenities h4").text(amenitiesList);
  }

  updateAmenitiesList();
});
