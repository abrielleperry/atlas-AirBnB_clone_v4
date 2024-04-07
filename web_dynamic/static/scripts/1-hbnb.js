#!/usr/bin/node
const checkedAmenities = {};
$(document).ready(function () {
  // Listen for changes on each input checkbox
  $('li input[type="checkbox"]').on("change", function () {
    // This function executes when the state of a checkbox changes

    // Get the Amenity ID from the data-id attribute of the checkbox's parent <li> tag
    var amenityID = $(this).closest("li").data("id");
    // Get the Amenity Name from the data-name attribute of the checkbox's parent <li> tag
    var amenityName = $(this).closest("li").data("name");

    // If the amenity name is already in the list, remove it
    if (checkedAmenities.hasOwnProperty(amenityName)) {
      delete checkedAmenities[amenityName];
      // Otherwise, add the amenity name and its ID to the object
    } else {
      checkedAmenities[amenityName] = amenityID;
    }

    // Update the h4 tag inside the div with id "amenities"
    updateAmenitiesList();
  });

  // Function to update the h4 tag inside the div with id "amenities"
  function updateAmenitiesList() {
    // Get the keys (Amenity IDs) from the checkedAmenities object
    var amenityNames = Object.keys(checkedAmenities);

    // Update the text inside the h4 tag with the list of checked amenities separated by commas
    $("div#amenities > h4").text(amenityNames.join(", "));
  }
});
