const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

    const TODOS_LS = "toDos";
    let toDos = []; //15번째 줄에서 cleanToDos를 toDos로 지정해야 되는데 const는 상수니까 바뀌지 않음. 고로 let으로 변경

    function deleteToDo(event){ //괄호 안의 의미는 '받을 값'.
      const btn = event.target; //값의 target(값의 여러가지 정보들)
      const li = btn.parentNode; /*btn의 부모를 찾음. parentNode = target의 한 목록. 부모를 지워야하는 이유가
                                  button이 li안에 있는 태그이다. 버튼의 부모인 li를 지우는게 최종 목적이므로 부모를 찾아야됨*/
      toDoList.removeChild(li); //toDoList에 있는 자식을 찾아서 지워줌.
      const cleanToDos = toDos.filter(function(toDo){ //filter는 toDos의 값들에게 괄호안에 있는 함수를 실행시켜줌.
        return toDo.id !== parseInt(li.id);
        });
      toDos = cleanToDos;
      saveToDos(); //새로운 값인 cleanToDos를 toDos에 넣어주고 saveToDos함수 실행시켜서 toDos에 저장.

    }

    function saveToDos(){
        localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); //입력받은 toDos를 TODOS_LS에 저장. setItem은 돌려보내는것.
    }                                                         /*JSON.stringify는 object를 string로 바꿔줌.
                                                                (JavaScript Object Notation(표기법))*/
    function paintToDo(text){
        const li = document.createElement("li"); //HTML에서 만들지 않고 JS에서 바로 생성.
        const delBtn = document.createElement("button");
        const span = document.createElement("span");
        const newId = toDos.length + 1; //할일 목록 li에 순서대로인 ld생성.
        delBtn.innerText = "×";
        delBtn.addEventListener("click", deleteToDo);
        span.innerText = text; //paintToDo에서 온 text
        li.appendChild(delBtn);
        li.appendChild(span); //span을 li안에 넣는다는 의미(부모 인자에 넣는다.)
        li.id = newId;
        toDoList.appendChild(li);
        const toDoObj = {
            text : text,
            id : newId
        };
        toDos.push(toDoObj); //6번줄 toDOs에 toDoObj를 넣는다.
        saveToDos(); //함수 호출.
    }

   function handleSubmit(event){
        event.preventDefault();
        const currentValue = toDoInput.value;
        paintToDo(currentValue);
        toDoInput.value = "";


    }
    function loadToDos(){
        const loadedToDos = localStorage.getItem(TODOS_LS); //getItem은 정보를 가져올 때.
        if(loadedToDos!==null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) { //forEach 괄호안에 있는 함수를 배열의 각각에 한번씩 실행시켜 주는 것 Only for array.
        paintToDo(toDo.text);
        });

        }else{}
    }

   function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
    }
    init();
