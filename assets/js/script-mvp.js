document.addEventListener("DOMContentLoaded", function() {
  // Obtendo os dados dos jogadores
  const jogadores = [
    { nome: "INV YuRi", pontos: 400, time: "INV", imagem: "./assets/img/ranked-positions/adc.png" },
    { nome: "VDE Thigas", pontos: 300, time: "VDE", imagem: "./assets/img/ranked-positions/sup.png" },
    { nome: "Eduardo Garen", pontos: 400, time: "DEB", imagem: "./assets/img/ranked-positions/top.png" },
    { nome: "hydruZ mete fofo", pontos: 100, time: "FAG", imagem: "./assets/img/ranked-positions/mid.png" },
    { nome: "Askedre", pontos: 300, time: "UNB", imagem: "./assets/img/ranked-positions/mid.png" },
    { nome: "HEZ Ivankov xB", pontos: 100, time: "HEZ", imagem: "./assets/img/ranked-positions/sup.png" },
    { nome: "um anão mt loko", pontos: 300, time: "UMP", imagem: "./assets/img/ranked-positions/top.png" },
    { nome: "POKIN PEGA MEMO", pontos: 100, time: "UMP", imagem: "./assets/img/ranked-positions/fill.png" },
    { nome: "ZDC T3K4SH1", pontos: 100, time: "ZDC", imagem: "./assets/img/ranked-positions/mid.png" },
    { nome: "INTZ Wenddel", pontos: 100, time: "INTZ", imagem: "./assets/img/ranked-positions/fill.png" },
    { nome: "Carloniii", pontos: 100, time: "DEB", imagem: "./assets/img/ranked-positions/adc.png" },
    { nome: "Rakão", pontos: 100, time: "DEB", imagem: "./assets/img/ranked-positions/sup.png" },
    { nome: "VDE vital", pontos: 100, time: "DEB", imagem: "./assets/img/ranked-positions/jungle.png" },
    { nome: "VDE 369", pontos: 400, time: "VDE", imagem: "./assets/img/ranked-positions/top.png" },
    { nome: "OLY Hercules", pontos: 200, time: "OLY", imagem: "./assets/img/ranked-positions/jungle.png" },
    { nome: "HEZ magíc", pontos: 200, time: "HEZ", imagem: "./assets/img/ranked-positions/fill.png" },
    { nome: "Neninha", pontos: 300, time: "UNB", imagem: "./assets/img/ranked-positions/sup.png" },
    { nome: "INV João Justino", pontos: 100, time: "INV", imagem: "./assets/img/ranked-positions/top.png" },
    { nome: "VDE Franzzera", pontos: 100, time: "VDE", imagem: "./assets/img/ranked-positions/mid.png" },
    { nome: "Zaraki Kenpachi", pontos: 200, time: "UNB", imagem: "./assets/img/ranked-positions/jungle.png" },
    { nome: "HEZ Paçoquita xD", pontos: 200, time: "UNB", imagem: "./assets/img/ranked-positions/fill.png" },
    { nome: "Amante da loira", pontos: 100, time: "ZDC", imagem: "./assets/img/ranked-positions/sup.png" },
    { nome: "ZDC Taranis", pontos: 100, time: "ZDC", imagem: "./assets/img/ranked-positions/jungle.png" },
    { nome: "Gstvh", pontos: 200, time: "UNB", imagem: "./assets/img/ranked-positions/adc.png" },
    { nome: "VDE Ori", pontos: 100, time: "VDE", imagem: "./assets/img/ranked-positions/adc.png" },
    { nome: "OnlinePlay", pontos: 100, time: "ZDC", imagem: "./assets/img/ranked-positions/top.png" },
    { nome: "INV Gonn", pontos: 100, time: "INV", imagem: "./assets/img/ranked-positions/jungle.png" },
    { nome: "CR7 VASCO", pontos: 100, time: "UMP", imagem: "./assets/img/ranked-positions/adc.png" },
    { nome: "AKÏRAH", pontos: 100, time: "UMP", imagem: "./assets/img/ranked-positions/mid.png" },
    { nome: "Ze Mangão", pontos: 100, time: "DEB", imagem: "./assets/img/ranked-positions/adc.png" }
  ];

  // Ordenando os jogadores com base nos pontos
  const jogadoresOrdenados = jogadores.sort((a, b) => b.pontos - a.pontos);

  // Atualizando a estrutura HTML com os dados ordenados
  const mvpConteudo = document.querySelector('.mvp-conteudo');
  const lis = mvpConteudo.querySelectorAll('li');
  jogadoresOrdenados.forEach((jogador, index) => {
    const li = lis[index];
    const imgElement = li.querySelector('span + img');
    const numeroElement = li.querySelector('b');
    const timeElement = li.querySelector('span');
    const nomeElement = li.querySelector('.mvp-placar h2:first-child');
    const pontosElement = li.querySelector('.mvp-placar h2:last-child');

    imgElement.src = jogador.imagem;
    numeroElement.textContent = (index + 1).toString();
    timeElement.textContent = jogador.time;
    nomeElement.textContent = jogador.nome;
    pontosElement.textContent = jogador.pontos.toString();
  });
});