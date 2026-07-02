// emailjs_integration.js
// Envia lead para Formspree + redireciona para laudo

function enviarLaudoPorEmail(email, nome, perfil) {
  return new Promise(function(resolve) {

    // Recupera os scores do quiz
    var scores = { C: 0, O: 0, R: 0, E: 0 };
    document.querySelectorAll('.bar-row').forEach(function(row) {
      var letra = row.querySelector('.bl').textContent.trim();
      var pts = row.querySelector('.bn').textContent.replace(' pts', '').trim();
      if (scores.hasOwnProperty(letra)) {
        scores[letra] = parseInt(pts) || 0;
      }
    });

    // Envia lead para Formspree (você recebe por email)
    fetch('https://formspree.io/f/xdavnaje', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: nome,
        email: email,
        perfil_predominante: perfil,
        pontuacao_C: scores.C,
        pontuacao_O: scores.O,
        pontuacao_R: scores.R,
        pontuacao_E: scores.E
      })
    }).finally(function() {
      // Redireciona para o laudo independente do resultado do envio
      var params = new URLSearchParams({
        C: scores.C,
        O: scores.O,
        R: scores.R,
        E: scores.E,
        nome: nome || 'Líder'
      });
      window.location.href = 'pilula-core-map.html?' + params.toString();
      resolve({ sucesso: true });
    });

  });
}
