// emailjs_integration.js
// Redireciona para a página de laudo ao invés de enviar e-mail

function enviarLaudoPorEmail(email, nome, perfil) {
  return new Promise(function(resolve) {

    // Recupera os scores do quiz — calculados em showResult() no index.html
    // A função é chamada com o perfil predominante já calculado,
    // mas precisamos dos 4 scores completos. Lemos do DOM.
    var scores = { C: 0, O: 0, R: 0, E: 0 };

    // Lê as pontuações das barras já renderizadas no resultado
    document.querySelectorAll('.bar-row').forEach(function(row) {
      var letra = row.querySelector('.bl').textContent.trim();
      var pts = row.querySelector('.bn').textContent.replace(' pts', '').trim();
      if (scores.hasOwnProperty(letra)) {
        scores[letra] = parseInt(pts) || 0;
      }
    });

    // Monta a URL para a página de laudo
    var params = new URLSearchParams({
      C: scores.C,
      O: scores.O,
      R: scores.R,
      E: scores.E,
      nome: nome || 'Líder'
    });

    // Redireciona para o laudo completo
    window.location.href = 'coremap-resultado.html?' + params.toString();

    resolve({ sucesso: true });
  });
}
