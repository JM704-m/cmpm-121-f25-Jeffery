let counter: number = 0;
let rate: number = 0;

document.body.innerHTML = `
  <div>Counter: <span id="counter">0</span> cookies</div>
  <div>Growth rate: <span id="rate">0</span> cookies/s</div>
  <button id="emoButton" style="
    font-size: 60px;
    width: 120px; 
    height: 120px;
    border-radius: 60px;
    border: 3px solid #c68b59;
    background-color: #f5deb3;
    cursor: pointer;
  ">🍪</button>

  <div style="margin-top:12px;">
      <p><button id="buyA" disabled style="
        background-color: #e0f0ff;
        color: #004080;
        border: 2px solid #0070c0;
        border-radius: 8px;
        padding: 6px 12px;
      ">Cursors (+0.1/s, cost 10)</button></p>

      <p><button id="buyB" disabled style="
        background-color: #ffe6f0;
        color: #802040;
        border: 2px solid #c05080;
        border-radius: 8px;
        padding: 6px 12px;
      ">Grandmas (+2.0/s, cost 100)</button></p>

      <p><button id="buyC" disabled style="
        background-color: #e6ffe6;
        color: #206020;
        border: 2px solid #40a040;
        border-radius: 8px;
        padding: 6px 12px;
      ">Farms (+50/s, cost 1000)</button></p>
    </div>

    <div style="margin-top:12px;">
      <p><b>Purchased :</b></p>
      <p>Cursors: <span id="countA">0</span></p>
      <p>Grandmas: <span id="countB">0</span></p>
      <p>Farms: <span id="countC">0</span></p>
    </div>
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

interface ItemDef {
  name: string;
  rate: number;
  base: number;
}
const items: ItemDef[] = [
  { name: "Cursors", rate: 0.1, base: 10 },
  { name: "Grandmas", rate: 2.0, base: 100 },
  { name: "Farms", rate: 50, base: 1000 },
];

const buyBtns: HTMLButtonElement[] = [BuyA, BuyB, BuyC];
const countEls: HTMLElement[] = [CountA, CountB, CountC];

let bought: number[] = items.map(() => 0);
let cost: number[] = items.map((it) => it.base);

const Price_Increase = 1.15;

function buy(n: number): string {
  const s = n.toFixed(2);
  return s.endsWith(".00") ? s.slice(0, -3) : s;
}

function render(): void {
  counterElement!.textContent = `${buy(counter)}`;
  rateElement.textContent = `${buy(rate)}`;

  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    countEls[i].textContent = String(bought[i]);

    buyBtns[i].textContent = `${it.name} (+${buy(it.rate)}/s, cost ${
      buy(cost[i])
    })`;
    buyBtns[i].disabled = counter < cost[i];
    buyBtns[i].style.opacity = buyBtns[i].disabled ? "0.5" : "1.0";
  }
}

button?.addEventListener("click", () => {
  counter += 1;
  counterElement!.textContent = `${buy(counter)}`;
});

for (let i = 0; i < items.length; i++) {
  const it = items[i];
  buyBtns[i].addEventListener("click", () => {
    if (counter >= cost[i]) {
      counter -= cost[i];
      rate += it.rate;
      bought[i] += 1;
      cost[i] *= Price_Increase;
      render();
    }
  });
}

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
