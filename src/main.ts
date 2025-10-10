let counter: number = 0;

document.body.innerHTML = `
  <div>Counter: <span id="counter">0 </span></div>
  <button id="emoButton">😟</button>
`;

const button = document.getElementById("emoButton");
const counterElement = document.getElementById("counter");

button?.addEventListener("click", () => {
  counter += 1;
  counterElement!.textContent = `${counter}`;
  console.log(`Button clicked ${counter} times.`);
});

let last = performance.now();

function animate(now: number) {
  const dt = (now - last) / 1000; 
  last = now;
  counter += dt;
  counterElement!.textContent = `${counter.toFixed(2)}`;

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);