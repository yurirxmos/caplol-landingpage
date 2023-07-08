// MOSTRAR/OCULTAR SPOILERS
document.addEventListener("DOMContentLoaded", function () {
  var botao = document.getElementById("spoilerButton");
  var imagem = document.querySelector(".mostrarJogos img");
  var jogosDivs = document.querySelectorAll(".jogo");
  var textoBotao = document.getElementById("buttonText");
  var spoilersVisiveis = false;

  function atualizarSpoilers() {
    event.preventDefault();
    var jogosListas = document.querySelectorAll('.jogos-lista#feito');
    jogosListas.forEach(function (jogosListaDiv) {
      if (!spoilersVisiveis) {
        jogosListaDiv.style.opacity = "";
        var jogosDivs = jogosListaDiv.querySelectorAll(".jogo");
        jogosDivs.forEach(function (jogoDiv) {
          var placarH3 = jogoDiv.querySelector("#placar");
          placarH3.style.filter = "blur(3px) grayscale(100%)";
        });
        textoBotao.textContent = "MOSTRAR TODOS SPOILERS";
        imagem.src = "/assets/img/icones/spoilers-off.png";
      } else {
        jogosListaDiv.style.opacity = "1";
        var jogosDivs = jogosListaDiv.querySelectorAll(".jogo");
        jogosDivs.forEach(function (jogoDiv) {
          var placarH3 = jogoDiv.querySelector("#placar");
          placarH3.style.filter = "none";
        });
        textoBotao.textContent = "OCULTAR TODOS SPOILERS";
        imagem.src = "/assets/img/icones/spoilers-on.png";
      }
    });
  }
  
  
  
  

  atualizarSpoilers();

  botao.addEventListener("click", function () {
    spoilersVisiveis = !spoilersVisiveis;
    atualizarSpoilers();
  });
});

// CORREÇÃO PARA A PRIMEIRA DIV DE JOGOS
window.addEventListener('DOMContentLoaded', () => {
  const jogosListaDivs = document.querySelectorAll('.jogos-lista');

  jogosListaDivs.forEach((jogosListaDiv) => {
    const jogoDivs = jogosListaDiv.querySelectorAll('.jogo');
    if (jogoDivs.length === 1 || jogoDivs.length === 2) {
      jogosListaDiv.style.height = '305px';
    }    
  });
});

// FECHAR POPUP
document.getElementById("fechar").addEventListener("click", function () {
  var contagemInicio = document.querySelector(".popup");
  contagemInicio.style.display = "none";
});

// DIV INSCRIÇÃO
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
    var defeatA = parseInt(a.getElementsByClassName('score')[2].innerText);
    var defeatB = parseInt(b.getElementsByClassName('score')[2].innerText);
    var timeA = a.getElementsByClassName('placar')[0].innerText.split('|')[0].trim();
    var timeB = b.getElementsByClassName('placar')[0].innerText.split('|')[0].trim();

    if (scoreA > scoreB) {
      return -1;
    } else if (scoreA < scoreB) {
      return 1;
    } else {
      if (defeatA > defeatB) {
        return 1;
      } else if (defeatA < defeatB) {
        return -1;
      } else {
        // Caso as vitórias e derrotas sejam iguais, verificar o tempo
        if (timeA < timeB) {
          return -1;
        } else if (timeA > timeB) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  });

  liItems.forEach(function (li, index) {
    li.getElementsByTagName('b')[0].innerText = (index + 1) + '.';
    tabela.appendChild(li);
  });
}
organizarTabela();