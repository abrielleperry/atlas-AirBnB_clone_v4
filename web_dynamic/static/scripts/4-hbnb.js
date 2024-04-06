$(document).ready(function() {
  // Initialize an object to store checked amenity IDs
  var checkedAmenities = {};

  // Listen for changes on each input checkbox
  $('input[type="checkbox"]').change(function() {
      // This function executes when the state of a checkbox changes

      // Get the Amenity ID from the data-id attribute of the checkbox's parent <li> tag
      var amenityID = $(this).closest('li').data('id');

      // Check if the checkbox is checked
      if ($(this).is(':checked')) {
          // If checked, add the Amenity ID to the checkedAmenities object
          checkedAmenities[amenityID] = true;
      } else {
          // If unchecked, remove the Amenity ID from the checkedAmenities object
          delete checkedAmenities[amenityID];
      }
  });

  // Function to make a POST request to places_search with checked amenities
  $('#filterButton').click(function() {
      // Make a POST request to places_search with the list of checked amenities
      $.ajax({
          type: 'POST',
          url: 'http://0.0.0.0:5001/api/v1/places_search',
          contentType: 'application/json',
          data: JSON.stringify({ amenities: Object.keys(checkedAmenities) }),
          success: function(response) {
              // Clear existing places before adding filtered places
              $('section.places').empty();

              // Loop through the response and create article tags for each place
              response.forEach(function(place) {
                  var article = $('<article>');
                  var name = $('<h2>').addClass('title_box').text(place.name);
                  article.append(name);
                  var description = $('<p>').text(place.description);
                  article.append(description);
                  $('section.places').append(article);
              });
          },
          error: function(xhr, status, error) {
              // Log any errors to the console
              console.error('Error:', error);
          }
      });
  });
});
