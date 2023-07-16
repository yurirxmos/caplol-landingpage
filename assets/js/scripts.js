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
    var timeA = a.getElementsByClassName('placar')[0].innerText.trim();
    var timeB = b.getElementsByClassName('placar')[0].innerText.trim();

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


