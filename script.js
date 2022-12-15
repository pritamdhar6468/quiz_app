//getting all required items
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box ");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const option_list = document.querySelector(".option_list");

//if start button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
}

//if exit button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}
//if continue button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
const next_btn = document.querySelector(".next_btn");

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue)
    } else {
        console.log('q c');
    }
}
//getting question and opton from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>' + questions[index].numb + '.' + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");

    }
}


let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer) {
    let userAns = answer.textContent;
    let CorrectAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == CorrectAns) {
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        //if answer is incorrect then show the correct answer automatically
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == CorrectAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }

        }
    }

    //disabled all option
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");

    }
}


function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time<9) {
            let addZero = timeCount.textContent;
            timeCount.textContent="0"+addZero;
        }
        if (time<0) {
            clearInterval(counter);
            timeCount.textContent="00";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
       time+=1;
       timeLine.style.width=time+"px";
        if (time>549) {
            clearInterval(counterLine);
            
        }
    }
}


function queCounter(index) {
    const bottom_que_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>out of<p>' + questions.length + '</p></span>';
    bottom_que_counter.innerHTML = totalQuesCountTag;
}
