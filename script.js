document.addEventListener( "DOMContentLoaded", () => {
  const keyElement = document.getElementById("key");
  let questionword = "";
  const wordElement = document.getElementById("question");
  //let typingnum = 0;
  let kanaIndex = 0;
  let buffer = "";
  let next;
  let typedText = "";
  let answerNum = 0;
  let missCount = 0;
  //let englishQuestion = "";
  const clearNum = 5;
  const timerResult = document.getElementById("timer");
  let watch;

  let state = "title";
  let startTimer;
  const playtime = document.getElementById("time");
  //定義もろもろ

  const words = [
    "ねこ", "こねこ", "おやねこ", "ねこみみ", "しましま", "ふみふみ"//, "しっぽ", "きゃっと", "にゃーん" 
    ];
  const romajiTable = {
    "お":["o"],
    "こ":["ko","co"],
    "し":["si","shi"],
    "ね":["ne"],
    "ふ":["hu","fu"],
    "ま":["ma"],
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

  const renderword = () => {
    document.getElementById("english").innerHTML = `<span class="done">${typedText}</span><span class="rest">${romajiTable[questionword[kanaIndex]].find((r) => r.startsWith(buffer)).slice(buffer.length) + toRomaji(questionword.slice(kanaIndex+1))}</span>`;
    //document.getElementById("english").innerHTML = `<span class="done">${englishQuestion.slice(0,typingnum)}</span><span class="rest">${englishQuestion.slice(typingnum)}</span>`;
  }

  const nextquestion = () => {
    questionword = words[Math.floor(Math.random()*words.length)];
    buffer = "";
    kanaIndex = 0;
    //typingnum = 0;
    typedText = "";
    //englishQuestion = toRomaji(questionword);
    //document.getElementById("english").textContent = englishQuestion;
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

      next = buffer + e.key.toLowerCase();
      if (romajiTable[questionword[kanaIndex]].filter((r) => r.startsWith(next)).length !== 0) {　//正誤判定
        //typingnum++;
        buffer += e.key.toLowerCase();
        typedText += e.key.toLowerCase();
        renderword();
        if (romajiTable[questionword[kanaIndex]].includes(buffer) === true) {
          kanaIndex++;
          buffer = "";
          if (kanaIndex >= questionword.length) {
            answerNum++;
            if (answerNum >= clearNum) { //クリア判定
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
        }
      } else {
        missCount++;
      }
      /*if (englishQuestion[typingnum] === e.key.toLowerCase()) { //正誤判定
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
      }*/
    } else if (state === "result") {
      if (e.key === " ") {
        gameStart();
      }
    }
  });
});