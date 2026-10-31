document.addEventListener( "DOMContentLoaded", () => {
  const keyElement = document.getElementById("key");
  let questionword = "";
  const wordElement = document.getElementById("question");
  let typingnum = 0;
  let answerNum = 0;
  let missCount = 0;
  let englishQuestion = "";
  const renderword = () => {
    document.getElementById("english").innerHTML = `<span class="done">${englishQuestion.slice(0,typingnum)}</span><span class="rest">${englishQuestion.slice(typingnum)}</span>`;
  }
  const timerResult = document.getElementById("timer");
  let watch;

  let state = "title";
  let startTimer;
  const playtime = document.getElementById("time");
  //定義もろもろ

  const words = [ "ねこ", "こねこ", "おやねこ", "ねこみみ"//, "しっぽ", "きゃっと", "にゃーん" 
    ];
  const romajiTable = {
    "お":["o"],
    "こ":["ko"],
    "ね":["ne"],
    "み":["mi"],
    "や":["ya"],
  };
  const toRomaji = (n) => {
    //let sliceCoutner = 0;
    let romajiText = "";
    for (const char of n) {
      romajiText += romajiTable[char][0];
    }
    return romajiText;
  }
  const nextquestion = () => {
    questionword = words[Math.floor(Math.random()*words.length)];
    typingnum = 0;
    englishQuestion = toRomaji(questionword);
    document.getElementById("english").textContent = englishQuestion;
    wordElement.textContent = questionword;
    renderword();
  }
  //問題集

  const gameStart = () => {
    state = "play";
    answerNum = 0;
    missCount = 0;
    document.getElementById("title").hidden = true;
    document.getElementById("play").hidden = false;
    document.getElementById("result").hidden = true;
    nextquestion();
    startTimer = Date.now();
    watch = setInterval(() => {
    playtime.textContent = ((Date.now() - startTimer)/1000).toFixed(2)}, 10);
  }//初期化

  document.getElementById("play").hidden = true;
  document.getElementById("result").hidden = true;

  document.addEventListener("keydown", (e) => { //キーボード押したときの処理
    if (state === "title") {
      if (e.key === " ") {
        gameStart();
      }
      return;
    } else if (state === "play") {
      keyElement.textContent = e.key;
      if (e.key.length > 1) {
        return; //enter,shihtなどを無視
      }

      if (englishQuestion[typingnum] === e.key.toLowerCase()) { //大文字にも対応
        //console.log("NICE");
        typingnum++;
        renderword();

        if (typingnum >= englishQuestion.length) {
          answerNum++;
          if (answerNum >= 5) {
            clearInterval(watch);
            timerResult.textContent = ((Date.now() - startTimer)/1000).toFixed(2);
            document.getElementById("miss").textContent = missCount;
            state = "result"
            document.getElementById("play").hidden = true;
            document.getElementById("result").hidden = false;
            return;
          }
          nextquestion();
        }
      } else {
        //console.log("REARY!?")
        missCount++;
      }
    } else if (state === "result") {
      if (e.key === " ") {
        gameStart();
      }
    }
  });
});
