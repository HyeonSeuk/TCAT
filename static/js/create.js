document.addEventListener('DOMContentLoaded', function() {
  var selectedDate = localStorage.getItem('selectedDate');
  var dateInput = document.getElementById('calendar-date-input');
  dateInput.value = selectedDate;
});

var maxFields = 5;  // 최대 필드 개수

function createDiv() {
  var newAddContainer = document.getElementById('new_add');
  var totalFormsInput = document.getElementById('id_dynamic_formset-TOTAL_FORMS');
  var fieldCount = parseInt(totalFormsInput.value);  // 변경된 부분

  if (fieldCount < maxFields) {
    var div = document.createElement('div');
    div.innerHTML = `
      <input type="text" name="dynamic_formset-${fieldCount}-field_title" placeholder="필드 제목">
      <input type="text" name="dynamic_formset-${fieldCount}-field_value" placeholder="필드 값">
    `;
    newAddContainer.appendChild(div);
    totalFormsInput.value = fieldCount + 1;  // 변경된 부분
  } else {
    alert("최대 필드 개수는 " + maxFields + "개입니다.");
  }
}

function deleteDiv() {
  var newAddContainer = document.getElementById('new_add');
  var lastFieldContainer = newAddContainer.lastElementChild;
  var totalFormsInput = document.getElementById('id_dynamic_formset-TOTAL_FORMS');
  var fieldCount = parseInt(totalFormsInput.value);

  if (lastFieldContainer) {
    newAddContainer.removeChild(lastFieldContainer);
    totalFormsInput.value = fieldCount - 1;
  }
}
