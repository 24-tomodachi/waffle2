const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText("Hello World", 100, 100);
  window.requestAnimationFrame(draw);
}

const init = () => {
  draw();
}

init();
