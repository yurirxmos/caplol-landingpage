
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

function obterTierEWinrate(nick, inputElement) {
    const API_KEY = "RGAPI-7baeb44a-4ade-4482-b126-2bb126cdbe11";

    const encodedNick = encodeURIComponent(nick);

    return fetch('https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + encodedNick + '?api_key=' + API_KEY)
        .then(response => response.json())
        .then(data => {
            var jogadorId = data.id;

            return fetch('https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + jogadorId + '?api_key=' + API_KEY)
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
                        const playerData = data[0].queueType === 'RANKED_SOLO_5x5' ? data[0] : data[1];

                        // Obter tier e winrate
                        const tier = playerData.tier;
                        const rank = playerData.rank;
                        const winrate = (playerData.wins / (playerData.wins + playerData.losses) * 100).toFixed(2) + '%';

                        const consulta = document.createElement('div');
                        consulta.className = 'consulta';

                        const p = document.createElement('p');
                        p.innerHTML = `${tier} ${rank} | <b>${winrate} WR</b>`;

                        const idMap = {
                            'IRON': 'iron',
                            'BRONZE': 'bronze',
                            'SILVER': 'silver',
                            'GOLD': 'gold',
                            'PLATINUM': 'platinum',
                            'DIAMOND': 'diamond',
                            'MASTER': 'master',
                            'GRANDMASTER': 'grandmaster',
                            'CHALLENGER': 'challenger'
                        };

                        const tierId = idMap[tier.toUpperCase()];
                        if (tierId) {
                            p.id = tierId;
                        }

                        consulta.appendChild(p);

                        // Adicionar a div de consulta após o input correspondente
                        inputElement.parentNode.insertBefore(consulta, inputElement.nextSibling);

                        return { tier, rank };
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


function parearNicks() {

    document.getElementById('dados').innerHTML = '';
    document.querySelectorAll('.consulta').forEach(consulta => consulta.remove());

    const colunas = document.querySelectorAll('.coluna');

    const consultasPromises = [];

    colunas.forEach(coluna => {
        const inputElements = coluna.querySelectorAll('.coluna-input input[type="text"]');

        inputElements.forEach(inputElement => {
            const nick = inputElement.value.trim();
            if (nick !== '') {
                const consultaPromise = obterTierEWinrate(nick, inputElement);
                consultasPromises.push(consultaPromise);
            }
        });
    });

    Promise.all(consultasPromises)
        .then(results => {
            calcularDiferencas(results);
        });
}


function calcularDiferencas(results) {
    const coluna1 = document.getElementById('coluna-1');
    const coluna2 = document.getElementById('coluna-2');

    const consultasColuna1 = coluna1.querySelectorAll('.consulta');
    const consultasColuna2 = coluna2.querySelectorAll('.consulta');

    const diferencaDiv = document.getElementById('dados');
    diferencaDiv.innerHTML = ''; // Limpar o conteúdo anterior

    consultasColuna1.forEach((consulta1, index) => {
        const eloTexto1 = consulta1.textContent.split(' | ')[0];
        const eloTexto2 = consultasColuna2[index].textContent.split(' | ')[0];
        const winrateTexto1 = consulta1.querySelector('b').textContent.split(' ')[0];
        const winrateTexto2 = consultasColuna2[index].querySelector('b').textContent.split(' ')[0];
        const valorElo1 = obterValorTier(eloTexto1);
        const valorElo2 = obterValorTier(eloTexto2);

        const diferenca = valorElo2 - valorElo1;
        // const diferenca = Math.abs(valorElo2 - valorElo1);

        let porcentagem = 0;

        if (diferenca === 0) {
            const winrate1 = parseFloat(winrateTexto1);
            const winrate2 = parseFloat(winrateTexto2);
            const diferencaWinrate = winrate2 - winrate1;
            porcentagem = Math.abs(diferencaWinrate) * 0.5 + 50;
        } else {
            porcentagem = Math.abs(diferenca) * 1.9 + 50;
        }

        let sinal = '';
        if (diferenca > 0) {
            sinal = '>';
        } else if (diferenca < 0) {
            sinal = '<';
        } else {
            sinal = '=';
        }

        const caminhosImagens = [
            './assets/img/ranked-positions/top.png',
            './assets/img/ranked-positions/jungle.png',
            './assets/img/ranked-positions/mid.png',
            './assets/img/ranked-positions/adc.png',
            './assets/img/ranked-positions/sup.png'
        ];

        const divsCriadas = diferencaDiv.querySelectorAll('div').length;
        const posicaoIndex = divsCriadas % caminhosImagens.length;

        const posicao = document.createElement('img');
        posicao.src = caminhosImagens[posicaoIndex];
        diferencaDiv.appendChild(posicao);

        const p = document.createElement('p');
        p.textContent = `${sinal} ${porcentagem.toFixed(0)}%`;
        diferencaDiv.appendChild(p);

        // Código para exibir os spans com base na probabilidade
        const resultadoSpan = document.createElement('span');
        if (porcentagem >= 50 && porcentagem < 55) {
            resultadoSpan.id = 'balanceado';
            resultadoSpan.textContent = 'BALANCEADO';
        } else if (porcentagem >= 55 && porcentagem < 65) {
            resultadoSpan.id = 'favoravel';
            resultadoSpan.textContent = 'FAVORÁVEL';
        } else if (porcentagem >= 65 && porcentagem < 75) {
            resultadoSpan.id = 'muito-favoravel';
            resultadoSpan.textContent = 'MUITO FAVORÁVEL';
        } else if (porcentagem >= 75) {
            resultadoSpan.id = 'free-matchup';
            resultadoSpan.textContent = 'FREE MATCHUP';
        }

        diferencaDiv.appendChild(resultadoSpan);


        const reta = document.createElement('div');
        reta.classList.add('reta');

        const resultado_gradiente = Math.abs(porcentagem - 100);

        if (porcentagem === 50) {
            reta.style.background = 'gray';
        } else if (valorElo1 > valorElo2) {
            reta.style.background = `linear-gradient(to right, green ${porcentagem}%, red ${resultado_gradiente.toFixed(0)}%, red 100%)`;
        } else {
            reta.style.background = `linear-gradient(to left, green ${porcentagem}%, red ${resultado_gradiente.toFixed(0)}%, red 100%)`;
        }

        diferencaDiv.appendChild(reta);

        const hr = document.createElement('hr');
        diferencaDiv.appendChild(hr);

    });
}


function obterValorTier(eloTexto) {
    const valoresTiers = {
        'IRON IV': 0,
        'IRON III': 1,
        'IRON II': 2,
        'IRON I': 3,
        'BRONZE IV': 4,
        'BRONZE III': 5,
        'BRONZE II': 6,
        'BRONZE I': 7,
        'SILVER IV': 8,
        'SILVER III': 9,
        'SILVER II': 10,
        'SILVER I': 11,
        'GOLD IV': 12,
        'GOLD III': 13,
        'GOLD II': 14,
        'GOLD I': 15,
        'PLATINUM IV': 16,
        'PLATINUM III': 17,
        'PLATINUM II': 18,
        'PLATINUM I': 19,
        'DIAMOND IV': 20,
        'DIAMOND III': 21,
        'DIAMOND II': 22,
        'DIAMOND I': 23,
        'MASTER I': 24,
        'GRANDMASTER I': 25,
        'CHALLENGER I': 26
    };

    return valoresTiers[eloTexto] || 0;
}

const parearBotao = document.querySelector('.parearBotao');
parearBotao.addEventListener('click', function (event) {
    event.preventDefault();
    parearNicks();
    calcularDiferencas();
});
