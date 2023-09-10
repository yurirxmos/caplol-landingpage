document.addEventListener("DOMContentLoaded", function () {
  // Obtém o menu de times e a lista de jogos
  var menuTimes = document.getElementById('menuTimes');
  var jogosLista = document.getElementsByClassName('jogos-lista');

  // Adiciona um evento de escuta para cada link de time
  var linksTimes = menuTimes.getElementsByTagName('a');
  for (var i = 0; i < linksTimes.length; i++) {
    linksTimes[i].addEventListener('click', function () {
      var timeSelecionado = this.getAttribute('data-time');

      // Percorre todos os elementos da lista de jogos
      for (var i = 0; i < jogosLista.length; i++) {
        var jogos = jogosLista[i].getElementsByClassName('jogo');
        var listaVisivel = false; // Variável para rastrear se a lista contém jogos visíveis

        // Percorre os jogos dentro de cada lista
        for (var j = 0; j < jogos.length; j++) {
          var jogo = jogos[j];
          var times = jogo.getElementsByTagName('b');

          // Verifica se o time selecionado está presente no jogo
          var timeEncontrado = false;
          for (var k = 0; k < times.length; k++) {
            if (times[k].textContent === timeSelecionado || timeSelecionado === '') {
              timeEncontrado = true;
              break;
            }
          }

          // Oculta ou exibe o jogo com base no time selecionado
          if (timeSelecionado === '' || timeEncontrado) {
            jogo.style.display = 'block';  // Exibe o jogo
            listaVisivel = true; // Marca a lista como contendo jogos visíveis
          } else {
            jogo.style.display = 'none';   // Oculta o jogo
          }
        }

        // Oculta a lista se não houver jogos visíveis
        if (listaVisivel) {
          jogosLista[i].style.display = 'flex'; // Exibe a lista
        } else {
          jogosLista[i].style.display = 'none';  // Oculta a lista
        }

        // Altera a largura da lista para fit-content
        if (timeSelecionado === '') {
          jogosLista[i].style.minHeight = '340px';
        } else {
          jogosLista[i].style.minHeight = 'fit-content';
        }

      }
    });
  }
});


// Função para mostrar/ocultar a div "fase-de-pontos" com fade-in
function toggleFaseDePontos() {
  const playoffDiv = document.getElementById('fasedepontosDiv');

  if (playoffDiv.style.display === 'none') {
    playoffDiv.style.display = 'block';
    setTimeout(() => playoffDiv.style.opacity = 1, 0);
    document.getElementById('toggleButtonFaseDePontos').textContent = 'Ocultar fase de pontos';
  } else {
    playoffDiv.style.opacity = 0;
    setTimeout(() => playoffDiv.style.display = 'none', 500);
    document.getElementById('toggleButtonFaseDePontos').textContent = 'Mostrar fase de pontos';
  }
}


// Função para mostrar/ocultar a div "playoff" com fade-in
function togglePlayoff() {
  const playoffDiv = document.getElementById('playoffDiv');

  if (playoffDiv.style.display === 'none') {
    playoffDiv.style.display = 'block';
    setTimeout(() => playoffDiv.style.opacity = 1, 0);
    document.getElementById('toggleButton').textContent = 'Ocultar playoffs';
  } else {
    playoffDiv.style.opacity = 0;
    setTimeout(() => playoffDiv.style.display = 'none', 500);
    document.getElementById('toggleButton').textContent = 'Mostrar playoffs';
  }
}

