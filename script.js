document.addEventListener( "DOMContentLoaded", () => {
  const keyElement = document.getElementById("key");
  let questionword = "";
  const wordElement = document.getElementById("question");
  let typingnum = 0;
  let answerNum = 0;
  const renderword = () => {
    wordElement.innerHTML = `<span class="done">${questionword.slice(0,typingnum)}</span><span class="rest">${questionword.slice(typingnum)}</span>`;
  }

  let state = "title";
  //定義もろもろ

  const words = [ "neko", "koneko", "oyaneko", "nekomimi", "shippo", "cat", "nya-nn" ];
  const nextquestion = () => {
    questionword = words[Math.floor(Math.random()*words.length)];
    typingnum = 0;
    renderword();
  }
  //問題集

  
  document.getElementById("play").hidden = true;
  document.getElementById("result").hidden = true;

  document.addEventListener("keydown", (e) => {
    if (e.key === "Shift") {

    }
  });

  document.addEventListener("keydown", (e) => { //キーボード押したときの処理
    if (state === "title") {
      if (e.key === " ") {
        state = "play";
        document.getElementById("title").hidden = true;
        document.getElementById("play").hidden = false;
        nextquestion(); //ゲーム開始
      }
      return;
    } else if (state === "play") {
      keyElement.textContent = e.key;
      if (e.key.length > 1) {
        return; //enter,shihtなどを無視
      }

      if (questionword[typingnum] === e.key.toLowerCase()) { //大文字にも対応
        console.log("NICE");
        typingnum++;
        renderword();

        if (typingnum >= questionword.length) {
          answerNum++;
          if (answerNum >= 5) {
            state = "result"
            document.getElementById("play").hidden = true;
            document.getElementById("result").hidden = false;
            return;
          }
          nextquestion();
        }
      } else {
        console.log("REARY!?")
      }
    } else if (state === "result") {
      return;
    }
  });
});
