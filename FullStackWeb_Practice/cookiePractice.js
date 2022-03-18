var http = require('http');
var cookie = require('cookie');
var app = http.createServer( function (request, response) {
  var cookies = {};
  if (request.header.cookie != undefined) {
    cookies = cookie.parse(request.header.cookie); // 모듈을 통해 쿠키값을 딕셔너리 형태의 객체로 받아 올 수 있음
    console.log(cookies.User); // 객체의 각각의 쿠키값에 접근가능
  }
  response.writeHead(200, { // 웹서버의 응답 메세지를 조절
    'Set-Cookie': [         // 첫 번째는 응답 정상/비정상을 구분하는 값이 들어가고, 두 번째에는 객체가 들어감, 객체를 통해 쿠키 생성 가능
      'User=LSH',           // 세션 쿠키 선언
      `Mincho=Good; Max-Age=${60*60*24*30}`, // 퍼머넌트 쿠키 선언, Max-Age나 Expires 인자를 통해 지속시간이나 소멸시점을 정해줄 수 있음
      `Number=1234567890; Secure`, // 시큐어 쿠키 선언, Secure 키워드를 붙여줌
      `PineapplePizza=No; HttpOnly`, // HTTP 온리 쿠키 선언, HttpOnly 키워드를 붙여줌
      `CommentFunction=True; Path=/page` // 패스 옵션 적용
    ];
  });
  response.end("Cookie!");
}).listen(3000);


// 쿠키를 통해 정보 개인화, 사용자 인증, 사용자 추적을 할 수 있음 각종 사용자 정보가 들어있으므로 보안에 유의해야하는 중요한 정보임
// 세션 쿠키, 휘발성, 브라우저 끄면 사라짐vs 퍼머넌트 쿠키, 비휘발성, 브라우저 꺼도 사라지지 않음
// 시큐어 쿠키, HTTPS를 통해 접속한 경우에만 쿠키 생성, 자바스크립트로 접근 불가 vs HTTP 온리 쿠키, HTTP를 통해 접속한 경우에만 쿠키 생성, 자바스크립트로 접근 불가
// 패스, 특정한 디렉토리에 접속한 경우에만 쿠기 생성, 그 디렉토리의 하위 디렉토리에서는 항상 작동 vs 도메인, 특정 도메인에 접속한 경우에만 쿠키 생성, 그 도메인의 서브 도메인에서는 항상 작동
