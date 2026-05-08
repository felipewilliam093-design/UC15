// ================================================ 
// SNIPPET 05 -- JS de Validacao do Formulario 
// Arquivo: script.js (pasta aula14-formulario) 
// Slide 19 
// ================================================
let inscricoes = []; // Array global para armazenar as inscricoes

// 1. Funcao pronta de validacao de CPF 
//    Implementa o algoritmo dos digitos verificadores 
function isCpfValido(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let dig1 = (soma * 10) % 11;
    if (dig1 === 10) dig1 = 0;
    if (dig1 !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    let dig2 = (soma * 10) % 11;
    if (dig2 === 10) dig2 = 0;
    return dig2 === parseInt(cpf[10]);
}

// 2. Selecao dos elementos 
const campoNome = document.querySelector("#campoNome");
const campoEmail = document.querySelector("#campoEmail");
const campoSenha = document.querySelector("#campoSenha");
const campoCpf = document.querySelector("#campoCpf");
const campoTelefone = document.querySelector("#campoTelefone");
const campoData = document.querySelector("#campoData");
const campoTipoEvento = document.querySelector("#campoTipoEvento");
const campoTermos = document.querySelector("#campoTermos");
const btnInscrever = document.querySelector("#btnInscrever");

// 3. Funcoes de validacao individuais (retornam true ou false) 
function validarNome() { return campoNome.value.trim().length >= 4; }
function validarEmail() {
    const v = campoEmail.value.trim();
    return v.includes("@") && v.includes(".");
}
function validarSenha() {
    const s = campoSenha.value;
    return s.length >= 8 && /\d/.test(s) && /[!@#$%&*]/.test(s);
}
function validarCpf() { return isCpfValido(campoCpf.value); }
function validarTelefone() {
    const tel = campoTelefone.value.replace(/\D/g, "");
    return tel.length === 11;
}
function validarData() {
    if (!campoData.value) return false;
    const nasc = new Date(campoData.value);
    const hoje = new Date();
    const idade = (hoje - nasc) / (1000 * 60 * 60 * 24 * 365.25);
    return idade >= 16;
}
function validarTipoEvento() { return campoTipoEvento.value !== ""; }
function validarTermos() { return campoTermos.checked; }

// 4. Funcao auxiliar para aplicar feedback visual Bootstrap 
function aplicarFeedback(elemento, valido) {
    if (valido) {
        elemento.classList.add("is-valid");
        elemento.classList.remove("is-invalid");
    } else {
        elemento.classList.add("is-invalid");
        elemento.classList.remove("is-valid");
    }
}

// 5. Verificar formulario inteiro e habilitar botao 
function verificarFormulario() {
    const tudoValido =
        validarNome() && validarEmail() && validarSenha() && validarCpf() && validarTelefone() &&
        validarData() && validarTipoEvento() && validarTermos();
    btnInscrever.disabled = !tudoValido;
}

// 6. Conectar eventos input e blur em cada campo 
campoNome.addEventListener("input", () => {
    aplicarFeedback(campoNome, validarNome());
    verificarFormulario();
});
campoNome.addEventListener("blur", () => aplicarFeedback(campoNome, validarNome()));

campoEmail.addEventListener("input", () => {
    aplicarFeedback(campoEmail, validarEmail());
    verificarFormulario();
});
campoEmail.addEventListener("blur", () => aplicarFeedback(campoEmail, validarEmail()));

campoSenha.addEventListener("input", () => {
    aplicarFeedback(campoSenha, validarSenha());
    verificarFormulario();
});
campoSenha.addEventListener("blur", () => aplicarFeedback(campoSenha, validarSenha()));

campoCpf.addEventListener("input", () => {
    aplicarFeedback(campoCpf, validarCpf());
    verificarFormulario();
});
campoCpf.addEventListener("blur", () => aplicarFeedback(campoCpf, validarCpf()));

campoTelefone.addEventListener("input", () => {
    aplicarFeedback(campoTelefone, validarTelefone());
    verificarFormulario();
});
campoTelefone.addEventListener("blur", () => aplicarFeedback(campoTelefone, validarTelefone()));

campoData.addEventListener("input", () => {
    aplicarFeedback(campoData, validarData());
    verificarFormulario();
});
campoData.addEventListener("blur", () => aplicarFeedback(campoData, validarData()));

campoTipoEvento.addEventListener("change", () => {
    aplicarFeedback(campoTipoEvento, validarTipoEvento());
    verificarFormulario();
});
campoTipoEvento.addEventListener("blur", () => aplicarFeedback(campoTipoEvento, validarTipoEvento()));

campoTermos.addEventListener("change", () => {
    aplicarFeedback(campoTermos, validarTermos());
    verificarFormulario();
});
// 7. Botao de envio e chamada do Modal
btnInscrever.addEventListener("click", () => {
    // 1. Adiciona a inscricao no array
    const novaInscricao = {
        nome: campoNome.value,
        email: campoEmail.value,
        senha: campoSenha.value,
        cpf: campoCpf.value,
        telefone: campoTelefone.value,
        dataNascimento: campoData.value,
        tipoEvento: campoTipoEvento.options[campoTipoEvento.selectedIndex].text
    };
    inscricoes.push(novaInscricao);
    document.querySelector("#contadorInscricoes").textContent = `Total: ${inscricoes.length} inscricoes`;

    // 2. Preenche os spans do modal com os dados
    document.querySelector("#resumoNome").textContent = campoNome.value;
    document.querySelector("#resumoEmail").textContent = campoEmail.value;
    document.querySelector("#resumoArea").textContent = campoTipoEvento.options[campoTipoEvento.selectedIndex].text;

    // 2. Instancia e abre o modal Bootstrap
    const modalElement = document.querySelector("#resumoModal");
    const modalResumo = new bootstrap.Modal(modalElement);
    modalResumo.show();
});

// 8. Ao fechar o modal, limpa o formulario
document.querySelector("#resumoModal").addEventListener("hidden.bs.modal", () => {
    document.querySelector("#formInscricao").reset();
    [campoNome, campoEmail, campoSenha, campoCpf, campoTelefone, campoData, campoTipoEvento, campoTermos].forEach(el => {
        el.classList.remove("is-valid", "is-invalid");
    });
    btnInscrever.disabled = true;
});