$("#cancelSelectImage").on("click", function() {
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  $.ajax({
    url: "/tcat/delete_image/" + tcat_pk + "/",
    type: "POST",
    dataType: "json",
    headers: {'X-CSRFToken': csrftoken},
    data: {
      image: image,
      image_url: image_url,
    },
    success: function(response) {
      console.log(response.message);
    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  });
});


$("#cancelPreviewImage").on("click", function() {
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  $.ajax({
    url: "/tcat/delete_web_image/" + tcat_pk + "/",
    type: "POST",
    dataType: "json",
    headers: {'X-CSRFToken': csrftoken},
    data: {
      web_image: web_image,
      web_image_url: web_image_url,
    },
    success: function(response) {
      console.log(response.message);
    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  });
});
