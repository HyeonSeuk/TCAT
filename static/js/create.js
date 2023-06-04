var addButton = document.getElementById('addButton');
var deleteButton = document.getElementById('deleteButton');
var maxFields = 5;  // 최대 필드 개수

document.addEventListener('DOMContentLoaded', function() {
  var selectedDate = localStorage.getItem('selectedDate');
  var dateInput = document.getElementById('calendar-date-input');
  dateInput.value = selectedDate;
});


function createDiv() {
  var newAddContainer = document.getElementById('new_add');
  var fieldCount = newAddContainer.childElementCount;

  if (fieldCount < maxFields) {
    var div = document.createElement('div');
    div.innerHTML = `
      <input type="text" name="dynamic_formset-field_title" placeholder="필드 제목">
      <input type="text" name="dynamic_formset-field_value" placeholder="필드 값">
    `;
    newAddContainer.appendChild(div);
  } else {
    alert("최대 필드 개수는 " + maxFields + "개입니다.");
  }
}

function deleteDiv() {
  var newAddContainer = document.getElementById('new_add');
  var lastFieldContainer = newAddContainer.lastElementChild;

  if (lastFieldContainer) {
    newAddContainer.removeChild(lastFieldContainer);
  }
}