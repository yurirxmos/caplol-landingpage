var embed = new Twitch.Embed("twitch-embed", {
    width: 854,
    height: 480,
    channel: "caploltwitch",
    layout: "video",
    autoplay: true,
  });
  
  embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
    var player = embed.getPlayer();
    player.play();
  });

var botao = document.getElementById("spoilerButton");
var textoBotao = document.getElementById("buttonText");
var jogosDiv = document.querySelector(".jogos");
var imagem = document.querySelector(".mostrarJogos img");

document.addEventListener("DOMContentLoaded", function() {
  var botao = document.getElementById("spoilerButton");
  var imagem = document.querySelector(".mostrarJogos img");
  var jogosDiv = document.querySelector(".jogos");
  var textoBotao = document.getElementById("buttonText");
  var spoilersVisiveis = false;

  botao.addEventListener("click", function() {
    spoilersVisiveis = !spoilersVisiveis;

    if (spoilersVisiveis) {
      jogosDiv.style.display = "flex";
      textoBotao.textContent = "OCULTAR TODOS SPOILERS";
      imagem.src = "./assets/spoilers-on.png";
      jogosDiv.classList.add("fade-in");
    } else {
      jogosDiv.style.display = "none";
      textoBotao.textContent = "MOSTRAR TODOS SPOILERS";
      imagem.src = "./assets/spoilers-off.png";
      jogosDiv.classList.remove("fade-in");
    }
  });
});





  
  
