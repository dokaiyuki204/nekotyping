document.addEventListener( "DOMContentLoaded", () => {
  console.log("js読み込めてます");
  const keyElement = document.getElementById("key");
  document.addEventListener("keydown", (e) => {
    console.log(e.key);
    keyElement.textContent = e.key;
  });
});
