// ================================================ 
// SNIPPET 02 -- JS de Adicionar, Remover e Salvar 
// Arquivo: script.js (parte 1) 
// Slide 6 
// ================================================ 

// 1. Array de tarefas (fonte unica da verdade) 
//    Cada tarefa = { texto, concluida, id } 
let tarefas = [];

// 2. Selecao dos elementos 
const inputTarefa = document.querySelector("#inputTarefa");
const btnAdicionar = document.querySelector("#btnAdicionar");
const listaTarefas = document.querySelector("#listaTarefas");

// 3. Funcao salvar no LocalStorage 
//    Padrao OBRIGATORIO: JSON.stringify para converter array em texto 
function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// 4. Funcao renderizar (limpa e redesenha tudo) 
function renderizar() {
    listaTarefas.innerHTML = "";

    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = ` 
            <span>${tarefa.texto}</span> 
            <button class="btn btn-sm btn-danger" data-id="${tarefa.id}">Remover</button> 
        `;
        listaTarefas.appendChild(li);
    });
}

// 5. Funcao adicionarTarefa 
function adicionarTarefa() {
    const texto = inputTarefa.value.trim();
    if (texto === "") {
        alert("Digite o texto da tarefa.");
        return;
    }

    // Monta o objeto tarefa 
    const novaTarefa = {
        texto: texto,
        concluida: false,
        id: Date.now()  // id unico baseado em timestamp 
    };

    tarefas.push(novaTarefa);
    salvar();
    renderizar();

    inputTarefa.value = "";
    inputTarefa.focus();
}// 6. Funcao removerTarefa (recebe o id via data-id) 
function removerTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    salvar();
    renderizar();
}

// 7. Conectar eventos 
btnAdicionar.addEventListener("click", adicionarTarefa);

// Event delegation no ul (para botoes criados dinamicamente) 
listaTarefas.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const id = parseInt(e.target.dataset.id);
        removerTarefa(id);
    }
});
// ================================================ 
// SNIPPET 03 -- Carregar do LocalStorage 
// Arquivo: script.js (parte 2, no FINAL do arquivo) 
// Slide 7 
// ================================================ 

// 8. Funcao carregar do LocalStorage 
//    Padrao OBRIGATORIO: JSON.parse para converter texto em array 
function carregar() {
    const salvas = localStorage.getItem("tarefas");

    // Se for null, e a primeira vez (nada salvo ainda) 
    if (salvas === null) return;

    // Converte de texto para array 
    tarefas = JSON.parse(salvas);
    renderizar();
}
// 9. Chamar carregar UMA VEZ ao iniciar a pagina 
//    Fora de qualquer funcao, no final do arquivo 
carregar();

// =============================================
// TESTE: abra a pagina, adicione tarefas,
// feche a aba, abra de novo. As tarefas
// continuam la! Inspecionar tambem via
// DevTools > Application > Local Storage
// ============================================= 