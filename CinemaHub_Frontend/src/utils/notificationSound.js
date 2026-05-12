/** Short chime for live notifications (no external audio file). */
export function playNotificationChime() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.value = 0.06;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    const stop = () => {
      try {
        osc.stop();
        ctx.close();
      } catch {
        /* ignore */
      }
    };
    setTimeout(stop, 140);
  } catch {
    /* ignore */
  }
}
