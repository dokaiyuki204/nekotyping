document.addEventListener( "DOMContentLoaded", () => {
  const keyElement = document.getElementById("key");
  const questionword = "neko";
  const wordElement = document.getElementById("question");
  let typingnum = 0;
  const renderword = () => {
    wordElement.innerHTML = `<span class="done">${questionword.slice(0,typingnum)}</span><span class="rest">${questionword.slice(typingnum)}</span>`;
  }
  renderword();
  //定義もろもろ

  document.addEventListener("keydown", (e) => { //キーボード押したときの処理
    if (typingnum >= questionword.length) {
            return;
    }

    console.log(e.key);
    keyElement.textContent = e.key;

    if (questionword[typingnum] === e.key) {
      console.log("NICE");
      typingnum++;
      renderword();

      if (typingnum >= questionword.length) {
         wordElement.textContent = "You are Champion...";
      }
    } else {
      console.log("REARY!?")
    }
  });
});
