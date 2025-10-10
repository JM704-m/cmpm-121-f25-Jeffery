import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

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
