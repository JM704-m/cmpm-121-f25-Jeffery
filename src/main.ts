let counter: number = 0;
let rate: number = 0;
// UI Layout
document.body.style.cssText =
  `margin:0; min-height:100vh; background: radial-gradient(1200px 600px at 50% -10%, rgba(255,255,255,0.06), transparent), linear-gradient(180deg, #0f172a, #0b1220); color:#e5e7eb; font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; display:flex; align-items:flex-start; justify-content:center; padding:40px;`;
document.body.innerHTML = `
  <div id="panel" style="width: 720px; max-width: calc(100vw - 80px); background: rgba(148,163,184,0.24); border-radius: 16px; box-shadow: 0 15px 50px rgba(0,0,0,0.45); padding: 28px 28px 22px; backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.08);"
  >
  <h1 style="margin:0 0 10px; font-size:28px; text-align:center; letter-spacing:0.5px; color:#f8fafc;">Cookie Studio</h1>
  <div style="margin-bottom:8px; text-align:center; color:#cbd5e1;">Counter: <span id="counter">0</span> cookies</div>
  <div style="margin-bottom:18px; text-align:center; color:#cbd5e1;">Growth rate: <span id="rate">0</span> cookies/s</div>
  <div style="display:flex; justify-content:center; margin-bottom:16px;"> <span id="counter">0</span> cookies</div>
  <div>Growth rate: <span id="rate">0</span> cookies/s</div>
  <button id="emoButton" style="
    font-size: 60px;
    width: 120px;
    height: 120px;
    border-radius: 60px;
    border: 3px solid #e2c290;
    background-color: #f2e3c6; box-shadow: 0 8px 20px rgba(0,0,0,0.25);
    cursor: pointer; transition: transform .06s ease;
  ">🍪</button>
  </div>

  <div style="margin-top:8px;">
    <p>
      <button id="buyA" disabled style="
        background-color: #e0f0ff;
        color: #004080;
        border: 2px solid #0070c0;
        border-radius: 12px;
        padding: 10px 14px;
      ">🖱️ Cursors (+0.1/s, cost 10)</button><br/>
      <small id="descA"></small>
    </p>
    <p>
      <button id="buyB" disabled style="
        background-color: #ffe6f0;
        color: #802040;
        border: 2px solid #c05080;
        border-radius: 12px;
        padding: 10px 14px;
      ">👵 Grandmas (+2.0/s, cost 100)</button><br/>
      <small id="descB"></small>
    </p>
    <p>
      <button id="buyC" disabled style="
        background-color: #e6ffe6;
        color: #206020;
        border: 2px solid #40a040;
        border-radius: 12px;
        padding: 10px 14px;
      ">🌾 Farms (+50/s, cost 1000)</button><br/>
      <small id="descC"></small>
    </p>
    <p>
      <button id="buyD" disabled style="
        background-color: #fff1d6;   /* Factory */
        color: #7a4b00;
        border: 2px solid #c68b59;
        border-radius: 12px;
        padding: 10px 14px;
      ">🏭 Factory (+100/s, cost 5000)</button><br/>
      <small id="descD"></small>
    </p>
    <p>
      <button id="buyE" disabled style="
        background-color: #eef0f5;   /* Mine */
        color: #2b2f3a;
        border: 2px solid #6b7480;
        border-radius: 12px;
        padding: 10px 14px;
      ">⛏️ Mine (+500/s, cost 10000)</button><br/>
      <small id="descE"></small>
    </p>
  </div>

  <div style="margin-top:8px;">
    <p>Purchased :</p>
    <p>🖱️ Cursors: <span id="countA">0</span></p>
    <p>👵 Grandmas: <span id="countB">0</span></p>
    <p>🌾 Farms: <span id="countC">0</span></p>
    <p>🏭 Factory: <span id="countD">0</span></p>
    <p>⛏️ Mine: <span id="countE">0</span></p>
  </div>
`;

// DOM Elements
const button = document.getElementById("emoButton");
const counterElement = document.getElementById("counter");
const rateElement = document.getElementById("rate")!;

const cursorButton = document.getElementById("buyA") as HTMLButtonElement;
const grandmaButton = document.getElementById("buyB") as HTMLButtonElement;
const farmButton = document.getElementById("buyC") as HTMLButtonElement;
const BuyD = document.getElementById("buyD") as HTMLButtonElement;
const BuyE = document.getElementById("buyE") as HTMLButtonElement;

const CountA = document.getElementById("countA")!;
const CountB = document.getElementById("countB")!;
const CountC = document.getElementById("countC")!;
const CountD = document.getElementById("countD")!;
const CountE = document.getElementById("countE")!;

const DescA = document.getElementById("descA")!;
const DescB = document.getElementById("descB")!;
const DescC = document.getElementById("descC")!;
const DescD = document.getElementById("descD")!;
const DescE = document.getElementById("descE")!;

// Item Definitions
interface ItemDef {
  name: string;
  rate: number;
  base: number;
  description: string;
}

const items: ItemDef[] = [
  {
    name: "🖱️ Cursors",
    rate: 0.1,
    base: 10,
    description: "Autoclicks occasionally to help press the cookie.",
  },
  {
    name: "👵 Grandmas",
    rate: 2.0,
    base: 100,
    description: "A nice grandma who bakes cookies with love.",
  },
  {
    name: "🌾 Farms",
    rate: 50,
    base: 1000,
    description: "Fields and ovens that mass-produce tasty cookies.",
  },
  {
    name: "🏭 Factory",
    rate: 100,
    base: 5000,
    description: "Industrial cookie lines churning out fresh batches.",
  },
  {
    name: "⛏️ Mine",
    rate: 500,
    base: 10000,
    description: "Deep shafts extracting rare cookie ore—very productive!",
  },
];

const buyBtns: HTMLButtonElement[] = [
  cursorButton,
  grandmaButton,
  farmButton,
  BuyD,
  BuyE,
];
const countEls: HTMLElement[] = [CountA, CountB, CountC, CountD, CountE];
const descEls: HTMLElement[] = [DescA, DescB, DescC, DescD, DescE];

const enabledStyles = buyBtns.map((btn) => ({
  bg: btn.style.backgroundColor,
  border: btn.style.borderColor,
  color: btn.style.color,
}));

const DISABLED_STYLE = {
  bg: "#e5e7eb",
  border: "#cbd5e1",
  color: "#6b7280",
};

const bought: number[] = items.map(() => 0);
const cost: number[] = items.map((it) => it.base);

const COST_MULTIPLIER = 1.15;

// Update & Utility Functions
function buy(n: number): string {
  const s = n.toFixed(2);
  return s.endsWith(".00") ? s.slice(0, -3) : s;
}

function render(): void {
  counterElement!.textContent = buy(counter);
  rateElement.textContent = buy(rate);

  for (let i = 0; i < items.length; i++) {
    const it = items[i];

    countEls[i].textContent = String(bought[i]);
    buyBtns[i].textContent = `${it.name} (+${buy(it.rate)}/s, cost ${
      buy(cost[i])
    })`;
    buyBtns[i].disabled = counter < cost[i];
    descEls[i].textContent = it.description;

    if (buyBtns[i].disabled) {
      buyBtns[i].style.backgroundColor = DISABLED_STYLE.bg;
      buyBtns[i].style.borderColor = DISABLED_STYLE.border;
      buyBtns[i].style.color = DISABLED_STYLE.color;
      buyBtns[i].style.cursor = "not-allowed";
      buyBtns[i].style.opacity = "1";
    } else {
      buyBtns[i].style.backgroundColor = enabledStyles[i].bg;
      buyBtns[i].style.borderColor = enabledStyles[i].border;
      buyBtns[i].style.color = enabledStyles[i].color;
      buyBtns[i].style.cursor = "pointer";
      buyBtns[i].style.opacity = "1";
    }
  }
}

// Event Listeners
button?.addEventListener("click", () => {
  counter += 1;
  counterElement!.textContent = buy(counter);
});

for (let i = 0; i < items.length; i++) {
  const it = items[i];
  buyBtns[i].addEventListener("click", () => {
    if (counter >= cost[i]) {
      counter -= cost[i];
      rate += it.rate;
      bought[i] += 1;
      cost[i] *= COST_MULTIPLIER;
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
