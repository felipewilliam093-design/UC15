// ================================================
// SNIPPET 05 -- Array de Personagens Iniciais
// Arquivo: script.js (parte 1)
// Slide 17
// ================================================

// Array de objetos com tres personagens prontos.
// Cada personagem tem cinco campos:
//   - nome: string
//   - classe: string
//   - level: numero
//   - habilidades: array de strings (objeto aninhado tipo array)
//   - status: objeto com hp, mana e ataque (objeto aninhado)

const personagens = [
  {
    nome: "Levi Ackerman",
    classe: "Guerreiro/Assassino",
    level: 50,
    habilidades: [
      "Espada",
      "Liderança",
      "Agilidade",
      "Força",
      "Velocidade",
      "Resistência",
    ],
    status: { hp: 500, mana: 250, ataque: 90 },
  },
  {
    nome: "Hange Zoe",
    classe: "Guerreiro",
    level: 35,
    habilidades: ["Inteligência", "Força", "Armas", "Liderança", "Resistência"],
    status: { hp: 350, mana: 70, ataque: 65 },
  },
  {
    nome: "Eren Yeager",
    classe: "Guerreiro",
    level: 80,
    habilidades: [
      "Tranformação",
      "Força",
      "Resistência",
      "Determinação",
      "Inteligência",
      "Manipulação",
    ],
    status: { hp: 900, mana: 600, ataque: 100 },
  },
];

// Selecao do container onde os cards serao injetados
const catalogo = document.querySelector("#catalogoPersonagens");
// ================================================
// SNIPPET 06 -- Funcao renderizarCatalogo
// Arquivo: script.js (parte 2)
// Slide 17
// ================================================

// Renderizacao mista:
//   createElement para o card (estrutura externa)
//   innerHTML para o conteudo interno (mais legivel)
function renderizarCatalogo() {
  catalogo.innerHTML = ""; // limpa antes de redesenhar

  personagens.forEach((personagem) => {
    // 1. Cria o container do card com createElement
    const colDiv = document.createElement("div");
    colDiv.className = "col-md-4";

    // 2. Define o conteudo interno com innerHTML e template string
    //    Note o acesso aninhado: personagem.status.hp
    //    E o uso de join no array de habilidades
    colDiv.innerHTML = ` 
            <div class="card h-100 shadow-sm"> 
                <div class="card-body"> 
                    <h3 class="card-title h5">${personagem.nome}</h3> 
                    <p class="text-muted mb-2">${personagem.classe} — Level 
${personagem.level}</p> 
  
                    <h6 class="mt-3 mb-1">Habilidades</h6> 
                    <p class="small mb-3">${personagem.habilidades.join(", ")}</p> 
  
                    <h6 class="mb-1">Status</h6> 
                    <ul class="list-unstyled small mb-0"> 
                        <li><strong>HP:</strong> ${personagem.status.hp}</li> 
                        <li><strong>Mana:</strong> ${personagem.status.mana}</li> 
                        <li><strong>Ataque:</strong> ${personagem.status.ataque}</li> 
                    </ul> 
                </div> 
            </div> 
        `;

    // 3. Adiciona o card ao catalogo
    catalogo.appendChild(colDiv);
  });
}

// Renderizar pela primeira vez ao carregar a pagina
renderizarCatalogo();
// ================================================
// SNIPPET 07 -- Funcao adicionarPersonagem
// Arquivo: script.js (parte 3)
// Slide 18
// ================================================

// Selecao dos campos do formulario
const campoNome = document.querySelector("#campoNome");
const campoClasse = document.querySelector("#campoClasse");
const campoLevel = document.querySelector("#campoLevel");
const campoHabilidades = document.querySelector("#campoHabilidades");
const campoHp = document.querySelector("#campoHp");
const campoMana = document.querySelector("#campoMana");
const campoAtaque = document.querySelector("#campoAtaque");
const btnAdicionar = document.querySelector("#btnAdicionarPersonagem");

function adicionarPersonagem() {
  // Validacao basica
  if (campoNome.value.trim() === "" || campoClasse.value.trim() === "") {
    alert("Nome e classe sao obrigatorios.");
    return;
  }

  // Trata as habilidades: split com virgula e trim em cada item
  const habilidadesArray = campoHabilidades.value
    .split(",")
    .map((h) => h.trim())
    .filter((h) => h !== "");

  // Monta o objeto completo com objeto aninhado em status
  const novoPersonagem = {
    nome: campoNome.value.trim(),
    classe: campoClasse.value.trim(),
    level: parseInt(campoLevel.value) || 1,
    habilidades: habilidadesArray,
    status: {
      hp: parseInt(campoHp.value) || 100,
      mana: parseInt(campoMana.value) || 50,
      ataque: parseInt(campoAtaque.value) || 50,
    },
  };

  // Adiciona ao array e re-renderiza personagens.push(novoPersonagem);
  renderizarCatalogo();

  // Limpa o formulario
  campoNome.value = "";
  campoClasse.value = "";
  campoLevel.value = "";
  campoHabilidades.value = "";
  campoHp.value = "";
  campoMana.value = "";
  campoAtaque.value = "";
  campoNome.focus();
}

btnAdicionar.addEventListener("click", adicionarPersonagem);
