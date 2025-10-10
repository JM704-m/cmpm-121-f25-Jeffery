let counter: number = 0;
let rate: number = 0;

document.body.innerHTML = `
  <div>Counter: <span id="counter">0 </span></div>
  <div>Growth rate: <span id="rate">0/s</span></div>
  <button id="emoButton">😟</button>
  <button id="buyButton" disabled>Buy: Growth +1 (Cost 10)</button>
`;

const button = document.getElementById("emoButton");
const buyButton = document.getElementById("buyButton") as HTMLButtonElement;
const counterElement = document.getElementById("counter");
const rateElement = document.getElementById("rate");

button?.addEventListener("click", () => {
  counter += 1;
  counterElement!.textContent = `${counter.toFixed(2)}`;
  console.log(`Button clicked ${counter} times.`);
  updateUI();
});

buyButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    rate += 1;
    updateUI();
  }
});

function updateUI() {
  counterElement!.textContent = `${counter.toFixed(2)}`;
  rateElement!.textContent = `${rate}/s`;
  buyButton.disabled = counter < 10;
}

let last = performance.now();

function animate(now: number) {
  const dt = (now - last) / 1000;
  last = now;
  counter += rate * dt;
  updateUI();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
