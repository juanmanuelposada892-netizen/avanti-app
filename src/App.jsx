import { useState, useRef, useEffect } from "react";
const T = {
  bg: "#080810",
  s1: "#0E0E1A",
  s2: "#13131F",
  border: "#1C1C2E",
  borderB: "#252538",
  acc: "#FF4D00",
  accD: "#FF4D0018",
  accG: "#FF4D0040",
  grn: "#00E87A",
  grnD: "#00E87A18",
  blu: "#4F8EF7",
  bluD: "#4F8EF718",
  yel: "#FFB800",
  yelD: "#FFB80018",
  t1: "#EEEEFF",
  t2: "#7777AA",
  t3: "#3A3A55",
};

const G = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Epilogue:ital,wght@0,300;0,400;0,500;1,300&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:${T.bg};color:${T.t1};font-family:'Epilogue',sans-serif;min-height:100vh;overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${T.bg}}::-webkit-scrollbar-thumb{background:${T.border};border-radius:4px}

/* ── GRID BG ── */
.grid-bg{position:fixed;inset:0;background-image:linear-gradient(${T.border}44 1px,transparent 1px),linear-gradient(90deg,${T.border}44 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;mask-image:radial-gradient(ellipse 80% 60% at 50% 0%,black,transparent)}

/* ── NAV ── */
.nav{position:fixed;top:0;left:0;right:0;height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:${T.bg}E0;backdrop-filter:blur(16px);border-bottom:1px solid ${T.border};z-index:200}
.nav-logo{font-family:'Clash Display',sans-serif;font-size:22px;font-weight:700;letter-spacing:-0.04em;cursor:pointer;display:flex;align-items:center;gap:8px}
.logo-mark{width:28px;height:28px;background:${T.acc};border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:white;font-family:'Clash Display',sans-serif}
.nav-right{display:flex;align-items:center;gap:12px}
.nav-badge{font-size:11px;padding:4px 12px;border-radius:100px;background:${T.accD};border:1px solid ${T.acc}44;color:${T.acc};font-weight:500;letter-spacing:0.06em;text-transform:uppercase}
.nav-cta{font-size:13px;padding:8px 18px;border-radius:8px;background:${T.acc};color:white;font-weight:600;border:none;cursor:pointer;font-family:'Epilogue',sans-serif;transition:all .2s}
.nav-cta:hover{background:#FF6020;transform:translateY(-1px)}

/* ── SCREENS ── */
.screen{min-height:100vh;padding-top:60px;position:relative;z-index:1}

/* ── LANDING HERO ── */
.hero{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 24px 60px;text-align:center;min-height:calc(100vh - 60px)}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;background:${T.accD};border:1px solid ${T.acc}44;border-radius:100px;font-size:12px;font-weight:500;color:${T.acc};letter-spacing:.08em;text-transform:uppercase;margin-bottom:36px;animation:fadeUp .5s ease both}
.dot-live{width:6px;height:6px;background:${T.acc};border-radius:50%;animation:pulse 2s infinite}
.hero-h{font-family:'Clash Display',sans-serif;font-size:clamp(48px,8vw,96px);font-weight:700;line-height:.93;letter-spacing:-.04em;max-width:900px;margin-bottom:28px;animation:fadeUp .5s .08s ease both}
.hero-h .acc{color:${T.acc}}
.hero-h .dim{color:${T.t2}}
.hero-p{font-size:clamp(15px,2vw,18px);font-weight:300;color:${T.t2};max-width:520px;line-height:1.65;margin-bottom:52px;animation:fadeUp .5s .16s ease both}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;animation:fadeUp .5s .24s ease both}
.btn-hero{padding:18px 40px;background:${T.acc};color:white;font-family:'Clash Display',sans-serif;font-size:16px;font-weight:600;border:none;border-radius:10px;cursor:pointer;transition:all .25s;letter-spacing:-.01em}
.btn-hero:hover{background:#FF6020;transform:translateY(-2px);box-shadow:0 24px 48px ${T.accG}}
.btn-ghost{padding:18px 32px;background:transparent;color:${T.t2};font-family:'Epilogue',sans-serif;font-size:15px;font-weight:400;border:1px solid ${T.border};border-radius:10px;cursor:pointer;transition:all .2s}
.btn-ghost:hover{border-color:${T.borderB};color:${T.t1}}

/* ── FEATURE CARDS ── */
.features{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:${T.border};margin:0 0 0;border-top:1px solid ${T.border}}
.feat-card{padding:32px 28px;background:${T.bg};transition:background .2s;cursor:pointer}
.feat-card:hover{background:${T.s1}}
.feat-icon{font-size:28px;margin-bottom:16px}
.feat-name{font-family:'Clash Display',sans-serif;font-size:16px;font-weight:600;margin-bottom:8px;letter-spacing:-.02em}
.feat-desc{font-size:13px;color:${T.t2};line-height:1.6}

/* ── SOCIAL PROOF ── */
.proof-strip{display:flex;justify-content:center;gap:48px;padding:48px 24px;border-top:1px solid ${T.border};flex-wrap:wrap;animation:fadeUp .5s .32s ease both}
.proof-item{text-align:center}
.proof-num{font-family:'Clash Display',sans-serif;font-size:36px;font-weight:700;letter-spacing:-.03em}
.proof-label{font-size:12px;color:${T.t2};margin-top:4px;text-transform:uppercase;letter-spacing:.06em}

/* ── MODULE TABS ── */
.mod-nav{position:sticky;top:60px;z-index:150;background:${T.bg}F0;backdrop-filter:blur(12px);border-bottom:1px solid ${T.border};display:flex;overflow-x:auto;scrollbar-width:none}
.mod-nav::-webkit-scrollbar{display:none}
.mod-tab{padding:0 24px;height:48px;display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;color:${T.t2};border-bottom:2px solid transparent;cursor:pointer;transition:all .2s;white-space:nowrap;border:none;background:transparent;font-family:'Epilogue',sans-serif}
.mod-tab:hover{color:${T.t1}}
.mod-tab.active{color:${T.acc};border-bottom:2px solid ${T.acc}}
.mod-tab-icon{font-size:16px}

/* ── INNER PAGE ── */
.inner{max-width:780px;margin:0 auto;padding:40px 24px 100px;animation:fadeUp .3s ease both}
.pg-head{margin-bottom:40px}
.pg-title{font-family:'Clash Display',sans-serif;font-size:28px;font-weight:700;letter-spacing:-.03em;margin-bottom:8px}
.pg-sub{font-size:14px;color:${T.t2};line-height:1.6}

/* ── FORM ── */
.field{margin-bottom:22px}
.lbl{display:block;font-size:11px;font-weight:500;color:${T.t2};margin-bottom:8px;letter-spacing:.07em;text-transform:uppercase}
.inp,.txta,.sel{width:100%;padding:13px 16px;background:${T.s1};border:1px solid ${T.border};border-radius:9px;color:${T.t1};font-family:'Epilogue',sans-serif;font-size:14px;outline:none;transition:border-color .2s,box-shadow .2s;appearance:none}
.inp:focus,.txta:focus,.sel:focus{border-color:${T.acc}55;box-shadow:0 0 0 3px ${T.accD}}
.txta{min-height:90px;resize:vertical;line-height:1.6}
.sel option{background:${T.s1}}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{padding:7px 15px;border-radius:100px;border:1px solid ${T.border};background:${T.s1};color:${T.t2};font-size:13px;cursor:pointer;transition:all .2s;font-family:'Epilogue',sans-serif}
.chip:hover{border-color:${T.acc}44;color:${T.t1}}
.chip.on{border-color:${T.acc};background:${T.accD};color:${T.acc}}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:520px){.row2{grid-template-columns:1fr}}

/* ── BUTTONS ── */
.btn-run{width:100%;padding:17px;background:${T.acc};color:white;border:none;border-radius:10px;font-family:'Clash Display',sans-serif;font-size:16px;font-weight:600;cursor:pointer;transition:all .2s;margin-top:8px;display:flex;align-items:center;justify-content:center;gap:10px;letter-spacing:-.01em}
.btn-run:hover:not(:disabled){background:#FF6020;box-shadow:0 16px 40px ${T.accG};transform:translateY(-1px)}
.btn-run:disabled{opacity:.4;cursor:not-allowed;transform:none}
.btn-sm{padding:9px 16px;border-radius:8px;border:1px solid ${T.border};background:${T.s1};color:${T.t2};font-family:'Epilogue',sans-serif;font-size:12px;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
.btn-sm:hover{border-color:${T.acc}44;color:${T.t1}}
.btn-sm.ok{border-color:${T.grn};color:${T.grn};background:${T.grnD}}
.btn-prime{padding:9px 16px;border-radius:8px;border:none;background:${T.acc};color:white;font-family:'Epilogue',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s}
.btn-prime:hover{background:#FF6020}

/* ── GENERATING ── */
.gen-wrap{display:flex;flex-direction:column;align-items:center;padding:80px 24px;text-align:center;max-width:700px;margin:0 auto}
.spin{width:56px;height:56px;border:2px solid ${T.border};border-top-color:${T.acc};border-radius:50%;animation:spin .8s linear infinite;margin-bottom:28px}
@keyframes spin{to{transform:rotate(360deg)}}
.gen-title{font-family:'Clash Display',sans-serif;font-size:22px;font-weight:700;margin-bottom:10px;letter-spacing:-.02em}
.gen-step{font-size:13px;color:${T.t2};min-height:20px;margin-bottom:32px}
.stream-box{width:100%;padding:18px;background:${T.s1};border:1px solid ${T.border};border-radius:12px;text-align:left;font-size:12px;color:${T.t2};line-height:1.75;min-height:130px;white-space:pre-wrap;word-break:break-word;font-family:'Epilogue',sans-serif;max-height:220px;overflow-y:auto}
.cursor{display:inline-block;width:2px;height:13px;background:${T.acc};margin-left:2px;animation:blink 1s infinite;vertical-align:middle}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}

/* ── RESULT CARDS ── */
.score-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px}
@media(max-width:560px){.score-row{grid-template-columns:1fr}}
.score-c{padding:18px;background:${T.s1};border:1px solid ${T.border};border-radius:12px;text-align:center;transition:border-color .2s}
.score-c:hover{border-color:${T.borderB}}
.s-icon{font-size:20px;margin-bottom:8px}
.s-lbl{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:${T.t3};margin-bottom:4px}
.s-val{font-family:'Clash Display',sans-serif;font-size:15px;font-weight:600}
.s-val.acc{color:${T.acc}}.s-val.grn{color:${T.grn}}.s-val.blu{color:${T.blu}}
.res-sec{background:${T.s1};border:1px solid ${T.border};border-radius:12px;margin-bottom:14px;overflow:hidden;transition:border-color .2s}
.res-sec:hover{border-color:${T.borderB}}
.res-head{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid ${T.border};cursor:pointer}
.res-head-l{display:flex;align-items:center;gap:10px}
.res-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px}
.ri-o{background:${T.accD}}.ri-g{background:${T.grnD}}.ri-b{background:${T.bluD}}.ri-y{background:${T.yelD}}
.res-name{font-family:'Clash Display',sans-serif;font-size:14px;font-weight:600;letter-spacing:-.01em}
.res-tag{font-size:10px;padding:3px 10px;border-radius:100px;font-weight:500}
.rt-o{background:${T.accD};color:${T.acc}}.rt-g{background:${T.grnD};color:${T.grn}}.rt-b{background:${T.bluD};color:${T.blu}}.rt-y{background:${T.yelD};color:${T.yel}}
.res-body{padding:18px}
.copy-row{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid ${T.border}}
.copy-row:last-child{border-bottom:none;padding-bottom:0}
.c-lbl{font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:${T.t3};margin-bottom:5px}
.c-txt{font-size:13px;line-height:1.65;color:${T.t1};flex:1}
.res-actions{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:28px}
.new-btn{width:100%;padding:13px;background:transparent;border:1px dashed ${T.border};border-radius:10px;color:${T.t2};font-family:'Epilogue',sans-serif;font-size:13px;cursor:pointer;transition:all .2s;margin-top:20px}
.new-btn:hover{border-color:${T.acc}44;color:${T.t1}}
.err-box{padding:14px 18px;background:#FF000010;border:1px solid #FF000030;border-radius:8px;color:#FF7070;font-size:13px;margin-bottom:20px}

/* ── IMAGE MODULE ── */
.img-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:20px}
@media(max-width:480px){.img-grid{grid-template-columns:1fr}}
.img-card{background:${T.s1};border:1px solid ${T.border};border-radius:12px;overflow:hidden;transition:border-color .2s}
.img-card:hover{border-color:${T.borderB}}
.img-preview{width:100%;aspect-ratio:1;background:linear-gradient(135deg,${T.s2},${T.border});display:flex;align-items:center;justify-content:center;font-size:40px;position:relative;overflow:hidden}
.img-preview img{width:100%;height:100%;object-fit:cover}
.img-info{padding:12px}
.img-prompt{font-size:11px;color:${T.t2};line-height:1.5;margin-bottom:10px}
.img-actions{display:flex;gap:8px}
.prompt-card{background:${T.s1};border:1px solid ${T.border};border-radius:12px;padding:18px;margin-bottom:12px}
.prompt-platform{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:${T.acc};margin-bottom:8px;font-weight:600}
.prompt-text{font-size:13px;line-height:1.7;color:${T.t1};font-family:'Epilogue',sans-serif}
.platform-tabs{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap}
.pt{padding:7px 14px;border-radius:8px;border:1px solid ${T.border};background:${T.s1};color:${T.t2};font-size:12px;cursor:pointer;transition:all .2s;font-family:'Epilogue',sans-serif}
.pt:hover{border-color:${T.acc}44;color:${T.t1}}
.pt.on{border-color:${T.acc};background:${T.accD};color:${T.acc}}

/* ── VIDEO MODULE ── */
.storyboard{display:flex;flex-direction:column;gap:12px;margin-top:16px}
.sb-card{background:${T.s1};border:1px solid ${T.border};border-radius:12px;overflow:hidden}
.sb-header{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid ${T.border}}
.sb-num{width:28px;height:28px;border-radius:8px;background:${T.accD};border:1px solid ${T.acc}44;color:${T.acc};font-family:'Clash Display',sans-serif;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sb-time{font-size:11px;color:${T.t2};margin-left:auto}
.sb-body{padding:14px 16px;display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:480px){.sb-body{grid-template-columns:1fr}}
.sb-section-title{font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:${T.t3};margin-bottom:6px}
.sb-text{font-size:13px;line-height:1.65;color:${T.t1}}
.sb-visual{font-size:13px;line-height:1.65;color:${T.t2};font-style:italic}

/* ── LANDING MODULE ── */
.landing-preview{background:${T.s2};border:1px solid ${T.border};border-radius:12px;overflow:hidden;margin-top:16px}
.lp-bar{padding:10px 16px;background:${T.s1};border-bottom:1px solid ${T.border};display:flex;align-items:center;gap:8px}
.lp-dot{width:10px;height:10px;border-radius:50%}
.lp-content{padding:24px;max-height:500px;overflow-y:auto}
.lp-section{margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid ${T.border}}
.lp-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.lp-sec-label{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:${T.acc};margin-bottom:10px;font-weight:600}
.lp-text{font-size:13px;line-height:1.75;color:${T.t1};white-space:pre-wrap}

/* ── PRICING MODAL ── */
.overlay{position:fixed;inset:0;background:#000000CC;z-index:500;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.price-modal{background:${T.s1};border:1px solid ${T.borderB};border-radius:20px;max-width:540px;width:100%;overflow:hidden;animation:slideUp .3s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.pm-top{padding:32px 32px 0;text-align:center}
.pm-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;background:${T.yelD};border:1px solid ${T.yel}44;border-radius:100px;font-size:11px;color:${T.yel};font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:20px}
.pm-title{font-family:'Clash Display',sans-serif;font-size:26px;font-weight:700;letter-spacing:-.03em;margin-bottom:8px}
.pm-sub{font-size:14px;color:${T.t2};margin-bottom:28px}
.pm-prices{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 32px}
.pm-price-card{padding:20px;border-radius:12px;border:1px solid ${T.border};text-align:center;position:relative;transition:border-color .2s;cursor:pointer}
.pm-price-card:hover{border-color:${T.acc}55}
.pm-price-card.featured{border-color:${T.acc};background:${T.accD}}
.pm-flag{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:${T.acc};color:white;font-size:10px;font-weight:700;padding:3px 10px;border-radius:100px;letter-spacing:.05em;white-space:nowrap}
.pm-region{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:${T.t2};margin-bottom:4px}
.pm-price-val{font-family:'Clash Display',sans-serif;font-size:32px;font-weight:700;letter-spacing:-.03em;margin-bottom:2px}
.pm-price-val .currency{font-size:18px;vertical-align:super;font-family:'Epilogue',sans-serif;font-weight:300}
.pm-once{font-size:11px;color:${T.t2}}
.pm-features{padding:24px 32px;display:flex;flex-direction:column;gap:10px}
.pm-feat{display:flex;align-items:center;gap:10px;font-size:13px;color:${T.t2}}
.pm-feat-dot{width:16px;height:16px;border-radius:50%;background:${T.grnD};border:1px solid ${T.grn}44;display:flex;align-items:center;justify-content:center;font-size:10px;color:${T.grn};flex-shrink:0}
.pm-cta{margin:0 32px 32px;display:flex;flex-direction:column;gap:10px}
.pm-btn{width:100%;padding:16px;background:${T.acc};color:white;border:none;border-radius:10px;font-family:'Clash Display',sans-serif;font-size:16px;font-weight:600;cursor:pointer;transition:all .2s;letter-spacing:-.01em}
.pm-btn:hover{background:#FF6020;box-shadow:0 16px 40px ${T.accG}}
.pm-close{width:100%;padding:10px;background:transparent;color:${T.t2};border:1px solid ${T.border};border-radius:10px;font-family:'Epilogue',sans-serif;font-size:13px;cursor:pointer;transition:all .2s}
.pm-close:hover{border-color:${T.borderB};color:${T.t1}}
.pm-guarantee{text-align:center;font-size:11px;color:${T.t3};padding:0 32px 24px}

/* ── ANIMS ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
.orb{position:fixed;width:700px;height:700px;background:radial-gradient(circle,${T.accG} 0%,transparent 70%);border-radius:50%;top:-300px;left:50%;transform:translateX(-50%);pointer-events:none;z-index:0}
`;

/* ═══ CONSTANTS ══════════════════════════════════════════ */
const OBJ = ["Ventas directas","Leads / Registros","Awareness","Tráfico web","App installs"];
const CAN = ["Meta Ads","TikTok Ads","Google Ads","YouTube","LinkedIn"];
const TON = ["Urgente / FOMO","Emocional","Lógico / Racional","Inspirador","Directo / Agresivo"];
const AUD = ["18–24","25–34","35–44","45–54","55+"];
const PLATFORMS = ["Midjourney","DALL·E 3","Stable Diffusion","Adobe Firefly"];
const VID_FORMATS = ["Reel 15 seg","Reel 30 seg","Story 15 seg","Video 60 seg","Ad largo 2 min"];

/* ═══ HELPERS ════════════════════════════════════════════ */
function parseAd(txt) {
  const ex = l => { const m=txt.match(new RegExp(`${l}[:\\-]?\\s*([^\\n]+)`,"i")); return m?m[1].trim().replace(/\*+/g,""):""; };
  const exl = l => { const m=txt.match(new RegExp(`${l}[^\\n]*\\n([\\s\\S]*?)(?=\\n[A-Z#*]|$)`,"i")); if(!m)return[]; return m[1].split("\n").map(x=>x.replace(/^[\-\*\d\.\s]+/,"").trim()).filter(x=>x.length>8); };
  return {
    angulo: ex("ángulo ganador")||ex("angulo"),
    tipoCreativo: ex("tipo creativo"),
    nivel: ex("nivel de conversión")||ex("nivel de conversion"),
    hooks: exl("HOOKS")||exl("hooks"),
    copies: exl("COPIES")||exl("copies")||exl("copy"),
    ctas: exl("CTAs")||exl("CTA"),
    script: (()=>{const m=txt.match(/SCRIPT[\s\S]*?:\s*\n([\s\S]*?)(?=\n[A-Z#]|$)/i);return m?m[1].trim():"";})(),
    landingHero: ex("hero")||ex("titular"),
    landingBeneficios: exl("beneficio")||exl("LANDING"),
    raw: txt
  };
}

function CopyBtn({text,label="Copiar"}) {
  const [ok,setOk]=useState(false);
  return <button className={`btn-sm${ok?" ok":""}`} onClick={()=>{navigator.clipboard.writeText(text).catch(()=>{});setOk(true);setTimeout(()=>setOk(false),2000)}}>{ok?"✓ Copiado":label}</button>;
}

function ResSection({icon,ic,name,tag,tc,items}) {
  const [open,setOpen]=useState(true);
  if(!items||!items.length)return null;
  return (
    <div className="res-sec">
      <div className="res-head" onClick={()=>setOpen(o=>!o)}>
        <div className="res-head-l">
          <div className={`res-icon ri-${ic}`}>{icon}</div>
          <span className="res-name">{name}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span className={`res-tag rt-${tc}`}>{tag}</span>
          <span style={{color:T.t3,fontSize:11}}>{open?"▲":"▼"}</span>
        </div>
      </div>
      {open&&<div className="res-body">{items.map((it,i)=>(
        <div className="copy-row" key={i}>
          <div style={{flex:1}}><div className="c-lbl">Opción {i+1}</div><div className="c-txt">{it}</div></div>
          <CopyBtn text={it}/>
        </div>
      ))}</div>}
    </div>
  );
}

/* ═══ API CALL ════════════════════════════════════════════ */
async function callAI(prompt, onChunk) {
  const res = await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,stream:true,messages:[{role:"user",content:prompt}]})
  });
  if(!res.ok) throw new Error(`API ${res.status}`);
  const reader=res.body.getReader(); const dec=new TextDecoder(); let full="";
  while(true){
    const{done,value}=await reader.read(); if(done)break;
    const lines=dec.decode(value).split("\n");
    for(const ln of lines){
      if(!ln.startsWith("data: "))continue;
      const d=ln.slice(6).trim(); if(d==="[DONE]")continue;
      try{const p=JSON.parse(d);const t=p?.delta?.text||"";if(t){full+=t;onChunk(full);}}catch{}
    }
  }
  return full;
}

/* ═══ PRICING MODAL ══════════════════════════════════════ */
function PricingModal({onClose}) {
  return (
    <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="price-modal">
        <div className="pm-top">
          <div className="pm-badge">🔥 Oferta de lanzamiento</div>
          <div className="pm-title">Precio único. Para siempre.</div>
          <div className="pm-sub">Sin suscripciones. Sin sorpresas. Pagás una vez y es tuyo.</div>
        </div>
        <div className="pm-prices">
          <div className="pm-price-card">
            <div className="pm-region">🌎 Latinoamérica</div>
            <div className="pm-price-val"><span className="currency">$</span>37</div>
            <div className="pm-once">USD · pago único</div>
          </div>
          <div className="pm-price-card featured">
            <div className="pm-flag">⚡ Más popular</div>
            <div className="pm-region">🇺🇸 EE.UU. / Europa</div>
            <div className="pm-price-val"><span className="currency">$</span>67</div>
            <div className="pm-once">USD · pago único</div>
          </div>
        </div>
        <div className="pm-features">
          {["✓ Generador de campaña completo con IA","✓ Hooks, copies y CTAs listos para usar","✓ Scripts de video con storyboard","✓ Prompts de imágenes para todas las plataformas","✓ Landing page persuasiva generada al instante","✓ Descarga en texto · Copiar con un clic","✓ Actualizaciones incluidas","✓ Sin límite de campañas"].map(f=>(
            <div className="pm-feat" key={f}><div className="pm-feat-dot">✓</div>{f.slice(2)}</div>
          ))}
        </div>
        <div className="pm-cta">
          <button className="pm-btn" onClick={()=>alert("🚀 Redirigiendo a checkout… (integrá Stripe o Gumroad aquí)")}>
            Obtener AVANTI →
          </button>
          <button className="pm-close" onClick={onClose}>Seguir explorando</button>
        </div>
        <div className="pm-guarantee">🔒 Garantía de 7 días · Pago seguro · Acceso inmediato</div>
      </div>
    </div>
  );
}

/* ═══ MODULE: CAMPAIGN ═══════════════════════════════════ */
function CampaignModule({form,setForm}) {
  const [phase,setPhase]=useState("form"); // form | gen | result
  const [stream,setStream]=useState("");
  const [step,setStep]=useState("");
  const [result,setResult]=useState(null);
  const [err,setErr]=useState("");
  const streamRef=useRef("");
  const up=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const tog=(k,v)=>setForm(f=>({...f,[k]:f[k]===v?"":v}));
  const valid=form.producto&&form.descripcion&&form.objetivo&&form.canal&&form.tono;

  const run=async()=>{
    setErr("");setStream("");streamRef.current="";setPhase("gen");
    const steps=["Analizando mercado…","Identificando ángulo ganador…","Creando hooks y copies…","Generando scripts…","Optimizando para conversión…"];
    let si=0;setStep(steps[0]);
    const iv=setInterval(()=>{si=(si+1)%steps.length;setStep(steps[si]);},2200);
    const prompt=`Eres un experto en performance marketing y copywriting. Creá una campaña completa:
PRODUCTO: ${form.producto}
DESCRIPCIÓN: ${form.descripcion}
OBJETIVO: ${form.objetivo}
CANAL: ${form.canal}
TONO: ${form.tono}
AUDIENCIA: ${form.audiencia||"General"}
DIFERENCIADOR: ${form.diferenciador||"No especificado"}

Formato EXACTO:
## ANÁLISIS ESTRATÉGICO
Ángulo ganador: [ángulo emocional/racional más poderoso]
Tipo creativo recomendado: [UGC/Video testimonial/Imagen estática/Carrusel]
Nivel de conversión estimado: [Alto/Medio-Alto/Medio]

## HOOKS (primeros 3 segundos)
- [hook 1 - para el scroll]
- [hook 2 - pregunta al dolor]
- [hook 3 - afirmación bold]

## COPIES (texto del anuncio)
- [copy 1 - corto urgente]
- [copy 2 - storytelling]
- [copy 3 - beneficio + prueba social]

## CTAs
- [CTA 1]
- [CTA 2]
- [CTA 3]

## SCRIPT (video 30-60 seg)
[script completo con apertura, desarrollo y cierre]

## LANDING PAGE
Hero: [titular que continúa el anuncio]
Beneficios:
- [beneficio 1]
- [beneficio 2]
- [beneficio 3]

Sé creativo, específico, orientado a conversiones. Sin genéricos.`;
    try {
      const txt=await callAI(prompt,t=>{streamRef.current=t;setStream(t);});
      clearInterval(iv);
      setResult(parseAd(txt));
      setPhase("result");
    } catch {
      clearInterval(iv);setErr("Error al generar. Intentá de nuevo.");setPhase("form");
    }
  };

  const copyAll=()=>navigator.clipboard.writeText(result?.raw||"").catch(()=>{});
  const dl=()=>{if(!result)return;const b=new Blob([result.raw],{type:"text/plain"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download=`avanti-${form.producto.replace(/\s+/g,"-")}.txt`;a.click();URL.revokeObjectURL(u);};

  // ── PAYWALL STATE ──
  // Se desbloquea automáticamente si MercadoPago redirige con ?paid=true en la URL
  const [unlocked,setUnlocked]=useState(()=>{
    if(typeof window!=="undefined"){
      const p=new URLSearchParams(window.location.search);
      return p.get("paid")==="true"||p.get("status")==="approved";
    }
    return false;
  });

  // Link de pago — reemplazá con tu link real de MercadoPago
  // En MercadoPago → tu link de pago → Configuración → URL de retorno:
  // ponés: https://tu-app.vercel.app?paid=true
  const PAYMENT_URL="https://mpago.la/TU_LINK_AQUI";

  const goToPay=()=>{
    if(PAYMENT_URL.includes("TU_LINK")){
      alert("⚠️ Paso final: reemplazá PAYMENT_URL con tu link de MercadoPago.\nBuscá esa línea en el código y pegá tu link real.");
      return;
    }
    window.location.href=PAYMENT_URL;
  };

  // Blurred locked item
  const LockedItem=({label,preview})=>(
    <div style={{position:"relative",marginBottom:1}}>
      <div className="copy-row" style={{filter:"blur(4px)",userSelect:"none",pointerEvents:"none",opacity:.6}}>
        <div style={{flex:1}}><div className="c-lbl">{label}</div><div className="c-txt">{preview}</div></div>
        <div className="btn-sm">Copiar</div>
      </div>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span style={{background:T.border,border:`1px solid ${T.borderB}`,borderRadius:8,padding:"4px 12px",fontSize:11,color:T.t2,display:"flex",alignItems:"center",gap:6}}>🔒 Bloqueado</span>
      </div>
    </div>
  );

  // Paywall banner — limpio, sin campo de código
  const PaywallBanner=()=>(
    <div style={{background:`linear-gradient(135deg,${T.s2},${T.bg})`,border:`1px solid ${T.acc}55`,borderRadius:16,overflow:"hidden",marginBottom:16,position:"relative"}}>
      <div style={{position:"absolute",top:-40,left:"50%",transform:"translateX(-50%)",width:300,height:80,background:`radial-gradient(ellipse,${T.accG},transparent)`,pointerEvents:"none"}}/>
      <div style={{padding:"32px 28px",position:"relative"}}>

        {/* Título */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <div style={{width:40,height:40,background:T.acc,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🔥</div>
          <div>
            <div style={{fontFamily:"Clash Display",fontSize:19,fontWeight:700,letterSpacing:"-.02em"}}>Tu campaña ya está lista.</div>
            <div style={{fontSize:13,color:T.t2,marginTop:2}}>Desbloqueá el resto con un solo pago. Acceso inmediato.</div>
          </div>
        </div>

        {/* Qué se desbloquea */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:24,padding:"16px",background:T.bg,borderRadius:10,border:`1px solid ${T.border}`}}>
          {[
            {icon:"⚡",label:"Hooks 2 y 3"},
            {icon:"✍️",label:"Copies 2 y 3"},
            {icon:"🔥",label:"3 CTAs optimizados"},
            {icon:"🎙",label:"Script de video 30–60 seg"},
            {icon:"🌐",label:"Copy de landing page"},
            {icon:"📋",label:"Descargar todo en .txt"},
            {icon:"🎨",label:"Módulo de imágenes"},
            {icon:"🎬",label:"Storyboard de video"},
          ].map((f,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:T.t1}}>
              <span style={{fontSize:14}}>{f.icon}</span>
              <span>{f.label}</span>
              <span style={{color:T.grn,fontSize:11,marginLeft:"auto"}}>✓</span>
            </div>
          ))}
        </div>

        {/* Precio + botón */}
        <div style={{display:"flex",alignItems:"stretch",gap:16,flexWrap:"wrap"}}>
          <div style={{padding:"16px 20px",background:T.bg,border:`1px solid ${T.border}`,borderRadius:12,minWidth:140}}>
            <div style={{fontSize:10,color:T.t2,textTransform:"uppercase",letterSpacing:".07em",marginBottom:4}}>Pago único · Sin suscripción</div>
            <div style={{display:"flex",alignItems:"baseline",gap:6}}>
              <span style={{fontFamily:"Clash Display",fontSize:40,fontWeight:700,letterSpacing:"-.04em",color:T.t1,lineHeight:1}}>$37</span>
              <span style={{fontSize:13,color:T.t2}}>USD</span>
            </div>
            <div style={{fontSize:11,color:T.t3,marginTop:2,textDecoration:"line-through"}}>Precio normal $67</div>
          </div>
          <div style={{flex:1,minWidth:200,display:"flex",flexDirection:"column",gap:10}}>
            <button onClick={goToPay} style={{
              flex:1,padding:"16px 24px",background:T.acc,color:"white",
              border:"none",borderRadius:12,fontFamily:"Clash Display",fontSize:16,
              fontWeight:700,cursor:"pointer",transition:"all .2s",letterSpacing:"-.01em",
              boxShadow:`0 8px 32px ${T.accG}`,display:"flex",alignItems:"center",justifyContent:"center",gap:10
            }}
            onMouseOver={e=>{e.currentTarget.style.background="#FF6020";e.currentTarget.style.transform="translateY(-2px)"}}
            onMouseOut={e=>{e.currentTarget.style.background=T.acc;e.currentTarget.style.transform="none"}}
            >
              🔓 Desbloquear por $37 USD →
            </button>
            <div style={{fontSize:11,color:T.t3,display:"flex",justifyContent:"center",gap:16}}>
              <span>🛡️ Garantía 7 días</span>
              <span>⚡ Acceso inmediato</span>
              <span>♾️ Sin límite</span>
            </div>
          </div>
        </div>

        {/* Explicación del flujo */}
        <div style={{marginTop:16,padding:"10px 14px",background:T.accD,border:`1px solid ${T.acc}22`,borderRadius:8,fontSize:12,color:T.t2,lineHeight:1.7}}>
          <strong style={{color:T.acc}}>¿Cómo funciona?</strong> Hacés clic → MercadoPago → pagás → te redirige automáticamente de vuelta con todo desbloqueado. Sin pasos extra.
        </div>
      </div>
    </div>
  );

  if(phase==="gen") return (
    <div className="gen-wrap">
      <div className="spin"/>
      <div className="gen-title">Creando tu campaña…</div>
      <div className="gen-step">{step}</div>
      <div className="stream-box">{stream||"Iniciando…"}<span className="cursor"/></div>
    </div>
  );

  if(phase==="result"&&result) return (
    <div className="inner" style={{maxWidth:860}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:28}}>
        <div>
          <div className="pg-title">Campaña generada ✓</div>
          <div className="pg-sub">{form.producto} · {form.canal} · {form.objetivo}</div>
        </div>
        {unlocked&&(
          <div className="res-actions">
            <button className="btn-sm" onClick={copyAll}>📋 Copiar todo</button>
            <button className="btn-sm" onClick={dl}>⬇ Descargar</button>
            <button className="btn-prime">↗ Usar en {form.canal}</button>
          </div>
        )}
      </div>

      {/* Score cards — siempre visibles */}
      <div className="score-row">
        <div className="score-c"><div className="s-icon">🎯</div><div className="s-lbl">Ángulo</div><div className="s-val acc" style={{fontSize:13,fontFamily:"Epilogue"}}>{result.angulo||"Ver análisis"}</div></div>
        <div className="score-c"><div className="s-icon">🎬</div><div className="s-lbl">Tipo creativo</div><div className="s-val blu" style={{fontSize:13,fontFamily:"Epilogue"}}>{result.tipoCreativo||"Ver análisis"}</div></div>
        <div className="score-c"><div className="s-icon">📈</div><div className="s-lbl">Conversión</div><div className="s-val grn">{result.nivel||"Alto"}</div></div>
      </div>

      {/* ── HOOKS — mostrar 1 gratis, resto bloqueado ── */}
      <div className="res-sec">
        <div className="res-head" style={{cursor:"default"}}>
          <div className="res-head-l"><div className="res-icon ri-o">⚡</div><span className="res-name">Hooks</span></div>
          <div style={{display:"flex",gap:10}}>
            <span className="res-tag rt-o">Primeros 3 seg</span>
            {!unlocked&&<span style={{fontSize:11,color:T.acc,fontWeight:600}}>1/3 gratis</span>}
          </div>
        </div>
        <div className="res-body">
          {/* Hook 1 — LIBRE */}
          {result.hooks[0]&&(
            <div className="copy-row">
              <div style={{flex:1}}><div className="c-lbl">Hook 1 — Gratis ✓</div><div className="c-txt">{result.hooks[0]}</div></div>
              <CopyBtn text={result.hooks[0]}/>
            </div>
          )}
          {/* Hooks 2 y 3 — BLOQUEADOS o libres */}
          {unlocked ? (
            result.hooks.slice(1).map((h,i)=>(
              <div className="copy-row" key={i}>
                <div style={{flex:1}}><div className="c-lbl">Hook {i+2}</div><div className="c-txt">{h}</div></div>
                <CopyBtn text={h}/>
              </div>
            ))
          ) : (
            result.hooks.slice(1).map((h,i)=>(
              <LockedItem key={i} label={`Hook ${i+2}`} preview={h?.slice(0,30)+"…"}/>
            ))
          )}
        </div>
      </div>

      {/* ── COPIES — mostrar 1 gratis, resto bloqueado ── */}
      <div className="res-sec">
        <div className="res-head" style={{cursor:"default"}}>
          <div className="res-head-l"><div className="res-icon ri-g">✍️</div><span className="res-name">Copies</span></div>
          <div style={{display:"flex",gap:10}}>
            <span className="res-tag rt-g">Texto del anuncio</span>
            {!unlocked&&<span style={{fontSize:11,color:T.grn,fontWeight:600}}>1/3 gratis</span>}
          </div>
        </div>
        <div className="res-body">
          {result.copies[0]&&(
            <div className="copy-row">
              <div style={{flex:1}}><div className="c-lbl">Copy 1 — Gratis ✓</div><div className="c-txt">{result.copies[0]}</div></div>
              <CopyBtn text={result.copies[0]}/>
            </div>
          )}
          {unlocked ? (
            result.copies.slice(1).map((c,i)=>(
              <div className="copy-row" key={i}>
                <div style={{flex:1}}><div className="c-lbl">Copy {i+2}</div><div className="c-txt">{c}</div></div>
                <CopyBtn text={c}/>
              </div>
            ))
          ) : (
            result.copies.slice(1).map((c,i)=>(
              <LockedItem key={i} label={`Copy ${i+2}`} preview={c?.slice(0,30)+"…"}/>
            ))
          )}
        </div>
      </div>

      {/* ── PAYWALL BANNER o contenido desbloqueado ── */}
      {!unlocked ? (
        <PaywallBanner/>
      ) : (
        <>
          {/* CTAs desbloqueados */}
          <ResSection icon="🔥" ic="o" name="CTAs" tag="Llamada a acción" tc="o" items={result.ctas}/>

          {/* Script */}
          {result.script&&(
            <div className="res-sec">
              <div className="res-head" style={{cursor:"default"}}>
                <div className="res-head-l"><div className="res-icon ri-b">🎙</div><span className="res-name">Script de video</span></div>
                <div style={{display:"flex",gap:10}}><span className="res-tag rt-b">30–60 seg</span><CopyBtn text={result.script}/></div>
              </div>
              <div className="res-body"><div style={{fontSize:13,lineHeight:1.8,color:T.t2,whiteSpace:"pre-wrap"}}>{result.script}</div></div>
            </div>
          )}

          {/* Landing */}
          {result.landingHero&&(
            <div className="res-sec">
              <div className="res-head" style={{cursor:"default"}}>
                <div className="res-head-l"><div className="res-icon ri-g">🌐</div><span className="res-name">Landing page</span></div>
                <span className="res-tag rt-g">Texto sugerido</span>
              </div>
              <div className="res-body">
                <div className="copy-row">
                  <div style={{flex:1}}><div className="c-lbl">Titular hero</div><div className="c-txt" style={{fontSize:16,fontFamily:"Clash Display",fontWeight:700}}>{result.landingHero}</div></div>
                  <CopyBtn text={result.landingHero}/>
                </div>
                {result.landingBeneficios.map((b,i)=>(
                  <div className="copy-row" key={i}>
                    <div style={{flex:1}}><div className="c-lbl">Beneficio {i+1}</div><div className="c-txt">{b}</div></div>
                    <CopyBtn text={b}/>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Unlock success bar */}
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",background:T.grnD,border:`1px solid ${T.grn}33`,borderRadius:10,marginBottom:16,fontSize:13}}>
            <span style={{fontSize:20}}>🎉</span>
            <div style={{flex:1,color:T.t2}}><strong style={{color:T.grn}}>Campaña completa desbloqueada.</strong> Copiá cada sección o descargá todo.</div>
            <button className="btn-sm" onClick={copyAll}>📋 Copiar todo</button>
            <button className="btn-sm" onClick={dl}>⬇ Descargar</button>
          </div>
        </>
      )}

      <button className="new-btn" onClick={()=>{setResult(null);setStream("");setPhase("form");setUnlocked(false);}}>+ Crear nueva campaña</button>
    </div>
  );

  return (
    <div className="inner">
      <div className="pg-head"><div className="pg-title">Crear campaña</div><div className="pg-sub">Completá los datos y la IA genera hooks, copies, scripts y landing.</div></div>
      {err&&<div className="err-box">⚠ {err}</div>}
      <div className="row2">
        <div className="field"><label className="lbl">Producto / Servicio *</label><input className="inp" placeholder="ej: Curso de inversión" value={form.producto} onChange={up("producto")}/></div>
        <div className="field"><label className="lbl">Diferenciador clave</label><input className="inp" placeholder="ej: resultados en 30 días" value={form.diferenciador||""} onChange={up("diferenciador")}/></div>
      </div>
      <div className="field"><label className="lbl">Descripción del producto *</label><textarea className="txta" placeholder="¿Qué hace? ¿Qué problema resuelve? ¿A quién va dirigido?" value={form.descripcion} onChange={up("descripcion")}/></div>
      <div className="field"><label className="lbl">Objetivo *</label><div className="chips">{OBJ.map(o=><button key={o} className={`chip${form.objetivo===o?" on":""}`} onClick={()=>tog("objetivo",o)}>{o}</button>)}</div></div>
      <div className="field"><label className="lbl">Canal *</label><div className="chips">{CAN.map(c=><button key={c} className={`chip${form.canal===c?" on":""}`} onClick={()=>tog("canal",c)}>{c}</button>)}</div></div>
      <div className="field"><label className="lbl">Tono *</label><div className="chips">{TON.map(t=><button key={t} className={`chip${form.tono===t?" on":""}`} onClick={()=>tog("tono",t)}>{t}</button>)}</div></div>
      <div className="field"><label className="lbl">Audiencia</label><div className="chips">{AUD.map(a=><button key={a} className={`chip${form.audiencia===a?" on":""}`} onClick={()=>tog("audiencia",a)}>{a}</button>)}</div></div>
      <button className="btn-run" onClick={run} disabled={!valid}>{valid?"⚡ Generar campaña completa":"Completá los campos obligatorios *"}</button>
    </div>
  );
}

/* ═══ MODULE: IMAGES (Midjourney Pro) ═══════════════════ */
function ImageModule({form}) {
  const [platform,setPlatform]=useState("Midjourney");
  const [format,setFormat]=useState("Post cuadrado 1:1");
  const [tipoNegocio,setTipoNegocio]=useState("Cualquier negocio");
  const [phase,setPhase]=useState("form");
  const [stream,setStream]=useState("");
  const [prompts,setPrompts]=useState([]);
  const [creativo,setCreativo]=useState(null); // visual ad preview
  const [err,setErr]=useState("");

  const FORMATS=["Post cuadrado 1:1","Story vertical 9:16","Banner horizontal 16:9","Carrusel 1:1","Miniatura YouTube 16:9"];
  const TIPOS=["Cualquier negocio","E-commerce / Producto físico","Servicio / Infoproducto / Curso"];

  // Aspect ratio por formato
  const arMap={"Post cuadrado 1:1":"--ar 1:1","Story vertical 9:16":"--ar 9:16","Banner horizontal 16:9":"--ar 16:9","Carrusel 1:1":"--ar 1:1","Miniatura YouTube 16:9":"--ar 16:9"};

  // Suffixes específicos por plataforma
  const sufMap={
    "Midjourney":"--v 6.1 --style raw --q 2",
    "DALL·E 3":"[usa esto en ChatGPT → Genera imagen con DALL·E]",
    "Stable Diffusion":"steps=30, cfg=7, sampler=DPM++ 2M Karras",
    "Adobe Firefly":"[pegá en Firefly → Generate Similar]",
  };

  // Estilo visual según tipo de negocio
  const estiloMap={
    "Cualquier negocio":"cinematic product photography, studio lighting, clean background, ultra-sharp focus, professional advertising aesthetic",
    "E-commerce / Producto físico":"commercial product photography, lifestyle context, natural light, shallow depth of field, aspirational setting, real-world usage",
    "Servicio / Infoproducto / Curso":"editorial portrait photography, confident subject, modern minimalist office or outdoor setting, professional and aspirational mood",
  };

  const run=async()=>{
    if(!form.producto){setErr("Primero completá los datos del producto en Campaña.");return;}
    setErr("");setStream("");setPhase("gen");
    const ar=arMap[format]||"--ar 1:1";
    const estilo=estiloMap[tipoNegocio];
    const suf=sufMap[platform];

    const prompt=`Sos un director creativo senior especializado en publicidad digital de alto rendimiento y generación de imágenes con IA.

PRODUCTO: "${form.producto}"
DESCRIPCIÓN: ${form.descripcion||"producto/servicio de calidad"}
OBJETIVO: ${form.objetivo||"ventas directas"}
CANAL: ${form.canal||"Meta Ads"}
TONO: ${form.tono||"Emocional"}
AUDIENCIA: ${form.audiencia||"adultos 25-44"}
TIPO DE NEGOCIO: ${tipoNegocio}
FORMATO: ${format} (${ar})

Generá 4 prompts PROFESIONALES para ${platform}. Cada prompt debe:
- Estar 100% en inglés técnico de dirección de arte
- Ser ultra-específico: composición, iluminación, paleta, mood, estilo fotográfico
- Incluir el sufijo de parámetros correcto al final
- Estar orientado a CONVERSIÓN publicitaria, no a arte genérico
- Usar este estilo base adaptado al producto: ${estilo}

ÁNGULOS (uno por prompt):
1. EMOCIONAL — aspiracional, transformación, lifestyle deseado
2. URGENCIA/FOMO — escasez visual, contraste antes/después, tensión
3. PRUEBA SOCIAL — testimonio visual, grupo de personas, credibilidad
4. PRODUCTO HERO — el producto como protagonista absoluto, máxima calidad

Formato de respuesta EXACTO (sin variaciones):
---
PROMPT_1_CONCEPTO: [nombre del concepto en español, 4-6 palabras]
PROMPT_1: [prompt completo en inglés] ${ar} ${platform==="Midjourney"?"--v 6.1 --style raw --q 2 --no text, watermark, logo":""}

PROMPT_2_CONCEPTO: [nombre del concepto en español]
PROMPT_2: [prompt completo en inglés] ${ar} ${platform==="Midjourney"?"--v 6.1 --style raw --q 2 --no text, watermark, logo":""}

PROMPT_3_CONCEPTO: [nombre del concepto en español]
PROMPT_3: [prompt completo en inglés] ${ar} ${platform==="Midjourney"?"--v 6.1 --style raw --q 2 --no text, watermark, logo":""}

PROMPT_4_CONCEPTO: [nombre del concepto en español]
PROMPT_4: [prompt completo en inglés] ${ar} ${platform==="Midjourney"?"--v 6.1 --style raw --q 2 --no text, watermark, logo":""}
---
COPY_SUPERPUESTO: [texto corto en español para poner sobre la imagen, máximo 8 palabras, impactante]
PALETA: [3 colores hex sugeridos para el anuncio, ej: #FF4500, #1A1A2E, #FFFFFF]
FUENTE: [tipografía sugerida para el copy, ej: Syne Bold]`;

    try {
      let full="";
      await callAI(prompt,t=>{full=t;setStream(t);});

      // Parse prompts
      const parsed=[];
      for(let i=1;i<=4;i++){
        const cM=full.match(new RegExp(`PROMPT_${i}_CONCEPTO:\\s*([^\\n]+)`,"i"));
        const pM=full.match(new RegExp(`PROMPT_${i}:\\s*([^\\n]+(?:\\n(?!PROMPT)[^\\n]+)*)`,"i"));
        if(pM){
          parsed.push({
            concepto: cM?cM[1].trim():`Concepto ${i}`,
            prompt: pM[1].trim(),
            num: i,
          });
        }
      }
      // Parse extra
      const copyM=full.match(/COPY_SUPERPUESTO:\s*([^\n]+)/i);
      const paletaM=full.match(/PALETA:\s*([^\n]+)/i);
      const fuenteM=full.match(/FUENTE:\s*([^\n]+)/i);

      setPrompts(parsed.length?parsed:[{num:1,concepto:"Generado",prompt:full}]);
      setCreativo({
        copy: copyM?copyM[1].trim():`${form.producto} — Actuá ahora`,
        paleta: paletaM?paletaM[1].trim():"#FF4500, #1A1A2E, #FFFFFF",
        fuente: fuenteM?fuenteM[1].trim():"Syne Bold",
      });
      setPhase("result");
    } catch {
      setErr("Error al generar. Intentá de nuevo.");setPhase("form");
    }
  };

  // Genera un creativo visual HTML exportable
  const CreativoVisual=({data,form,format})=>{
    const isStory=format.includes("9:16");
    const isBanner=format.includes("16:9");
    const w=isStory?270:isBanner?480:270;
    const h=isStory?480:isBanner?270:270;
    const colors=data.paleta.match(/#[0-9A-Fa-f]{6}/g)||["#FF4500","#1A1A2E","#FFFFFF"];
    const bg=colors[1]||"#1A1A2E";
    const acc=colors[0]||"#FF4500";
    const txt=colors[2]||"#FFFFFF";

    const htmlContent=`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;background:${bg};font-family:'${data.fuente.split(" ")[0]}',sans-serif;overflow:hidden;position:relative}
.bg-grad{position:absolute;inset:0;background:linear-gradient(135deg,${bg} 0%,${acc}44 100%)}
.noise{position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.05'/%3E%3C/svg%3E");opacity:.4}
.accent-line{position:absolute;bottom:${h*0.28}px;left:0;right:0;height:3px;background:${acc}}
.tag{position:absolute;top:${h*0.06}px;left:${w*0.06}px;font-size:${w*0.034}px;font-weight:700;color:${acc};letter-spacing:.12em;text-transform:uppercase;background:${acc}22;padding:4px 10px;border-radius:100px;border:1px solid ${acc}55}
.main-copy{position:absolute;bottom:${h*0.32}px;left:${w*0.06}px;right:${w*0.06}px;font-size:${w*0.082}px;font-weight:800;color:${txt};line-height:1.05;letter-spacing:-.03em}
.sub{position:absolute;bottom:${h*0.18}px;left:${w*0.06}px;right:${w*0.06}px;font-size:${w*0.042}px;color:${txt}99;font-weight:300;line-height:1.4}
.cta-btn{position:absolute;bottom:${h*0.06}px;left:${w*0.06}px;background:${acc};color:white;font-size:${w*0.044}px;font-weight:700;padding:${h*0.022}px ${w*0.07}px;border-radius:${w*0.025}px;letter-spacing:-.01em}
.brand{position:absolute;top:${h*0.06}px;right:${w*0.06}px;font-size:${w*0.036}px;font-weight:800;color:${txt}66;letter-spacing:-.03em}
.deco-circle{position:absolute;width:${w*0.7}px;height:${w*0.7}px;border-radius:50%;border:1px solid ${acc}22;top:-${w*0.2}px;right:-${w*0.2}px}
.deco-circle2{position:absolute;width:${w*0.4}px;height:${w*0.4}px;border-radius:50%;border:1px solid ${acc}33;bottom:${h*0.25}px;right:${w*0.05}px}
</style>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap" rel="stylesheet"/>
</head>
<body>
<div class="bg-grad"></div>
<div class="noise"></div>
<div class="deco-circle"></div>
<div class="deco-circle2"></div>
<div class="tag">${form.canal||"Meta Ads"} · ${form.objetivo||"Ventas"}</div>
<div class="brand">${form.producto||"Tu marca"}</div>
<div class="main-copy">${data.copy}</div>
<div class="accent-line"></div>
<div class="sub">${form.diferenciador||form.descripcion?.slice(0,60)||"La solución que estabas buscando."}</div>
<div class="cta-btn">${form.objetivo==="Leads / Registros"?"Registrarme gratis →":form.objetivo==="Tráfico web"?"Ver más →":"Quiero esto →"}</div>
</body>
</html>`;

    const dlCreativo=()=>{
      const blob=new Blob([htmlContent],{type:"text/html"});
      const u=URL.createObjectURL(blob);
      const a=document.createElement("a");
      a.href=u;a.download=`creativo-${form.producto?.replace(/\s+/g,"-")||"anuncio"}-${format.replace(/[\s/:]/g,"-")}.html`;
      a.click();URL.revokeObjectURL(u);
    };

    return (
      <div style={{background:T.s1,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden",marginBottom:16}}>
        <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:".08em",color:T.acc,fontWeight:700,marginBottom:2}}>🎨 Creativo visual generado</div>
            <div style={{fontSize:12,color:T.t2}}>Formato {format} · Paleta: {data.paleta.match(/#[0-9A-Fa-f]{6}/g)?.join(" · ")||data.paleta}</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button className="btn-sm" onClick={dlCreativo}>⬇ Descargar HTML</button>
          </div>
        </div>
        <div style={{padding:20,display:"flex",gap:20,alignItems:"flex-start",flexWrap:"wrap"}}>
          {/* Preview */}
          <div style={{
            width:w*0.7,height:h*0.7,background:bg,borderRadius:8,overflow:"hidden",
            flexShrink:0,position:"relative",border:`1px solid ${acc}44`,
          }}>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${bg} 0%,${acc}44 100%)`}}/>
            <div style={{position:"absolute",top:"6%",left:"6%",fontSize:w*0.034*0.7,fontWeight:700,color:acc,letterSpacing:".12em",textTransform:"uppercase",background:`${acc}22`,padding:"3px 8px",borderRadius:100,border:`1px solid ${acc}55`}}>{form.canal||"Meta Ads"}</div>
            <div style={{position:"absolute",top:"6%",right:"6%",fontSize:w*0.036*0.7,fontWeight:800,color:`${colors[2]||"#FFF"}66`,letterSpacing:"-.03em"}}>{form.producto||"Marca"}</div>
            <div style={{position:"absolute",bottom:"32%",left:"6%",right:"6%",fontSize:w*0.082*0.7,fontWeight:800,color:colors[2]||"#FFF",lineHeight:1.05,letterSpacing:"-.03em"}}>{data.copy}</div>
            <div style={{position:"absolute",bottom:"28%",left:0,right:0,height:2,background:acc}}/>
            <div style={{position:"absolute",bottom:"18%",left:"6%",right:"6%",fontSize:w*0.042*0.7,color:`${colors[2]||"#FFF"}88`,fontWeight:300,lineHeight:1.4}}>{form.diferenciador||form.descripcion?.slice(0,50)||""}</div>
            <div style={{position:"absolute",bottom:"6%",left:"6%",background:acc,color:"white",fontSize:w*0.044*0.7,fontWeight:700,padding:`${h*0.022*0.7}px ${w*0.07*0.7}px`,borderRadius:w*0.025*0.7}}>
              {form.objetivo==="Leads / Registros"?"Registrarme →":form.objetivo==="Tráfico web"?"Ver más →":"Quiero esto →"}
            </div>
          </div>
          <div style={{flex:1,minWidth:160}}>
            <div style={{fontSize:11,color:T.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>Datos del creativo</div>
            <div style={{fontSize:12,color:T.t2,lineHeight:2}}>
              <div><span style={{color:T.t1}}>Copy:</span> {data.copy}</div>
              <div><span style={{color:T.t1}}>Tipografía:</span> {data.fuente}</div>
              <div><span style={{color:T.t1}}>Formato:</span> {format}</div>
              <div style={{marginTop:8}}><span style={{color:T.t1}}>Colores:</span></div>
              <div style={{display:"flex",gap:6,marginTop:4}}>
                {(data.paleta.match(/#[0-9A-Fa-f]{6}/g)||[]).map((c,i)=>(
                  <div key={i} style={{width:24,height:24,borderRadius:6,background:c,border:`1px solid ${T.border}`}} title={c}/>
                ))}
              </div>
            </div>
            <div style={{marginTop:12,fontSize:11,color:T.t3,lineHeight:1.6}}>
              💡 Descargá el HTML y abrilo en el navegador para hacer screenshot con la calidad exacta del formato elegido.
            </div>
          </div>
        </div>
      </div>
    );
  };

  if(phase==="gen") return (
    <div className="gen-wrap">
      <div className="spin"/>
      <div className="gen-title">Generando prompts y creativo…</div>
      <div className="gen-step">Diseñando para {platform} · {format}…</div>
      <div className="stream-box">{stream||"Iniciando…"}<span className="cursor"/></div>
    </div>
  );

  if(phase==="result"&&prompts.length) return (
    <div className="inner" style={{maxWidth:860}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:24}}>
        <div>
          <div className="pg-title">Prompts + Creativo listos ✓</div>
          <div className="pg-sub">{platform} · {format} · {tipoNegocio}</div>
        </div>
        <button className="btn-sm" onClick={()=>setPhase("form")}>← Nueva generación</button>
      </div>

      {/* Creativo visual */}
      {creativo&&<CreativoVisual data={creativo} form={form} format={format}/>}

      {/* Cómo usar en Midjourney */}
      {platform==="Midjourney"&&(
        <div style={{background:T.accD,border:`1px solid ${T.acc}33`,borderRadius:12,padding:16,marginBottom:20,fontSize:13,color:T.t2,lineHeight:1.7}}>
          <div style={{color:T.acc,fontWeight:700,marginBottom:6}}>📖 Cómo usar en Midjourney (paso a paso)</div>
          <div>1. Andá a <strong style={{color:T.t1}}>midjourney.com</strong> e iniciá sesión</div>
          <div>2. En cualquier canal de Discord o en la web, escribí <strong style={{color:T.t1}}>/imagine</strong></div>
          <div>3. Pegá el prompt completo (incluye los parámetros al final)</div>
          <div>4. Enter → en ~60 segundos tenés 4 variaciones</div>
          <div>5. Hacé clic en <strong style={{color:T.t1}}>U1, U2, U3 o U4</strong> para upscale de la que más te guste</div>
          <div style={{marginTop:8,color:T.acc}}>💡 Plan Basic de Midjourney: $10/mes. Incluye ~200 imágenes/mes.</div>
        </div>
      )}

      {/* Prompts */}
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {prompts.map((p,i)=>{
          const angColors=["#FF4500","#FFB800","#00E87A","#4F8EF7"];
          const angLabels=["Emocional / Aspiracional","Urgencia / FOMO","Prueba Social","Producto Hero"];
          return (
            <div className="prompt-card" key={i} style={{position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,width:3,bottom:0,background:angColors[i]||T.acc,borderRadius:"3px 0 0 3px"}}/>
              <div style={{paddingLeft:12}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:8}}>
                  <div>
                    <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:".08em",color:angColors[i]||T.acc,fontWeight:700,marginBottom:3}}>{platform} · {angLabels[i]||`Variación ${i+1}`}</div>
                    <div style={{fontSize:14,fontWeight:600,color:T.t1}}>{p.concepto}</div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <CopyBtn text={p.prompt} label="📋 Copiar prompt"/>
                    <button className="btn-sm" onClick={()=>window.open(
                      platform==="Midjourney"?"https://www.midjourney.com":
                      platform==="DALL·E 3"?"https://chat.openai.com":
                      platform==="Stable Diffusion"?"https://stability.ai":
                      "https://firefly.adobe.com","_blank"
                    )}>↗ Abrir {platform}</button>
                  </div>
                </div>
                <div className="prompt-text" style={{fontSize:12,lineHeight:1.8,color:T.t2,fontFamily:"monospace",background:T.bg,padding:"10px 14px",borderRadius:8,border:`1px solid ${T.border}`}}>
                  {p.prompt}
                </div>
                {platform==="Midjourney"&&(
                  <div style={{marginTop:8,fontSize:11,color:T.t3}}>
                    💡 Pegá en Discord: <strong style={{color:T.t2}}>/imagine [este prompt]</strong>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button className="new-btn" onClick={()=>setPhase("form")}>+ Generar nuevas variaciones</button>
    </div>
  );

  return (
    <div className="inner">
      <div className="pg-head">
        <div className="pg-title">Generador de imágenes</div>
        <div className="pg-sub">4 prompts profesionales listos para copiar + creativo visual exportable. Sin costo adicional.</div>
      </div>
      {err&&<div className="err-box">⚠ {err}</div>}
      {!form.producto&&<div className="err-box">💡 Completá primero los datos en el módulo <strong>Campaña</strong> para personalizar los prompts a tu producto.</div>}

      <div className="field">
        <label className="lbl">Tipo de negocio</label>
        <div className="chips">{TIPOS.map(t=><button key={t} className={`chip${tipoNegocio===t?" on":""}`} onClick={()=>setTipoNegocio(t)}>{t}</button>)}</div>
      </div>
      <div className="field">
        <label className="lbl">Plataforma de IA de imágenes</label>
        <div className="platform-tabs">{PLATFORMS.map(p=><button key={p} className={`pt${platform===p?" on":""}`} onClick={()=>setPlatform(p)}>{p}</button>)}</div>
      </div>
      <div className="field">
        <label className="lbl">Formato del anuncio</label>
        <div className="chips">{FORMATS.map(f=><button key={f} className={`chip${format===f?" on":""}`} onClick={()=>setFormat(f)}>{f}</button>)}</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
        <div style={{padding:16,background:T.s1,border:`1px solid ${T.border}`,borderRadius:10,fontSize:13}}>
          <div style={{fontWeight:700,color:T.t1,marginBottom:8}}>📋 Lo que generás</div>
          {["4 prompts en inglés técnico (uno por ángulo)","Parámetros exactos para "+platform,"Concepto en español de cada imagen","Copy de texto para superponer","Paleta de colores sugerida"].map(f=>(
            <div key={f} style={{fontSize:12,color:T.t2,padding:"3px 0",display:"flex",gap:6}}><span style={{color:T.grn}}>✓</span>{f}</div>
          ))}
        </div>
        <div style={{padding:16,background:T.s1,border:`1px solid ${T.border}`,borderRadius:10,fontSize:13}}>
          <div style={{fontWeight:700,color:T.t1,marginBottom:8}}>🎨 Creativo visual incluido</div>
          {["Banner HTML descargable y listo","Diseño con tu paleta de marca","Copy superpuesto optimizado","Botón CTA integrado","Abrilo y hacé screenshot"].map(f=>(
            <div key={f} style={{fontSize:12,color:T.t2,padding:"3px 0",display:"flex",gap:6}}><span style={{color:T.yel}}>★</span>{f}</div>
          ))}
        </div>
      </div>

      {platform==="Midjourney"&&(
        <div style={{padding:14,background:T.accD,border:`1px solid ${T.acc}33`,borderRadius:10,marginBottom:20,fontSize:12,color:T.t2,lineHeight:1.7}}>
          <strong style={{color:T.acc}}>Midjourney</strong> es la IA de imágenes con mejor calidad para publicidad. Cuesta $10/mes (plan propio del usuario). AVANTI genera los prompts perfectos con todos los parámetros técnicos para obtener resultados profesionales.
        </div>
      )}

      <button className="btn-run" onClick={run}>🎨 Generar prompts + creativo visual</button>
    </div>
  );
}

/* ═══ MODULE: VIDEO ════════════════════════════════════ */
function VideoModule({form}) {
  const [vidFormat,setVidFormat]=useState("Reel 30 seg");
  const [phase,setPhase]=useState("form");
  const [stream,setStream]=useState("");
  const [storyboard,setStoryboard]=useState([]);
  const [err,setErr]=useState("");

  const parseStoryboard=(txt)=>{
    const scenes=txt.split(/ESCENA \d+/i).slice(1);
    return scenes.map((s,i)=>{
      const timeM=s.match(/Duración[:\s]+([^\n]+)/i);
      const descM=s.match(/(?:Descripción visual|Visual)[:\s]+([^\n]+(?:\n(?![A-Z])[^\n]+)*)/i);
      const scriptM=s.match(/(?:Narración|Script|Voz)[:\s]+([^\n]+(?:\n(?![A-Z])[^\n]+)*)/i);
      const textM=s.match(/(?:Texto en pantalla|Texto|Overlay)[:\s]+([^\n]+)/i);
      return{
        num:i+1,
        time:timeM?timeM[1].trim():"3–5 seg",
        visual:descM?descM[1].trim():"",
        script:scriptM?scriptM[1].trim():"",
        text:textM?textM[1].trim():"",
      };
    }).filter(s=>s.visual||s.script);
  };

  const run=async()=>{
    if(!form.producto){setErr("Completá primero los datos del producto en Campaña.");return;}
    setErr("");setStream("");setPhase("gen");
    const prompt=`Eres un director creativo de publicidad digital especializado en video.
Producto: "${form.producto}". ${form.descripcion||""}
Objetivo: ${form.objetivo||"ventas"}. Canal: ${form.canal||"Meta Ads"}. Tono: ${form.tono||"Urgente"}.
Formato de video: ${vidFormat}.

Creá un storyboard completo escena por escena para este anuncio.
Formato EXACTO para cada escena:

ESCENA 1
Duración: [X seg]
Descripción visual: [qué se ve exactamente, composición, plano, acción]
Narración: [texto exacto que se dice o aparece en voz en off]
Texto en pantalla: [texto/copy que aparece sobreimpreso]

ESCENA 2
[mismo formato]

[continuar para todas las escenas necesarias según el formato ${vidFormat}]

Al final agregá:
HOOK PRINCIPAL: [el gancho de los primeros 2 segundos]
MÚSICA SUGERIDA: [estilo/mood de música]
REFERENCIA VISUAL: [estilo visual, paleta de colores, mood general]
LLAMADA A ACCIÓN FINAL: [CTA del cierre]

Sé muy específico y cinematográfico. El storyboard debe poder usarse directamente para grabar.`;
    try {
      let full="";
      await callAI(prompt,t=>{full=t;setStream(t);});
      const parsed=parseStoryboard(full);
      setStoryboard(parsed.length?parsed:[{num:1,time:"",visual:full.slice(0,300),script:"",text:""}]);
      setPhase("result");
    } catch {
      setErr("Error al generar.");setPhase("form");
    }
  };

  const allText=storyboard.map(s=>`ESCENA ${s.num} (${s.time})\nVisual: ${s.visual}\nScript: ${s.script}\nTexto: ${s.text}`).join("\n\n");

  if(phase==="gen") return (
    <div className="gen-wrap">
      <div className="spin"/>
      <div className="gen-title">Creando storyboard…</div>
      <div className="gen-step">Diseñando escena por escena para {vidFormat}…</div>
      <div className="stream-box">{stream||"Iniciando…"}<span className="cursor"/></div>
    </div>
  );

  if(phase==="result"&&storyboard.length) return (
    <div className="inner">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:24}}>
        <div><div className="pg-title">Storyboard listo ✓</div><div className="pg-sub">{vidFormat} · {storyboard.length} escenas</div></div>
        <div style={{display:"flex",gap:8}}>
          <CopyBtn text={allText} label="📋 Copiar todo"/>
          <button className="btn-sm" onClick={()=>setPhase("form")}>← Nuevo</button>
        </div>
      </div>
      <div className="storyboard">
        {storyboard.map(s=>(
          <div className="sb-card" key={s.num}>
            <div className="sb-header">
              <div className="sb-num">{s.num}</div>
              <span style={{fontFamily:"Clash Display",fontSize:14,fontWeight:600,letterSpacing:"-.01em"}}>Escena {s.num}</span>
              <span className="sb-time">⏱ {s.time}</span>
            </div>
            <div className="sb-body">
              <div>
                <div className="sb-section-title">🎬 Descripción visual</div>
                <div className="sb-visual">{s.visual||"—"}</div>
              </div>
              <div>
                <div className="sb-section-title">🎙 Script / Narración</div>
                <div className="sb-text">{s.script||s.text||"—"}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="new-btn" onClick={()=>setPhase("form")}>+ Nuevo storyboard</button>
    </div>
  );

  return (
    <div className="inner">
      <div className="pg-head"><div className="pg-title">Generador de videos</div><div className="pg-sub">Storyboard completo escena por escena. Listo para grabar o enviárselo a tu editor.</div></div>
      {err&&<div className="err-box">⚠ {err}</div>}
      {!form.producto&&<div className="err-box">💡 Completá primero los datos en el módulo <strong>Campaña</strong>.</div>}
      <div className="field"><label className="lbl">Formato de video</label><div className="chips">{VID_FORMATS.map(f=><button key={f} className={`chip${vidFormat===f?" on":""}`} onClick={()=>setVidFormat(f)}>{f}</button>)}</div></div>
      <div style={{padding:"16px",background:T.s1,border:`1px solid ${T.border}`,borderRadius:10,marginBottom:24,fontSize:13,color:T.t2,lineHeight:1.6}}>
        <strong style={{color:T.t1}}>Qué incluye el storyboard:</strong><br/>
        ✓ Descripción visual de cada escena &nbsp;·&nbsp; ✓ Script/narración exacto &nbsp;·&nbsp; ✓ Texto en pantalla &nbsp;·&nbsp; ✓ Hook de apertura &nbsp;·&nbsp; ✓ Música y mood sugerido &nbsp;·&nbsp; ✓ CTA de cierre
      </div>
      <button className="btn-run" onClick={run}>🎬 Generar storyboard para {vidFormat}</button>
    </div>
  );
}

/* ═══ MODULE: LANDING PAGE (HTML visual descargable) ════ */
function LandingModule({form}) {
  const [phase,setPhase]=useState("form");
  const [stream,setStream]=useState("");
  const [landingData,setLandingData]=useState(null);
  const [err,setErr]=useState("");
  const [tipoNegocio,setTipoNegocio]=useState("Cualquier negocio");
  const [colorScheme,setColorScheme]=useState("Oscuro (dark)");

  const TIPOS_N=["Cualquier negocio","E-commerce / Producto físico","Servicio / Infoproducto / Curso"];
  const COLORES=["Oscuro (dark)","Claro (light)","Naranja / Energía","Verde / Confianza","Azul / Corporativo"];
  const schemeMap={
    "Oscuro (dark)":{bg:"#0A0A0F",s1:"#111118",acc:"#FF4D00",t1:"#F0F0FF",t2:"#8888AA",bd:"#1E1E2E"},
    "Claro (light)":{bg:"#FAFAFA",s1:"#F0F0F5",acc:"#FF4D00",t1:"#0A0A14",t2:"#555570",bd:"#E0E0EE"},
    "Naranja / Energía":{bg:"#0D0800",s1:"#1A1000",acc:"#FF8800",t1:"#FFF8F0",t2:"#AA8855",bd:"#2A1800"},
    "Verde / Confianza":{bg:"#020D08",s1:"#061510",acc:"#00C96E",t1:"#F0FFF8",t2:"#558877",bd:"#0A2A1A"},
    "Azul / Corporativo":{bg:"#020810",s1:"#060E1A",acc:"#3B82F6",t1:"#F0F5FF",t2:"#6677AA",bd:"#0E1A2E"},
  };

  // KEEP old run stub to be replaced below
  const [_landing,_setLanding]=useState("");

  const run=async()=>{
    if(!form.producto){setErr("Completá primero los datos del producto en Campaña.");return;}
    setErr("");setStream("");setPhase("gen");
    const prompt=`Sos un copywriter de elite especializado en landing pages de alta conversión para ${tipoNegocio}.
PRODUCTO: "${form.producto}". ${form.descripcion||""}
OBJETIVO: ${form.objetivo||"ventas"}. TONO: ${form.tono||"Urgente"}. DIFERENCIADOR: ${form.diferenciador||""}.
AUDIENCIA: ${form.audiencia||"adultos"}. CANAL: ${form.canal||"Meta Ads"}.

Respondé SOLO con JSON válido sin markdown:
{"hero_titulo":"[7 palabras máx, impacto]","hero_subtitulo":"[1-2 líneas beneficio principal]","hero_cta":"[acción clara]","hero_subcta":"[elimina objeción de riesgo]","problema_titulo":"[pregunta que duele]","problema_texto":"[2-3 líneas dolor real]","solucion_titulo":"[cómo resuelve]","solucion_texto":"[2-3 líneas mecanismo]","beneficios":[{"icono":"⚡","titulo":"[específico]","desc":"[1 línea]"},{"icono":"🎯","titulo":"[específico]","desc":"[1 línea]"},{"icono":"🔥","titulo":"[específico]","desc":"[1 línea]"},{"icono":"✅","titulo":"[específico]","desc":"[1 línea]"}],"testimonios":[{"texto":"[resultado concreto]","nombre":"[Nombre]","rol":"[rol/ciudad]","avatar":"👤"},{"texto":"[resultado 2]","nombre":"[Nombre]","rol":"[rol]","avatar":"👤"},{"texto":"[emocional]","nombre":"[Nombre]","rol":"[rol]","avatar":"👤"}],"stat1_num":"[número]","stat1_label":"[qué es]","stat2_num":"[número]","stat2_label":"[qué es]","stat3_num":"[número]","stat3_label":"[qué es]","precio_titulo":"[urgencia precio]","precio_valor":"[número realista]","precio_moneda":"USD","precio_nota":"[qué incluye]","garantia":"[elimina riesgo]","urgencia":"[escasez/tiempo]","faq":[{"q":"[objeción 1]","a":"[respuesta]"},{"q":"[objeción 2]","a":"[respuesta]"},{"q":"[objeción 3]","a":"[respuesta]"}],"cierre_titulo":"[8 palabras poderosas]","cierre_sub":"[valor total]","cta_final":"[acción final]"}`;
    try {
      let full="";
      await callAI(prompt,t=>{full=t;setStream(t);});
      let data;
      try{
        const clean=full.replace(/```json|```/g,"").trim();
        data=JSON.parse(clean.slice(clean.indexOf("{"),clean.lastIndexOf("}")+1));
      } catch {
        data={hero_titulo:form.producto,hero_subtitulo:`La solución para ${form.objetivo||"tu negocio"}`,hero_cta:"Quiero acceso →",hero_subcta:"Garantía 7 días",problema_titulo:"¿Seguís sin ver resultados?",problema_texto:"Es frustrante invertir sin retorno.",solucion_titulo:`${form.producto} lo cambia todo`,solucion_texto:form.descripcion||"Una solución probada.",beneficios:[{icono:"⚡",titulo:"Resultado rápido",desc:"En días no meses"},{icono:"🎯",titulo:"Efectivo",desc:"Probado y verificado"},{icono:"🔥",titulo:"Simple",desc:"Sin complicaciones"},{icono:"✅",titulo:"Garantizado",desc:"O te devolvemos"}],testimonios:[{texto:"Increíble resultado.",nombre:"María G.",rol:"Empresaria",avatar:"👤"},{texto:"Lo mejor que compré.",nombre:"Carlos M.",rol:"Marketing",avatar:"👤"},{texto:"Superó expectativas.",nombre:"Ana L.",rol:"Emprendedora",avatar:"👤"}],stat1_num:"500+",stat1_label:"Clientes",stat2_num:"3x",stat2_label:"Más resultados",stat3_num:"98%",stat3_label:"Satisfacción",precio_titulo:"Invertí hoy",precio_valor:"97",precio_moneda:"USD",precio_nota:"Acceso completo",garantia:"7 días de garantía",urgencia:"Precio especial limitado",faq:[{q:"¿Cómo funciona?",a:"Simple y efectivo."},{q:"¿Cuándo veo resultados?",a:"En los primeros días."},{q:"¿Y si no funciona?",a:"Garantía completa."}],cierre_titulo:"Tu mejor decisión empieza hoy",cierre_sub:"Únete a los que ya tienen resultados",cta_final:"Empezar ahora →"};
      }
      setLandingData(data);
      setPhase("result");
    } catch {
      setErr("Error al generar. Intentá de nuevo.");setPhase("form");
    }
  };

  const buildHTML=(data)=>{
    const sc=schemeMap[colorScheme]||schemeMap["Oscuro (dark)"];
    const nombre=form.producto||"Tu Producto";
    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${nombre} — ${data.hero_titulo}</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:${sc.bg};color:${sc.t1};font-family:'DM Sans',sans-serif;overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${sc.bd}}
.container{max-width:960px;margin:0 auto;padding:0 24px}
nav{position:fixed;top:0;left:0;right:0;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:${sc.bg}E8;backdrop-filter:blur(16px);border-bottom:1px solid ${sc.bd};z-index:100}
.nav-brand{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;letter-spacing:-.04em}
.nav-cta{padding:9px 22px;background:${sc.acc};color:white;border:none;border-radius:8px;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;text-decoration:none}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:100px 24px 80px;position:relative;overflow:hidden}
.hero-orb{position:absolute;width:700px;height:500px;background:radial-gradient(ellipse,${sc.acc}30 0%,transparent 65%);top:0;left:50%;transform:translateX(-50%);pointer-events:none}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(${sc.bd}55 1px,transparent 1px),linear-gradient(90deg,${sc.bd}55 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 80% 60% at 50% 0%,black,transparent)}
.badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;background:${sc.acc}18;border:1px solid ${sc.acc}44;border-radius:100px;font-size:12px;font-weight:600;color:${sc.acc};letter-spacing:.08em;text-transform:uppercase;margin-bottom:32px}
.dot{width:6px;height:6px;background:${sc.acc};border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
h1{font-family:'Syne',sans-serif;font-size:clamp(38px,7vw,80px);font-weight:800;line-height:.93;letter-spacing:-.05em;margin-bottom:24px}
.acc{color:${sc.acc}}
.hero-sub{font-size:clamp(15px,2vw,18px);font-weight:300;color:${sc.t2};max-width:520px;margin:0 auto 44px;line-height:1.65}
.cta-main{padding:18px 44px;background:${sc.acc};color:white;border:none;border-radius:12px;font-family:'Syne',sans-serif;font-size:17px;font-weight:800;cursor:pointer;transition:all .25s;letter-spacing:-.02em;display:inline-block;text-decoration:none}
.cta-main:hover{opacity:.9;transform:translateY(-2px)}
.cta-sub{display:block;margin-top:12px;font-size:12px;color:${sc.t2}}
.stats{display:flex;justify-content:center;gap:48px;padding:48px 24px;border-top:1px solid ${sc.bd};border-bottom:1px solid ${sc.bd};flex-wrap:wrap;background:${sc.s1}}
.stat{text-align:center}
.stat-n{font-family:'Syne',sans-serif;font-size:44px;font-weight:800;letter-spacing:-.04em;color:${sc.acc}}
.stat-l{font-size:12px;color:${sc.t2};margin-top:4px;text-transform:uppercase;letter-spacing:.06em}
section{padding:80px 0}
.sec-tag{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:${sc.acc};font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.sec-tag::before{content:'';width:20px;height:1px;background:${sc.acc}}
h2{font-family:'Syne',sans-serif;font-size:clamp(28px,4vw,52px);font-weight:800;letter-spacing:-.04em;line-height:.95;margin-bottom:16px}
.sec-sub{font-size:16px;color:${sc.t2};line-height:1.65;font-weight:300;max-width:540px;margin-bottom:48px}
.problem-box{background:${sc.s1};border:1px solid ${sc.bd};border-radius:16px;padding:40px;max-width:680px}
.problem-title{font-family:'Syne',sans-serif;font-size:24px;font-weight:700;letter-spacing:-.03em;margin-bottom:16px}
.problem-text{font-size:15px;color:${sc.t2};line-height:1.75}
.benefits{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:580px){.benefits{grid-template-columns:1fr}}
.ben-card{padding:28px;background:${sc.s1};border:1px solid ${sc.bd};border-radius:14px;transition:border-color .2s}
.ben-card:hover{border-color:${sc.acc}44}
.ben-icon{font-size:28px;margin-bottom:14px}
.ben-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;letter-spacing:-.02em;margin-bottom:8px}
.ben-desc{font-size:13px;color:${sc.t2};line-height:1.6}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media(max-width:700px){.testi-grid{grid-template-columns:1fr}}
.testi{background:${sc.s1};border:1px solid ${sc.bd};border-radius:14px;padding:24px}
.stars{color:#FFB800;font-size:13px;margin-bottom:12px}
.testi-text{font-size:14px;color:${sc.t1};line-height:1.7;font-style:italic;font-weight:300;margin-bottom:16px}
.testi-author{display:flex;align-items:center;gap:10px}
.avatar{width:36px;height:36px;border-radius:50%;background:${sc.acc}22;border:1px solid ${sc.acc}44;display:flex;align-items:center;justify-content:center;font-size:18px}
.author-name{font-size:13px;font-weight:600}
.author-role{font-size:11px;color:${sc.t2}}
.price-box{background:${sc.s1};border:2px solid ${sc.acc};border-radius:20px;padding:48px;text-align:center;max-width:480px;margin:0 auto;position:relative}
.price-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:${sc.acc};color:white;font-size:12px;font-weight:700;padding:4px 16px;border-radius:100px;white-space:nowrap;font-family:'Syne',sans-serif}
.price-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:700;margin-bottom:24px;letter-spacing:-.02em}
.price-val{font-family:'Syne',sans-serif;font-size:80px;font-weight:800;letter-spacing:-.06em;line-height:1;margin-bottom:4px}
.price-val sup{font-size:28px;vertical-align:super;font-family:'DM Sans',sans-serif;font-weight:300}
.price-curr{font-size:14px;color:${sc.t2};margin-bottom:8px}
.price-nota{font-size:13px;color:${sc.t2};margin-bottom:28px}
.btn-price{width:100%;padding:18px;background:${sc.acc};color:white;border:none;border-radius:12px;font-family:'Syne',sans-serif;font-size:17px;font-weight:800;cursor:pointer;transition:all .2s;letter-spacing:-.01em}
.btn-price:hover{opacity:.9;transform:translateY(-1px)}
.guarantee{margin-top:20px;font-size:13px;color:${sc.t2}}
.urgency{margin-top:8px;font-size:12px;color:${sc.acc};font-weight:600}
.faq{max-width:640px;margin:0 auto}
.faq-item{border-bottom:1px solid ${sc.bd};padding:20px 0}
.faq-q{font-size:15px;font-weight:500;margin-bottom:10px}
.faq-a{font-size:14px;color:${sc.t2};line-height:1.7}
.final{text-align:center;padding:100px 24px;background:${sc.s1};border-top:1px solid ${sc.bd}}
.final h2{margin-bottom:16px}
.final-sub{font-size:16px;color:${sc.t2};max-width:440px;margin:0 auto 40px;line-height:1.65;font-weight:300}
footer{padding:32px 24px;border-top:1px solid ${sc.bd};text-align:center;font-size:12px;color:${sc.t2}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.fade-in{animation:fadeUp .6s ease both}
</style>
</head>
<body>
<nav><div class="nav-brand">${nombre}</div><a class="nav-cta" href="#precio">${data.hero_cta}</a></nav>
<div class="hero"><div class="hero-grid"></div><div class="hero-orb"></div>
<div class="container fade-in">
<div class="badge"><div class="dot"></div>${form.canal||"Campaña"} · ${form.objetivo||"Resultados"}</div>
<h1>${data.hero_titulo.split(" ").slice(0,-2).join(" ")} <span class="acc">${data.hero_titulo.split(" ").slice(-2).join(" ")}</span></h1>
<p class="hero-sub">${data.hero_subtitulo}</p>
<a class="cta-main" href="#precio">${data.hero_cta}</a>
<span class="cta-sub">${data.hero_subcta}</span>
</div></div>
<div class="stats">
<div class="stat"><div class="stat-n">${data.stat1_num}</div><div class="stat-l">${data.stat1_label}</div></div>
<div class="stat"><div class="stat-n">${data.stat2_num}</div><div class="stat-l">${data.stat2_label}</div></div>
<div class="stat"><div class="stat-n">${data.stat3_num}</div><div class="stat-l">${data.stat3_label}</div></div>
</div>
<section><div class="container"><div class="sec-tag">El problema</div>
<div class="problem-box"><div class="problem-title">${data.problema_titulo}</div><div class="problem-text">${data.problema_texto}</div></div>
</div></section>
<section style="background:${sc.s1};border-top:1px solid ${sc.bd};border-bottom:1px solid ${sc.bd}"><div class="container">
<div class="sec-tag">La solución</div><h2>${data.solucion_titulo.split(" ").slice(0,-2).join(" ")} <span class="acc">${data.solucion_titulo.split(" ").slice(-2).join(" ")}</span></h2>
<p class="sec-sub">${data.solucion_texto}</p>
</div></section>
<section><div class="container"><div class="sec-tag">Beneficios</div><h2>Todo lo que <span class="acc">obtenés.</span></h2>
<p class="sec-sub">Cada detalle pensado para darte resultados reales.</p>
<div class="benefits">${data.beneficios.map(b=>`<div class="ben-card"><div class="ben-icon">${b.icono}</div><div class="ben-title">${b.titulo}</div><div class="ben-desc">${b.desc}</div></div>`).join("")}</div>
</div></section>
<section style="background:${sc.s1};border-top:1px solid ${sc.bd};border-bottom:1px solid ${sc.bd}"><div class="container">
<div class="sec-tag">Testimonios</div><h2>Resultados <span class="acc">reales.</span></h2>
<p class="sec-sub">Personas como vos que ya lo probaron.</p>
<div class="testi-grid">${data.testimonios.map(t=>`<div class="testi"><div class="stars">★★★★★</div><div class="testi-text">"${t.texto}"</div><div class="testi-author"><div class="avatar">${t.avatar}</div><div><div class="author-name">${t.nombre}</div><div class="author-role">${t.rol}</div></div></div></div>`).join("")}</div>
</div></section>
<section id="precio"><div class="container" style="text-align:center">
<div class="sec-tag" style="justify-content:center">Precio</div><h2 style="margin-bottom:48px">Invertí una vez.<br/><span class="acc">Ganás para siempre.</span></h2>
<div class="price-box"><div class="price-badge">🔥 Oferta de lanzamiento</div>
<div class="price-title">${data.precio_titulo}</div>
<div class="price-val"><sup>$</sup>${data.precio_valor}</div>
<div class="price-curr">${data.precio_moneda} · pago único</div>
<div class="price-nota">${data.precio_nota}</div>
<button class="btn-price" onclick="alert('Redirigir a tu link de MercadoPago aquí')">${data.cta_final}</button>
<div class="guarantee">🛡️ ${data.garantia}</div>
<div class="urgency">⚡ ${data.urgencia}</div>
</div></div></section>
<section style="background:${sc.s1};border-top:1px solid ${sc.bd};border-bottom:1px solid ${sc.bd}"><div class="container">
<div class="sec-tag">FAQ</div><h2 style="margin-bottom:40px">Preguntas <span class="acc">frecuentes.</span></h2>
<div class="faq">${data.faq.map(f=>`<div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`).join("")}</div>
</div></section>
<div class="final"><div class="container">
<h2>${data.cierre_titulo.split(" ").slice(0,-2).join(" ")} <span class="acc">${data.cierre_titulo.split(" ").slice(-2).join(" ")}</span></h2>
<p class="final-sub">${data.cierre_sub}</p>
<a class="cta-main" href="#precio">${data.cta_final}</a>
<span class="cta-sub" style="display:block;margin-top:12px;font-size:12px;color:${sc.t2}">🛡️ ${data.garantia} · ⚡ Acceso inmediato</span>
</div></div>
<footer>© ${new Date().getFullYear()} ${nombre}. Todos los derechos reservados. · ${data.urgencia}</footer>
</body></html>`;
  };

  const downloadLanding=()=>{
    if(!landingData)return;
    const html=buildHTML(landingData);
    const blob=new Blob([html],{type:"text/html"});
    const u=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=u;a.download=`landing-${form.producto?.replace(/\s+/g,"-")||"producto"}.html`;
    a.click();URL.revokeObjectURL(u);
  };

  const openPreview=()=>{
    if(!landingData)return;
    const html=buildHTML(landingData);
    const blob=new Blob([html],{type:"text/html"});
    window.open(URL.createObjectURL(blob),"_blank");
  };

  if(phase==="gen") return (
    <div className="gen-wrap">
      <div className="spin"/>
      <div className="gen-title">Construyendo landing HTML…</div>
      <div className="gen-step">Diseñando copy + estructura visual para {form.producto||"tu producto"}…</div>
      <div className="stream-box">{stream||"Iniciando…"}<span className="cursor"/></div>
    </div>
  );

  if(phase==="result"&&landingData){
    const sc=schemeMap[colorScheme]||schemeMap["Oscuro (dark)"];
    return (
      <div className="inner" style={{maxWidth:860}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:24}}>
          <div><div className="pg-title">Landing HTML lista ✓</div><div className="pg-sub">{form.producto} · {colorScheme} · {tipoNegocio}</div></div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button className="btn-sm" onClick={openPreview}>👁 Vista previa</button>
            <button className="btn-prime" onClick={downloadLanding}>⬇ Descargar .html</button>
            <button className="btn-sm" onClick={()=>setPhase("form")}>← Nueva</button>
          </div>
        </div>
        <div style={{background:sc.bg,border:`2px solid ${sc.acc}44`,borderRadius:14,overflow:"hidden",marginBottom:20}}>
          <div style={{background:sc.s1,padding:"10px 16px",borderBottom:`1px solid ${sc.bd}`,display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:10,height:10,borderRadius:"50%",background:"#FF5F57"}}/>
            <div style={{width:10,height:10,borderRadius:"50%",background:"#FEBC2E"}}/>
            <div style={{width:10,height:10,borderRadius:"50%",background:"#28C840"}}/>
            <span style={{fontSize:11,color:T.t2,marginLeft:8,fontFamily:"monospace"}}>{form.producto?.toLowerCase().replace(/\s+/g,"-")||"producto"}.html</span>
            <button onClick={openPreview} style={{marginLeft:"auto",fontSize:11,padding:"3px 10px",background:sc.acc,color:"white",border:"none",borderRadius:6,cursor:"pointer"}}>Abrir en nueva pestaña →</button>
          </div>
          <div style={{padding:20,maxHeight:380,overflowY:"auto"}}>
            {[
              {label:"🚀 HERO",v:`"${landingData.hero_titulo}" — ${landingData.hero_subtitulo}`},
              {label:"❗ PROBLEMA",v:landingData.problema_titulo},
              {label:"✅ SOLUCIÓN",v:landingData.solucion_titulo},
              {label:"⚡ BENEFICIOS",v:landingData.beneficios.map(b=>`${b.icono} ${b.titulo}`).join(" · ")},
              {label:"💬 TESTIMONIOS",v:`"${landingData.testimonios[0]?.texto}" — ${landingData.testimonios[0]?.nombre}`},
              {label:"💰 PRECIO",v:`${landingData.precio_moneda} $${landingData.precio_valor} · ${landingData.garantia}`},
              {label:"❓ FAQ",v:landingData.faq.map(f=>f.q).join(" · ")},
              {label:"🔥 CIERRE",v:landingData.cierre_titulo},
            ].map((s,i)=>(
              <div key={i} style={{padding:"10px 0",borderBottom:`1px solid ${sc.bd}`}}>
                <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:".08em",color:sc.acc,fontWeight:700,marginBottom:3}}>{s.label}</div>
                <div style={{fontSize:13,color:sc.t1,lineHeight:1.5,marginBottom:6}}>{s.v}</div>
                <CopyBtn text={s.v}/>
              </div>
            ))}
          </div>
        </div>
        <div style={{padding:14,background:T.grnD,border:`1px solid ${T.grn}33`,borderRadius:10,fontSize:13,color:T.t2,lineHeight:1.8,marginBottom:16}}>
          <strong style={{color:T.grn}}>✓ Cómo publicar tu landing en 5 minutos:</strong><br/>
          1. <strong style={{color:T.t1}}>Descargar .html</strong> → ya tiene diseño completo<br/>
          2. Ir a <strong style={{color:T.t1}}>netlify.com</strong> → drag & drop del archivo → URL gratis al instante<br/>
          3. Buscar <code style={{color:T.acc}}>alert('Redirigir...')</code> en el código → reemplazar con tu link de MercadoPago<br/>
          4. Para Shopify: crear producto digital y pegar el copy de cada sección
        </div>
        <button className="new-btn" onClick={()=>setPhase("form")}>+ Nueva landing</button>
      </div>
    );
  }

  return (
    <div className="inner">
      <div className="pg-head"><div className="pg-title">Landing page HTML completa</div><div className="pg-sub">Diseño visual real descargable. No copy en texto — una página web con diseño, tipografía y colores lista para publicar o entregar al cliente.</div></div>
      {err&&<div className="err-box">⚠ {err}</div>}
      {!form.producto&&<div className="err-box">💡 Completá primero los datos en el módulo <strong>Campaña</strong>.</div>}
      <div className="field"><label className="lbl">Tipo de negocio</label><div className="chips">{TIPOS_N.map(t=><button key={t} className={`chip${tipoNegocio===t?" on":""}`} onClick={()=>setTipoNegocio(t)}>{t}</button>)}</div></div>
      <div className="field"><label className="lbl">Paleta de colores</label><div className="chips">{COLORES.map(c=><button key={c} className={`chip${colorScheme===c?" on":""}`} onClick={()=>setColorScheme(c)}>{c}</button>)}</div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28}}>
        <div style={{padding:16,background:T.s1,border:`1px solid ${T.border}`,borderRadius:10}}>
          <div style={{fontWeight:700,color:T.t1,fontSize:13,marginBottom:10}}>📄 Secciones incluidas</div>
          {["Hero + badge + CTA","3 estadísticas de impacto","Sección de problema/dolor","Sección de solución","4 beneficios en cards","3 testimonios con estrellas","Pricing con garantía+urgencia","FAQ con 3 objeciones","CTA final de cierre"].map(f=>(
            <div key={f} style={{fontSize:12,color:T.t2,padding:"3px 0",display:"flex",gap:6}}><span style={{color:T.grn}}>✓</span>{f}</div>
          ))}
        </div>
        <div style={{padding:16,background:T.s1,border:`1px solid ${T.border}`,borderRadius:10}}>
          <div style={{fontWeight:700,color:T.t1,fontSize:13,marginBottom:10}}>🎨 Diseño incluido</div>
          {["Archivo HTML listo para abrir","Tipografía Syne + DM Sans","Paleta elegida aplicada","Nav fijo con CTA","Grilla + orbe decorativo","Responsive (mobile ready)","Animación de entrada","Lista para Netlify/Shopify"].map(f=>(
            <div key={f} style={{fontSize:12,color:T.t2,padding:"3px 0",display:"flex",gap:6}}><span style={{color:T.yel}}>★</span>{f}</div>
          ))}
        </div>
      </div>
      <button className="btn-run" onClick={run}>🌐 Generar landing HTML completa</button>
    </div>
  );
}

/* ═══ MAIN APP ═══════════════════════════════════════════ */
export default function App() {
  const [screen,setScreen]=useState("home"); // home | app
  const [mod,setMod]=useState("campaign");
  const [showPricing,setShowPricing]=useState(false);
  const [form,setForm]=useState({producto:"",descripcion:"",objetivo:"",canal:"",tono:"",audiencia:"",diferenciador:""});

  const MODULES=[
    {id:"campaign",icon:"⚡",label:"Campaña"},
    {id:"images",icon:"🎨",label:"Imágenes"},
    {id:"video",icon:"🎬",label:"Videos"},
    {id:"landing",icon:"🌐",label:"Landing"},
  ];

  return (
    <>
      <style>{G}</style>
      <div style={{minHeight:"100vh",background:T.bg}}>
        <div className="grid-bg"/>
        <div className="orb"/>

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo" onClick={()=>setScreen("home")}>
            <div className="logo-mark">A</div>
            AVANTI
          </div>
          <div className="nav-right">
            <span className="nav-badge">Beta</span>
            {screen==="home"
              ? <button className="nav-cta" onClick={()=>setScreen("app")}>Empezar gratis →</button>
              : <button className="nav-cta" onClick={()=>setShowPricing(true)}>💳 Obtener acceso</button>
            }
          </div>
        </nav>

        {/* PRICING MODAL */}
        {showPricing&&<PricingModal onClose={()=>setShowPricing(false)}/>}

        {/* ── HOME SCREEN ── */}
        {screen==="home"&&(
          <div className="screen">
            <div className="hero">
              <div className="hero-badge"><div className="dot-live"/>IA para Performance Marketing</div>
              <h1 className="hero-h">
                Creá anuncios<br/>
                <span className="acc">que venden.</span><br/>
                <span className="dim">En 60 segundos.</span>
              </h1>
              <p className="hero-p">
                Hooks, copies, scripts de video, prompts de imagen y landing page completa. Todo con IA. Todo listo para publicar.
              </p>
              <div className="hero-btns">
                <button className="btn-hero" onClick={()=>setScreen("app")}>Crear mi primera campaña →</button>
                <button className="btn-ghost" onClick={()=>setShowPricing(true)}>Ver precio →</button>
              </div>
            </div>

            {/* FEATURE GRID */}
            <div className="features">
              {[
                {icon:"⚡",name:"Campaña completa",desc:"Hooks, copies, CTAs y script de video generados con IA en segundos.",mod:"campaign"},
                {icon:"🎨",name:"Prompts de imágenes",desc:"Prompts ultra-detallados para Midjourney, DALL·E y Stable Diffusion.",mod:"images"},
                {icon:"🎬",name:"Storyboard de video",desc:"Escena por escena para Reels, Stories y video ads de cualquier duración.",mod:"video"},
                {icon:"🌐",name:"Landing persuasiva",desc:"Copy completo: hero, beneficios, testimonios, oferta y CTA.",mod:"landing"},
              ].map(f=>(
                <div className="feat-card" key={f.id} onClick={()=>{setMod(f.mod);setScreen("app");}}>
                  <div className="feat-icon">{f.icon}</div>
                  <div className="feat-name">{f.name}</div>
                  <div className="feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>

            {/* SOCIAL PROOF */}
            <div className="proof-strip">
              {[
                {num:"4",label:"Módulos integrados"},
                {num:"60s",label:"Tiempo de generación"},
                {num:"3x",label:"Más conversión"},
                {num:"$37",label:"Pago único"},
              ].map(p=>(
                <div className="proof-item" key={p.label}>
                  <div className="proof-num">{p.num}</div>
                  <div className="proof-label">{p.label}</div>
                </div>
              ))}
            </div>

            {/* BOTTOM CTA */}
            <div style={{textAlign:"center",padding:"60px 24px 80px",borderTop:`1px solid ${T.border}`}}>
              <div style={{fontFamily:"Clash Display",fontSize:"clamp(28px,5vw,52px)",fontWeight:700,letterSpacing:"-.03em",marginBottom:16,lineHeight:1.1}}>
                Tu campaña completa.<br/><span style={{color:T.acc}}>Lista para publicar.</span>
              </div>
              <div style={{fontSize:15,color:T.t2,marginBottom:36,maxWidth:480,margin:"0 auto 36px"}}>
                Pagás una vez. Usás para siempre. Sin suscripciones.
              </div>
              <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
                <button className="btn-hero" onClick={()=>setShowPricing(true)}>Obtener AVANTI — $27 USD →</button>
                <button className="btn-ghost" onClick={()=>setScreen("app")}>Probar gratis primero</button>
              </div>
            </div>
          </div>
        )}

        {/* ── APP SCREEN ── */}
        {screen==="app"&&(
          <div className="screen">
            <div className="mod-nav">
              {MODULES.map(m=>(
                <button key={m.id} className={`mod-tab${mod===m.id?" active":""}`} onClick={()=>setMod(m.id)}>
                  <span className="mod-tab-icon">{m.icon}</span>{m.label}
                </button>
              ))}
              <button className="mod-tab" style={{marginLeft:"auto",color:T.acc}} onClick={()=>setShowPricing(true)}>
                💳 Precio
              </button>
            </div>
            {mod==="campaign"&&<CampaignModule form={form} setForm={setForm}/>}
            {mod==="images"&&<ImageModule form={form}/>}
            {mod==="video"&&<VideoModule form={form}/>}
            {mod==="landing"&&<LandingModule form={form}/>}
          </div>
        )}
      </div>
    </>
  );
}
