/**
 * Ghibli Gallery - Logic
 */

const API_URL = 'https://ghibliapi.vercel.app/films/';
const filmsGrid = document.getElementById('films-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const sortSelect = document.getElementById('sort-select');
const loader = document.getElementById('loader');
const historyContainer = document.getElementById('search-history');
const suggestionsList = document.getElementById('suggestions-list');

const HISTORY_KEY = 'ghibli_search_history';
const MAX_HISTORY = 5;
let currentSuggestions = [];

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
        executarBusca();
    }
    atualizarSugestoes();
}

function atualizarSugestoes() {
    const termo = searchInput.value.toLowerCase().trim();
    suggestionsList.innerHTML = '';
    
    if (termo.length < 1) {
        suggestionsList.classList.remove('active');
        currentSuggestions = [];
        return;
    }

    currentSuggestions = allFilms
        .filter(f => f.title.toLowerCase().includes(termo))
        .slice(0, 5);

    if (currentSuggestions.length > 0) {
        currentSuggestions.forEach((filme, index) => {
            const li = document.createElement('li');
            li.className = 'suggestion-item';
            li.textContent = filme.title;
            li.onclick = () => selecionarSugestao(filme.title);
            suggestionsList.appendChild(li);
        });
        suggestionsList.classList.add('active');
    } else {
        suggestionsList.classList.remove('active');
    }
}

function selecionarSugestao(titulo) {
    searchInput.value = titulo;
    suggestionsList.classList.remove('active');
    validarBusca();
    executarBusca();
    dispararSalvarHistorico();
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
    if (!termo || termo.length < 2) return;

    let historico = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    
    // Remove o termo se já existir (para movê-lo para o topo)
    historico = historico.filter(item => item !== termo);
    
    // Adiciona no início
    historico.unshift(termo);
    
    // Limita o tamanho
    historico = historico.slice(0, MAX_HISTORY);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historico));
    renderizarHistorico();
}

function renderizarHistorico() {
    const historico = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    historyContainer.innerHTML = '';

    if (historico.length > 0) {
        historico.forEach(termo => {
            const tag = document.createElement('div');
            tag.className = 'history-tag';
            
            const label = document.createElement('span');
            label.textContent = termo;
            label.style.cursor = 'pointer';
            label.onclick = () => {
                searchInput.value = termo;
                validarBusca();
                executarBusca();
            };

            const btnExcluir = document.createElement('button');
            btnExcluir.innerHTML = '&times;';
            btnExcluir.className = 'delete-history-btn';
            btnExcluir.title = 'Remover do histórico';
            btnExcluir.onclick = (e) => {
                e.stopPropagation();
                excluirTermoHistorico(termo);
            };

            tag.appendChild(label);
            tag.appendChild(btnExcluir);
            historyContainer.appendChild(tag);
        });
    }
}

function excluirTermoHistorico(termo) {
    let historico = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    historico = historico.filter(item => item !== termo);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historico));
    renderizarHistorico();
}

/**
 * Inicialização e Eventos
 */
function inicializar() {
    searchInput.addEventListener('input', validarBusca);
    
    searchInput.addEventListener('focus', atualizarSugestoes);
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && currentSuggestions.length > 0) {
            e.preventDefault();
            selecionarSugestao(currentSuggestions[0].title);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !searchBtn.disabled) {
            executarBusca();
            dispararSalvarHistorico();
        }
    });

    searchBtn.addEventListener('click', () => {
        executarBusca();
        dispararSalvarHistorico();
    });
    
    // Restaurando o evento de ordenação que foi removido acidentalmente
    sortSelect.addEventListener('change', aplicarOrdenacaoERenderizar);

    // Fechar sugestões ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.input-wrapper')) {
            suggestionsList.classList.remove('active');
        }
    });

    buscarDados();
    renderizarHistorico();
}

function dispararSalvarHistorico() {
    const termo = searchInput.value.trim();
    if (termo) {
        salvarLogBusca(termo);
    }
}

inicializar();
