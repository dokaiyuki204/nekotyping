document.addEventListener( "DOMContentLoaded", () => {
  const keyElement = document.getElementById("key");
  let questionword = "";
  const wordElement = document.getElementById("question");
  let typingnum = 0;
  let answerNum = 0;
  let missCount = 0;
  const renderword = () => {
    wordElement.innerHTML = `<span class="done">${questionword.slice(0,typingnum)}</span><span class="rest">${questionword.slice(typingnum)}</span>`;
  }
  const timerResult = document.getElementById("timer");
  let watch;

  let state = "title";
  let startTimer;
  const playtime = document.getElementById("time");
  //定義もろもろ

  const words = [ "neko", "koneko", "oyaneko", "nekomimi", "shippo", "cat", "nya-nn" ];
  const nextquestion = () => {
    questionword = words[Math.floor(Math.random()*words.length)];
    typingnum = 0;
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

      if (questionword[typingnum] === e.key.toLowerCase()) { //大文字にも対応
        //console.log("NICE");
        typingnum++;
        renderword();

        if (typingnum >= questionword.length) {
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
