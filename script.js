document.addEventListener( "DOMContentLoaded", () => {
  const keyElement = document.getElementById("key");
  let questionword = "";
  const wordElement = document.getElementById("question");
  let typingnum = 0;
  const renderword = () => {
    wordElement.innerHTML = `<span class="done">${questionword.slice(0,typingnum)}</span><span class="rest">${questionword.slice(typingnum)}</span>`;
  }
  //定義もろもろ

  const words = [ "neko", "koneko", "oyaneko", "nekomimi", "shippo", "cat", "nya-nn" ];
  const nextquestion = () => {
    questionword = words[Math.floor(Math.random()*words.length)];
    typingnum = 0;
    renderword();
  }
  //問題集
  nextquestion(); //ゲーム開始

  document.addEventListener("keydown", (e) => { //キーボード押したときの処理
    console.log(e.key);
    keyElement.textContent = e.key;
    if (e.key.length > 1) {
      return; //enter,shihtなどを無視
    }

    if (questionword[typingnum] === e.key.toLowerCase()) { //大文字にも対応
      console.log("NICE");
      typingnum++;
      renderword();

      if (typingnum >= questionword.length) {
         //wordElement.textContent = "You are Champion...";
         nextquestion();
      }
    } else {
      console.log("REARY!?")
    }
  });
});
