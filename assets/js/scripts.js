// BOTÃO DE MOSTRAR/OCULTAR JOGOS
document.addEventListener("DOMContentLoaded", function () {
  var botao = document.getElementById("spoilerButton");
  var imagem = document.querySelector(".mostrarJogos img");
  var jogosDivs = document.querySelectorAll(".jogo"); // Alterado para .jogo
  var textoBotao = document.getElementById("buttonText");
  var spoilersVisiveis = false;

  function atualizarSpoilers() {
    event.preventDefault();
    if (!spoilersVisiveis) {
      jogosDivs.forEach(function (div) { 
        div.style.filter = "blur(2.5px)";
        div.style.transition = "300ms";
      });
      textoBotao.textContent = "MOSTRAR TODOS SPOILERS";
      imagem.src = "/assets/img/icones/spoilers-off.png";
    } else {
      jogosDivs.forEach(function (div) { 
        div.style.filter = "none";
        div.style.transition = "300ms";
      });
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

  var tabela = document.querySelector('.tabela-conteudo');

  var liItems = Array.from(tabela.getElementsByTagName('li'));

  liItems.sort(function (a, b) {
    var scoreA = parseInt(a.getElementsByClassName('score')[1].innerText);
    var scoreB = parseInt(b.getElementsByClassName('score')[1].innerText);
    var timeA = a.getElementsByClassName('placar')[0].innerText.split('|')[0].trim();
    var timeB = b.getElementsByClassName('placar')[0].innerText.split('|')[0].trim();

    if (scoreA > scoreB) {
      return -1;
    } else if (scoreA < scoreB) {
      return 1;
    } else {
      if (scoreA === 0 && scoreB === 0) {

        var defeatA = parseInt(a.getElementsByClassName('score')[2].innerText);
        var defeatB = parseInt(b.getElementsByClassName('score')[2].innerText);

        if (defeatA > defeatB) {
          return 1;
        } else if (defeatA < defeatB) {
          return -1;
        }
      }

      if (timeA > timeB) {
        return 1;
      } else if (timeA < timeB) {
        return -1;
      } else {
        return 0;
      }
    }

  });

  liItems.forEach(function (li, index) {
    li.getElementsByTagName('b')[0].innerText = (index + 1) + '.';
    tabela.appendChild(li);
  });
}
organizarTabela();