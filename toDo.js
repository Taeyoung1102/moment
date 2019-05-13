const toDoForm = document.querySelector(".js-toDoForm"),   
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

/*function filterFn(toDo){
    return toDo.id === 1;
}
// 이 filter가 하는 것은 'array'를 하나 만듬 -->
// 함수가 true를 return하는 아이템들이 있는것 들의 */

 let toDos = [];

function deleteToDo(event) {
    // console.dir(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;

    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        // console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
    });
//filter는 array의 모든 아이템을 통해 함수를 실행
    // console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
//JSON.stringfy --> 자바스크립트 object를 string으로 바꿔줌 

//투두 보여주기 기능
function paintToDo(text){
    // console.log(text);
    const li = document.createElement("li");
    const deletBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    deletBtn.innerText = "X";
    deletBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(deletBtn);
    li.id = newId;

    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: toDos.length + 1
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        // console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        //  console.log(parsedToDos);
        parsedToDos.forEach(function(toDo){
            // console.log(toDo.text);
            paintToDo(toDo.text);
        })
    }
}    
// JSON --> JavaScriptObjectNotation
// 데이터를 전달할 때, 자바스크립트가 그걸 다룰 수 있도록  object로 바꿔주는 기능!!
function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();