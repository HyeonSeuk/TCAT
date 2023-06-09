// 동적필드 추가
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
      <input type="text" name="dynamic_formset-${fieldCount}-field_title" placeholder="필드 제목" class="contents__add--title" required>
      <input type="text" name="dynamic_formset-${fieldCount}-field_value" placeholder="필드 내용" class="contents__add--input" required>
    `;
    newAddContainer.appendChild(div);
    totalFormsInput.value = fieldCount + 1;  // 변경된 부분
  } else {
    alert("최대 필드 개수는 " + maxFields + "개입니다.");
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
var imgTarget = $('.preview-image .upload-hidden');

imgTarget.on('change', function(){
    var parent = $(this).parent();
    parent.children('.upload-display').remove();

    if(window.FileReader){
        // image 파일만
        if (!$(this)[0].files[0].type.match(/image\//)) return;
        
        var reader = new FileReader();
        reader.onload = function(e){
            var src = e.target.result;
            parent.append('<div class="upload-display"><div class="upload-thumb-wrap"><img src="'+src+'" class="upload-thumb"></div></div>');
        }
        reader.readAsDataURL($(this)[0].files[0]);
    }

    else {
        $(this)[0].select();
        $(this)[0].blur();
        var imgSrc = document.selection.createRange().text;
        parent.append('<div class="upload-display"><div class="upload-thumb-wrap"><img class="upload-thumb"></div></div>');

        var img = $(this).siblings('.upload-display').find('img');
        img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";        
    }
});