function createDiv() {
  // 1. <div class="d-flex contents__title"> 요소 복제
  const titleContainer = document.querySelector('.contents__title');
  const newTitleContainer = titleContainer.cloneNode(true);
  
  // 2. <div class="contents__title--title"> 요소 초기화
  const titleElement = newTitleContainer.querySelector('.contents__title--title');
  titleElement.textContent = '';
  titleElement.contentEditable = true;
  
  // 3. 두 번째 <div> 요소 초기화
  const secondDiv = newTitleContainer.querySelector('.contents__title > div:nth-child(2)');
  secondDiv.textContent = '';
  secondDiv.contentEditable = true;
  
  // 4. 복제된 요소에서 ".contents__title" 클래스 제거
  newTitleContainer.classList.remove('contents__title');
  
  // 5. 복제된 요소에 "new-contents__price" 클래스 추가
  newTitleContainer.classList.add('new-contents__title');
  
  // 6. 복제된 요소를 <div class="contents__add"> 바로 앞에 추가
  const addButtonContainer = document.querySelector('.contents__add');
  addButtonContainer.parentNode.insertBefore(newTitleContainer, addButtonContainer);
}

function deleteDiv() {
  const titleContainers = document.querySelectorAll('.contents__title'); // 모든 생성된 요소 선택
  const newTitleContainers = document.querySelectorAll('.new-contents__title'); // 새로 추가된 요소만 선택

  if (newTitleContainers.length > 0) {
    const lastTitleContainer = newTitleContainers[newTitleContainers.length - 1]; // 가장 최근에 생성된 요소 선택
    lastTitleContainer.parentNode.removeChild(lastTitleContainer); // 요소 삭제
  }
}

