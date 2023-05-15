// BOTÃO DE MOSTRAR/OCULTAR JOGOS
document.addEventListener("DOMContentLoaded", function() {
  var botao = document.getElementById("spoilerButton");
  var imagem = document.querySelector(".mostrarJogos img");
  var jogosDiv = document.querySelector(".jogos");
  var textoBotao = document.getElementById("buttonText");
  var spoilersVisiveis = false; // Definir como true para mostrar os spoilers por padrão

  // Função para atualizar o estado do botão e dos spoilers
  function atualizarSpoilers() {
    if (spoilersVisiveis) {
      jogosDiv.style.display = "none";
      textoBotao.textContent = "MOSTRAR TODOS SPOILERS";
      imagem.src = "./assets/spoilers-off.png";
      jogosDiv.classList.remove("fade-in");
    } else {
      jogosDiv.style.display = "flex";
      textoBotao.textContent = "OCULTAR TODOS SPOILERS";
      imagem.src = "./assets/spoilers-on.png";
      jogosDiv.classList.add("fade-in");
    }
  }

  // Atualizar o estado dos spoilers no carregamento da página
  atualizarSpoilers();

  // Adicionar o evento de clique ao botão
  botao.addEventListener("click", function() {
    spoilersVisiveis = !spoilersVisiveis;
    atualizarSpoilers();
  });
});


// Define a data alvo
var dataAlvo = new Date("2023-07-01");

// Função para atualizar o contador
function atualizarContador() {
  // Obtém a data atual
  var dataAtual = new Date();

  // Calcula a diferença em milissegundos entre a data atual e a data alvo
  var diferenca = dataAlvo.getTime() - dataAtual.getTime();

  // Calcula os componentes do contador: dias, horas, minutos e segundos
  var dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  var horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  var segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  // Exibe o contador no elemento HTML
  var contadorElemento = document.getElementById("contador");
  contadorElemento.textContent = dias + "d " + horas + "h " + minutos + "m " + segundos + "s";

  // Atualiza o contador a cada segundo
  setTimeout(atualizarContador, 1000);
}

// Inicia o contador
atualizarContador();





  
  
