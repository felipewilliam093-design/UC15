// ================================================
// SNIPPET 04 -- Logica JS da lista de tarefas
// Arquivo: script.js (pasta aula13-lista)
// Slide 13
// ================================================

// 1. Selecionar os elementos
const inputTarefa = document.querySelector("#inputTarefa");
const btnAdicionar = document.querySelector("#btnAdicionar");
const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");

function atualizarContador() {
  contador.textContent = `Total de tarefas: ${lista.children.length}`;
}

// 2. Evento de clique do botao adicionar
btnAdicionar.addEventListener("click", () => {
  // 2.1 Ler o valor digitado
  const texto = inputTarefa.value;

  // 2.2 Validacao: nao adicionar se estiver vazio
  if (texto === "") return;

  // 2.3 Criar o elemento li novo e colocar o texto dentro de um span
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      li.classList.add("concluida");
    } else {
      li.classList.remove("concluida");
    }
  });
  li.appendChild(checkbox);

  const span = document.createElement("span");
  span.textContent = texto;
  li.appendChild(span);

  // 2.4 Criar o botao de editar
  const btnEditar = document.createElement("button");
  btnEditar.textContent = "✎";
  btnEditar.classList.add("btn-editar");

  btnEditar.addEventListener("click", () => {
    const inputEdicao = document.createElement("input");
    inputEdicao.type = "text";
    inputEdicao.value = span.textContent;
    inputEdicao.className = "input-edicao";

    const salvarEdicao = () => {
      const novoTexto = inputEdicao.value.trim();
      if (novoTexto !== "") {
        span.textContent = novoTexto;
      }
      if (li.contains(inputEdicao)) {
        li.replaceChild(span, inputEdicao);
      }
    };

    inputEdicao.addEventListener("blur", salvarEdicao);
    inputEdicao.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        salvarEdicao();
      }
    });

    li.replaceChild(inputEdicao, span);
    inputEdicao.focus();
  });

  // 2.5 Criar o botao de remover
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "X";

  // 2.6 Evento de clique no botao remover
  btnRemover.addEventListener("click", () => {
    li.remove();
    atualizarContador();
  });

  // Colocar os botoes dentro de um container
  const containerBotoes = document.createElement("div");
  containerBotoes.className = "botoes-acao";
  containerBotoes.appendChild(btnEditar);
  containerBotoes.appendChild(btnRemover);
  li.appendChild(containerBotoes);

  // 2.7 Colocar o li dentro da lista
  lista.appendChild(li);
  atualizarContador();

  // 2.8 Limpar o input para a proxima tarefa
  inputTarefa.value = "";
});

// 3. Evento para adicionar tarefa pressionando a tecla "Enter"
inputTarefa.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    btnAdicionar.click();
  }
});
