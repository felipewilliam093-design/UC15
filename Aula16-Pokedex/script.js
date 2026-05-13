// ================================================
// SNIPPET 05 -- Funcao buscarPokemon com Fetch
// Arquivo: script.js (parte 1)
// Slide 17
// ================================================

// Selecao dos elementos
const campoBusca = document.querySelector("#campoBusca");
const btnBuscar = document.querySelector("#btnBuscar");
const divSpinner = document.querySelector("#divSpinner");
const divResultado = document.querySelector("#divResultado");
const divHistorico = document.querySelector("#divHistorico");

// Funcao principal: assincrona (async)
async function buscarPokemon() {
    const nome = campoBusca.value.trim().toLowerCase();

    // Validacao basica
    if (nome === "") {
        alert("Digite o nome de um pokemon.");
        return;
    }

    // Mostrar o spinner e limpar resultado anterior
    divSpinner.classList.remove("d-none");
    divResultado.innerHTML = "";

    try {
        // 1. Faz a requisicao HTTP
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

        // 2. Verificar se a resposta foi bem sucedida
        //    response.ok e true se status entre 200-299
        if (!resposta.ok) {
            throw new Error("Pokemon nao encontrado.");
        }

        // 3. Converter JSON para objeto JavaScript
        const dados = await resposta.json();

        // 4. Renderizar e salvar no historico
        renderizar(dados);
        salvarHistorico(nome);

    } catch (erro) {
        // Trata erros: rede caiu, pokemon nao existe, etc.
        divResultado.innerHTML = `
            <div class="alert alert-danger text-center">
                ${erro.message}
            </div>
        `;
    } finally {
        // Esconde o spinner SEMPRE (sucesso ou erro)
        divSpinner.classList.add("d-none");
    }
}

// Conectar eventos
btnBuscar.addEventListener("click", buscarPokemon);

// Permitir busca com Enter
campoBusca.addEventListener("keydown", (e) => {
    if (e.key === "Enter") buscarPokemon();
});
// ================================================
// SNIPPET 06 -- Renderizar com cores por tipo
// Arquivo: script.js (parte 2, abaixo do snippet 05)
// Slide 18
// ================================================

// Mapa de cores para cada tipo de pokemon
const coresTipo = {
    normal: "#A8A878", fire: "#F08030", water: "#6890F0",
    electric: "#F8D030", grass: "#78C850", ice: "#98D8D8",
    fighting: "#C03028", poison: "#A040A0", ground: "#E0C068",
    flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
    rock: "#B8A038", ghost: "#705898", dragon: "#7038F8",
    dark: "#705848", steel: "#B8B8D0", fairy: "#EE99AC"
};

function renderizar(pokemon) {
    // Cor principal: cor do primeiro tipo
    const tipoPrincipal = pokemon.types[0].type.name;
    const corPrincipal = coresTipo[tipoPrincipal] || "#888888";

    // Tipos como badges coloridos
    const badgesTipos = pokemon.types.map(t => {
        const cor = coresTipo[t.type.name] || "#888888";
        return `<span class="badge me-1" style="background:${cor}">${t.type.name}</span>`;
    }).join("");

    // Habilidades em texto
    const habilidades = pokemon.abilities
        .map(a => a.ability.name)
        .join(", ");

    // Stats principais (HP, ataque, defesa)
    const hp = pokemon.stats[0].base_stat;
    const ataque = pokemon.stats[1].base_stat;
    const defesa = pokemon.stats[2].base_stat;

    // Montagem do card
    divResultado.innerHTML = `
        <div class="card shadow">
            <div class="card-header text-white text-center" style="background:${corPrincipal}">
                <h2 class="mb-0 text-capitalize">
                    ${pokemon.name} <small>#${pokemon.id}</small>
                </h2>
                <div class="mt-2">${badgesTipos}</div>
            </div>
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-5 text-center">
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="img-fluid">
                    </div>
                    <div class="col-md-7">
                        <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                        <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                        <p><strong>Habilidades:</strong> ${habilidades}</p>
 
                        <h6 class="mt-3">Stats</h6>
                        <p class="mb-1 small">HP: ${hp}</p>
                        <div class="progress mb-2" style="height:8px">
                            <div class="progress-bar bg-danger" style="width:${hp * 100 / 200}%"></div>
                        </div>
 
                        <p class="mb-1 small">Ataque: ${ataque}</p>
                        <div class="progress mb-2" style="height:8px">
                            <div class="progress-bar bg-warning" style="width:${ataque * 100 / 200}%"></div>
                        </div>
 
                        <p class="mb-1 small">Defesa: ${defesa}</p>
                        <div class="progress" style="height:8px">
                            <div class="progress-bar bg-info" style="width:${defesa * 100 / 200}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
// ================================================
// SNIPPET 07 -- Historico de Buscas no LocalStorage
// Arquivo: script.js (parte 3, no FINAL do arquivo)
// Slide 19
// ================================================

// Salva o nome no historico (max 5 ultimas, sem duplicatas)
function salvarHistorico(nome) {
    // Le o historico atual ou comeca vazio
    let historico = JSON.parse(localStorage.getItem("historico")) || [];

    // Remove o nome se ja existir (para nao duplicar)
    historico = historico.filter(h => h !== nome);

    // Adiciona no inicio
    historico.unshift(nome);

    // Limita a 5 ultimos
    if (historico.length > 5) historico = historico.slice(0, 5);

    // Salva e re-renderiza
    localStorage.setItem("historico", JSON.stringify(historico));
    renderizarHistorico();
}

// Renderiza os chips de historico
function renderizarHistorico() {
    const historico = JSON.parse(localStorage.getItem("historico")) || [];
    divHistorico.innerHTML = "";

    if (historico.length === 0) {
        divHistorico.innerHTML = "<small class=\"text-muted\">Nenhuma busca ainda.</small>";
        return;
    }

    historico.forEach(nome => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-secondary btn-sm text-capitalize";
        btn.textContent = nome;
        btn.addEventListener("click", () => {
            campoBusca.value = nome;
            buscarPokemon();
        });
        divHistorico.appendChild(btn);
    });
}

// Chamar ao iniciar a pagina para mostrar historico salvo
renderizarHistorico();
