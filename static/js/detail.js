
// HTML2Canvas - 캡쳐
$(function() {
  $("#save").click(function() {
    var elementToCapture = document.querySelector('.detail__container');

    html2canvas(elementToCapture, { useCORS: true }).then(function(result) {
      var data = result.toDataURL();

      function downloadURI(uri, name){
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
      }
      downloadURI(data, "calendar.png");

      $.ajax({
        type: 'POST',
        url: '/tcat/capture/',
        data: { data: data },
        success: function(result) {
          alert("리뷰 이미지 저장 완료");
          console.log(result);
        },
        error: function(e) {
          alert("에러 발생");
          console.log(e);
        }
      });
    });
  });
});