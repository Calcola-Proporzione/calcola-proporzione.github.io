document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#calcoloForm");
  if (!form) return;

  const aInput = form.querySelector("[name='x1']"); // a
  const bInput = form.querySelector("[name='y1']"); // b
  const cInput = form.querySelector("[name='y2']"); // c
  const dInput = form.querySelector("[name='x2']"); // d
  const output = form.querySelector(".risultato");  // risultato

  if (!aInput || !bInput || !cInput || !dInput || !output) return;

  // Configurazione confetti
  output.id = "risultato-confetti";
  const confetti = new Confetti("risultato-confetti");
  confetti.setCount(200);
  confetti.setSize(1);
  confetti.setPower(40);
  confetti.setFade(false);
  confetti.destroyTarget(false);

  function calcolaProporzione() {
    const a = parseFloat(aInput.value);
    const b = parseFloat(bInput.value);
    const c = parseFloat(cInput.value);
    const d = parseFloat(dInput.value);

    const valori = [a, b, c, d];
    const vuoti = valori.filter(v => !isFinite(v)).length;

    // Deve esserci esattamente un valore vuoto
    if (vuoti !== 1) {
      output.textContent = vuoti === 0 ? "❌ Attenzione, sono stati impostati troppi valori." : "Inserisci 3 valori, il 4° verrà calcolato.";
      return;
    }

    let risultato, inputVuoto;
    if (!isFinite(a)) {
      risultato = (b * c) / d;
      inputVuoto = aInput;
    } else if (!isFinite(b)) {
      risultato = (a * d) / c;
      inputVuoto = bInput;
    } else if (!isFinite(c)) {
      risultato = (a * d) / b;
      inputVuoto = cInput;
    } else {
      risultato = (b * c) / a;
      inputVuoto = dInput;
    }

    if (!isFinite(risultato)) {
      output.textContent = "❌";
      return;
    }

    const risultatoPulito = parseFloat(risultato.toFixed(5));
    inputVuoto.value = risultatoPulito;
    output.textContent = "🎉 Proporzione calcolata!!!";
    
    // Aggiungi listener prima di disabilitare
    [aInput, bInput, cInput, dInput].forEach(input => {
      const handler = function(e) {
        e.preventDefault();
        input.disabled = false;
        input.value = '';
        output.textContent = 'Per calcolare nuovamente, cancella almeno 2 valori.';
        setTimeout(() => input.focus(), 0);
        input.removeEventListener('pointerdown', handler, true);
      };
      input.addEventListener('pointerdown', handler, true);
    });
    
    // Disabilita tutti gli input
    aInput.disabled = true;
    bInput.disabled = true;
    cInput.disabled = true;
    dInput.disabled = true;
  }

  // Ricalcolo con debounce di 1 secondo
  let timeoutId;
  [aInput, bInput, cInput, dInput].forEach(input =>
    input.addEventListener("input", () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calcolaProporzione, 1000);
    })
  );

  // Observer per i confetti quando cambia il risultato
  let previousResult = output.textContent;
  const observer = new MutationObserver(() => {
    const currentResult = output.textContent;
    if (currentResult !== previousResult && currentResult === "🎉 Proporzione calcolata!!!") {
      const rect = output.getBoundingClientRect();
      const event = new MouseEvent('click', {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2
      });
      output.dispatchEvent(event);
    }
    previousResult = currentResult;
  });
  
  observer.observe(output, { childList: true, characterData: true, subtree: true });

  // Pulsante reset
  const resetBtn = document.querySelector("#resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      aInput.value = "";
      bInput.value = "";
      cInput.value = "";
      dInput.value = "";
      aInput.disabled = false;
      bInput.disabled = false;
      cInput.disabled = false;
      dInput.disabled = false;
      output.textContent = "Inserisci 3 valori, il 4° verrà calcolato.";
    });
  }

  // Calcolo iniziale
  calcolaProporzione();
});