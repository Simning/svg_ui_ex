const btnUp = document.querySelector('.btnUp'); // 위로 이동하는 버튼 요소를 선택
const btnDown = document.querySelector('.btnDown'); // 아래로 이동하는 버튼 요소를 선택
const panel = document.querySelector('.panel'); // 패널 요소를 선택
const panel_li = panel.querySelectorAll('li'); // 패널 내부의 li 요소들을 선택하여 NodeList에 저장
const len = panel_li.length - 1; // 패널 내부의 li 요소들의 개수를 저장 (인덱스는 0부터 시작하므로 -1)

let enableClick = true; // 클릭 이벤트 활성화 상태를 나타내는 변수

btnUp.addEventListener('click', e => { // 위로 이동 버튼에 클릭 이벤트 리스너 등록
  e.preventDefault(); // 기본 동작 방지

  if(enableClick){ // 클릭 이벤트 활성화 상태인 경우에만 실행
    enableClick = false; // 클릭 이벤트 비활성화
    moveUp(); // 위로 이동하는 함수 호출
  }
});

btnDown.addEventListener('click', e => { // 아래로 이동 버튼에 클릭 이벤트 리스너 등록
  e.preventDefault(); // 기본 동작 방지

  if(enableClick){ // 클릭 이벤트 활성화 상태인 경우에만 실행
    enableClick = false; // 클릭 이벤트 비활성화
    moveDown(); // 아래로 이동하는 함수 호출
  }
});

function moveUp(){
  let current_item = panel.querySelector('.on'); // 현재 활성화된 요소를 선택
  let current_index = parseInt(current_item.getAttribute('data-index')); // 활성화된 요소의 인덱스를 가져옴
  let next_index = null; // 다음으로 이동할 요소의 인덱스를 저장할 변수

  (current_index !== len) ? next_index = current_index + 1 : next_index = 0; // 다음으로 이동할 요소의 인덱스 계산
  current_item.classList.remove('on'); // 현재 활성화 클래스 제거
  current_item.classList.add('up'); // 위로 이동하는 애니메이션 클래스 추가

  panel_li[next_index].classList.add('down'); // 다음으로 이동할 요소에 아래로 이동하는 애니메이션 클래스 추가
  setTimeout(() => {
    panel_li[next_index].classList.remove('down'); // 다음으로 이동할 요소에서 아래로 이동하는 애니메이션 클래스 제거
    panel_li[next_index].classList.add('on'); // 다음으로 이동할 요소에 활성화 클래스 추가
    panel.querySelector('.up').classList.remove('up'); // 이전에 위로 이동했던 요소에서 위로 이동하는 애니메이션 클래스 제거
    enableClick = true; // 클릭 이벤트 다시 활성화
  }, 500); // 0.5초 후에 실행되는 타이머
}

function moveDown(){
  let current_item = panel.querySelector('.on'); // 현재 활성화된 요소를 선택
  let current_index = parseInt(current_item.getAttribute('data-index')); // 활성화된 요소의 인덱스를 가져옴
  let prev_index = null; // 이전으로 이동할 요소의 인덱스를 저장할 변수

  (current_index !== 0) ? prev_index = current_index - 1 : prev_index = len; // 이전으로 이동할 요소의 인덱스 계산
  current_item.classList.remove('on'); // 현재 활성화 클래스 제거
  current_item.classList.add('down'); // 아래로 이동하는 애니메이션 클래스 추가

  panel_li[prev_index].classList.add('up'); // 이전으로 이동할 요소에 위로 이동하는 애니메이션 클래스 추가
  setTimeout(() => {
    panel_li[prev_index].classList.remove('up'); // 이전으로 이동할 요소에서 위로 이동하는 애니메이션 클래스 제거
    panel_li[prev_index].classList.add('on'); // 이전으로 이동할 요소에 활성화 클래스 추가
    panel.querySelector('.down').classList.remove('down'); // 이전에 아래로 이동했던 요소에서 아래로 이동하는 애니메이션 클래스 제거
    enableClick = true; // 클릭 이벤트 다시 활성화
  }, 500)}; // 0.5