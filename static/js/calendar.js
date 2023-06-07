// FullCalendar 
document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  var datepickerEl = document.querySelector('.datepicker');
  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'ko',
    droppable: true,
    editable: true,
    dayMaxEvents: 1,
    headerToolbar: {
      start: '',
      right: 'prev,next today',
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
                image_url: event.image_url,
                tcat_pk: event.tcat_pk
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
          html: '<img src="/static/image/noimg.png" alt="No Image" style="width:100%; height:170px;">'
        };
      }
    },
    eventClick: function(arg) {
      var tcatPk = arg.event.extendedProps.tcat_pk;
      window.location.href = '/tcat/' + tcatPk + '/';
    },
    dateClick: function(info) {
      var selectedDate = info.dateStr;
      localStorage.setItem('selectedDate', selectedDate);
      window.location.href = '/tcat/create/';
    },
    eventDrop: function(info) {
      var eventId = info.event.extendedProps.tcat_pk;
      var newDate = moment(info.event.start).format('YYYY-MM-DD');

      $.ajax({
        url: '/tcat/update_event/',
        type: 'POST',
        data: {
          event_id: eventId,
          new_date: newDate
        },
        success: function(response) {
          console.log('Event date updated successfully');
        },
        error: function(xhr, status, error) {
          failureCallback(xhr, status, error);
        }
      });
    }
  });

  calendar.render();

  // Bootstrap Datepicker
  $('.datepicker').datepicker({
    format: 'yyyy-mm-dd',
    language: 'ko',
    autoclose: true,
    todayHighlight: true,
    startDate: null
  }).on('changeDate', function (e) {
    var selectedDate = moment(e.date).format('YYYY-MM-DD');
    calendar.gotoDate(selectedDate);
  });
  
  // datepicker의 초기값으로 FullCalendar 이동
  var initialDate = moment($('.datepicker').val(), 'YYYY-MM-DD');
  if (initialDate.isValid()) {
    calendar.gotoDate(initialDate);
  }

  var initialDate = moment().format('YYYY-MM-DD'); // 오늘 날짜
  $(datepickerEl).datepicker('setDate', initialDate);

  // FullCalendar 헤더의 "next" 버튼 클릭 이벤트
  var nextButton = calendarEl.querySelector('.fc-next-button');
  nextButton.addEventListener('click', function () {
    calendar.incrementDate({ months: 1 });
    var currentDate = calendar.getDate().toISOString().split('T')[0];
    $(datepickerEl).datepicker('setDate', currentDate);
  });

  // FullCalendar 헤더의 "prev" 버튼 클릭 이벤트
  var prevButton = calendarEl.querySelector('.fc-prev-button');
  prevButton.addEventListener('click', function () {
    calendar.incrementDate({ months: 1 });
    var currentDate = calendar.getDate().toISOString().split('T')[0];
    $(datepickerEl).datepicker('setDate', currentDate);
  });

   // FullCalendar 헤더의 "today" 버튼 클릭 이벤트
  var todayButton = calendarEl.querySelector('.fc-today-button');
  todayButton.addEventListener('click', function () {
    var todayDate = moment().format('YYYY-MM-DD');
    $(datepickerEl).datepicker('setDate', todayDate);
    calendar.gotoDate(todayDate);
  });

  datepickerEl.style.paddingLeft = '10px';
  datepickerEl.style.border = '1px solid var(--fourth-color)';
  datepickerEl.style.fontSize = '20px';

  // prevButton.style.backgroundColor = 'white';
  // prevButton.style.border = '1px solid var(--fourth-color)';
  // prevButton.style.color = 'black';
  // nextButton.style.backgroundColor = 'white';
  // nextButton.style.border = '1px solid var(--fourth-color)';
  // nextButton.style.color = 'black';

  prevButton.style.backgroundColor = 'var(--fourth-color)';
  prevButton.style.border = 'none';
  nextButton.style.backgroundColor = 'var(--fourth-color)';
  nextButton.style.border = 'none';

});

// HTML2Canvas - 캡쳐
$(function() {
  $("#save").click(function() {
    var elementToCapture = document.querySelector('.header-datepicker');

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
          alert("캘린더 이미지 저장 완료");
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