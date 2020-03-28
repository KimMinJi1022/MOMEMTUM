const form = document.querySelector(".js-form"),
    input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const haveAnice = document.querySelector(".haveAnice");
const haveAgreeting = document.querySelector(".haveAgreeting");
const USER_LS = "currentUser",
    SHOWING_CN = "showing",
    hide = "hide",
    inline_block = "inline-block";



function saveName(text){
    localStorage.setItem(USER_LS,text);
}
function handleSubmit(event){
    event.preventDefault(); //이벤트 기본값이 enter를 치면 값이 날아가는데 그걸 방지해주는 함수.
    const currentValue = input.value;
    console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    haveAnice.classList.add(hide);
    haveAgreeting.classList.add(hide);
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit); //제출을 하면 handlesubmit 함수 실행
}

function paintGreeting(text){
    haveAgreeting.classList.remove(hide);
    haveAgreeting.classList.add(SHOWING_CN);
    form.classList.remove(SHOWING_CN);// display : block 속성인 클래스 showing을 form에서 지워라. = form 나타냄을 해제.
    haveAnice.classList.remove(hide);
    haveAnice.classList.add(inline_block);
    greeting.classList.add(inline_block);// display : none이었던 greeting에 display : block을 적용시켜라.
    greeting.innerText = `${text}! ;)`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser===null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}
function init(){
loadName();
}

init();
