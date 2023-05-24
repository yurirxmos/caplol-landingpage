// BOTÃO DE MOSTRAR/OCULTAR JOGOS
document.addEventListener("DOMContentLoaded", function() {
  var botao = document.getElementById("spoilerButton");
  var imagem = document.querySelector(".mostrarJogos img");
  var jogosDiv = document.querySelector(".jogos");
  var textoBotao = document.getElementById("buttonText");
  var spoilersVisiveis = false;

  function atualizarSpoilers() {
    event.preventDefault();
    if (spoilersVisiveis) {
      jogosDiv.style.filter = "blur(3px)";
      jogosDiv.style.transition = "300ms"
      textoBotao.textContent = "MOSTRAR TODOS SPOILERS";
      imagem.src = "./assets/spoilers-off.png";
    } else {
      jogosDiv.style.filter = "none";
      jogosDiv.style.transition = "300ms"
      textoBotao.textContent = "OCULTAR TODOS SPOILERS";
      imagem.src = "./assets/spoilers-on.png";
    }
  }  

  atualizarSpoilers();

  botao.addEventListener("click", function() {
    spoilersVisiveis = !spoilersVisiveis;
    atualizarSpoilers();
  });
});



// CONTADOR NA TELA 
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


// BUSCAR JOGADOR
function pesquisarJogador() {
  event.preventDefault();
  const apiKey = process.env.API_KEY;
  var nick = document.getElementById('nickInput').value;

  resultado.innerHTML = '';

  fetch('https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + encodeURIComponent(nick) + '?api_key=' + apiKey)
    .then(response => response.json())
    .then(data => {
      // Extrair o ID do jogador retornado pela API
      var jogadorId = data.id;

      fetch('https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + jogadorId + '?api_key=' + apiKey)
        .then(response => response.json())
        .then(data => {
          
          var resultado = document.getElementById('resultado');
          resultado.style.display = 'block';

          if (data[0] && data[0].tier && data[0].rank && data[0].leaguePoints) {
            if (data[0].tier === 'DIAMOND' || data[0].tier === 'MASTER' || data[0].tier === 'GRANDMASTER' || data[0].tier === 'CHALLENGER') {
              resultado.innerHTML = '<h1>Elo</h1> ' + '<h2>' + data[0].tier + ' ' + data[0].rank + ' ' + data[0].leaguePoints + ' LP' + '</h2>' + '<br>';
              resultado.innerHTML += '<h4 id="restringido"><b>Sob certas restrições</b> <br> Você <u>pode jogar</u> o CAPLOL, mas possui restrições, verifique as regras!</h4>';
            } else {
              resultado.innerHTML = '<h1>Elo</h1> ' + '<h2>' + data[0].tier + ' ' + data[0].rank + ' ' + data[0].leaguePoints + ' LP' + '</h2>' + '<br>';
              resultado.innerHTML += '<h1>Vitórias</h1> ' + '<h2>' + data[0].wins + '</h2>';
              if (data[0].wins <= 35) {
                resultado.innerHTML += '<h3><b>Inválido</b> <br> A quantidade de vitórias precisa ser maior que 35.</h3>';
              } else {
                resultado.innerHTML += '<br>' + '<h4><b>Válido</b> <br> Você está pronto para jogar o CAPLOL.</h4>';
              }
            }
          } else {
            resultado.innerHTML += '<h3><b>Não definido</b> <br> O jogador não foi encontrado ou não está ranqueado.</h3>';
          }
          
        })

        .catch(error => {
          console.log('Erro na obtenção das informações do jogador', error);
        });
    })
    .catch(error => {
      console.log('Erro na obtenção do ID do jogador', error);
    });
}