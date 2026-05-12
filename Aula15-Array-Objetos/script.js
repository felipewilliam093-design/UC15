// ================================================
// SNIPPET 02 -- JS de Adicionar Produto
// Arquivo: script.js (parte 1)
// Slide 10
// ================================================

// 1. O array produtos e a fonte unica da verdade.
//    Tudo que aparece na tela vem deste array.
const produtos = [];

// 2. Selecao dos elementos
const inputNome = document.querySelector("#inputNome");
const inputPreco = document.querySelector("#inputPreco");
const btnAdicionar = document.querySelector("#btnAdicionar");
const listaProdutos = document.querySelector("#listaProdutos");
const totalCarrinho = document.querySelector("#totalCarrinho");

// 3. Funcao adicionarProduto
function adicionarProduto() {
  const nome = inputNome.value.trim();
  const preco = parseFloat(inputPreco.value);

  // Validacao basica
  if (nome === "") {
    alert("Digite o nome do produto.");
    return;
  }
  if (isNaN(preco) || preco <= 0) {
    alert("Digite um preco valido (maior que zero).");
    return;
  }

  // Cada produto e um objeto pequeno
  const novoProduto = { nome: nome, preco: preco };
  produtos.push(novoProduto);

  // Limpa os inputs
  inputNome.value = "";
  inputPreco.value = "";
  inputNome.focus();

  // Re-renderiza tudo a partir do array
  renderizar(produtos);
}

// 4. Conectar com o evento
btnAdicionar.addEventListener("click", adicionarProduto);
// ================================================
// SNIPPET 03 -- JS de Listar, Total e Remover
// Arquivo: script.js (parte 2, abaixo do snippet 02)
// Slide 11
// ================================================

// 5. Funcao renderizar usa forEach para criar os li
//    Recebe a lista a renderizar (pode ser produtos completo ou filtrada)
function renderizar(lista) {
  listaProdutos.innerHTML = ""; // limpa a lista antes de redesenhar

  lista.forEach((produto, indice) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = ` 
            <span>${produto.nome} — R$ ${produto.preco.toFixed(2)}</span> 
            <button class="btn btn-sm btn-danger" data-indice="${indice}">Remover</button> 
        `;
    listaProdutos.appendChild(li);
  });

  // Calcular total com reduce sempre em cima do array completo
  const total = produtos.reduce(
    (acumulador, produto) => acumulador + produto.preco,
    0,
  );
  totalCarrinho.textContent = `R$ ${total.toFixed(2)}`;
}

// 6. Event delegation para os botoes Remover
//    Listener fica no ul, nao em cada botao individual
listaProdutos.addEventListener("click", (evento) => {
  if (evento.target.tagName === "BUTTON") {
    const indice = parseInt(evento.target.dataset.indice);
    produtos.splice(indice, 1);
    renderizar(produtos);
  }
});

// 7. Filtros demonstrativos com filter
//    filter NAO altera o array original, retorna um novo
document.querySelector("#btnCaros").addEventListener("click", () => {
  const caros = produtos.filter((p) => p.preco > 100);
  renderizar(caros);
});

document.querySelector("#btnBaratos").addEventListener("click", () => {
  const baratos = produtos.filter((p) => p.preco <= 100);
  renderizar(baratos);
});

document.querySelector("#btnTodos").addEventListener("click", () => {
  renderizar(produtos);
});

// 8. Demonstracao de map (so log no console)
//    map gera um novo array sem alterar o original
// const precosComAumento = produtos.map(p => p.preco * 1.10);
// console.log("Precos com 10% de aumento:", precosComAumento);
