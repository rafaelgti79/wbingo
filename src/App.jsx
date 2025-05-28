import React, { useState } from 'react';
import './App.css';

export default function Bingo() {
  const [numeroAtual, setNumeroAtual] = useState(null);
  const [numerosSorteados, setNumerosSorteados] = useState([]);

  const falarNumero = (numero) => {
    const utterance = new SpeechSynthesisUtterance(`Número ${numero}`);
    utterance.lang = 'pt-BR'; // Voz em português
    speechSynthesis.speak(utterance);
  };

  const adicionarNumero = (e) => {
    e.preventDefault();
    const numero = parseInt(e.target.numero.value);
    if (!isNaN(numero) && numero >= 1 && numero <= 90 && !numerosSorteados.includes(numero)) {
      setNumeroAtual(numero);
      setNumerosSorteados([...numerosSorteados, numero]);
      falarNumero(numero); // Fala o número sorteado
    }
    e.target.reset();
  };

  return (
    <div className="bingo-container">
      <div className="bingo-header">Bingo</div>
      <form onSubmit={adicionarNumero} className="bingo-form">
        <input type="number" name="numero" placeholder="Número (1-90)" min="1" max="90" required />
        <button type="submit">Sortear</button>
      </form>

      <div className="painel-completo">
  <div className="painel">
    <div className="numeros-grid">
      {[...Array(90)].map((_, i) => {
        const num = i + 1;
        return (
          <div
            key={num}
            className={`numero ${numerosSorteados.includes(num) ? 'sorteado' : ''} ${numeroAtual === num ? 'atual' : ''}`}
          >
            {num}
          </div>
        );
      })}
    </div>
  </div>

  <div className="numero-atual-grande">
    <div className="bola">
      {numeroAtual ?? '-'}
    </div>
  </div>
</div>

<div className="info-quadrados">
  <div className="quadrado">
    <h3>Cartelas</h3>
    <p>Tecla ENTER ou ESPAÇO para digitar Nº das cartelas</p>
    <p>Mínimo = 6 | Máximo = 4900</p>
  </div>
  <div className="quadrado">
    <h3>Jogo</h3>
    <p>Linha</p>
    <p>Rodada: 000 | Cartela: 0,00 | Colação: 0,00</p>
  </div>
  <div className="quadrado">
    <h3>Prêmios</h3>
    <p>Linha: 1,00</p>
    <p>Bingo: 1,00</p>
    <p>Acumulado, S.Bingo, Velha etc...</p>
  </div>
  <div className="quadrado">
    <h3>Status</h3>
    <p>Números sorteados: {numerosSorteados.length}</p>
  </div>
</div>

    </div>
  );
}
