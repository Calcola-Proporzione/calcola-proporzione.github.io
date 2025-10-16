// calcolo.js
export function calcolaRisultato(x1, y1, y2) {
  if (isNaN(x1) || isNaN(y1) || isNaN(y2)) {
    return "—";
  }
  if (y1 === 0) {
    return "❌";
  }
  return (x1 * y2 / y1).toFixed(5);
}

export function initCalcoloForm(formSelector) {
  const form = document.querySelector(formSelector);
  if (!form) return;

  const x1Input = form.querySelector("[name='x1']");
  const y1Input = form.querySelector("[name='y1']");
  const y2Input = form.querySelector("[name='y2']");
  const output = form.querySelector(".risultato");

  if (!x1Input || !y1Input || !y2Input || !output) return;

  const aggiornaRisultato = () => {
    const x1 = parseFloat(x1Input.value);
    const y1 = parseFloat(y1Input.value);
    const y2 = parseFloat(y2Input.value);
    output.textContent = calcolaRisultato(x1, y1, y2);
  };

  // Calcola in tempo reale su input o cambio valore
  [x1Input, y1Input, y2Input].forEach(input => {
    input.addEventListener("input", aggiornaRisultato);
  });

  // Calcolo iniziale (opzionale)
  aggiornaRisultato();
}



