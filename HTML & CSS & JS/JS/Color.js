var BodyOfThisPage = {
  setLinkColor: function(InputColor) {
    $('a').css('color', InputColor);
    // jQuery를 통해 한번에 같은 종류의 태그들을 처리

    // var LinkList = document.querySelectorAll('a');
    // var index = 0;
    // while (index < LinkList.length) {
    //   LinkList[index].style.color = InputColor;
    //   index += 1;
    // }
    // 라이브러리가 없을 때 반복문으로 같은 종류의 태그들을 처리
  },
  setBackgroundColor: function(InputColor) {
    $('body').css('backgroundColor', InputColor);
    // jQuery를 통한 웹 제어

    //document.querySelector('body').style.backgroundColor = InputColor;
    // 라이브러리가 없을 때 JS로 웹을 제어
  },
  setTextColor: function(InputColor) {
    $('body').css('color', InputColor);
    // jQuery를 통한 웹 제어

    //document.querySelector('body').style.color = InputColor;
    // 라이브러리가 없을 때 JS로 웹을 제어
  },
  DisplayModeToggle: function(InputTag) {
    var BodyOfThisPage = document.querySelector('body');
    if (InputTag.value === 'night') {
      BodyOfThisPage.setBackgroundColor('black');
      BodyOfThisPage.setTextColor('white');
      BodyOfThisPage.setLinkColor('powderblue');
      InputTag.value = 'day';
    } else {
      BodyOfThisPage.setBackgroundColor('white');
      BodyOfThisPage.setTextColor('black');
      BodyOfThisPage.setLinkColor('blue');
      InputTag.value = 'night';
    }
  }
} // 객체, 관련된 함수와 변수들을 묶어놓아 정리할 수 있는 변수
// script 태그에 들어갈 JS 코드를 파일로 쪼개 관리하면 더 편리
