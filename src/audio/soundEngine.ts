/**
 * CYBER-DECK SOUND ENGINE
 * Phase 2: Procedural Audio — built with Tone.js
 *
 * Design brief:
 *  - Aesthetic: Sharp, punchy, digital — Tron / Mirror's Edge, dry, < 100ms transients
 *  - Polyphonic: all sounds can overlap freely
 *  - Pitch variation: ±5–10 semitones random per call to kill machine-gun effect
 *  - Zero audio file downloads — 100% synthesized
 *
 * ROUTING RULE (critical):
 *   osc → env → gain → masterGain
 *   NEVER connect an osc directly to masterGain; it bypasses the envelope.
 */

import * as Tone from 'tone';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns a random pitch detune in cents, ±range semitones */
function randDetune(semitones = 7): number {
  return (Math.random() * 2 - 1) * semitones * 100;
}

/** Returns a random value in [min, max] */
function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/** Pick a random integer in [0, n) */
function randInt(n: number): number {
  return Math.floor(Math.random() * n);
}

/** Safely start Tone.js AudioContext (must be called after a user gesture) */
export async function startAudioContext(): Promise<void> {
  if (Tone.getContext().state !== 'running') {
    await Tone.start();
  }
}

// ---------------------------------------------------------------------------
// Master volume / mute bus
// ---------------------------------------------------------------------------

const masterGain = new Tone.Gain(1).toDestination();
let _muted = false;
let _volume = 1;

export function setMasterVolume(v: number): void {
  _volume = Math.max(0, Math.min(1, v));
  if (!_muted) masterGain.gain.rampTo(_volume, 0.05);
}

export function setMuted(muted: boolean): void {
  _muted = muted;
  masterGain.gain.rampTo(muted ? 0 : _volume, 0.05);
}

export function getMuted(): boolean { return _muted; }
export function getVolume(): number { return _volume; }

// ---------------------------------------------------------------------------
// Internal helper: fire a single sine/triangle blip and auto-dispose
// ---------------------------------------------------------------------------
function blip(
  freq: number,
  type: OscillatorType = 'sine',
  gainVal = 0.45,
  attack = 0.004,
  decay = 0.07,
  detune = 0,
): void {
  const osc = new Tone.Oscillator({ frequency: freq, type, detune });
  const env = new Tone.AmplitudeEnvelope({ attack, decay, sustain: 0, release: decay * 0.6 });
  const g   = new Tone.Gain(gainVal);
  osc.connect(env); env.connect(g); g.connect(masterGain);
  osc.start(); env.triggerAttackRelease(decay);
  setTimeout(() => { osc.stop(); osc.dispose(); env.dispose(); g.dispose(); }, (attack + decay * 2) * 1500 + 100);
}

// ---------------------------------------------------------------------------
// 1. playClick — crisp cyber tick, triangle/sine, ~15ms
//    FIX: routed correctly (osc → env → gain → master)
// ---------------------------------------------------------------------------
export function playClick(): void {
  const freq = rand(900, 1600);
  const osc  = new Tone.Oscillator({ frequency: freq, type: 'triangle', detune: randDetune(6) });
  const env  = new Tone.AmplitudeEnvelope({ attack: 0.002, decay: 0.02, sustain: 0, release: 0.01 });
  const g    = new Tone.Gain(0.35);
  osc.connect(env); env.connect(g); g.connect(masterGain);
  osc.start(); env.triggerAttackRelease(0.02);
  setTimeout(() => { osc.stop(); osc.dispose(); env.dispose(); g.dispose(); }, 200);
}

// ---------------------------------------------------------------------------
// 2. playHover — REVISED: subtle whisper-sine with a real attack so it eases in
//    Much quieter than click, longer attack so it doesn't stab the ear.
// ---------------------------------------------------------------------------
export function playHover(): void {
  const freq = rand(500, 800);
  const osc  = new Tone.Oscillator({ frequency: freq, type: 'sine', detune: randDetune(5) });
  const env  = new Tone.AmplitudeEnvelope({
    attack:  0.022,   // perceptible ease-in — not instant
    decay:   0.06,
    sustain: 0,
    release: 0.04,
  });
  const g = new Tone.Gain(0.15);   // much quieter — barely-there whisper
  osc.connect(env); env.connect(g); g.connect(masterGain);
  osc.start(); env.triggerAttackRelease(0.06);
  setTimeout(() => { osc.stop(); osc.dispose(); env.dispose(); g.dispose(); }, 400);
}

// ---------------------------------------------------------------------------
// 3. playCrtPowerOn — REVISED: real CRT turn-on character
//    Layer sequence:
//      (a) mechanical relay "thunk" — body impact + low thud
//      (b) degauss coil "whoomp"   — low freq bloom then fade
//      (c) electron gun warmup     — sine climbing from 400Hz → 15.7kHz
//      (d) phosphor whistle        — sustained high-freq whine at ~15.7kHz
//      (e) static crackle          — white noise burst on screen
//    Volume pulled back ~30% vs. original
// ---------------------------------------------------------------------------
export function playCrtPowerOn(): void {
  // (a) Relay thunk — filtered noise impact
  const thunkNoise = new Tone.Noise('brown');
  const thunkFilter = new Tone.Filter({ frequency: 180, type: 'lowpass', rolloff: -24 });
  const thunkEnv = new Tone.AmplitudeEnvelope({ attack: 0.001, decay: 0.08, sustain: 0, release: 0.04 });
  const thunkGain = new Tone.Gain(0.45);
  thunkNoise.connect(thunkFilter); thunkFilter.connect(thunkEnv); thunkEnv.connect(thunkGain); thunkGain.connect(masterGain);
  thunkNoise.start(); thunkEnv.triggerAttackRelease(0.08);

  // Low-pitched body resonance alongside thunk
  const bodyOsc = new Tone.Oscillator({ frequency: 55, type: 'sine' });
  const bodyEnv = new Tone.AmplitudeEnvelope({ attack: 0.002, decay: 0.12, sustain: 0, release: 0.06 });
  const bodyGain = new Tone.Gain(0.3);
  bodyOsc.connect(bodyEnv); bodyEnv.connect(bodyGain); bodyGain.connect(masterGain);
  bodyOsc.start(); bodyEnv.triggerAttackRelease(0.12);

  // (b) Degauss coil whoomp — starts 30ms after thunk, low bloom
  setTimeout(() => {
    const degauss = new Tone.Oscillator({ frequency: 38, type: 'sine' });
    const degaussFilter = new Tone.Filter({ frequency: 300, type: 'lowpass' });
    const degaussEnv = new Tone.AmplitudeEnvelope({ attack: 0.08, decay: 0.6, sustain: 0, release: 0.3 });
    const degaussGain = new Tone.Gain(0.22);
    degauss.connect(degaussFilter); degaussFilter.connect(degaussEnv); degaussEnv.connect(degaussGain); degaussGain.connect(masterGain);
    // Slight pitch wobble = magnetic field oscillation character
    degauss.frequency.setValueAtTime(38, Tone.now());
    degauss.frequency.linearRampToValueAtTime(28, Tone.now() + 0.4);
    degauss.start(); degaussEnv.triggerAttackRelease(0.65);
    setTimeout(() => { degauss.stop(); degauss.dispose(); degaussFilter.dispose(); degaussEnv.dispose(); degaussGain.dispose(); }, 1400);
  }, 30);

  // (c) Electron gun warmup — sine climbing from 400Hz → 15700Hz over 0.9s
  setTimeout(() => {
    const egun = new Tone.Oscillator({ frequency: 400, type: 'sine' });
    const egunEnv = new Tone.AmplitudeEnvelope({ attack: 0.05, decay: 0.55, sustain: 0.15, release: 0.4 });
    const egunGain = new Tone.Gain(0.18);
    egun.connect(egunEnv); egunEnv.connect(egunGain); egunGain.connect(masterGain);
    egun.frequency.exponentialRampToValueAtTime(15700, Tone.now() + 0.85);
    egun.start(); egunEnv.triggerAttackRelease(0.9);
    setTimeout(() => { egun.stop(); egun.dispose(); egunEnv.dispose(); egunGain.dispose(); }, 1600);
  }, 50);

  // (d) Phosphor whistle — sustained high-freq tone that settles and holds
  setTimeout(() => {
    const whistle = new Tone.Oscillator({ frequency: 15734, type: 'sine' }); // CRT line freq harmonic
    const whistleEnv = new Tone.AmplitudeEnvelope({ attack: 0.35, decay: 0.2, sustain: 0.6, release: 0.5 });
    const whistleGain = new Tone.Gain(0.09); // barely audible on most speakers, present on headphones
    whistle.connect(whistleEnv); whistleEnv.connect(whistleGain); whistleGain.connect(masterGain);
    whistle.start(); whistleEnv.triggerAttackRelease(0.8);
    setTimeout(() => { whistle.stop(); whistle.dispose(); whistleEnv.dispose(); whistleGain.dispose(); }, 1800);
  }, 200);

  // (e) Screen static crackle — white noise burst as phosphor lights up
  setTimeout(() => {
    const staticNoise = new Tone.Noise('white');
    const staticFilter = new Tone.Filter({ frequency: 4000, type: 'bandpass', Q: 0.8 });
    const staticEnv = new Tone.AmplitudeEnvelope({ attack: 0.01, decay: 0.2, sustain: 0.05, release: 0.15 });
    const staticGain = new Tone.Gain(0.2);
    staticNoise.connect(staticFilter); staticFilter.connect(staticEnv); staticEnv.connect(staticGain); staticGain.connect(masterGain);
    staticNoise.start(); staticEnv.triggerAttackRelease(0.3);
    setTimeout(() => { staticNoise.stop(); staticNoise.dispose(); staticFilter.dispose(); staticEnv.dispose(); staticGain.dispose(); }, 800);
  }, 350);

  // Cleanup thunk nodes
  setTimeout(() => {
    thunkNoise.stop(); thunkNoise.dispose(); thunkFilter.dispose(); thunkEnv.dispose(); thunkGain.dispose();
    bodyOsc.stop(); bodyOsc.dispose(); bodyEnv.dispose(); bodyGain.dispose();
  }, 500);
}

// ---------------------------------------------------------------------------
// 4. playCrtPowerOff — short de-energizing transient pop
//    (unchanged — already correct and short)
// ---------------------------------------------------------------------------
export function playCrtPowerOff(): void {
  const osc    = new Tone.Oscillator({ frequency: 2400, type: 'sawtooth' });
  const filter = new Tone.Filter({ frequency: 3000, type: 'lowpass' });
  const env    = new Tone.AmplitudeEnvelope({ attack: 0.002, decay: 0.12, sustain: 0, release: 0.04 });
  const g      = new Tone.Gain(0.5);
  osc.connect(filter); filter.connect(env); env.connect(g); g.connect(masterGain);
  osc.frequency.rampTo(30, 0.13);
  filter.frequency.rampTo(200, 0.13);

  const noise    = new Tone.Noise('white');
  const noiseEnv = new Tone.AmplitudeEnvelope({ attack: 0.001, decay: 0.04, sustain: 0, release: 0.02 });
  const noiseG   = new Tone.Gain(0.2);
  noise.connect(noiseEnv); noiseEnv.connect(noiseG); noiseG.connect(masterGain);

  osc.start();   env.triggerAttackRelease(0.12);
  noise.start(); noiseEnv.triggerAttackRelease(0.04);

  setTimeout(() => {
    osc.stop(); osc.dispose(); filter.dispose(); env.dispose(); g.dispose();
    noise.stop(); noise.dispose(); noiseEnv.dispose(); noiseG.dispose();
  }, 500);
}

// ---------------------------------------------------------------------------
// 5. playBusPulse — electrical data blip, bandpass filtered
//    FIX: correct routing; gain reduced
// ---------------------------------------------------------------------------
export function playBusPulse(): void {
  const centerFreq = rand(800, 2400);
  const osc    = new Tone.Oscillator({ frequency: centerFreq, type: 'square', detune: randDetune(4) });
  const filter = new Tone.Filter({ frequency: centerFreq, type: 'bandpass', Q: 8 });
  const env    = new Tone.AmplitudeEnvelope({ attack: 0.003, decay: 0.045, sustain: 0, release: 0.015 });
  const g      = new Tone.Gain(0.28);
  osc.connect(filter); filter.connect(env); env.connect(g); g.connect(masterGain);
  osc.start(); env.triggerAttackRelease(0.045);
  setTimeout(() => { osc.stop(); osc.dispose(); filter.dispose(); env.dispose(); g.dispose(); }, 300);
}

// ---------------------------------------------------------------------------
// 6. playOverclockSurge — rising freq sweep + distortion + noise
//    (routing already correct; untouched)
// ---------------------------------------------------------------------------
export function playOverclockSurge(): void {
  const osc     = new Tone.Oscillator({ frequency: 80, type: 'sawtooth' });
  const distort = new Tone.Distortion(0.7);
  const filter  = new Tone.Filter({ frequency: 400, type: 'lowpass', rolloff: -12 });
  const env     = new Tone.AmplitudeEnvelope({ attack: 0.01, decay: 0.8, sustain: 0.4, release: 0.4 });
  osc.connect(distort); distort.connect(filter); filter.connect(env); env.connect(masterGain);
  osc.frequency.rampTo(3200, 0.9);
  filter.frequency.rampTo(12000, 0.9);

  const noise       = new Tone.Noise('white');
  const noiseFilter = new Tone.Filter({ frequency: 6000, type: 'highpass' });
  const noiseEnv    = new Tone.AmplitudeEnvelope({ attack: 0.05, decay: 1.0, sustain: 0.1, release: 0.3 });
  const noiseG      = new Tone.Gain(0.25);
  noise.connect(noiseFilter); noiseFilter.connect(noiseEnv); noiseEnv.connect(noiseG); noiseG.connect(masterGain);

  const lfo = new Tone.LFO({ frequency: 18, min: 0.4, max: 1.0 }).start();
  lfo.connect(distort.wet);

  osc.start();   env.triggerAttackRelease(1.1);
  noise.start(); noiseEnv.triggerAttackRelease(1.1);

  setTimeout(() => {
    osc.stop(); osc.dispose(); distort.dispose(); filter.dispose(); env.dispose();
    noise.stop(); noise.dispose(); noiseFilter.dispose(); noiseEnv.dispose(); noiseG.dispose();
    lfo.stop(); lfo.dispose();
  }, 2200);
}

// ---------------------------------------------------------------------------
// 7. playUsbPlug — REVISED: notification alarm character
//    Sound design: mechanical click → clean ascending 3-note chime (ding-ding-ding)
//    Like a "you've got mail" / device-connected notification, cyberpunk flavored.
// ---------------------------------------------------------------------------
export function playUsbPlug(): void {
  // (a) Mechanical insertion click — short filtered noise thud
  const clickNoise = new Tone.Noise('brown');
  const clickFilter = new Tone.Filter({ frequency: 300, type: 'lowpass' });
  const clickEnv = new Tone.AmplitudeEnvelope({ attack: 0.001, decay: 0.055, sustain: 0, release: 0.02 });
  const clickG = new Tone.Gain(0.55);
  clickNoise.connect(clickFilter); clickFilter.connect(clickEnv); clickEnv.connect(clickG); clickG.connect(masterGain);
  clickNoise.start(); clickEnv.triggerAttackRelease(0.055);
  setTimeout(() => { clickNoise.stop(); clickNoise.dispose(); clickFilter.dispose(); clickEnv.dispose(); clickG.dispose(); }, 300);

  // (b) Alarm chime sequence — 3 clean tones stepping up (notification DNA)
  //     Notes: E5 → G#5 → B5 (major triad, bright and alerting)
  const CHIME_FREQS = [659.25, 830.61, 987.77];   // E5, G#5, B5
  CHIME_FREQS.forEach((freq, i) => {
    setTimeout(() => {
      const osc = new Tone.Oscillator({ frequency: freq, type: 'triangle' });
      const env = new Tone.AmplitudeEnvelope({ attack: 0.005, decay: 0.22, sustain: 0.1, release: 0.25 });
      const g   = new Tone.Gain(0.38);
      // Add a slight metallic shimmer with a detuned sine an octave up
      const shimmer = new Tone.Oscillator({ frequency: freq * 2, type: 'sine', detune: 7 });
      const shimEnv = new Tone.AmplitudeEnvelope({ attack: 0.005, decay: 0.18, sustain: 0, release: 0.15 });
      const shimG   = new Tone.Gain(0.12);
      osc.connect(env); env.connect(g); g.connect(masterGain);
      shimmer.connect(shimEnv); shimEnv.connect(shimG); shimG.connect(masterGain);
      osc.start(); env.triggerAttackRelease(0.3);
      shimmer.start(); shimEnv.triggerAttackRelease(0.25);
      setTimeout(() => {
        osc.stop(); osc.dispose(); env.dispose(); g.dispose();
        shimmer.stop(); shimmer.dispose(); shimEnv.dispose(); shimG.dispose();
      }, 800);
    }, 60 + i * 130);
  });
}

// ---------------------------------------------------------------------------
// 8. playRobotChirp — double harmonic sine blips, R2-D2 style
//    (routing fixed; 3 cycling patterns)
// ---------------------------------------------------------------------------
let _chirpVariant = 0;
const CHIRP_PATTERNS: Array<[number, number, number]> = [
  [880,  1320, 1760],   // ascending triad
  [1200, 800,  1000],   // down then up
  [1000, 1500, 800],    // up then down
];

export function playRobotChirp(): void {
  const pattern = CHIRP_PATTERNS[_chirpVariant % CHIRP_PATTERNS.length];
  _chirpVariant++;
  pattern.forEach((freq, i) => {
    setTimeout(() => { blip(freq, 'sine', 0.5, 0.005, 0.07, randDetune(3)); }, i * 80);
  });
}

// ---------------------------------------------------------------------------
// 9. playRobotFedCrunch — REVISED
//    (a) Satisfying crunch: layered noise bursts + resonant body thud
//    (b) Happy chirp with 4 distinct variations cycling, each more celebratory
// ---------------------------------------------------------------------------

// Crunch: two noise layers (brown for body, white for crispiness) + low resonant thud
function _playCrunch(): void {
  // Body crunch — brown noise bandpass for that chip-crushing texture
  const body = new Tone.Noise('brown');
  const bodyF = new Tone.Filter({ frequency: 900, type: 'bandpass', Q: 2.5 });
  const bodyEnv = new Tone.AmplitudeEnvelope({ attack: 0.001, decay: 0.07, sustain: 0.02, release: 0.04 });
  const bodyG = new Tone.Gain(0.75);
  body.connect(bodyF); bodyF.connect(bodyEnv); bodyEnv.connect(bodyG); bodyG.connect(masterGain);
  body.start(); bodyEnv.triggerAttackRelease(0.07);

  // Crispy high crunch — white noise highpass
  const crisp = new Tone.Noise('white');
  const crispF = new Tone.Filter({ frequency: 3500, type: 'highpass' });
  const crispEnv = new Tone.AmplitudeEnvelope({ attack: 0.001, decay: 0.045, sustain: 0, release: 0.02 });
  const crispG = new Tone.Gain(0.35);
  crisp.connect(crispF); crispF.connect(crispEnv); crispEnv.connect(crispG); crispG.connect(masterGain);
  crisp.start(); crispEnv.triggerAttackRelease(0.045);

  // Resonant impact thud
  const thud = new Tone.Oscillator({ frequency: 90, type: 'sine' });
  const thudEnv = new Tone.AmplitudeEnvelope({ attack: 0.001, decay: 0.09, sustain: 0, release: 0.04 });
  const thudG = new Tone.Gain(0.45);
  thud.connect(thudEnv); thudEnv.connect(thudG); thudG.connect(masterGain);
  thud.frequency.exponentialRampToValueAtTime(30, Tone.now() + 0.09);
  thud.start(); thudEnv.triggerAttackRelease(0.09);

  setTimeout(() => {
    body.stop(); body.dispose(); bodyF.dispose(); bodyEnv.dispose(); bodyG.dispose();
    crisp.stop(); crisp.dispose(); crispF.dispose(); crispEnv.dispose(); crispG.dispose();
    thud.stop(); thud.dispose(); thudEnv.dispose(); thudG.dispose();
  }, 500);
}

let _fedVariant = 0;

// 4 happy chirp reactions — each unique, all clearly celebratory
const FED_HAPPY_CHIRPS: Array<() => void> = [
  // Var 0 — joyful ascending scale (do-mi-sol-do)
  () => {
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
      setTimeout(() => blip(f, 'sine', 0.52, 0.004, 0.09, randDetune(2)), i * 70);
    });
  },
  // Var 1 — rapid excited stutter + high squeal
  () => {
    [1200, 1200, 1600, 2000, 2400].forEach((f, i) => {
      setTimeout(() => blip(f, 'sine', 0.48, 0.003, 0.06, randDetune(3)), i * 50);
    });
  },
  // Var 2 — triumphant fanfare shape (low → high → very high)
  () => {
    [[400, 0.55], [800, 0.52], [1200, 0.5], [1800, 0.48], [2600, 0.45]].forEach(([f, g], i) => {
      setTimeout(() => blip(f as number, 'triangle', g as number, 0.005, 0.1, randDetune(2)), i * 80);
    });
  },
  // Var 3 — bubbly trill (fast alternating high notes like a happy twitter)
  () => {
    const notes = [1400, 1800, 1400, 1800, 1400, 2200];
    notes.forEach((f, i) => {
      setTimeout(() => blip(f, 'sine', 0.44, 0.003, 0.055, randDetune(2)), i * 45);
    });
  },
];

export function playRobotFedCrunch(): void {
  _playCrunch();
  // Happy chirp fires 130ms after crunch peak, feels like an immediate delighted reaction
  setTimeout(() => {
    FED_HAPPY_CHIRPS[_fedVariant % FED_HAPPY_CHIRPS.length]();
    _fedVariant++;
  }, 130);
}

// ---------------------------------------------------------------------------
// 10. playRobotPurr — REVISED: happy, content purring
//    Old: slow vibrato, low pitch, emotionless drone
//    New: faster vibrato (9Hz "excited" rate), pitch rises slightly at start
//         (happiness glide), bright 3rd harmonic, gentle trill flutter overlay
// ---------------------------------------------------------------------------
export function playRobotPurr(): void {
  const now = Tone.now();

  // Main purr body — starts at 180Hz (warm), glides up to 240Hz (contentment pitch rise)
  const osc = new Tone.Oscillator({ frequency: 180, type: 'sine' });
  const vibrato = new Tone.Vibrato({ frequency: 9, depth: 0.18 }); // faster = more excited
  const env = new Tone.AmplitudeEnvelope({ attack: 0.1, decay: 0.15, sustain: 0.7, release: 0.55 });
  const g = new Tone.Gain(0.42);
  osc.connect(vibrato); vibrato.connect(env); env.connect(g); g.connect(masterGain);
  // Happiness glide: pitch climbs gently, settling higher
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(240, now + 0.25);
  osc.start(); env.triggerAttackRelease(1.0);

  // 2nd harmonic — gives the purr warmth
  const h2 = new Tone.Oscillator({ frequency: 360, type: 'sine' });
  const h2v = new Tone.Vibrato({ frequency: 9, depth: 0.12 });
  const h2env = new Tone.AmplitudeEnvelope({ attack: 0.15, decay: 0.15, sustain: 0.45, release: 0.55 });
  const h2g = new Tone.Gain(0.18);
  h2.connect(h2v); h2v.connect(h2env); h2env.connect(h2g); h2g.connect(masterGain);
  h2.frequency.setValueAtTime(360, now);
  h2.frequency.exponentialRampToValueAtTime(480, now + 0.25);
  h2.start(); h2env.triggerAttackRelease(1.0);

  // Bright 3rd harmonic sparkle — the "happy" sheen on top
  const h3 = new Tone.Oscillator({ frequency: 720, type: 'sine' });
  const h3env = new Tone.AmplitudeEnvelope({ attack: 0.2, decay: 0.2, sustain: 0.2, release: 0.5 });
  const h3g = new Tone.Gain(0.08);
  h3.connect(h3env); h3env.connect(h3g); h3g.connect(masterGain);
  h3.start(); h3env.triggerAttackRelease(0.9);

  // Flutter trill overlay — rapid amplitude LFO at 14Hz for a "trilling" texture
  const flutter = new Tone.Oscillator({ frequency: 200, type: 'sine' });
  const flutterLFO = new Tone.LFO({ frequency: 14, min: 0, max: 1 }).start();
  const flutterG = new Tone.Gain(0.1);
  flutter.connect(flutterG); flutterG.connect(masterGain);
  flutterLFO.connect(flutterG.gain);
  flutter.frequency.setValueAtTime(200, now);
  flutter.frequency.exponentialRampToValueAtTime(260, now + 0.2);
  const flutterEnv = new Tone.AmplitudeEnvelope({ attack: 0.12, decay: 0.1, sustain: 0.6, release: 0.5 });
  // (LFO drives amplitude directly; flutterEnv just for startup ramp)
  flutter.start();

  setTimeout(() => {
    osc.stop(); osc.dispose(); vibrato.dispose(); env.dispose(); g.dispose();
    h2.stop(); h2.dispose(); h2v.dispose(); h2env.dispose(); h2g.dispose();
    h3.stop(); h3.dispose(); h3env.dispose(); h3g.dispose();
    flutter.stop(); flutter.dispose(); flutterG.dispose(); flutterLFO.stop(); flutterLFO.dispose();
    flutterEnv.dispose();
  }, 2200);
}

// ---------------------------------------------------------------------------
// 11. playRobotIdle — curious single-note chirp, high variety
//     (routing fixed; gains reduced slightly)
// ---------------------------------------------------------------------------
let _idleVariant = 0;

const IDLE_SHAPES: Array<() => void> = [
  () => {  // Rising question tone
    const osc = new Tone.Oscillator({ frequency: 600, type: 'sine' });
    const env = new Tone.AmplitudeEnvelope({ attack: 0.01, decay: 0.15, sustain: 0, release: 0.1 });
    const g   = new Tone.Gain(0.38);
    osc.connect(env); env.connect(g); g.connect(masterGain);
    osc.frequency.rampTo(1100, 0.14);
    osc.start(); env.triggerAttackRelease(0.15);
    setTimeout(() => { osc.stop(); osc.dispose(); env.dispose(); g.dispose(); }, 500);
  },
  () => {  // Two-note curious wobble
    [700, 900].forEach((f, i) => {
      setTimeout(() => { blip(f, 'sine', 0.32, 0.005, 0.1, randDetune(4)); }, i * 110);
    });
  },
  () => {  // Short single blip
    blip(rand(800, 1400), 'triangle', 0.34, 0.003, 0.08, randDetune(8));
  },
];

export function playRobotIdle(): void {
  IDLE_SHAPES[_idleVariant % IDLE_SHAPES.length]();
  _idleVariant++;
}

// ---------------------------------------------------------------------------
// 12. playRobotOverclockReact — excited ascending glissando
//     (routing fixed)
// ---------------------------------------------------------------------------
export function playRobotOverclockReact(): void {
  [400, 600, 900, 1300, 1800, 2400].forEach((freq, i) => {
    setTimeout(() => { blip(freq, 'sine', 0.42, 0.003, 0.08); }, i * 60);
  });
  setTimeout(() => { playRobotChirp(); }, 420);
}

// ---------------------------------------------------------------------------
// 13. playCameraWhoosh — airy, low-pass filtered transient
//     (routing fixed)
// ---------------------------------------------------------------------------
export function playCameraWhoosh(): void {
  const noise  = new Tone.Noise('white');
  const filter = new Tone.Filter({ frequency: 200, type: 'lowpass', rolloff: -24 });
  const env    = new Tone.AmplitudeEnvelope({ attack: 0.01, decay: 0.18, sustain: 0.05, release: 0.2 });
  const g      = new Tone.Gain(0.38);
  noise.connect(filter); filter.connect(env); env.connect(g); g.connect(masterGain);
  filter.frequency.rampTo(3000, 0.12);
  setTimeout(() => { filter.frequency.rampTo(100, 0.15); }, 120);

  const osc    = new Tone.Oscillator({ frequency: 300, type: 'sine' });
  const oscEnv = new Tone.AmplitudeEnvelope({ attack: 0.02, decay: 0.2, sustain: 0, release: 0.1 });
  const oscG   = new Tone.Gain(0.13);
  osc.connect(oscEnv); oscEnv.connect(oscG); oscG.connect(masterGain);
  osc.frequency.rampTo(120, 0.25);

  noise.start(); env.triggerAttackRelease(0.3);
  osc.start();   oscEnv.triggerAttackRelease(0.25);

  setTimeout(() => {
    noise.stop(); noise.dispose(); filter.dispose(); env.dispose(); g.dispose();
    osc.stop(); osc.dispose(); oscEnv.dispose(); oscG.dispose();
  }, 900);
}

// ---------------------------------------------------------------------------
// 14. playHudModeSwitch — crisp mode-switch blip
//     FIX: routing corrected; gain pulled back from 0.45 → 0.28
// ---------------------------------------------------------------------------
let _hudVariant = 0;

export function playHudModeSwitch(): void {
  const ascending = _hudVariant % 2 === 0;
  _hudVariant++;
  const freqs = ascending ? [600, 900, 1200] : [1200, 900, 600];
  freqs.forEach((freq, i) => {
    setTimeout(() => { blip(freq, 'triangle', 0.28, 0.003, 0.055); }, i * 50);
  });
}

// ---------------------------------------------------------------------------
// 15. playCommsTerminalClick — radio-y, higher harmonic content
//     FIX: routing corrected; gains reduced
// ---------------------------------------------------------------------------
export function playCommsTerminalClick(): void {
  const noise   = new Tone.Noise('white');
  const bandpass = new Tone.Filter({ frequency: rand(2000, 4000), type: 'bandpass', Q: 5 });
  const env     = new Tone.AmplitudeEnvelope({ attack: 0.001, decay: 0.04, sustain: 0, release: 0.02 });
  const g       = new Tone.Gain(0.28);
  noise.connect(bandpass); bandpass.connect(env); env.connect(g); g.connect(masterGain);
  noise.start(); env.triggerAttackRelease(0.04);

  const carrier    = new Tone.Oscillator({ frequency: rand(1800, 2800), type: 'square', detune: randDetune(5) });
  const carrierEnv = new Tone.AmplitudeEnvelope({ attack: 0.002, decay: 0.035, sustain: 0, release: 0.015 });
  const carrierG   = new Tone.Gain(0.18);
  carrier.connect(carrierEnv); carrierEnv.connect(carrierG); carrierG.connect(masterGain);
  carrier.start(); carrierEnv.triggerAttackRelease(0.035);

  setTimeout(() => {
    noise.stop(); noise.dispose(); bandpass.dispose(); env.dispose(); g.dispose();
    carrier.stop(); carrier.dispose(); carrierEnv.dispose(); carrierG.dispose();
  }, 300);
}

// ---------------------------------------------------------------------------
// 16. Ambient PCB hum — looping background texture
// ---------------------------------------------------------------------------
let _ambientNodes: {
  noise: Tone.Noise;
  gain: Tone.Gain;
  filter: Tone.Filter;
  hum: Tone.Oscillator;
  humGain: Tone.Gain;
} | null = null;

export function startAmbientHum(): void {
  if (_ambientNodes) return;

  const noise  = new Tone.Noise('pink');
  const filter = new Tone.Filter({ frequency: 120, type: 'lowpass', rolloff: -24 });
  const gain   = new Tone.Gain(0.05);
  noise.connect(filter); filter.connect(gain); gain.connect(masterGain);
  noise.start();

  const hum    = new Tone.Oscillator({ frequency: 60, type: 'sine' });
  const humGain = new Tone.Gain(0.03);
  hum.connect(humGain); humGain.connect(masterGain);
  hum.start();

  _ambientNodes = { noise, gain, filter, hum, humGain };
}

export function stopAmbientHum(): void {
  if (!_ambientNodes) return;
  const { noise, gain, filter, hum, humGain } = _ambientNodes;
  noise.stop(); noise.dispose(); filter.dispose(); gain.dispose();
  hum.stop(); hum.dispose(); humGain.dispose();
  _ambientNodes = null;
}

export function isAmbientRunning(): boolean {
  return _ambientNodes !== null;
}

// Suppress TS unused warning for randInt (used by future sounds)
void randInt;
