/**
 * Ghibli Gallery - Logic
 */

const API_URL = 'https://ghibliapi.vercel.app/films/';
const filmsGrid = document.getElementById('films-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const sortSelect = document.getElementById('sort-select');
const loader = document.getElementById('loader');

let allFilms = [];
let displayedFilms = [];

/**
 * Função: buscarDados
 */
async function buscarDados() {
    try {
        mostrarCarregamento(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) throw new Error('Não foi possível carregar os filmes');
        
        allFilms = await response.json();
        displayedFilms = [...allFilms]; // Cópia inicial
        
        renderizarFilmes(displayedFilms);
        mostrarCarregamento(false);
    } catch (error) {
        console.error('Erro:', error);
        exibirErro(error.message);
    }
}

/**
 * Função: renderizarFilmes
 * Usa forEach para gerar cards no DOM a partir de um array
 */
function renderizarFilmes(filmes) {
    filmsGrid.innerHTML = '';
    
    if (filmes.length === 0) {
        exibirMensagemVazia();
        return;
    }

    // Requisito: Uso de forEach para gerar os cards
    filmes.forEach(filme => {
        const card = criarCardFilme(filme);
        filmsGrid.appendChild(card);
    });
}

/**
 * Função: criarCardFilme
 */
function criarCardFilme(filme) {
    const article = document.createElement('article');
    article.className = 'film-card';
    
    article.innerHTML = `
        <figure class="film-poster">
            <img src="${filme.image}" alt="${filme.title} poster" loading="lazy">
        </figure>
        <div class="film-info">
            <header class="film-header">
                <h3 class="film-title">${filme.title}</h3>
                <span class="film-year">${filme.release_date}</span>
            </header>
            <div class="film-meta">
                <span class="film-director">Dir: ${filme.director}</span>
                <span class="film-score">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    ${filme.rt_score}%
                </span>
            </div>
            <p class="film-description">${filme.description}</p>
        </div>
    `;
    
    return article;
}

/**
 * Função: validarBusca
 */
function validarBusca() {
    const texto = searchInput.value.trim();
    
    if (texto.length === 0) {
        searchBtn.disabled = true;
        displayedFilms = [...allFilms]; // Restaura a lista completa
        aplicarOrdenacaoERenderizar();
    } else {
        searchBtn.disabled = false;
    }
}

/**
 * Função: executarBusca
 */
function executarBusca() {
    const termo = searchInput.value.toLowerCase().trim();
    displayedFilms = allFilms.filter(filme => 
        filme.title.toLowerCase().includes(termo) || 
        filme.director.toLowerCase().includes(termo)
    );
    
    aplicarOrdenacaoERenderizar();
    salvarLogBusca(termo);
}

/**
 * Função: aplicarOrdenacaoERenderizar
 * Implementação do recurso de manipulação (Sort/Ordenação)
 */
function aplicarOrdenacaoERenderizar() {
    const criterio = sortSelect.value;
    const listaParaOrdenar = [...displayedFilms];

    switch (criterio) {
        case 'year-desc':
            listaParaOrdenar.sort((a, b) => b.release_date - a.release_date);
            break;
        case 'year-asc':
            listaParaOrdenar.sort((a, b) => a.release_date - b.release_date);
            break;
        case 'score-desc':
            listaParaOrdenar.sort((a, b) => b.rt_score - a.rt_score);
            break;
        case 'title-asc':
            listaParaOrdenar.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            // 'none' ou qualquer outro - mantém a ordem original da busca
            break;
    }

    renderizarFilmes(listaParaOrdenar);
}

/**
 * Funções Auxiliares (Pequenas e Nomeadas)
 */
function mostrarCarregamento(visivel) {
    loader.style.display = visivel ? 'block' : 'none';
}

function exibirErro(msg) {
    loader.style.display = 'block';
    loader.innerHTML = `<p style="color: #e74c3c; font-weight: bold;">Erro: ${msg}</p>`;
}

function exibirMensagemVazia() {
    filmsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhum filme encontrado.</p>';
}

function salvarLogBusca(termo) {
    console.log(`Busca executada: "${termo}" em ${new Date().toLocaleTimeString()}`);
}

/**
 * Inicialização e Eventos
 */
function inicializar() {
    searchInput.addEventListener('input', validarBusca);
    searchBtn.addEventListener('click', executarBusca);
    
    // Evento para o recurso de manipulação (Sort)
    sortSelect.addEventListener('change', aplicarOrdenacaoERenderizar);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !searchBtn.disabled) {
            executarBusca();
        }
    });

    buscarDados();
}

inicializar();
