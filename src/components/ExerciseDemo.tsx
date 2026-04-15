import { AnimationKey } from '../data/exercises';
import './ExerciseDemo.css';

const C = '#d4ff3d';   // accent lime
const DIM = '#4a4a2a'; // secondary / trailing limb

interface Props {
  animationKey: AnimationKey;
  size?: number;
}

export function ExerciseDemo({ animationKey, size = 160 }: Props) {
  return (
    <div className="exercise-demo" style={{ width: size, height: size }}>
      {ANIMATIONS[animationKey]}
    </div>
  );
}

// ─── Individual animation SVGs ───────────────────────────────────────────────

const ANIMATIONS: Record<AnimationKey, JSX.Element> = {

  // Horizontal plank, whole upper body pivots at feet = push-up motion
  pushup: (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes pu { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(-9deg)} }
        .pu-upper { transform-origin: 22px 140px; animation: pu 2.2s ease-in-out infinite; }
      `}</style>
      <line x1="5" y1="140" x2="195" y2="140" stroke="#2a2a2a" strokeWidth="2"/>
      <g className="pu-upper">
        <circle cx="168" cy="72" r="11" stroke={C} strokeWidth="3"/>
        <line x1="157" y1="79" x2="22" y2="118" stroke={C} strokeWidth="3"/>
        <line x1="115" y1="93" x2="112" y2="132" stroke={C} strokeWidth="3"/>
        <line x1="75" y1="105" x2="72" y2="135" stroke={C} strokeWidth="3"/>
        <line x1="22" y1="118" x2="12" y2="138" stroke={C} strokeWidth="3"/>
        <line x1="22" y1="118" x2="28" y2="138" stroke={C} strokeWidth="3"/>
      </g>
    </svg>
  ),

  // Standing figure squatting: upper body descends, legs bend
  squat: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes sq-up  { 0%,100%{transform:translateY(0)} 45%,55%{transform:translateY(36px)} }
        @keyframes sq-ll  { 0%,100%{transform:rotate(0deg)}  45%,55%{transform:rotate(20deg)} }
        @keyframes sq-rl  { 0%,100%{transform:rotate(0deg)}  45%,55%{transform:rotate(-20deg)} }
        .sq-upper { animation: sq-up 2.2s ease-in-out infinite; }
        .sq-ll    { transform-origin: 92px 112px; animation: sq-ll 2.2s ease-in-out infinite; }
        .sq-rl    { transform-origin: 108px 112px; animation: sq-rl 2.2s ease-in-out infinite; }
      `}</style>
      <line x1="20" y1="182" x2="180" y2="182" stroke="#2a2a2a" strokeWidth="2"/>
      <g className="sq-upper">
        <circle cx="100" cy="28" r="12" stroke={C} strokeWidth="3"/>
        <line x1="100" y1="40" x2="100" y2="112" stroke={C} strokeWidth="3"/>
        <line x1="100" y1="68" x2="68" y2="96" stroke={C} strokeWidth="3"/>
        <line x1="100" y1="68" x2="132" y2="96" stroke={C} strokeWidth="3"/>
      </g>
      <g className="sq-ll">
        <line x1="92" y1="112" x2="80" y2="148" stroke={C} strokeWidth="3"/>
        <line x1="80" y1="148" x2="76" y2="182" stroke={C} strokeWidth="3"/>
      </g>
      <g className="sq-rl">
        <line x1="108" y1="112" x2="120" y2="148" stroke={C} strokeWidth="3"/>
        <line x1="120" y1="148" x2="124" y2="182" stroke={C} strokeWidth="3"/>
      </g>
    </svg>
  ),

  // Split-stance lunge: whole body bobs down/up
  lunge: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes lu { 0%,100%{transform:translateY(0)} 45%,55%{transform:translateY(16px)} }
        .lu-body { animation: lu 2.4s ease-in-out infinite; }
      `}</style>
      <line x1="10" y1="182" x2="190" y2="182" stroke="#2a2a2a" strokeWidth="2"/>
      <g className="lu-body">
        <circle cx="105" cy="32" r="11" stroke={C} strokeWidth="3"/>
        <line x1="105" y1="43" x2="100" y2="112" stroke={C} strokeWidth="3"/>
        <line x1="100" y1="76" x2="72" y2="100" stroke={C} strokeWidth="3"/>
        <line x1="100" y1="76" x2="128" y2="100" stroke={C} strokeWidth="3"/>
        {/* front leg bent */}
        <line x1="100" y1="112" x2="80" y2="150" stroke={C} strokeWidth="3"/>
        <line x1="80" y1="150" x2="60" y2="182" stroke={C} strokeWidth="3"/>
        {/* back leg extended */}
        <line x1="100" y1="112" x2="128" y2="148" stroke={DIM} strokeWidth="3"/>
        <line x1="128" y1="148" x2="156" y2="178" stroke={DIM} strokeWidth="3"/>
      </g>
    </svg>
  ),

  // Horizontal plank with breathing pulse
  plank: (
    <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes plank-p { 0%,100%{opacity:1;transform:scaleY(1)} 50%{opacity:0.55;transform:scaleY(0.96)} }
        .plank-body { transform-origin: center; animation: plank-p 3s ease-in-out infinite; }
      `}</style>
      <line x1="10" y1="100" x2="210" y2="100" stroke="#2a2a2a" strokeWidth="2"/>
      <g className="plank-body">
        <circle cx="185" cy="58" r="11" stroke={C} strokeWidth="3"/>
        <line x1="174" y1="64" x2="35" y2="78" stroke={C} strokeWidth="3"/>
        <line x1="135" y1="68" x2="130" y2="96" stroke={C} strokeWidth="3"/>
        <line x1="100" y1="72" x2="95" y2="96" stroke={C} strokeWidth="3"/>
        <line x1="35" y1="78" x2="22" y2="98" stroke={C} strokeWidth="3"/>
        <line x1="35" y1="78" x2="42" y2="98" stroke={C} strokeWidth="3"/>
      </g>
    </svg>
  ),

  // Mountain climbers: alternating knee drives in plank
  'mountain-climber': (
    <svg viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes mc-l { 0%,49%,100%{transform:translate(0,0)} 50%,99%{transform:translate(38px,-26px)} }
        @keyframes mc-r { 0%,49%,100%{transform:translate(38px,-26px)} 50%,99%{transform:translate(0,0)} }
        .mc-ll { animation: mc-l 0.9s steps(1,end) infinite; }
        .mc-rl { animation: mc-r 0.9s steps(1,end) infinite; }
      `}</style>
      <line x1="10" y1="120" x2="210" y2="120" stroke="#2a2a2a" strokeWidth="2"/>
      {/* static: torso, head, arms */}
      <circle cx="185" cy="50" r="10" stroke={C} strokeWidth="3"/>
      <line x1="175" y1="56" x2="40" y2="82" stroke={C} strokeWidth="3"/>
      <line x1="140" y1="63" x2="133" y2="114" stroke={C} strokeWidth="3"/>
      <line x1="105" y1="70" x2="98" y2="114" stroke={C} strokeWidth="3"/>
      {/* animated legs */}
      <g className="mc-ll">
        <line x1="40" y1="82" x2="25" y2="118" stroke={C} strokeWidth="3"/>
      </g>
      <g className="mc-rl">
        <line x1="40" y1="82" x2="55" y2="118" stroke={DIM} strokeWidth="3"/>
      </g>
    </svg>
  ),

  // Hip hinge: hips rise (glute bridge / superman)
  'hip-hinge': (
    <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes hh { 0%,100%{transform:translateY(0)} 45%,55%{transform:translateY(-26px)} }
        .hh-hips { animation: hh 2.2s ease-in-out infinite; }
      `}</style>
      <line x1="10" y1="112" x2="210" y2="112" stroke="#2a2a2a" strokeWidth="2"/>
      {/* head + upper torso (fixed) */}
      <circle cx="185" cy="90" r="10" stroke={C} strokeWidth="3"/>
      <line x1="175" y1="95" x2="130" y2="102" stroke={C} strokeWidth="3"/>
      {/* hips + thighs (animated up) */}
      <g className="hh-hips">
        <line x1="130" y1="102" x2="100" y2="96" stroke={C} strokeWidth="4"/>
        <line x1="100" y1="96"  x2="68"  y2="112" stroke={C} strokeWidth="3"/>
        <line x1="100" y1="96"  x2="76"  y2="110" stroke={C} strokeWidth="3"/>
      </g>
      {/* calves/feet (fixed) */}
      <line x1="68" y1="112" x2="40" y2="112" stroke={C} strokeWidth="3"/>
      <line x1="76" y1="110" x2="48" y2="110" stroke={C} strokeWidth="3"/>
      <line x1="155" y1="104" x2="125" y2="110" stroke={DIM} strokeWidth="2"/>
    </svg>
  ),

  // Floor mobility: all-fours, spine arching up and down
  'floor-mobility': (
    <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes fm-up { 0%,100%{transform:translateY(0)} 45%,55%{transform:translateY(-18px)} }
        @keyframes fm-dn { 0%,100%{transform:translateY(0)} 45%,55%{transform:translateY(14px)} }
        .fm-spine-up { animation: fm-up 2.4s ease-in-out infinite; }
        .fm-head     { animation: fm-up 2.4s ease-in-out infinite; }
        .fm-belly    { animation: fm-dn 2.4s ease-in-out infinite; }
      `}</style>
      <line x1="10" y1="130" x2="210" y2="130" stroke="#2a2a2a" strokeWidth="2"/>
      {/* front arms (fixed) */}
      <line x1="155" y1="98" x2="162" y2="128" stroke={C} strokeWidth="3"/>
      <line x1="155" y1="98" x2="170" y2="128" stroke={C} strokeWidth="3"/>
      {/* rear legs (fixed) */}
      <line x1="60" y1="98" x2="50" y2="128" stroke={C} strokeWidth="3"/>
      <line x1="60" y1="98" x2="60" y2="128" stroke={C} strokeWidth="3"/>
      {/* spine midpoint bobbing down (belly) */}
      <g className="fm-belly">
        <path d="M 60 98 Q 108 92 155 98" stroke={C} strokeWidth="4" fill="none" strokeLinecap="round"/>
      </g>
      {/* head bobbing up */}
      <g className="fm-head">
        <circle cx="170" cy="84" r="10" stroke={C} strokeWidth="3"/>
      </g>
    </svg>
  ),

  // Standing mobility: arms circling, hips swaying
  'standing-mobility': (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes sml { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes smr { 0%{transform:rotate(0deg)} 100%{transform:rotate(-360deg)} }
        @keyframes smh { 0%,100%{transform:translateX(0)} 25%{transform:translateX(9px)} 75%{transform:translateX(-9px)} }
        .sml { transform-origin: 0px 0px; animation: sml 2.2s linear infinite; }
        .smr { transform-origin: 0px 0px; animation: smr 2.2s linear infinite; }
        .smh { animation: smh 2.2s ease-in-out infinite; }
      `}</style>
      <line x1="20" y1="185" x2="180" y2="185" stroke="#2a2a2a" strokeWidth="2"/>
      <circle cx="100" cy="28" r="12" stroke={C} strokeWidth="3"/>
      <line x1="100" y1="40" x2="100" y2="116" stroke={C} strokeWidth="3"/>
      {/* left arm spinning around shoulder */}
      <g transform="translate(100,74)">
        <g className="sml">
          <line x1="0" y1="0" x2="-34" y2="24" stroke={C} strokeWidth="3"/>
        </g>
      </g>
      {/* right arm spinning other way */}
      <g transform="translate(100,74)">
        <g className="smr">
          <line x1="0" y1="0" x2="34" y2="24" stroke={DIM} strokeWidth="3"/>
        </g>
      </g>
      {/* hips + legs */}
      <g className="smh">
        <line x1="100" y1="116" x2="82" y2="154" stroke={C} strokeWidth="3"/>
        <line x1="82"  y1="154" x2="78" y2="185" stroke={C} strokeWidth="3"/>
        <line x1="100" y1="116" x2="118" y2="154" stroke={C} strokeWidth="3"/>
        <line x1="118" y1="154" x2="122" y2="185" stroke={C} strokeWidth="3"/>
      </g>
    </svg>
  ),
};
