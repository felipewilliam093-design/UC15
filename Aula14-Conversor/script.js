// ================================================
// SNIPPET 02 -- JS do Conversor de Temperatura
// Arquivo: script.js (parte 1)
// Slide 11
// ================================================

// 1. Funcoes de conversao individuais
function celsiusParaFahrenheit(c) {
  return (c * 9) / 5 + 32;
}

function celsiusParaKelvin(c) {
  return c + 273.15;
}

function fahrenheitParaCelsius(f) {
  return ((f - 32) * 5) / 9;
}

function fahrenheitParaKelvin(f) {
  return ((f - 32) * 5) / 9 + 273.15;
}

function kelvinParaCelsius(k) {
  return k - 273.15;
}

function kelvinParaFahrenheit(k) {
  return ((k - 273.15) * 9) / 5 + 32;
}

// 2. Funcao orquestradora
function converterTemperatura(valor, de, para) {
  if (de === para) return valor;

  if (de === "celsius" && para === "fahrenheit")
    return celsiusParaFahrenheit(valor);
  if (de === "celsius" && para === "kelvin") return celsiusParaKelvin(valor);
  if (de === "fahrenheit" && para === "celsius")
    return fahrenheitParaCelsius(valor);
  if (de === "fahrenheit" && para === "kelvin")
    return fahrenheitParaKelvin(valor);
  if (de === "kelvin" && para === "celsius") return kelvinParaCelsius(valor);
  if (de === "kelvin" && para === "fahrenheit")
    return kelvinParaFahrenheit(valor);
}
// 3. Conectar com o evento de clique
const tempBtn = document.querySelector("#tempBtn");
tempBtn.addEventListener("click", () => {
  const valor = parseFloat(document.querySelector("#tempInput").value);
  const de = document.querySelector("#tempDe").value;
  const para = document.querySelector("#tempPara").value;

  const resultado = converterTemperatura(valor, de, para);
  document.querySelector("#tempResultado").textContent =
    `Resultado: ${resultado.toFixed(2)} ${para}`;
});
// ================================================
// SNIPPET 03 -- JS do Conversor de Moeda
// Arquivo: script.js (parte 2, abaixo do snippet 02)
// Slide 11
// ================================================

// 1. Objeto com taxas de câmbio (valores fictícios fixos)
//    Cada moeda mostra quantos Reais ela vale
const taxas = {
  BRL: 1.0,
  USD: 5.2,
  EUR: 5.65,
};

// 2. Funcao de conversao
function converterMoeda(valor, de, para) {
  if (de === para) return valor;

  // Converte para Real e depois para a moeda destino
  const valorEmReais = valor * taxas[de];
  const resultado = valorEmReais / taxas[para];
  return resultado;
}
// 3. Conectar com o evento de clique
const moedaBtn = document.querySelector("#moedaBtn");
moedaBtn.addEventListener("click", () => {
  const valor = parseFloat(document.querySelector("#moedaInput").value);
  const de = document.querySelector("#moedaDe").value;
  const para = document.querySelector("#moedaPara").value;

  const resultado = converterMoeda(valor, de, para);
  document.querySelector("#moedaResultado").textContent =
    `Resultado: ${resultado.toFixed(2)} ${para}`;
});
