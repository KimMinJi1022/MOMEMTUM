const weather = document.querySelector(".js-weather");
const API_KEY = "eeefe5acc39c4c4049be76dcb6b2bcc2";
const COORDS = "coords"; //coord = 좌표

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function getWeather(lat,lng){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
      return response.json(); //데이터가 다 넘어온 뒤에 실행.
    })
    .then(function(JSON){ //fetch -> response -> JSON 순서대로 앞에 것이 실행되고 난 뒤에 실행.
       const temperature = JSON.main.temp;
       const place = JSON.name;
       weather.innerText = `${temperature} / ${place}`;
    });
}
function handleGeoSucces(position){
 const latitude = position.coords.latitude; //position에는 여러값들이 있는데 거기서 좌표의 latitude(위도) 선택.
 const longitude = position.coords.longitude;//position에는 여러값들이 있는데 거기서 좌표의 latitude(경도) 선택.
 const coordsObj = {
   latitude:latitude, //변수명과 key값의 이름이 같을 때는 ㅇㅇ:ㅇㅇ,ㅁㅁ:ㅁㅁ 이렇게 말고 ㅇㅇ,ㅁㅁ 이렇게 기재가능.
   longitude:longitude
 };
 saveCoords(coordsObj);
 getWeather(latitude,longitude); //위의 handleGeoSucces의 coordsObj에서 불러온 것.
}
function handleGeoError(){
  console.log("위치 정보를 읽을 수 없습니다.")
}
function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError); //callback 함수라고 다른 함수의 인자로 사용됨.
}
function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords===null){ /*LS에 값이 없으면 askForCoords를 불러오고 ask는 handleGeoSucces를 호출하는데
                          이 안에서 API호출. 마지막엔 getWeather을 호출하게 */
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords); //JSON.parse는 인수로 문자열을 자바스크립트 객체로 변환해줌.
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}


function init(){
  loadCoords();
}
init();
