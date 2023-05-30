// FullCalendar 
document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'ko',
    droppable: true,
    editable: true,
    dayMaxEvents: 1,
    headerToolbar: {
      left: 'title',
      right: 'prev,next today'
    },
    events: function(info, successCallback, failureCallback) {
      $.ajax({
        url: '/tcat/all_events/',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
          var events = response.map(function(event) {
            return {
              date: event.date,
              title: event.title,
              rendering: 'background',
              extendedProps: {
                image_url: event.image_url
              }
            };
          });
          successCallback(events);
        },
        error: function(xhr, status, error) {
          failureCallback(xhr, status, error);
        }
      });
    },
    eventContent: function(arg) {
      // 이벤트 내용을 커스터마이즈하여 이미지를 추가
      if (arg.event.extendedProps.image_url) {
        return {
          html: '<img src="' + arg.event.extendedProps.image_url + '" alt="Event Image" style="width:100%; height:170px;">'
        };
      } else {
        return {
          text: arg.event.title
        };
      }
    }
  });

  calendar.render();

  // Bootstrap Datepicker
  $('.datepicker').datepicker({
    format: 'yyyy-mm-dd',
    language: 'ko',
    autoclose: true,
    todayHighlight: true
  }).on('changeDate', function (e) {
    var selectedDate = moment(e.date).format('YYYY-MM-DD');
    calendar.gotoDate(selectedDate);
  });
  
  // datepicker의 초기값으로 FullCalendar 이동
  var initialDate = moment($('.datepicker').val(), 'YYYY-MM-DD');
  if (initialDate.isValid()) {
    calendar.gotoDate(initialDate);
  }  
});