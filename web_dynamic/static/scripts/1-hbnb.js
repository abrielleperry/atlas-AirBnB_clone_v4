$(document).ready(function () {
    const checkedAmenities = {};

$('.amenities input[type="checkbox"]').change(function () {
    const amenityId = $(this).data("id");
    const amenityName = $(this).data("name");

    if (this.checked) {
        checkedAmenities[amenityId] = amenityName;
    } else {
        delete checkedAmenities[amenityId];
    }

    updateCheckedAmenities();

    function updateCheckedAmenities() {
        var amenityNames = Object.values(checkedAmenities).join(", ");
        $(".amenities > h4").text(amenityNames);
    }
    });
});
