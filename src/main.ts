let counter: number = 0;
let rate: number = 0;

document.body.innerHTML = `
  <div>Counter: <span id="counter">0 </span></div>
  <div>Growth rate: <span id="rate">0/s</span></div>
  <button id="emoButton">😟</button>

  <div style="margin-top:8px;">
    <p><button id="buyA" disabled>A (+0.1/s, cost 10)</button></p>
    <p><button id="buyB" disabled>B (+2.0/s, cost 100)</button></p>
    <p><button id="buyC" disabled>C (+50/s, cost 1000)</button></p>
  </div>

   <div style="margin-top:8px;">
    <p>Purchased –</p>
    <p>A: <span id="countA">0</span></p>
    <p>B: <span id="countB">0</span></p>
    <p>C: <span id="countC">0</span></p>
  </div>
`;

const button = document.getElementById("emoButton");
const counterElement = document.getElementById("counter");
const rateElement = document.getElementById("rate")!;
const BuyA = document.getElementById("buyA") as HTMLButtonElement;
const BuyB = document.getElementById("buyB") as HTMLButtonElement;
const BuyC = document.getElementById("buyC") as HTMLButtonElement;
const CountA = document.getElementById("countA")!;
const CountB = document.getElementById("countB")!;
const CountC = document.getElementById("countC")!;

let boughtA = 0;
let boughtB = 0;
let boughtC = 0;

function buy(n: number): string {
  const s = n.toFixed(2);
  return s.endsWith(".00") ? s.slice(0, -3) : s;
}

function render(): void {
  counterElement!.textContent = `${buy(counter)}`;
  rateElement.textContent = `${buy(rate)}/s`;
  CountA.textContent = `${boughtA}`;
  CountB.textContent = `${boughtB}`;
  CountC.textContent = `${boughtC}`;

  BuyA.disabled = counter < 10;
  BuyB.disabled = counter < 100;
  BuyC.disabled = counter < 1000;
}

button?.addEventListener("click", () => {
  counter += 1;
  counterElement!.textContent = `${buy(counter)}`;
});

BuyA.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    rate += 0.1;
    boughtA += 1;
    render();
  }
});

BuyB.addEventListener("click", () => {
  if (counter >= 100) {
    counter -= 100;
    rate += 2.0;
    boughtB += 1;
    render();
  }
});

BuyC.addEventListener("click", () => {
  if (counter >= 1000) {
    counter -= 1000;
    rate += 50.0;
    boughtC += 1;
    render();
  }
});

let last = performance.now();

function animate(now: number) {
  const dt = (now - last) / 1000;
  last = now;
  counter += rate * dt;
  render();
  requestAnimationFrame(animate);
}

render();
requestAnimationFrame(animate);
