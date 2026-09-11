const games = {
    title: "Ninja Trivia Arena",
    score:0,
    max_lives:3,
    current_lives:0,
    current_question:null,
    currentTime:null,
    per_question_time:20,
    timer_id: null,
    interval_id: null,
    displayQuestion: [],
    questions1: [],
    questions: [
    {
        question: "Which command is used to create a new Git repository?",
        options: ["git start", "git init", "git create", "git new"],
        correctIndex: 1
    },
    {
        question: "Which Linux command is used to list files and directories?",
        options: ["cd", "pwd", "ls", "mkdir"],
        correctIndex: 2
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "define", "variable"],
        correctIndex: 0
    },
    {
    question: "Which SQL command is used to retrieve data from a database?",
    options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
    correctIndex: 2
},
    {
        question: "Which Git command sends local commits to a remote repository?",
        options: ["git pull", "git fetch", "git push", "git clone"],
        correctIndex: 2
    },
    {
        question: "Which Linux command is used to change the current directory?",
        options: ["cd", "ls", "pwd", "mv"],
        correctIndex: 0
    },
    {
        question: "Which JavaScript method adds an element to the end of an array?",
        options: ["pop()", "push()", "shift()", "add()"],
        correctIndex: 1
    },
    {
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "func", "def", "define"],
        correctIndex: 2
    },
    {
        question: "Which Git command is used to see the commit history?",
        options: ["git history", "git commits", "git log", "git show-all"],
        correctIndex: 2
    },
    {
        question: "Which Linux command is used to create a new directory?",
        options: ["touch", "mkdir", "create", "dir"],
        correctIndex: 1
    }
],
    init: function(){
       // alert("test");
        document.getElementById("start-screen").style.display = "block";
        document.getElementById("end-screen").style.dispaly = "none";
        const end_screen = document.getElementById("end-screen");

        end_screen.style.display = "none";
        const start_btn = document.getElementById("start-btn");
        const lives = document.getElementById("lives");
        this.current_lives = this.max_lives;
        lives.innerHTML = this.current_lives;
       
    },
    button_event: function(){
         document.getElementById("start-btn").addEventListener("click", () => {
        this.start_game();
    });

    document.getElementById("playagain").addEventListener("click", () => {
        this.play_again();
    });
    },
    start_game: function(){
       
       try{
        if(this.questions.length === 0)
        {
            this.error("No questions are available right now. Please try again later.");
            return;
        }
        this.nextQuestion();
        document.getElementById("start-screen").style.display = "none";
       document.getElementById("game-screen").style.display = "block";
         
       }
       catch(err)
       {
         console.log("question erro message", err.message);
         this.error("Error loading the question. Please try again later.");

       }
       

    },
    nextQuestion: function(){
        try{

        if(this.questions.length == 0){
             this.error("No questions are available right now. Please try again later.");
            return;
        }
       //console.log("curent", this.displayQuestion)
       clearTimeout(this.timer_id);
       clearTimeout(this.interval_id);
      if (this.score === this.questions.length) {
     this.win_game();
       return;
    }

    if((this.displayQuestion.length === this.questions.length) && (this.current_lives > 0))
    {
        this.win_game();
        return;
    }

   if (this.current_lives == 0) {
    this.game_over();
    return;
    }

//    if (this.displayQuestion.length >= this.questions.length) {
//     this.game_over();
//     return;
//     }
      console.log(games);
       this.update_board();

       const question_section = document.getElementById("dispaly-question");
       let randon_index = Math.floor(Math.random() * this.questions.length);
      // console.log("generated randon", randon_index);
       while (this.displayQuestion.includes(randon_index)) {
        randon_index = Math.floor(Math.random() * this.questions.length);
       }
      // console.log("final genrated random", randon_index)
       this.displayQuestion.push(randon_index);
       this.current_question = randon_index;
    
       const single_question = this.questions[randon_index];
      // console.log(single_question);

       let question_html = '';
       question_html += `<div class="question-sec">
                <div class="question-tile">${single_question.question}</div>
                <div class="question-option">
                    <ul>`;
                    single_question.options.map((option, index)=>{
                        question_html += `<li><button class="answer-btn" onclick=games.checkans(${index},this);>${option}</button></li>`;
                    })
                    
                    question_html += `</ul>
                </div>
            </div>`;
    question_section.innerHTML = question_html;
    let sec = this.per_question_time;
  
    this.interval_id = setInterval(() => {
        sec--;
        if(sec <= 0)
        {
            clearTimeout(this.interval_id);
        }
      
        this.start_timer(sec)
    }, 1000);
    const question_time = setTimeout(() =>{ 
        this.current_lives--;
        this.nextQuestion();
    }, this.per_question_time * 1000)
   // console.log("question id ", question_time);
    this.timer_id = question_time;
       //console.log("current question", this.current_question)
}
catch(err)
{
   this.error("Something went wrong while loading the next question. Please try again.");
}
    },
    start_timer: function(sec){
       
        const question_time = document.getElementById("question-timer");
        const timer_progress = document.getElementById("timer-progress");
        const progress = (sec / this.per_question_time) * 100;
        question_time.innerHTML = `0:00:${sec}`;
    timer_progress.style.setProperty(
        "--time-progress",
        `${progress}%`
    );

if (progress > 50) {
    timer_progress.style.setProperty("--progress-color", "#22c55e");
} else if (progress > 20) {
    timer_progress.style.setProperty("--progress-color", "#facc15");
} else {
    timer_progress.style.setProperty("--progress-color", "#ef4444");
}



    },
    checkans: function(ind, button){
        console.log(button);
         const buttons = document.querySelectorAll(".answer-btn");
         buttons.forEach(function(btn) {
        //      if (btn !== button) {
        //     btn.disabled = true;
            // console.log(btn);
        // }
        console.log(btn)
       btn.setAttribute("disabled", "true");
        btn.classList.remove("correct", "incorrect");
    });
    const get_single_question = this.questions[this.current_question];
    if(get_single_question.correctIndex === ind){
        button.classList.add("correct");
        //alert("correct");
        this.score++;
      
    }
    else{
        //alert("wrong");
         button.classList.add("incorrect");
        this.current_lives--;
       
    }
    setTimeout(() => {
        this.nextQuestion();
    }, 500);
    },
    update_board: function(){
      
  const lives = document.getElementById("lives");
  const score = document.getElementById("score");
  const question_time = document.getElementById("question-timer");
   const timer_progress = document.getElementById("timer-progress");
  // console.log("update board", this.displayQuestion.length)
document.getElementById("question-length").innerHTML =
    `${this.displayQuestion.length + 1} / ${this.questions.length}`;
  question_time.innerHTML = `0:00:${this.per_question_time}`;
  lives.innerHTML = Array(this.current_lives).fill("❤️").join('');
  score.innerHTML = this.score;
   timer_progress.style.setProperty(
        "--time-progress",
        `100%`
    );
    timer_progress.style.setProperty("--progress-color", "#22c55e");


    },
    reset_game: function(){
        this.score = 0;
        this.current_question=null;
        this.displayQuestion = [];
        // console.log(this.displayQuestion);
        this.currentTime=null;
        this.interval_id=null,
        this.timer_id=null;
        this.current_lives=0;
        this.update_board();


    },
    win_game: function(){
       //alert("win game")
        document.getElementById("start-screen").style.display = "none";
       document.getElementById("game-screen").style.display = "none";
    const end_screen = document.getElementById("end-screen");

    end_screen.style.display = "block";
     end_screen.classList.remove("lose-game");
    end_screen.classList.add("win-game");
    document.getElementById("w-l-score").innerHTML = this.score;

       this.reset_game();
    },
    game_over:function(){
        //alert("gameover")
        document.getElementById("start-screen").style.display = "none";
       document.getElementById("game-screen").style.display = "none";
    const end_screen = document.getElementById("end-screen");

    end_screen.style.display = "block";
    
    end_screen.classList.remove("win-game");
    end_screen.classList.add("lose-game");
    document.getElementById("w-l-score").innerHTML = this.score;
        this.reset_game();
    },
    play_again: function(){

this.init();

    },
    error: function(msg){
       const error = document.getElementById("error-content");
       const alertbox = document.getElementsByClassName("alert")[0];
       error.innerHTML = msg;
      alertbox.style.display = "block";
      setTimeout(()=>{
alertbox.style.display = "none";
      },5000)

    }
}

games.init();
games.button_event();

