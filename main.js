const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />'; /* Strings criadas para exibição dos emojis de aprovado/reprovado */
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';

/* Para calcular a média final, serão criados dois arrays para armazenar todas as atividades e notas digitadas pelo usuário final */

const atividades = []; /* Arrays vazios criados no escopo global para armazenar o conteúdo */
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));

let linhas = ''; /* "let linhas = '';" precisa ser um evento global para que não seja resetado, por isso precisa estar acima do evento de submit, fazendo assim com que acrescente uma nova linha ao invés de substituí-las */

form.addEventListener('submit', function(e) { /* Evento de submit */
    e.preventDefault(); /* remoção do comportamento de atualização da tela pelo submit */

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() { /* Os comandos foram separados em funções (function) para que o código fique mais organizado */
    const inputNomeAtividade = document.getElementById('nome-atividade'); /* Constantes criadas para armazenamento dos valores "nome e "nota" */
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value); /* Toda vez que o "adicionaLinha" for chamado, um push será feito nos arrays para adicionar o conteúdo */
        notas.push(parseFloat(inputNotaAtividade.value)); /* parseFloat utilizado para que deixe de ser uma string */
    
        let linha = '<tr>'; /* Recebe o código html como uma string */
        linha += `<td>${inputNomeAtividade.value}</td>`; /* Primeira coluna */
        linha += `<td>${inputNotaAtividade.value}</td>`; /* Segunda coluna */
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; /* Terceira coluna */   /* Operador ternário if(?) - else(:) */
        linha += '</tr>';
    
        linhas += linha;
    }

    inputNomeAtividade.value = ''; /* código feito para limpar o formulário depois de adicionar o conteúdo (nome/nota) */
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody'); /* Para colocar o conteúdo dentro do corpo da tabela */
    corpoTabela.innerHTML = linhas; /* innerHTML para inserir o conteúdo dentro de uma tag */
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}