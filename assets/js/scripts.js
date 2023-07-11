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

// ORDENAÇÃO TABELA
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


// ORDENAÇÃO DE MVP
const dados =
  `
Eduardo Garen/200/DEB/top.png
VDE Thigas/200/VDE/sup.png
hydruZ mete fofo/100/FAG/mid.png
Askedre/100/UNB/mid.png
HEZ Ivankob xB/100/HEZ/mid.png
Um anão mt loko/100/UMP/mid.png
INV yuridela/300/INV/adc.png
POKIN PEGA MEMO/100/UMP/mid.png
ZDC Tekashi/100/ZDC/mid.png
INTZ Wenddel/100/INTZ/mid.png
Carloniii/100/DEB/mid.png
Rakão/100/DEB/mid.png
VDE vital/100/VDE/jungle.png
VDE 369/100/VDE/top.png
`;

const linhas = dados.split('\n');

const jogadores = linhas.map((linha) => {
  const [nome, pontos, time, lane] = linha.split('/');
  return { nome: nome.trim(), pontos: parseInt(pontos.trim()), time: time.trim(), lane: lane.trim() };
});

const jogadoresOrdenados = jogadores.sort((a, b) => b.pontos - a.pontos);

const mvpConteudo = document.querySelector('.mvp-conteudo');
jogadoresOrdenados.forEach((jogador, index) => {
  const li = mvpConteudo.querySelector(`#posicao-${index + 1}`);
  const imagemElement = li.querySelector('img');
  const nomeElement = li.querySelectorAll('h2')[0];
  const pontosElement = li.querySelectorAll('h2')[1];
  const timeElement = li.querySelector('span');
  const laneElement = li.querySelectorAll('img')[1];

  imagemElement.src = `./assets/img/ranked-positions/${jogador.lane}`;
  nomeElement.textContent = jogador.nome;
  pontosElement.textContent = jogador.pontos.toString();
  timeElement.textContent = jogador.time;
  laneElement.src = `./assets/img/ranked-positions/${jogador.lane}`;
});
