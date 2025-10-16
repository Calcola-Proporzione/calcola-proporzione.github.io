document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#calcoloForm");
  if (!form) return;

  const aInput = form.querySelector("[name='x1']"); // a
  const bInput = form.querySelector("[name='y1']"); // b
  const cInput = form.querySelector("[name='y2']"); // c
  const output = form.querySelector(".risultato");  // x (risultato finale)

  if (!aInput || !bInput || !cInput || !output) return;

  function calcolaProporzione() {
    const a = parseFloat(aInput.value);
    const b = parseFloat(bInput.value);
    const c = parseFloat(cInput.value);

    // Se uno dei campi non è compilato → nessun risultato
    if (!isFinite(a) || !isFinite(b) || !isFinite(c)) {
      output.textContent = "×";
      return;
    }

    // Evita divisione per 0
    if (a === 0) {
      output.textContent = "❌";
      return;
    }

    // Formula proporzione: a : b = c : x → x = (b * c) / a
    const x = (b * c) / a;

    // Arrotonda a 5 decimali, rimuove zeri inutili
    const xPulito = parseFloat(x.toFixed(5));

    // Formattazione in stile italiano
    output.textContent = xPulito.toLocaleString("it-IT", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 5,
    });
  }

  // Ricalcolo in tempo reale
  [aInput, bInput, cInput].forEach(input =>
    input.addEventListener("input", calcolaProporzione)
  );

  // Calcolo iniziale
  calcolaProporzione();
});
