document.addEventListener( "DOMContentLoaded", () => {
  console.log("js読み込めてます");
  const keyElement = document.getElementById("key");
  const questionword = "neko";
  const wordElement = document.getElementById("question");
  wordElement.textContent = questionword;
  let typingnum = 0;

  document.addEventListener("keydown", (e) => {
    if (typingnum >= questionword.length) {
            wordElement.textContent = "You are Champion...";
            return;
    } //先にクリア判定

    console.log(e.key);
    keyElement.textContent = e.key;

    if (questionword[typingnum] === e.key) {
        console.log("NICE");
        typingnum++;
    } else {
        console.log("REARY!?")
    }
  });
});
