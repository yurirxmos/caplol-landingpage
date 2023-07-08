document.addEventListener("DOMContentLoaded", function () {
    // Obtém o combobox e a lista de jogos
    var selectTime = document.getElementById('selectTime');
    var jogosLista = document.getElementsByClassName('jogos-lista');

    // Adiciona um evento de escuta para quando o valor do combobox for alterado
    selectTime.addEventListener('change', function () {
        var timeSelecionado = selectTime.value;

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
                    if (times[k].textContent === timeSelecionado) {
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

});