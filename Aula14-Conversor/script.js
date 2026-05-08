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

  if (isNaN(valor)) {
    document.querySelector("#tempResultado").textContent = "Digite um valor válido";
    return;
  }

  const resultado = converterTemperatura(valor, de, para);
  document.querySelector("#tempResultado").textContent =
    `Resultado: ${resultado.toFixed(2)} ${para}`;
});

const tempRegBtn = document.querySelector("#tempRegBtn");
tempRegBtn.addEventListener("click", () => {
  const valor = parseFloat(document.querySelector("#tempInput").value);
  const de = document.querySelector("#tempDe").value;
  const para = document.querySelector("#tempPara").value;

  if (!isNaN(valor)) {
    const resultado = converterTemperatura(valor, de, para);
    registrarHistorico(`Temperatura: ${valor} ${de} para ${resultado.toFixed(2)} ${para}`);
  }
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

  if (isNaN(valor)) {
    document.querySelector("#moedaResultado").textContent = "Digite um valor válido";
    return;
  }

  const resultado = converterMoeda(valor, de, para);
  document.querySelector("#moedaResultado").textContent =
    `Resultado: ${resultado.toFixed(2)} ${para}`;
});

const moedaRegBtn = document.querySelector("#moedaRegBtn");
moedaRegBtn.addEventListener("click", () => {
  const valor = parseFloat(document.querySelector("#moedaInput").value);
  const de = document.querySelector("#moedaDe").value;
  const para = document.querySelector("#moedaPara").value;

  if (!isNaN(valor)) {
    const resultado = converterMoeda(valor, de, para);
    registrarHistorico(`Moeda: ${valor} ${de} para ${resultado.toFixed(2)} ${para}`);
  }
});

// ================================================
// SNIPPET 04 -- JS do Conversor de Comprimento
// ================================================

// 1. Objeto com taxas de conversao para metros
const conversaoMetros = {
  m: 1,
  cm: 0.01,
  km: 1000,
};

// 2. Funcao de conversao
function converterComprimento(valor, de, para) {
  if (de === para) return valor;
  return (valor * conversaoMetros[de]) / conversaoMetros[para];
}

// 3. Conectar com o evento de clique
const compBtn = document.querySelector("#compBtn");
compBtn.addEventListener("click", () => {
  const valor = parseFloat(document.querySelector("#compInput").value);
  const de = document.querySelector("#compDe").value;
  const para = document.querySelector("#compPara").value;

  if (isNaN(valor)) {
    document.querySelector("#compResultado").textContent = "Digite um valor válido";
    return;
  }

  const resultado = converterComprimento(valor, de, para);
  document.querySelector("#compResultado").textContent =
    `Resultado: ${resultado.toFixed(2)} ${para}`;
});

const compRegBtn = document.querySelector("#compRegBtn");
compRegBtn.addEventListener("click", () => {
  const valor = parseFloat(document.querySelector("#compInput").value);
  const de = document.querySelector("#compDe").value;
  const para = document.querySelector("#compPara").value;

  if (!isNaN(valor)) {
    const resultado = converterComprimento(valor, de, para);
    registrarHistorico(`Comprimento: ${valor} ${de} para ${resultado.toFixed(2)} ${para}`);
  }
});

// ================================================
// SNIPPET 05 -- JS do Histórico
// ================================================
function registrarHistorico(texto) {
  const lista = document.querySelector("#historicoLista");
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  
  const span = document.createElement("span");
  span.textContent = texto;
  
  const btnExcluir = document.createElement("button");
  btnExcluir.className = "btn btn-sm btn-outline-danger";
  btnExcluir.innerHTML = "&times;";
  btnExcluir.title = "Excluir conversão";
  btnExcluir.addEventListener("click", () => {
    lista.removeChild(li);
  });

  li.appendChild(span);
  li.appendChild(btnExcluir);
  lista.appendChild(li);
}

document.querySelector("#limparHistBtn").addEventListener("click", () => {
  document.querySelector("#historicoLista").innerHTML = "";
});
