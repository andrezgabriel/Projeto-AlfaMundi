const palavras = [
  { palavra: 'Abacaxi', silabas: ['a', 'ba', 'ca', 'xi'], img: 'imagens/abacaxi.jfif' },
  { palavra: 'Bola', silabas: ['bo', 'la'], img: 'imagens/bola.jfif' },
  { palavra: 'Cavalo', silabas: ['ca', 'va', 'lo'], img: 'imagens/cavalo.jpg' },
  { palavra: 'Dado', silabas: ['da', 'do'], img: 'imagens/dado.png' },
  { palavra: 'Escada', silabas: ['es', 'ca', 'da'], img: 'imagens/escada.jfif' },
  { palavra: 'Foca', silabas: ['fo', 'ca'], img: 'imagens/foca.avif' },
  { palavra: 'Gato', silabas: ['ga', 'to'], img: 'imagens/gato.jfif' },
  { palavra: 'Hipopótamo', silabas: ['hi', 'po', 'pó', 'ta', 'mo'], img: 'imagens/hipopotamo.avif' },
  { palavra: 'igreja', silabas: ['i', 'gre', 'ja'], img: 'imagens/igraja.avif' },
  { palavra: 'Jacaré', silabas: ['ja', 'ca', 'ré'], img: 'imagens/jacare.jpg' },
  { palavra: 'Kiwi', silabas: ['ki', 'wi'], img: 'imagens/kiwi.jpg' },
  { palavra: 'Lâmpada', silabas: ['lâm', 'pa', 'da'], img: 'imagens/lampada.jpg' },
  { palavra: 'Macaco', silabas: ['ma', 'ca', 'co'], img: 'imagens/macaco.avif' },
  { palavra: 'Navio', silabas: ['na', 'vi', 'o'], img: 'imagens/navio.avif' },
  { palavra: 'onibus', silabas: ['ô', 'ni', 'bus'], img: 'imagens/onibus.png' },
  { palavra: 'Palhaço', silabas: ['pa', 'lha', 'ço'], img: 'imagens/palhaço.jpg' },
  { palavra: 'Queijo', silabas: ['quei', 'jo'], img: 'imagens/queijo.png' },
  { palavra: 'Rato', silabas: ['ra', 'to'], img: 'imagens/rato.jpg' },
  { palavra: 'Sapato', silabas: ['sa', 'pa', 'to'], img: 'imagens/sapato.jfif' },
  { palavra: 'Tijolo', silabas: ['ti', 'jo', 'lo'], img: 'imagens/tijolo.png' },
  { palavra: 'Uva', silabas: ['u', 'va'], img: 'imagens/uva.png' },
  { palavra: 'Vaca', silabas: ['va', 'ca'], img: 'imagens/vaca.jpg' },
  { palavra: 'Walffer', silabas: ['wa', 'fer'], img: 'imagens/wafer.webp' },
  { palavra: 'Xícara', silabas: ['xí', 'ca', 'ra'], img: 'imagens/xicara.jpg' },
  { palavra: 'Yakult', silabas: ['ya', 'kult'], img: 'imagens/yakult.png' },
  { palavra: 'Zebra', silabas: ['ze', 'bra'], img: 'imagens/zebra.webp' }
];

const imagem = document.getElementById('imagem-palavra');
const silabasContainer = document.getElementById('silabas-container');
const inputResposta = document.getElementById('resposta');
const btnVerificar = document.getElementById('verificar');
const btnProxima = document.getElementById('proxima');
const btnReiniciar = document.getElementById('reiniciar');
const feedback = document.getElementById('feedback');
const btnAnterior = document.getElementById('anterior');

const somSilaba = document.getElementById('som-silaba');
const somSucesso = document.getElementById('som-sucesso');
const somErro = document.getElementById('som-erro');

let palavraAtualIndex = 0;
let pontuacao = 0;

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function atualizarPontuacao() {
  const pontuacaoEl = document.getElementById('pontuacao');
  if (pontuacaoEl) {
    pontuacaoEl.textContent = `Pontuação: ${pontuacao}`;
  }
}

function carregarPalavra(index) {
  const palavra = palavras[index];
  imagem.src = palavra.img;
  imagem.alt = palavra.palavra;
  feedback.innerText = '';
  inputResposta.value = '';

  const silabasEmbaralhadas = embaralhar([...palavra.silabas]);
  silabasContainer.innerHTML = '';

  silabasEmbaralhadas.forEach(silaba => {
    const botao = document.createElement('div');
    botao.classList.add('silaba');
    botao.textContent = silaba;
    botao.onclick = () => {
      inputResposta.value += silaba;
      somSilaba.currentTime = 0;
      somSilaba.play();
      botao.remove();
    };
    silabasContainer.appendChild(botao);
  });
}

btnVerificar.onclick = () => {
  const palavra = palavras[palavraAtualIndex];
  const resposta = inputResposta.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const correta = palavra.palavra.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  if (resposta === correta) {
    feedback.style.color = 'green';
    feedback.innerText = '🎉 Parabéns! Você acertou!';
    somSucesso.currentTime = 0;
    somSucesso.play();

    pontuacao += 10;
    atualizarPontuacao();

    setTimeout(() => {
      palavraAtualIndex++;
      if (palavraAtualIndex >= palavras.length) {
        palavraAtualIndex = 0;
        pontuacao = 0;
        atualizarPontuacao();
      }
      carregarPalavra(palavraAtualIndex);
    }, 1500);
  } else {
    feedback.style.color = 'red';
    feedback.innerText = '❌ Tente novamente!';
    somErro.currentTime = 0;
    somErro.play();

    pontuacao -= 5;
    if (pontuacao < 0) pontuacao = 0;
    atualizarPontuacao();

    setTimeout(() => {
      carregarPalavra(palavraAtualIndex);
    }, 1500);
  }
};

btnProxima.onclick = () => {
  palavraAtualIndex++;
  if (palavraAtualIndex >= palavras.length) {
    palavraAtualIndex = 0;
    pontuacao = 0;
    atualizarPontuacao();
  }
  carregarPalavra(palavraAtualIndex);
};

// 🔄 Agora este botão reinicia apenas a palavra atual (não o jogo)
btnReiniciar.onclick = () => {
  feedback.innerText = '';
  inputResposta.value = '';
  carregarPalavra(palavraAtualIndex);
};

btnAnterior.onclick = () => {
  if (palavraAtualIndex > 0) {
    palavraAtualIndex--;
    carregarPalavra(palavraAtualIndex);
  } else {
    alert('Esta é a primeira palavra.');
  }
};

window.onload = () => {
  carregarPalavra(palavraAtualIndex);
  atualizarPontuacao();
};
