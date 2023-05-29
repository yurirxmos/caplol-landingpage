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

function adicionarInput() {
  var inputsContainer = document.getElementById('inputsContainer');
  var numInputs = inputsContainer.childElementCount;

  if (numInputs >= 10) {
    return;
  }

  var newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.placeholder = 'Insira o nick aqui';
  newInput.id = 'nickInput' + numInputs;

  inputsContainer.appendChild(newInput);

  if (numInputs + 1 >= 10) {
    document.getElementById('addButton').style.display = "none";
  }
}

function verificarInputs() {
  limparResultados();

  var inputsContainer = document.getElementById('inputsContainer');
  var inputs = inputsContainer.getElementsByTagName('input');
  var nicks = [];

  for (var i = 0; i < inputs.length; i++) {
    var inputValue = inputs[i].value;

    if (inputValue.trim() !== '') {
      nicks.push(inputValue);
    }
  }

  var erroMensagem = document.getElementById('erroMensagem');
  if (nicks.length === 0) {
    erroMensagem.textContent = 'Preencha pelo menos um campo.';
    erroMensagem.style.display = 'block';
    return;
  } else {
    erroMensagem.style.display = 'none';
  }

  

  nicks.forEach(function (nick) {
    pesquisarJogador(nick);
  });
}

function limparResultados() {
  var resultadosContainer = document.getElementById('resultadosContainer');
  while (resultadosContainer.firstChild) {
    resultadosContainer.firstChild.remove();
  }
}


function pesquisarJogador(nick) {
  const API_KEY = "RGAPI-7baeb44a-4ade-4482-b126-2bb126cdbe11";
  event.preventDefault();

  // Cria uma nova div de resultados
  var novaDivResultados = document.createElement('div');
  novaDivResultados.className = 'resultado';
  novaDivResultados.style.display = 'flex';

  fetch('https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + encodeURIComponent(nick) + '?api_key=' + API_KEY)
    .then(response => response.json())
    .then(data => {

      var jogadorId = data.id;

      fetch('https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + jogadorId + '?api_key=' + API_KEY)
        .then(response => response.json())
        .then(data => {

          if (data && data.length > 0) {
            const playerData = data[0].queueType === 'RANKED_SOLO_5x5' ? data[0] : data[1];

            var tierImageSrc = '';
            if (playerData.tier === 'IRON') {
              tierImageSrc = '<img src="./assets/img/elos/iron.webp">';
            } else if (playerData.tier === 'BRONZE') {
              tierImageSrc = '<img src="./assets/img/elos/bronze.webp">';
            } else if (playerData.tier === 'SILVER') {
              tierImageSrc = '<img src="./assets/img/elos/silver.webp">';
            } else if (playerData.tier === 'GOLD') {
              tierImageSrc = '<img src="./assets/img/elos/gold.webp">';
            } else if (playerData.tier === 'PLATINUM') {
              tierImageSrc = '<img src="./assets/img/elos/platinum.webp">';
            } else if (playerData.tier === 'DIAMOND') {
              tierImageSrc = '<img src="./assets/img/elos/diamond.webp">';
            } else if (playerData.tier === 'MASTER') {
              tierImageSrc = '<img src="./assets/img/elos/master.webp">';
            } else if (playerData.tier === 'GRANDMASTER') {
              tierImageSrc = '<img src="./assets/img/elos/grandmaster.webp">';
            } else if (playerData.tier === 'CHALLENGER') {
              tierImageSrc = '<img src="./assets/img/elos/challenger.webp">';
            }

            novaDivResultados.innerHTML =
              tierImageSrc +
              playerData.summonerName +
              '<div class="jogador">' +
              '<h2>' +
              playerData.tier + ' ' + playerData.rank + '<br>' + playerData.leaguePoints + ' LP' +
              '</h2>' +
              '<h2>' +
              playerData.wins +
              ' vitórias </h2>';

            if (playerData.tier === 'DIAMOND' || playerData.tier === 'MASTER' || playerData.tier === 'GRANDMASTER' || playerData.tier === 'CHALLENGER') {
              if (playerData.wins < 35) {
                novaDivResultados.innerHTML += '<h3><b>Inválido</b> <br> A quantidade de vitórias precisa ser maior que 35.</h3>';
              } else {
                novaDivResultados.innerHTML += '<h4 id="restringido"><b>Condicionado</b> <br> Você está valido, porém verifique as regras!</h4>';
              }
            } else {
              if (playerData.wins < 35) {
                novaDivResultados.innerHTML += '<h3><b>Inválido</b> <br> A quantidade de vitórias precisa ser maior que 35.</h3>';
              } else {
                novaDivResultados.innerHTML += '<h4><b>Válido</b> <br> Você está pronto para enfrentar o desafio do CAPLOL!</h4>';
              }
            }
          } else {
            novaDivResultados.innerHTML += '<h3><b>Não definido</b> <br> O jogador não foi encontrado ou não está ranqueado.</h3>';
          }

          // Adiciona a nova div de resultados ao contêiner
          var resultadosContainer = document.getElementById('resultadosContainer');
          resultadosContainer.appendChild(novaDivResultados);
        })

        .catch(error => {
          console.log('Erro na obtenção das informações do jogador', error);
        });
    })
    .catch(error => {
      console.log('Erro na obtenção do ID do jogador', error);
    });
}

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