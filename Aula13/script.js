// ================================================
// SNIPPET 02 -- Logica JS da calculadora
// Arquivo: script.js (pasta aula13-calculadora)
// Slide 11
// ================================================

// 1. Selecionar os elementos da pagina
const input1 = document.querySelector("#numero1");
const input2 = document.querySelector("#numero2");
const display = document.querySelector("#display");

const btnSoma = document.querySelector("#btnSoma");
const btnSub = document.querySelector("#btnSub");
const btnMult = document.querySelector("#btnMult");
const btnDiv = document.querySelector("#btnDiv");
const btnPot = document.querySelector("#btnPot");
const btnRad = document.querySelector("#btnRad");
const btnLimpar = document.querySelector("#btnLimpar");
const btnDel = document.querySelector("#btnDel");

// Variável para rastrear o último input focado para a função de deletar
let ultimoInputFocado = input1;

input1.addEventListener("focus", () => {
  ultimoInputFocado = input1;
});

input2.addEventListener("focus", () => {
  ultimoInputFocado = input2;
});

// 2. Evento de clique do botao soma
btnSoma.addEventListener("click", () => {
  const n1 = parseFloat(input1.value);
  const n2 = parseFloat(input2.value);
  const resultado = n1 + n2;
  display.textContent = `Resultado: ${resultado}`;
});

// 3. Evento de clique do botao subtracao
btnSub.addEventListener("click", () => {
  const n1 = parseFloat(input1.value);
  const n2 = parseFloat(input2.value);
  display.textContent = `Resultado: ${n1 - n2}`;
});

// 4. Evento de clique do botao multiplicacao
btnMult.addEventListener("click", () => {
  const n1 = parseFloat(input1.value);
  const n2 = parseFloat(input2.value);
  display.textContent = `Resultado: ${n1 * n2}`;
});

// 5. Evento de clique do botao divisao
btnDiv.addEventListener("click", () => {
  const n1 = parseFloat(input1.value);
  const n2 = parseFloat(input2.value);
  display.textContent = `Resultado: ${n1 / n2}`;
});

// 6. Evento de clique do botao potencia
btnPot.addEventListener("click", () => {
  const n1 = parseFloat(input1.value);
  const n2 = parseFloat(input2.value);
  display.textContent = `Resultado: ${Math.pow(n1, n2)}`;
});

// 7. Evento de clique do botao radiciacao (Raiz N do primeiro numero)
btnRad.addEventListener("click", () => {
  const n1 = parseFloat(input1.value);
  const n2 = parseFloat(input2.value);
  display.textContent = `Resultado: ${Math.pow(n1, 1 / n2)}`;
});

// 8. Evento de clique do botao limpar
btnLimpar.addEventListener("click", () => {
  input1.value = "";
  input2.value = "";
  display.textContent = "Resultado: 0";
  input1.focus(); // Retorna o foco para o primeiro input
});

// 9. Evento de clique do botao deletar (backspace)
btnDel.addEventListener("click", () => {
  if (ultimoInputFocado.value.length > 0) {
    ultimoInputFocado.value = ultimoInputFocado.value.slice(0, -1);
  }
});

