document.addEventListener('DOMContentLoaded', function() {
  var isDateClicked = localStorage.getItem('isDateClicked');
  var dateInput = document.getElementById('calendar-date-input');
  
  if (isDateClicked) {
    dateInput.setAttribute('name', 'date');
    var selectedDate = localStorage.getItem('selectedDate');
    dateInput.value = selectedDate;
  } else {
    dateInput.removeAttribute('name');
  }
});


var maxFields = 5;  // 최대 필드 개수

function createDiv() {
  var newAddContainer = document.getElementById('new_add');
  var totalFormsInput = document.getElementById('id_dynamic_formset-TOTAL_FORMS');
  var fieldCount = parseInt(totalFormsInput.value);  // 변경된 부분

  if (fieldCount < maxFields) {
    var div = document.createElement('div');
    div.innerHTML = `
      <input type="text" name="dynamic_formset-${fieldCount}-field_title" placeholder="제목" class="contents__add--title" required>
      <input type="text" name="dynamic_formset-${fieldCount}-field_value" placeholder="내용" class="contents__add--input" required>
    `;
    newAddContainer.appendChild(div);
    totalFormsInput.value = fieldCount + 1;  // 변경된 부분
  } else {
    alert("최대 항목 개수는 " + maxFields + "개입니다.");
  }
}

// 동적필드 삭제
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


// 이미지파일 이름 선택
// $(document).ready(function(){
//   var fileTarget = $('.filebox .upload-hidden');

//   fileTarget.on('change', function(){  // 값이 변경되면
//     if(window.FileReader){  // modern browser
//       var filename = $(this)[0].files[0].name;
//     } 
//     else {  // old IE
//       var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
//     }
    
//     // 추출한 파일명 삽입
//     $(this).siblings('.upload-name').val(filename);
//   });
// }); 

//preview image file
$(document).ready(function() {
  var imgTarget = $('#input-file');
  var select_previewImage = $('#select_previewImage');
  var select_modalImage = $('#select_modalImage');
  var modal = new bootstrap.Modal(document.getElementById('select_exampleModal'));

  imgTarget.on('change', function() {
    if (window.FileReader) {
      if (!$(this)[0].files[0].type.match(/image\//)) return;

      var reader = new FileReader();
      reader.onload = function(e) {
        var src = e.target.result;
        select_previewImage.attr('src', src);
        select_modalImage.attr('src', src);
      }
      reader.readAsDataURL($(this)[0].files[0]);
    }
  });

  select_previewImage.on('click', function() {
    modal.show();
  });
});

$('#select_exampleModal').on('hidden.bs.modal', function() {
  select_previewImage.attr('src', ''); // 이미지 초기화
  select_modalImage.attr('src', ''); // 이미지 초기화
  $('#input-file').val(''); // input 파일 선택 초기화
});


document.getElementById('input-file').addEventListener('change', function() {
  var select_previewImage = document.getElementById('select_previewImage');
  var cancelImageBtn = document.getElementById('cancelSelectImage');

  select_previewImage.src = URL.createObjectURL(this.files[0]);
  cancelImageBtn.style.display = 'inline-block';
});

// 이미지 취소 버튼 클릭 이벤트 처리
document.getElementById('cancelSelectImage').addEventListener('click', function() {
  var inputFile = document.getElementById('input-file');
  var select_previewImage = document.getElementById('select_previewImage');
  var cancelImageBtn = document.getElementById('cancelSelectImage');

  inputFile.value = '';
  select_previewImage.src = '';
  cancelImageBtn.style.display = 'none';
});
