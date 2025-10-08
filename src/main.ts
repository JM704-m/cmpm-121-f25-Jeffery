import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

document.addEventListener("DOMContentLoaded", () => {
  const butn: HTMLButtonElement = document.createElement("button");
  butn.type = "button";
  butn.innerHTML = "😟";
  document.body.append(butn);
});
