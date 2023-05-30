// BOTÃO DE MOSTRAR/OCULTAR JOGOS
document.addEventListener("DOMContentLoaded", function () {
  var botao = document.getElementById("spoilerButton");
  var imagem = document.querySelector(".mostrarJogos img");
  var jogosDiv = document.querySelector(".jogos");
  var textoBotao = document.getElementById("buttonText");
  var spoilersVisiveis = false;

  function atualizarSpoilers() {
    event.preventDefault();
    if (!spoilersVisiveis) {
      jogosDiv.style.filter = "blur(3px)";
      jogosDiv.style.transition = "300ms"
      textoBotao.textContent = "MOSTRAR TODOS SPOILERS";
      imagem.src = "/assets/img/icones/spoilers-off.png";
    } else {
      jogosDiv.style.filter = "none";
      jogosDiv.style.transition = "300ms"
      textoBotao.textContent = "OCULTAR TODOS SPOILERS";
      imagem.src = "/assets/img/icones/spoilers-on.png";
    }
  }

  atualizarSpoilers();

  botao.addEventListener("click", function () {
    spoilersVisiveis = !spoilersVisiveis;
    atualizarSpoilers();
  });
});
var dataAlvo = new Date("2023-07-01"); // Define a data alvo

function atualizarContador() {

  var dataAtual = new Date();
  var diferenca = dataAlvo.getTime() - dataAtual.getTime();
  var dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  var horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  var segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
  var contadorElemento = document.getElementById("contador");

  contadorElemento.textContent = dias + "d " + horas + "h " + minutos + "m " + segundos + "s";
  setTimeout(atualizarContador, 1000);
}
atualizarContador();

//DIV INSCRIÇÃO
function toggleFormInscricao() {
  var checkbox = document.getElementById("myCheckbox");
  var formInscricao = document.getElementById("form-inscricao");

  if (checkbox.checked) {
    formInscricao.style.display = "block";
  } else {
    formInscricao.style.display = "none";
  }
}

// Função para organizar a tabela
function organizarTabela() {
  // Seleciona a tabela pelo ID
  var tabela = document.querySelector('.tabela-conteudo');

  // Obtém todos os elementos <li> da tabela
  var liItems = Array.from(tabela.getElementsByTagName('li'));

  // Ordena os elementos com base no número de vitórias e tempo
  liItems.sort(function (a, b) {
    // Obtém os elementos de pontuação (vitórias) e tempo de cada <li>
    var scoreA = parseInt(a.getElementsByClassName('score')[1].innerText);
    var scoreB = parseInt(b.getElementsByClassName('score')[1].innerText);
    var timeA = a.getElementsByClassName('placar')[0].innerText.split('|')[0].trim();
    var timeB = b.getElementsByClassName('placar')[0].innerText.split('|')[0].trim();

    // Compara o número de vitórias
    if (scoreA > scoreB) {
      return -1; // A vem antes de B
    } else if (scoreA < scoreB) {
      return 1; // B vem antes de A
    } else {
      // Compara o tempo se o número de vitórias for igual
      if (timeA > timeB) {
        return 1; // B vem antes de A
      } else if (timeA < timeB) {
        return -1; // A vem antes de B
      } else {
        return 0; // Nenhuma alteração na ordem
      }
    }
  });

  // Atualiza a tabela com os elementos reordenados
  liItems.forEach(function (li, index) {
    // Atualiza a posição no <li>
    li.getElementsByTagName('b')[0].innerText = (index + 1) + '.';

    // Move o <li> para a nova posição na tabela
    tabela.appendChild(li);
  });
}
organizarTabela();