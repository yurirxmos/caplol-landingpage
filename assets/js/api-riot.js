
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

    const elosTraducoes = {
        IRON: 'FERRO',
        BRONZE: 'BRONZE',
        SILVER: 'PRATA',
        GOLD: 'OURO',
        PLATINUM: 'PLATINA',
        DIAMOND: 'DIAMANTE',
        MASTER: 'MESTRE',
        GRANDMASTER: 'GRÃO-MESTRE',
        CHALLENGER: 'DESAFIANTE'
    };

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

                        var tier = playerData.tier;
                        var eloTraduzido = elosTraducoes[tier] || tier;
                        var tierImageSrc = '<img src="./assets/img/elos/' + tier.toLowerCase() + '.webp">';

                        novaDivResultados.innerHTML =
                            tierImageSrc +
                            '<h1>' +
                            playerData.summonerName +
                            '</h1>';

                        if (["MASTER", "GRANDMASTER", "CHALLENGER"].includes(playerData.tier)) {
                            novaDivResultados.innerHTML += '<div class="jogador">' + '<h2>' + eloTraduzido + '<br>' + playerData.leaguePoints + ' LP';
                        } else {
                            novaDivResultados.innerHTML += '<div class="jogador">' + '<h2>' + eloTraduzido + ' ' + playerData.rank + '<br>' + playerData.leaguePoints + ' LP';
                        }

                        novaDivResultados.innerHTML += '</h2>' +
                            '</div>' +
                            '<h2>' + playerData.wins + ' vitórias </h2>';
                        if (playerData.tier === 'DIAMOND' || playerData.tier === 'MASTER' || playerData.tier === 'GRANDMASTER' || playerData.tier === 'CHALLENGER') {
                            if (playerData.wins < 35) {
                                novaDivResultados.innerHTML += '<h3><b>Inválido</b> <br> A quantidade de vitórias na fila solo deve ser maior que 35.</h3>';
                            } else {
                                novaDivResultados.innerHTML += '<h4 id="restringido"><b>Condicionado</b> <br> Você está válido, porém verifique as regras!</h4>';
                            }
                        } else {
                            if (playerData.wins < 35) {
                                novaDivResultados.innerHTML += '<h3><b>Inválido</b> <br> A quantidade de vitórias na fila solo deve ser maior que 35.</h3>';
                            } else {
                                novaDivResultados.innerHTML += '<h4><b>Válido</b> <br> Você está pronto para enfrentar o CAPLOL!</h4>';
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
