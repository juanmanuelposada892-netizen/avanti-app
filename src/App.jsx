import { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   AVANTI v3 — Credits + DALL·E + MercadoPago API
═══════════════════════════════════════════════════════════ */

const T = {
  bg:"#080810",s1:"#0E0E1A",s2:"#13131F",
  border:"#1C1C2E",borderB:"#252538",
  acc:"#FF4D00",accD:"#FF4D0018",accG:"#FF4D0040",
  grn:"#00E87A",grnD:"#00E87A18",
  blu:"#4F8EF7",bluD:"#4F8EF718",
  yel:"#FFB800",yelD:"#FFB80018",
  t1:"#EEEEFF",t2:"#7777AA",t3:"#3A3A55",
};

const COSTS = { campaign:2, image:1, video:3, landing:2 };
const PLAN_CREDITS = 100;
const MP_ACCESS_TOKEN = "TU_ACCESS_TOKEN_AQUI";
const MP_LINK_PAGO = "https://mpago.la/2k82Fb7";
const DALLE_API_KEY = import.meta.env.VITE_DALLE_KEY||"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";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Epilogue:ital,wght@0,300;0,400;0,500;1,300&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:${T.bg};color:${T.t1};font-family:'Epilogue',sans-serif;min-height:100vh;overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${T.bg}}::-webkit-scrollbar-thumb{background:${T.border};border-radius:4px}
.grid-bg{position:fixed;inset:0;background-image:linear-gradient(${T.border}44 1px,transparent 1px),linear-gradient(90deg,${T.border}44 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;mask-image:radial-gradient(ellipse 80% 60% at 50% 0%,black,transparent)}
.nav{position:fixed;top:0;left:0;right:0;height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;background:${T.bg}E0;backdrop-filter:blur(16px);border-bottom:1px solid ${T.border};z-index:200}
.nav-logo{font-family:'Clash Display',sans-serif;font-size:22px;font-weight:700;letter-spacing:-0.04em;cursor:pointer;display:flex;align-items:center;gap:6px}
.logo-mark{width:28px;height:28px;background:${T.acc};border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:white}
.nav-right{display:flex;align-items:center;gap:10px}
.nav-cta{font-size:13px;padding:8px 18px;border-radius:8px;background:${T.acc};color:white;font-weight:600;border:none;cursor:pointer;font-family:'Epilogue',sans-serif;transition:all .2s}
.nav-cta:hover{background:#FF6020;transform:translateY(-1px)}
.credit-badge{display:flex;align-items:center;gap:6px;padding:6px 12px;background:${T.s1};border:1px solid ${T.border};border-radius:100px;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s}
.credit-badge:hover{border-color:${T.acc}44}
.credit-dot{width:6px;height:6px;border-radius:50%;background:${T.grn}}
.credit-dot.low{background:${T.yel}}
.credit-dot.empty{background:#FF4444}
.squirrel-logo{animation:squirrelBob 2s ease-in-out infinite;transform-origin:center bottom;display:inline-flex}
@keyframes squirrelBob{0%,100%{transform:rotate(0deg) translateY(0)}20%{transform:rotate(-6deg) translateY(-3px)}40%{transform:rotate(4deg) translateY(0)}60%{transform:rotate(-3deg) translateY(-2px)}80%{transform:rotate(2deg) translateY(0)}}
.screen{min-height:100vh;padding-top:60px;position:relative;z-index:1}
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
.features{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:${T.border};border-top:1px solid ${T.border}}
.feat-card{padding:32px 28px;background:${T.bg};transition:background .2s;cursor:pointer}
.feat-card:hover{background:${T.s1}}
.feat-icon{font-size:28px;margin-bottom:16px}
.feat-name{font-family:'Clash Display',sans-serif;font-size:16px;font-weight:600;margin-bottom:8px;letter-spacing:-.02em}
.feat-desc{font-size:13px;color:${T.t2};line-height:1.6}
.proof-strip{display:flex;justify-content:center;gap:48px;padding:48px 24px;border-top:1px solid ${T.border};flex-wrap:wrap}
.proof-item{text-align:center}
.proof-num{font-family:'Clash Display',sans-serif;font-size:36px;font-weight:700;letter-spacing:-.03em}
.proof-label{font-size:12px;color:${T.t2};margin-top:4px;text-transform:uppercase;letter-spacing:.06em}
.mod-nav{position:sticky;top:60px;z-index:150;background:${T.bg}F0;backdrop-filter:blur(12px);border-bottom:1px solid ${T.border};display:flex;overflow-x:auto;scrollbar-width:none}
.mod-nav::-webkit-scrollbar{display:none}
.mod-tab{padding:0 20px;height:48px;display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;color:${T.t2};border-bottom:2px solid transparent;cursor:pointer;transition:all .2s;white-space:nowrap;border:none;background:transparent;font-family:'Epilogue',sans-serif}
.mod-tab:hover{color:${T.t1}}
.mod-tab.active{color:${T.acc};border-bottom:2px solid ${T.acc}}
.cost-tag{display:inline-flex;align-items:center;gap:4px;font-size:11px;padding:3px 8px;background:${T.yelD};border:1px solid ${T.yel}33;border-radius:100px;color:${T.yel};font-weight:600}
.inner{max-width:780px;margin:0 auto;padding:40px 24px 100px;animation:fadeUp .3s ease both}
.pg-title{font-family:'Clash Display',sans-serif;font-size:28px;font-weight:700;letter-spacing:-.03em;margin-bottom:8px}
.pg-sub{font-size:14px;color:${T.t2};line-height:1.6}
.field{margin-bottom:22px}
.lbl{display:block;font-size:11px;font-weight:500;color:${T.t2};margin-bottom:8px;letter-spacing:.07em;text-transform:uppercase}
.inp,.txta{width:100%;padding:13px 16px;background:${T.s1};border:1px solid ${T.border};border-radius:9px;color:${T.t1};font-family:'Epilogue',sans-serif;font-size:14px;outline:none;transition:border-color .2s,box-shadow .2s}
.inp:focus,.txta:focus{border-color:${T.acc}55;box-shadow:0 0 0 3px ${T.accD}}
.txta{min-height:90px;resize:vertical;line-height:1.6}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{padding:7px 15px;border-radius:100px;border:1px solid ${T.border};background:${T.s1};color:${T.t2};font-size:13px;cursor:pointer;transition:all .2s;font-family:'Epilogue',sans-serif}
.chip.on{border-color:${T.acc};background:${T.accD};color:${T.acc}}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:520px){.row2{grid-template-columns:1fr}}
.btn-run{width:100%;padding:17px;background:${T.acc};color:white;border:none;border-radius:10px;font-family:'Clash Display',sans-serif;font-size:16px;font-weight:600;cursor:pointer;transition:all .2s;margin-top:8px;display:flex;align-items:center;justify-content:center;gap:10px;letter-spacing:-.01em}
.btn-run:hover:not(:disabled){background:#FF6020;box-shadow:0 16px 40px ${T.accG};transform:translateY(-1px)}
.btn-run:disabled{opacity:.4;cursor:not-allowed}
.btn-sm{padding:9px 16px;border-radius:8px;border:1px solid ${T.border};background:${T.s1};color:${T.t2};font-family:'Epilogue',sans-serif;font-size:12px;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
.btn-sm:hover{border-color:${T.acc}44;color:${T.t1}}
.btn-sm.ok{border-color:${T.grn};color:${T.grn};background:${T.grnD}}
.btn-prime{padding:9px 16px;border-radius:8px;border:none;background:${T.acc};color:white;font-family:'Epilogue',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s}
.gen-wrap{display:flex;flex-direction:column;align-items:center;padding:80px 24px;text-align:center;max-width:700px;margin:0 auto}
.spin{width:56px;height:56px;border:2px solid ${T.border};border-top-color:${T.acc};border-radius:50%;animation:spin .8s linear infinite;margin-bottom:28px}
@keyframes spin{to{transform:rotate(360deg)}}
.gen-title{font-family:'Clash Display',sans-serif;font-size:22px;font-weight:700;margin-bottom:10px;letter-spacing:-.02em}
.gen-step{font-size:13px;color:${T.t2};min-height:20px;margin-bottom:32px}
.stream-box{width:100%;padding:18px;background:${T.s1};border:1px solid ${T.border};border-radius:12px;text-align:left;font-size:12px;color:${T.t2};line-height:1.75;min-height:130px;white-space:pre-wrap;word-break:break-word;max-height:220px;overflow-y:auto}
.cursor{display:inline-block;width:2px;height:13px;background:${T.acc};margin-left:2px;animation:blink 1s infinite;vertical-align:middle}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.score-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px}
@media(max-width:560px){.score-row{grid-template-columns:1fr}}
.score-c{padding:18px;background:${T.s1};border:1px solid ${T.border};border-radius:12px;text-align:center}
.s-icon{font-size:20px;margin-bottom:8px}
.s-lbl{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:${T.t3};margin-bottom:4px}
.s-val{font-family:'Clash Display',sans-serif;font-size:15px;font-weight:600}
.s-val.acc{color:${T.acc}}.s-val.grn{color:${T.grn}}.s-val.blu{color:${T.blu}}
.res-sec{background:${T.s1};border:1px solid ${T.border};border-radius:12px;margin-bottom:14px;overflow:hidden}
.res-head{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid ${T.border};cursor:pointer}
.res-head-l{display:flex;align-items:center;gap:10px}
.res-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px}
.ri-o{background:${T.accD}}.ri-g{background:${T.grnD}}.ri-b{background:${T.bluD}}
.res-name{font-family:'Clash Display',sans-serif;font-size:14px;font-weight:600}
.res-tag{font-size:10px;padding:3px 10px;border-radius:100px;font-weight:500}
.rt-o{background:${T.accD};color:${T.acc}}.rt-g{background:${T.grnD};color:${T.grn}}.rt-b{background:${T.bluD};color:${T.blu}}
.res-body{padding:18px}
.copy-row{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid ${T.border}}
.copy-row:last-child{border-bottom:none;padding-bottom:0}
.c-lbl{font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:${T.t3};margin-bottom:5px}
.c-txt{font-size:13px;line-height:1.65;color:${T.t1};flex:1}
.new-btn{width:100%;padding:13px;background:transparent;border:1px dashed ${T.border};border-radius:10px;color:${T.t2};font-family:'Epilogue',sans-serif;font-size:13px;cursor:pointer;transition:all .2s;margin-top:20px}
.new-btn:hover{border-color:${T.acc}44;color:${T.t1}}
.err-box{padding:14px 18px;background:#FF000010;border:1px solid #FF000030;border-radius:8px;color:#FF7070;font-size:13px;margin-bottom:20px}
.credit-bar{background:${T.s2};border:1px solid ${T.border};border-radius:12px;padding:20px;margin-bottom:20px}
.credit-progress{width:100%;height:6px;background:${T.border};border-radius:100px;overflow:hidden;margin:12px 0 8px}
.credit-fill{height:100%;border-radius:100px;transition:width .5s ease}
.upsell-banner{background:linear-gradient(135deg,${T.s2},${T.bg});border:1px solid ${T.yel}33;border-radius:12px;padding:20px;margin-bottom:16px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.overlay{position:fixed;inset:0;background:#000000CC;z-index:500;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.price-modal{background:${T.s1};border:1px solid ${T.borderB};border-radius:20px;max-width:560px;width:100%;animation:slideUp .3s ease;max-height:90vh;overflow-y:auto}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
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
.prompt-card{background:${T.s1};border:1px solid ${T.border};border-radius:12px;padding:18px;margin-bottom:12px;position:relative;overflow:hidden}
.prompt-text{font-size:12px;line-height:1.8;color:${T.t2};font-family:monospace;background:${T.bg};padding:10px 14px;border-radius:8px;border:1px solid ${T.border}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
.orb{position:fixed;width:700px;height:700px;background:radial-gradient(circle,${T.accG} 0%,transparent 70%);border-radius:50%;top:-300px;left:50%;transform:translateX(-50%);pointer-events:none;z-index:0}

/* ── MOBILE ── */
@media(max-width:600px){
  .nav{padding:0 16px}
  .nav-logo{font-size:18px}
  .inner{padding:24px 16px 80px}
  .pg-title{font-size:22px}
  .hero{padding:60px 16px 40px}
  .hero-btns{flex-direction:column;align-items:stretch}
  .btn-hero,.btn-ghost{text-align:center;padding:16px 24px}
  .features{grid-template-columns:1fr 1fr}
  .proof-strip{gap:24px}
  .proof-num{font-size:28px}
  .score-row{grid-template-columns:1fr 1fr}
  .mod-tab{padding:0 14px;font-size:12px}
  .gen-wrap{padding:40px 16px}
  .upsell-banner{flex-direction:column;gap:12px}
  .how-steps{grid-template-columns:1fr}
  .chips{gap:6px}
  .chip{padding:6px 12px;font-size:12px}
  .credit-bar{padding:14px}
  .price-modal{border-radius:16px}
  .tour-card{padding:24px}
}
@media(max-width:400px){
  .features{grid-template-columns:1fr}
  .score-row{grid-template-columns:1fr}
}

/* ── HOW IT WORKS ── */
.how-section{padding:80px 24px;border-top:1px solid ${T.border};background:${T.s1}}
.how-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:860px;margin:40px auto 0;position:relative}
@media(max-width:640px){.how-steps{grid-template-columns:1fr}}
.how-step{padding:28px;background:${T.bg};border:1px solid ${T.border};border-radius:14px;position:relative;transition:border-color .2s}
.how-step:hover{border-color:${T.acc}44}
.how-num{width:36px;height:36px;border-radius:10px;background:${T.accD};border:1px solid ${T.acc}44;color:${T.acc};font-family:'Clash Display',sans-serif;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
.how-icon{font-size:28px;margin-bottom:12px}
.how-title{font-family:'Clash Display',sans-serif;font-size:16px;font-weight:700;margin-bottom:8px;letter-spacing:-.02em}
.how-desc{font-size:13px;color:${T.t2};line-height:1.65}
.how-arrow{position:absolute;top:50%;right:-20px;transform:translateY(-50%);color:${T.t3};font-size:18px;z-index:1}
@media(max-width:640px){.how-arrow{display:none}}

/* ── TOUR OVERLAY ── */
.tour-overlay{position:fixed;inset:0;background:#000000AA;z-index:900;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .3s ease}
.tour-card{background:${T.s1};border:1px solid ${T.borderB};border-radius:20px;max-width:480px;width:100%;padding:32px;animation:slideUp .3s ease;position:relative}
.tour-step-indicator{display:flex;gap:6px;margin-bottom:24px}
.tour-dot{width:8px;height:8px;border-radius:50%;background:${T.border};transition:background .2s}
.tour-dot.active{background:${T.acc};width:24px;border-radius:100px}
.tour-icon-big{font-size:48px;margin-bottom:16px}
.tour-title{font-family:'Clash Display',sans-serif;font-size:22px;font-weight:700;letter-spacing:-.03em;margin-bottom:10px}
.tour-desc{font-size:14px;color:${T.t2};line-height:1.7;margin-bottom:24px}
.tour-btns{display:flex;gap:10px;justify-content:space-between;align-items:center}
.tour-next{padding:"12px 24px";background:${T.acc};color:white;border:none;border-radius:9px;font-family:'Clash Display',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s}
.tour-skip{font-size:12px;color:${T.t3};cursor:pointer;background:none;border:none;font-family:'Epilogue',sans-serif}
`;

const OBJ=["Ventas directas","Leads / Registros","Awareness","Tráfico web","App installs"];
const CAN=["Meta Ads","TikTok Ads","Google Ads","YouTube","LinkedIn"];
const TON=["Urgente / FOMO","Emocional","Lógico / Racional","Inspirador","Directo / Agresivo"];
const AUD=["18–24","25–34","35–44","45–54","55+"];
const VID_FORMATS=["Reel 15 seg","Reel 30 seg","Story 15 seg","Video 60 seg","Ad largo 2 min"];

/* ═══ SQUIRREL ════════════════════════════════════════════ */
function SquirrelLogo({size=44}){
  return(
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="squirrel-logo">
      <ellipse cx="12" cy="38" rx="10" ry="8" fill="#C4622D" opacity=".95" transform="rotate(-25 12 38)"/>
      <ellipse cx="11" cy="37" rx="7" ry="5.5" fill="#E07840" opacity=".85" transform="rotate(-25 11 37)"/>
      <ellipse cx="10" cy="36" rx="4" ry="3" fill="#F09060" opacity=".6" transform="rotate(-25 10 36)"/>
      <ellipse cx="32" cy="42" rx="12" ry="10" fill="#C4622D"/>
      <ellipse cx="32" cy="44" rx="8" ry="7" fill="#E8A87C"/>
      <circle cx="40" cy="26" r="12" fill="#C4622D"/>
      <ellipse cx="44" cy="30" rx="4" ry="3.5" fill="#E8A87C"/>
      <ellipse cx="32" cy="17" rx="3.5" ry="5" fill="#C4622D" transform="rotate(-20 32 17)"/>
      <ellipse cx="32" cy="17" rx="1.8" ry="3" fill="#F0B8A0" transform="rotate(-20 32 17)"/>
      <ellipse cx="44" cy="15" rx="3" ry="5" fill="#C4622D" transform="rotate(20 44 15)"/>
      <ellipse cx="44" cy="15" rx="1.5" ry="3" fill="#F0B8A0" transform="rotate(20 44 15)"/>
      <circle cx="44" cy="24" r="3" fill="#1A0A00"/>
      <circle cx="45.2" cy="23" r="1" fill="white"/>
      <circle cx="44.3" cy="24.2" r="1.5" fill="#0A0000"/>
      <ellipse cx="49" cy="29" rx="1.8" ry="1.2" fill="#8B3A2A"/>
      <path d="M44 37 Q48 40 46 44" stroke="#C4622D" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M41 38 Q45 41 43 45" stroke="#C4622D" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="46" cy="48" rx="5" ry="6" fill="#C49A2D"/>
      <line x1="46" y1="43" x2="46" y2="50" stroke="#A07820" strokeWidth="1" opacity=".5"/>
      <ellipse cx="46" cy="43" rx="6" ry="2.5" fill="#7A5C1E"/>
      <rect x="44.5" y="39.5" width="3" height="4" rx="1.5" fill="#7A5C1E"/>
      <ellipse cx="26" cy="51" rx="4" ry="2.5" fill="#A84E20" transform="rotate(-10 26 51)"/>
      <ellipse cx="38" cy="52" rx="4" ry="2.5" fill="#A84E20" transform="rotate(10 38 52)"/>
    </svg>
  );
}

/* ═══ HELPERS ════════════════════════════════════════════ */
function parseAd(txt){
  const ex=l=>{const m=txt.match(new RegExp(`${l}[:\\-]?\\s*([^\\n]+)`,"i"));return m?m[1].trim().replace(/\*+/g,""):""};
  const exl=l=>{const m=txt.match(new RegExp(`${l}[^\\n]*\\n([\\s\\S]*?)(?=\\n[A-Z#*]|$)`,"i"));if(!m)return[];return m[1].split("\n").map(x=>x.replace(/^[\-\*\d\.\s]+/,"").trim()).filter(x=>x.length>8)};
  return{angulo:ex("ángulo ganador")||ex("angulo"),tipoCreativo:ex("tipo creativo"),nivel:ex("nivel de conversión")||ex("nivel de conversion"),hooks:exl("HOOKS")||exl("hooks"),copies:exl("COPIES")||exl("copies")||exl("copy"),ctas:exl("CTAs")||exl("CTA"),script:(()=>{const m=txt.match(/SCRIPT[\s\S]*?:\s*\n([\s\S]*?)(?=\n[A-Z#]|$)/i);return m?m[1].trim():""})(),landingHero:ex("hero")||ex("titular"),landingBeneficios:exl("beneficio")||exl("LANDING"),raw:txt};
}

function CopyBtn({text,label="Copiar"}){
  const [ok,setOk]=useState(false);
  return <button className={`btn-sm${ok?" ok":""}`} onClick={()=>{navigator.clipboard.writeText(text).catch(()=>{});setOk(true);setTimeout(()=>setOk(false),2000)}}>{ok?"✓ Copiado":label}</button>;
}

function ResSection({icon,ic,name,tag,tc,items}){
  const [open,setOpen]=useState(true);
  if(!items||!items.length)return null;
  return(<div className="res-sec"><div className="res-head" onClick={()=>setOpen(o=>!o)}><div className="res-head-l"><div className={`res-icon ri-${ic}`}>{icon}</div><span className="res-name">{name}</span></div><div style={{display:"flex",alignItems:"center",gap:10}}><span className={`res-tag rt-${tc}`}>{tag}</span><span style={{color:T.t3,fontSize:11}}>{open?"▲":"▼"}</span></div></div>{open&&<div className="res-body">{items.map((it,i)=><div className="copy-row" key={i}><div style={{flex:1}}><div className="c-lbl">Opción {i+1}</div><div className="c-txt">{it}</div></div><CopyBtn text={it}/></div>)}</div>}</div>);
}

async function callAI(prompt,onChunk){
  const key=import.meta.env.VITE_ANTHROPIC_KEY||"";
  const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "x-api-key":key,
      "anthropic-version":"2023-06-01",
      "anthropic-dangerous-direct-browser-access":"true"
    },
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,stream:true,messages:[{role:"user",content:prompt}]})
  });
  if(!res.ok)throw new Error(`API ${res.status}`);
  const reader=res.body.getReader();const dec=new TextDecoder();let full="";
  while(true){const{done,value}=await reader.read();if(done)break;const lines=dec.decode(value).split("\n");for(const ln of lines){if(!ln.startsWith("data: "))continue;const d=ln.slice(6).trim();if(d==="[DONE]")continue;try{const p=JSON.parse(d);const t=p?.delta?.text||"";if(t){full+=t;onChunk(full);}}catch{}}}
  return full;
}

/* ═══ CREDIT BAR ═════════════════════════════════════════ */
function CreditBar({credits,onBuy}){
  const pct=Math.max(0,Math.round((credits/PLAN_CREDITS)*100));
  const color=pct>50?T.grn:pct>20?T.yel:"#FF4444";
  return(
    <div className="credit-bar">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
        <div style={{fontSize:13,fontFamily:"'Clash Display',sans-serif",fontWeight:700}}>Tus créditos</div>
        <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:24,fontWeight:700,color}}>{credits}<span style={{fontSize:12,color:T.t2,fontFamily:"Epilogue, sans-serif",fontWeight:400}}> / {PLAN_CREDITS}</span></div>
      </div>
      <div className="credit-progress"><div className="credit-fill" style={{width:`${pct}%`,background:color}}/></div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          {Object.entries(COSTS).map(([k,v])=><span key={k} style={{fontSize:11,color:T.t2,display:"flex",alignItems:"center",gap:4}}><span style={{color:T.yel}}>◆</span>{k==="campaign"?"Campaña":k==="image"?"Imagen":k==="video"?"Video":"Landing"}: {v}</span>)}
        </div>
        {credits<30&&<button onClick={onBuy} style={{padding:"6px 14px",background:T.acc,color:"white",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Epilogue, sans-serif"}}>+ Recargar</button>}
      </div>
    </div>
  );
}

function UpsellBanner({credits,onBuy}){
  // Solo mostrar si tiene créditos pero pocos (entre 1 y 20)
  // Si tiene 0 nunca pagó → el paywall se encarga
  if(credits===0||credits>20)return null;
  return(
    <div className="upsell-banner">
      <div style={{fontSize:32,flexShrink:0}}>⚡</div>
      <div style={{flex:1}}>
        <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:15,fontWeight:700,marginBottom:4}}>Solo te quedan {credits} créditos</div>
        <div style={{fontSize:12,color:T.t2}}>Recargá para no interrumpir tu flujo</div>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <button onClick={()=>onBuy(50,5)} style={{padding:"8px 14px",background:T.s1,border:`1px solid ${T.border}`,borderRadius:8,color:T.t2,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Epilogue, sans-serif"}}>+50 — $5</button>
        <button onClick={()=>onBuy(100,9)} style={{padding:"8px 14px",background:T.acc,border:"none",borderRadius:8,color:"white",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Epilogue, sans-serif"}}>+100 — $9 🔥</button>
      </div>
    </div>
  );
}

/* ═══ MERCADOPAGO ════════════════════════════════════════ */
async function createMPPayment({title,price,credits}){
  // Usamos link de pago directo de MercadoPago
  // Cuando el cliente pague, volvé a la app y cargá los créditos manualmente
  // o activá credenciales de producción para flujo automático
  window.open(MP_LINK_PAGO, "_blank");
}

/* ═══ PRICING MODAL ══════════════════════════════════════ */
function PricingModal({onClose,onPurchase}){
  const [loading,setLoading]=useState(false);
  const buy=async(price,credits,title)=>{
    setLoading(true);
    await createMPPayment({title,price,credits});
    setLoading(false);
  };
  return(
    <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="price-modal">
        <div style={{padding:"28px 28px 0",textAlign:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 14px",background:T.yelD,border:`1px solid ${T.yel}44`,borderRadius:100,fontSize:11,color:T.yel,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",marginBottom:16}}>🔥 Sistema de créditos</div>
          <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:24,fontWeight:700,letterSpacing:"-.03em",marginBottom:8}}>Controlá tu uso de IA</div>
          <div style={{fontSize:14,color:T.t2,marginBottom:24}}>Comprás créditos, los usás cuando querés. Sin vencimiento.</div>
        </div>
        <div style={{padding:"0 28px",display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
          {/* Plan principal */}
          <div style={{background:`linear-gradient(135deg,${T.s2},${T.bg})`,border:`2px solid ${T.acc}`,borderRadius:16,padding:24,position:"relative"}}>
            <div style={{position:"absolute",top:-12,left:20,background:T.acc,color:"white",fontSize:11,fontWeight:700,padding:"3px 12px",borderRadius:100,fontFamily:"'Clash Display',sans-serif"}}>⚡ MÁS POPULAR</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
              <div><div style={{fontFamily:"'Clash Display',sans-serif",fontSize:18,fontWeight:700}}>AVANTI PRO</div><div style={{fontSize:13,color:T.t2,marginTop:2}}>100 créditos incluidos</div></div>
              <div style={{textAlign:"right"}}><div style={{fontFamily:"'Clash Display',sans-serif",fontSize:36,fontWeight:700,lineHeight:1}}>$37</div><div style={{fontSize:12,color:T.t2}}>USD · pago único</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:14}}>
              {["100 créditos IA","Campaña completa","Prompts de imágenes","Storyboard de video","Landing HTML","Sin vencimiento"].map(f=><div key={f} style={{fontSize:12,color:T.t2,display:"flex",gap:5,alignItems:"center"}}><span style={{color:T.grn}}>✓</span>{f}</div>)}
            </div>
            <button onClick={()=>buy(37,100,"AVANTI PRO — 100 créditos")} disabled={loading} style={{width:"100%",padding:14,background:T.acc,color:"white",border:"none",borderRadius:10,fontFamily:"'Clash Display',sans-serif",fontSize:15,fontWeight:700,cursor:"pointer",opacity:loading?.6:1}}>
              {loading?"Procesando...":"🔓 Obtener AVANTI PRO — $37 USD →"}
            </button>
          </div>
          {/* Recargas */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            {[{credits:50,price:5,label:"Starter"},{credits:100,price:9,label:"Power 🔥"},{credits:300,price:20,label:"Pro Max ⚡"}].map(p=>(
              <div key={p.credits} style={{background:T.s1,border:`1px solid ${p.credits===300?T.yel+"66":T.border}`,borderRadius:12,padding:16,textAlign:"center",position:"relative"}}>
                {p.credits===300&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:T.yel,color:"#000",fontSize:10,fontWeight:700,padding:"2px 10px",borderRadius:100,whiteSpace:"nowrap"}}>MEJOR VALOR</div>}
                <div style={{fontSize:11,color:p.credits===300?T.yel:T.t2,marginBottom:4,textTransform:"uppercase",letterSpacing:".07em",fontWeight:600}}>{p.label}</div>
                <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:26,fontWeight:700,marginBottom:2}}>${p.price}</div>
                <div style={{fontSize:12,color:T.t2,marginBottom:10}}>{p.credits} créditos</div>
                <div style={{fontSize:10,color:T.grn,marginBottom:10}}>${(p.price/p.credits*100).toFixed(1)}¢ por crédito</div>
                <button onClick={()=>buy(p.price,p.credits,`AVANTI — ${p.credits} créditos`)} style={{width:"100%",padding:"8px",background:p.credits===300?T.yelD:T.s2,border:`1px solid ${p.credits===300?T.yel+"44":T.border}`,borderRadius:8,color:p.credits===300?T.yel:T.t1,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Epilogue, sans-serif"}}>Recargar</button>
              </div>
            ))}
          </div>
        </div>
        <div style={{padding:"0 28px 28px",display:"flex",flexDirection:"column",gap:10}}>
          <button onClick={onClose} style={{width:"100%",padding:12,background:"transparent",border:`1px solid ${T.border}`,borderRadius:10,color:T.t2,fontFamily:"Epilogue, sans-serif",fontSize:13,cursor:"pointer"}}>Seguir explorando</button>
          <div style={{textAlign:"center",fontSize:11,color:T.t3}}>🔒 Garantía 7 días · ⚡ Acceso inmediato · 🌎 MercadoPago</div>
        </div>
      </div>
    </div>
  );
}

/* ═══ CAMPAIGN MODULE ════════════════════════════════════ */
function CampaignModule({form,setForm,credits,useCredits,onBuy}){
  const [phase,setPhase]=useState("form");
  const [stream,setStream]=useState("");
  const [step,setStep]=useState("");
  const [result,setResult]=useState(null);
  const [err,setErr]=useState("");
  const [unlocked,setUnlocked]=useState(()=>{if(typeof window==="undefined")return false;const p=new URLSearchParams(window.location.search);return p.get("paid")==="true"||p.get("status")==="approved";});
  const streamRef=useRef("");
  const up=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const tog=(k,v)=>setForm(f=>({...f,[k]:f[k]===v?"":v}));
  const valid=form.producto&&form.descripcion&&form.objetivo&&form.canal&&form.tono;

  const run=async()=>{
    if(credits<COSTS.campaign){setErr(`Necesitás ${COSTS.campaign} créditos. Tenés ${credits}.`);return;}
    setErr("");setStream("");streamRef.current="";setPhase("gen");useCredits(COSTS.campaign);
    const steps=["Analizando mercado…","Identificando ángulo ganador…","Creando hooks y copies…","Generando scripts…","Optimizando…"];
    let si=0;setStep(steps[0]);const iv=setInterval(()=>{si=(si+1)%steps.length;setStep(steps[si]);},2200);
    const prompt=`Experto en performance marketing. Campaña completa:
PRODUCTO: ${form.producto}. DESC: ${form.descripcion}
OBJ: ${form.objetivo}. CANAL: ${form.canal}. TONO: ${form.tono}
AUD: ${form.audiencia||"General"}. DIFER: ${form.diferenciador||"calidad"}

## ANÁLISIS ESTRATÉGICO
Ángulo ganador: [ángulo más poderoso]
Tipo creativo recomendado: [tipo]
Nivel de conversión estimado: [Alto/Medio-Alto/Medio]

## HOOKS (primeros 3 segundos)
- [hook 1]
- [hook 2]
- [hook 3]

## COPIES
- [copy 1]
- [copy 2]
- [copy 3]

## CTAs
- [CTA 1]
- [CTA 2]
- [CTA 3]

## SCRIPT (30-60 seg)
[script completo]

## LANDING PAGE
Hero: [titular]
Beneficios:
- [ben 1]
- [ben 2]
- [ben 3]`;
    try{const txt=await callAI(prompt,t=>{streamRef.current=t;setStream(t);});clearInterval(iv);setResult(parseAd(txt));setPhase("result");}
    catch{clearInterval(iv);setErr("Error al generar.");setPhase("form");}
  };

  const copyAll=()=>navigator.clipboard.writeText(result?.raw||"").catch(()=>{});
  const dl=()=>{if(!result)return;const b=new Blob([result.raw],{type:"text/plain"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download=`avanti-${form.producto.replace(/\s+/g,"-")}.txt`;a.click();URL.revokeObjectURL(u);};

  const LockedItem=({label,preview})=>(
    <div style={{position:"relative",marginBottom:1}}>
      <div className="copy-row" style={{filter:"blur(4px)",userSelect:"none",pointerEvents:"none",opacity:.6}}>
        <div style={{flex:1}}><div className="c-lbl">{label}</div><div className="c-txt">{preview}</div></div>
        <div className="btn-sm">Copiar</div>
      </div>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span style={{background:T.border,border:`1px solid ${T.borderB}`,borderRadius:8,padding:"4px 12px",fontSize:11,color:T.t2}}>🔒 Bloqueado</span>
      </div>
    </div>
  );

  const PaywallBanner=()=>(
    <div style={{background:`linear-gradient(135deg,${T.s2},${T.bg})`,border:`1px solid ${T.acc}55`,borderRadius:16,marginBottom:16,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-40,left:"50%",transform:"translateX(-50%)",width:300,height:80,background:`radial-gradient(ellipse,${T.accG},transparent)`,pointerEvents:"none"}}/>
      <div style={{padding:28,position:"relative"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><div style={{width:40,height:40,background:T.acc,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🔥</div><div><div style={{fontFamily:"'Clash Display',sans-serif",fontSize:18,fontWeight:700}}>Tu campaña ya está lista.</div><div style={{fontSize:13,color:T.t2,marginTop:2}}>Desbloqueá el resto para usar todos los resultados.</div></div></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20,padding:14,background:T.bg,borderRadius:10,border:`1px solid ${T.border}`}}>
          {["⚡ Hooks 2 y 3","✍️ Copies 2 y 3","🔥 3 CTAs","🎙 Script de video","🌐 Landing page","📋 Descargar todo","🎨 Módulo imágenes","🎬 Storyboard"].map((f,i)=><div key={i} style={{fontSize:12,color:T.t1,display:"flex",gap:8}}><span>{f}</span><span style={{color:T.grn,marginLeft:"auto"}}>✓</span></div>)}
        </div>
        <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"stretch"}}>
          <div style={{padding:"14px 18px",background:T.bg,border:`1px solid ${T.border}`,borderRadius:12}}>
            <div style={{fontSize:10,color:T.t2,textTransform:"uppercase",letterSpacing:".07em",marginBottom:4}}>Pago único</div>
            <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:34,fontWeight:700,lineHeight:1}}>$37</div>
            <div style={{fontSize:11,color:T.t3,textDecoration:"line-through"}}>$67 USD</div>
          </div>
          <div style={{flex:1,minWidth:180,display:"flex",flexDirection:"column",gap:8}}>
            <button onClick={onBuy} style={{flex:1,padding:"14px 20px",background:T.acc,color:"white",border:"none",borderRadius:10,fontFamily:"'Clash Display',sans-serif",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:`0 8px 32px ${T.accG}`}}
              onMouseOver={e=>{e.currentTarget.style.background="#FF6020";e.currentTarget.style.transform="translateY(-2px)"}}
              onMouseOut={e=>{e.currentTarget.style.background=T.acc;e.currentTarget.style.transform="none"}}
            >🔓 Desbloquear por $37 USD →</button>
            <div style={{fontSize:11,color:T.t3,display:"flex",justifyContent:"center",gap:12}}>
              <span>🛡️ Garantía 7 días</span><span>⚡ Inmediato</span>
            </div>
          </div>
        </div>
        <div style={{marginTop:14,padding:"10px 14px",background:T.accD,border:`1px solid ${T.acc}22`,borderRadius:8,fontSize:12,color:T.t2,lineHeight:1.7}}>
          <strong style={{color:T.acc}}>¿Cómo funciona?</strong> Pagás → MercadoPago → te redirige con todo desbloqueado y 100 créditos.
        </div>
      </div>
    </div>
  );

  if(phase==="gen")return<div className="gen-wrap"><div className="spin"/><div className="gen-title">Creando campaña…</div><div className="gen-step">{step}</div><div className="stream-box">{stream||"Iniciando…"}<span className="cursor"/></div></div>;

  if(phase==="result"&&result)return(
    <div className="inner" style={{maxWidth:860}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:24}}>
        <div><div className="pg-title">Campaña generada ✓</div><div className="pg-sub">{form.producto} · {form.canal} · {form.objetivo}</div></div>
        {unlocked&&<div style={{display:"flex",gap:8}}><button className="btn-sm" onClick={copyAll}>📋 Copiar todo</button><button className="btn-sm" onClick={dl}>⬇ Descargar</button></div>}
      </div>
      <div className="score-row">
        <div className="score-c"><div className="s-icon">🎯</div><div className="s-lbl">Ángulo</div><div className="s-val acc" style={{fontSize:13,fontFamily:"Epilogue"}}>{result.angulo||"Ver análisis"}</div></div>
        <div className="score-c"><div className="s-icon">🎬</div><div className="s-lbl">Tipo creativo</div><div className="s-val blu" style={{fontSize:13,fontFamily:"Epilogue"}}>{result.tipoCreativo||"Ver análisis"}</div></div>
        <div className="score-c"><div className="s-icon">📈</div><div className="s-lbl">Conversión</div><div className="s-val grn">{result.nivel||"Alto"}</div></div>
      </div>
      <div className="res-sec">
        <div className="res-head"><div className="res-head-l"><div className="res-icon ri-o">⚡</div><span className="res-name">Hooks</span></div><div style={{display:"flex",gap:10}}><span className="res-tag rt-o">Primeros 3 seg</span>{!unlocked&&<span style={{fontSize:11,color:T.acc,fontWeight:600}}>1/3 gratis</span>}</div></div>
        <div className="res-body">
          {result.hooks[0]&&<div className="copy-row"><div style={{flex:1}}><div className="c-lbl">Hook 1 — Gratis ✓</div><div className="c-txt">{result.hooks[0]}</div></div><CopyBtn text={result.hooks[0]}/></div>}
          {unlocked?result.hooks.slice(1).map((h,i)=><div className="copy-row" key={i}><div style={{flex:1}}><div className="c-lbl">Hook {i+2}</div><div className="c-txt">{h}</div></div><CopyBtn text={h}/></div>):result.hooks.slice(1).map((h,i)=><LockedItem key={i} label={`Hook ${i+2}`} preview={h?.slice(0,30)+"…"}/>)}
        </div>
      </div>
      <div className="res-sec">
        <div className="res-head"><div className="res-head-l"><div className="res-icon ri-g">✍️</div><span className="res-name">Copies</span></div><div style={{display:"flex",gap:10}}><span className="res-tag rt-g">Texto del anuncio</span>{!unlocked&&<span style={{fontSize:11,color:T.grn,fontWeight:600}}>1/3 gratis</span>}</div></div>
        <div className="res-body">
          {result.copies[0]&&<div className="copy-row"><div style={{flex:1}}><div className="c-lbl">Copy 1 — Gratis ✓</div><div className="c-txt">{result.copies[0]}</div></div><CopyBtn text={result.copies[0]}/></div>}
          {unlocked?result.copies.slice(1).map((c,i)=><div className="copy-row" key={i}><div style={{flex:1}}><div className="c-lbl">Copy {i+2}</div><div className="c-txt">{c}</div></div><CopyBtn text={c}/></div>):result.copies.slice(1).map((c,i)=><LockedItem key={i} label={`Copy ${i+2}`} preview={c?.slice(0,30)+"…"}/>)}
        </div>
      </div>
      {!unlocked?<PaywallBanner/>:(
        <>
          <ResSection icon="🔥" ic="o" name="CTAs" tag="Llamada a acción" tc="o" items={result.ctas}/>
          {result.script&&<div className="res-sec"><div className="res-head"><div className="res-head-l"><div className="res-icon ri-b">🎙</div><span className="res-name">Script de video</span></div><div style={{display:"flex",gap:10}}><span className="res-tag rt-b">30–60 seg</span><CopyBtn text={result.script}/></div></div><div className="res-body"><div style={{fontSize:13,lineHeight:1.8,color:T.t2,whiteSpace:"pre-wrap"}}>{result.script}</div></div></div>}
          {result.landingHero&&<div className="res-sec"><div className="res-head"><div className="res-head-l"><div className="res-icon ri-g">🌐</div><span className="res-name">Landing page</span></div><span className="res-tag rt-g">Texto sugerido</span></div><div className="res-body"><div className="copy-row"><div style={{flex:1}}><div className="c-lbl">Titular hero</div><div className="c-txt" style={{fontSize:16,fontFamily:"'Clash Display',sans-serif",fontWeight:700}}>{result.landingHero}</div></div><CopyBtn text={result.landingHero}/></div>{result.landingBeneficios.map((b,i)=><div className="copy-row" key={i}><div style={{flex:1}}><div className="c-lbl">Beneficio {i+1}</div><div className="c-txt">{b}</div></div><CopyBtn text={b}/></div>)}</div></div>}
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",background:T.grnD,border:`1px solid ${T.grn}33`,borderRadius:10,marginBottom:16,fontSize:13}}>
            <span style={{fontSize:20}}>🎉</span><div style={{flex:1,color:T.t2}}><strong style={{color:T.grn}}>Campaña completa desbloqueada.</strong></div>
            <button className="btn-sm" onClick={copyAll}>📋 Copiar</button><button className="btn-sm" onClick={dl}>⬇ Descargar</button>
          </div>
        </>
      )}
      <button className="new-btn" onClick={()=>{setResult(null);setStream("");setPhase("form");setUnlocked(false);}}>+ Crear nueva campaña</button>
    </div>
  );

  return(
    <div className="inner">
      <div style={{marginBottom:32}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><div className="pg-title">Crear campaña</div><span className="cost-tag">◆ {COSTS.campaign} créditos</span></div>
        <div className="pg-sub">Completá los datos y la IA genera hooks, copies, scripts y landing.</div>
      </div>
      <UpsellBanner credits={credits} onBuy={(c,p)=>createMPPayment({title:`AVANTI — ${c} créditos`,price:p,credits:c})}/>
      {err&&<div className="err-box">⚠ {err}</div>}
      {credits===0&&(
        <div style={{padding:20,background:`linear-gradient(135deg,${T.s2},${T.bg})`,border:`1px solid ${T.acc}55`,borderRadius:14,marginBottom:20,textAlign:"center"}}>
          <div style={{fontSize:32,marginBottom:12}}>🔒</div>
          <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:18,fontWeight:700,marginBottom:8}}>Necesitás AVANTI PRO para generar</div>
          <div style={{fontSize:13,color:T.t2,marginBottom:16}}>Comprá acceso por $37 USD y recibís 100 créditos para usar todos los módulos.</div>
          <button onClick={onBuy} style={{padding:"14px 32px",background:T.acc,color:"white",border:"none",borderRadius:10,fontFamily:"'Clash Display',sans-serif",fontSize:15,fontWeight:700,cursor:"pointer"}}>
            🔓 Obtener AVANTI PRO — $37 USD →
          </button>
          <div style={{fontSize:11,color:T.t3,marginTop:10}}>🛡️ Garantía 7 días · ⚡ Acceso inmediato</div>
        </div>
      )}
      <div className="row2">
        <div className="field"><label className="lbl">Producto / Servicio *</label><input className="inp" placeholder="ej: Curso de inversión" value={form.producto} onChange={up("producto")}/></div>
        <div className="field"><label className="lbl">Diferenciador clave</label><input className="inp" placeholder="ej: resultados en 30 días" value={form.diferenciador||""} onChange={up("diferenciador")}/></div>
      </div>
      <div className="field"><label className="lbl">Descripción *</label><textarea className="txta" placeholder="¿Qué hace? ¿Qué problema resuelve?" value={form.descripcion} onChange={up("descripcion")}/></div>
      <div className="field"><label className="lbl">Objetivo *</label><div className="chips">{OBJ.map(o=><button key={o} className={`chip${form.objetivo===o?" on":""}`} onClick={()=>tog("objetivo",o)}>{o}</button>)}</div></div>
      <div className="field"><label className="lbl">Canal *</label><div className="chips">{CAN.map(c=><button key={c} className={`chip${form.canal===c?" on":""}`} onClick={()=>tog("canal",c)}>{c}</button>)}</div></div>
      <div className="field"><label className="lbl">Tono *</label><div className="chips">{TON.map(t=><button key={t} className={`chip${form.tono===t?" on":""}`} onClick={()=>tog("tono",t)}>{t}</button>)}</div></div>
      <div className="field"><label className="lbl">Audiencia</label><div className="chips">{AUD.map(a=><button key={a} className={`chip${form.audiencia===a?" on":""}`} onClick={()=>tog("audiencia",a)}>{a}</button>)}</div></div>
      <button className="btn-run" onClick={run} disabled={!valid||credits<COSTS.campaign}>
        {credits===0?"🔒 Comprá acceso para generar":credits<COSTS.campaign?`Sin créditos (necesitás ${COSTS.campaign})`:valid?"⚡ Generar campaña completa":"Completá los campos *"}
      </button>
    </div>
  );
}

/* ═══ IMAGE MODULE ════════════════════════════════════════ */
function ImageModule({form,credits,useCredits,onBuy}){
  const [style,setStyle]=useState("Fotografía publicitaria");
  const [format,setFormat]=useState("Post cuadrado 1:1");
  const [phase,setPhase]=useState("form");
  const [prompts,setPrompts]=useState([]);
  const [images,setImages]=useState([]);
  const [stream,setStream]=useState("");
  const [err,setErr]=useState("");
  const STYLES=["Fotografía publicitaria","Lifestyle / Real","Minimalista","Bold / Gráfico","Dark / Premium"];
  const FORMATS=["Post cuadrado 1:1","Story vertical 9:16","Banner 16:9","Carrusel 1:1"];
  const TOTAL=COSTS.image*4;

  const generateDALLE=async(prompt,size)=>{
    const res=await fetch("https://api.openai.com/v1/images/generations",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${DALLE_API_KEY}`},
      body:JSON.stringify({model:"dall-e-3",prompt,n:1,size,quality:"standard",response_format:"url"})
    });
    const data=await res.json();
    if(data.error)throw new Error(data.error.message);
    return data.data[0].url;
  };

  const dlImage=async(url,name)=>{
    try{const res=await fetch(url);const blob=await res.blob();const u=URL.createObjectURL(blob);const a=document.createElement("a");a.href=u;a.download=`${name}.png`;a.click();URL.revokeObjectURL(u);}
    catch{window.open(url,"_blank");}
  };

  const run=async()=>{
    if(!form.producto){setErr("Completá primero los datos en Campaña.");return;}
    if(credits<TOTAL){setErr(`Necesitás ${TOTAL} créditos. Tenés ${credits}.`);return;}
    setErr("");setImages([]);setPrompts([]);setStream("");setPhase("gen");useCredits(TOTAL);
    const sizeMap={"Post cuadrado 1:1":"1024x1024","Story vertical 9:16":"1024x1792","Banner 16:9":"1792x1024","Carrusel 1:1":"1024x1024"};
    const dalleSize=sizeMap[format]||"1024x1024";
    const promptIA=`Director de arte experto en publicidad digital.
Producto: "${form.producto}". ${form.descripcion||""}
Objetivo: ${form.objetivo||"ventas"}. Canal: ${form.canal||"Meta Ads"}. Tono: ${form.tono||"Emocional"}.
Estilo: ${style}. Formato: ${format}.

4 prompts en inglés para DALL-E 3. Formato EXACTO:
PROMPT1: [prompt ultra-detallado, sin texto ni logos en la imagen]
CONCEPT1: [concepto en español, 5 palabras]
PROMPT2: [prompt 2]
CONCEPT2: [concepto 2]
PROMPT3: [prompt 3]
CONCEPT3: [concepto 3]
PROMPT4: [prompt 4]
CONCEPT4: [concepto 4]

Sin texto ni palabras visibles en las imágenes generadas.`;
    let parsed=[];
    try{
      let full="";
      await callAI(promptIA,t=>{full=t;setStream(t);});
      for(let i=1;i<=4;i++){
        const pm=full.match(new RegExp(`PROMPT${i}:\s*([^\n]+)`,"i"));
        const cm=full.match(new RegExp(`CONCEPT${i}:\s*([^\n]+)`,"i"));
        if(pm)parsed.push({prompt:pm[1].trim(),concept:cm?cm[1].trim():`Variación ${i}`,num:i,url:null,loading:true,error:false});
      }
      if(!parsed.length)throw new Error("Sin prompts");
    }catch{setErr("Error generando prompts.");setPhase("form");return;}

    setPhase("generating_images");
    setImages([...parsed]);

    for(let i=0;i<parsed.length;i++){
      try{
        const url=await generateDALLE(parsed[i].prompt,dalleSize);
        parsed[i]={...parsed[i],url,loading:false};
        setImages([...parsed]);
      }catch(e){
        parsed[i]={...parsed[i],loading:false,error:true};
        setImages([...parsed]);
      }
    }
    setPrompts([...parsed]);
    setPhase("result");
  };

  const dlPrompts=()=>{const txt=prompts.map(p=>`=== ${p.concept} ===\n${p.prompt}`).join("\n\n");const b=new Blob([txt],{type:"text/plain"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download=`prompts-${form.producto?.replace(/\s+/g,"-")||"avanti"}.txt`;a.click();URL.revokeObjectURL(u);};

  if(phase==="gen")return<div className="gen-wrap"><div className="spin"/><div className="gen-title">Diseñando conceptos…</div><div className="gen-step">Creando prompts para {form.producto}…</div><div className="stream-box">{stream||"Iniciando…"}<span className="cursor"/></div></div>;

  if(phase==="generating_images")return(
    <div className="gen-wrap">
      <div className="gen-title">Generando con DALL·E 3 🎨</div>
      <div className="gen-step" style={{marginBottom:24}}>~15 segundos por imagen…</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,width:"100%",maxWidth:400}}>
        {[0,1,2,3].map(i=>{
          const img=images[i];
          return(
            <div key={i} style={{aspectRatio:"1",background:T.s1,borderRadius:12,border:`1px solid ${img?.url?T.grn:img?.error?"#FF4444":T.border}`,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
              {img?.url?<img src={img.url} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>
              :img?.loading?<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}><div className="spin" style={{width:28,height:28}}/><span style={{fontSize:10,color:T.t2}}>Generando…</span></div>
              :img?.error?<span style={{fontSize:11,color:"#FF4444"}}>❌ Error</span>
              :<span style={{fontSize:24,color:T.t3}}>⏳</span>}
            </div>
          );
        })}
      </div>
      <div style={{marginTop:16,fontSize:12,color:T.t2}}>{images.filter(i=>i?.url).length} de 4 listas</div>
    </div>
  );

  if(phase==="result"&&prompts.length)return(
    <div className="inner" style={{maxWidth:860}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:24}}>
        <div><div className="pg-title">Imágenes generadas ✓</div><div className="pg-sub">DALL·E 3 · {style} · {format}</div></div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn-sm" onClick={dlPrompts}>📋 Prompts</button>
          <button className="btn-sm" onClick={()=>{setPhase("form");setImages([]);setPrompts([]);}}>← Nueva</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        {prompts.map((p,i)=>{
          const colors=["#FF4D00","#FFB800","#00E87A","#4F8EF7"];
          const labels=["Emocional","Urgencia","Social","Hero"];
          return(
            <div key={i} style={{background:T.s1,border:`1px solid ${p.url?colors[i]+"44":T.border}`,borderRadius:14,overflow:"hidden"}}>
              <div style={{aspectRatio:"1",background:T.s2,position:"relative",overflow:"hidden"}}>
                {p.url
                  ?<img src={p.url} style={{width:"100%",height:"100%",objectFit:"cover"}} alt={p.concept}/>
                  :<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#FF4444",fontSize:13}}>❌ No generada</div>
                }
                {p.url&&(
                  <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,#00000099)",padding:"20px 12px 10px",display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                    <span style={{fontSize:11,color:"white",fontWeight:600}}>{labels[i]}</span>
                    <button onClick={()=>dlImage(p.url,`avanti-${(form.producto||"img").replace(/\s+/g,"-")}-${i+1}`)} style={{padding:"5px 10px",background:"white",color:"#000",border:"none",borderRadius:6,fontSize:11,fontWeight:700,cursor:"pointer"}}>⬇</button>
                  </div>
                )}
              </div>
              <div style={{padding:12}}>
                <div style={{fontSize:11,color:colors[i],fontWeight:700,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>{p.concept}</div>
                <div style={{fontSize:11,color:T.t2,lineHeight:1.5,fontFamily:"monospace",background:T.bg,padding:"6px 8px",borderRadius:6,maxHeight:56,overflow:"hidden"}}>{p.prompt?.slice(0,100)}…</div>
                <div style={{display:"flex",gap:6,marginTop:8}}>
                  {p.url&&<button onClick={()=>window.open(p.url,"_blank")} style={{flex:1,padding:"6px",background:T.s2,border:`1px solid ${T.border}`,borderRadius:6,color:T.t2,fontSize:11,cursor:"pointer",fontFamily:"Epilogue,sans-serif"}}>↗ Ver full</button>}
                  <CopyBtn text={p.prompt} label="📋"/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{padding:14,background:T.grnD,border:`1px solid ${T.grn}33`,borderRadius:10,fontSize:13,color:T.t2,marginBottom:16}}>
        <strong style={{color:T.grn}}>✓ Listas para usar.</strong> Descargalas y subillas directo a Meta Ads, TikTok o Canva.
      </div>
      <button className="new-btn" onClick={()=>{setPhase("form");setImages([]);setPrompts([]);}}>+ Generar nuevas imágenes</button>
    </div>
  );

  return(
    <div className="inner">
      <div style={{marginBottom:32}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><div className="pg-title">Generador de imágenes</div><span className="cost-tag">◆ {TOTAL} créditos</span></div>
        <div className="pg-sub">4 imágenes reales con DALL·E 3. Listas para descargar y usar en tus ads.</div>
      </div>
      <UpsellBanner credits={credits} onBuy={(c,p)=>createMPPayment({title:`AVANTI — ${c} créditos`,price:p,credits:c})}/>
      {err&&<div className="err-box">⚠ {err}</div>}
      {!form.producto&&<div className="err-box">💡 Completá primero los datos en Campaña.</div>}
      <div className="field"><label className="lbl">Estilo visual</label><div className="chips">{STYLES.map(s=><button key={s} className={`chip${style===s?" on":""}`} onClick={()=>setStyle(s)}>{s}</button>)}</div></div>
      <div className="field"><label className="lbl">Formato</label><div className="chips">{FORMATS.map(f=><button key={f} className={`chip${format===f?" on":""}`} onClick={()=>setFormat(f)}>{f}</button>)}</div></div>
      <div style={{padding:14,background:T.s1,border:`1px solid ${T.border}`,borderRadius:10,marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:13,fontWeight:600,color:T.t1,marginBottom:2}}>Créditos disponibles</div><div style={{fontSize:12,color:T.t2}}>4 imágenes × {COSTS.image} crédito = {TOTAL} créditos</div></div>
        <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:28,fontWeight:700,color:credits>=TOTAL?T.grn:"#FF4444"}}>{credits}</div>
      </div>
      <button className="btn-run" onClick={run} disabled={!form.producto||credits<TOTAL}>
        {credits<TOTAL?`Sin créditos (necesitás ${TOTAL})`:"🎨 Generar 4 imágenes con DALL·E 3"}
      </button>
    </div>
  );
}

/* ═══ VIDEO MODULE ════════════════════════════════════════ */
function VideoModule({form,credits,useCredits,onBuy}){
  const [vidFormat,setVidFormat]=useState("Reel 30 seg");
  const [phase,setPhase]=useState("form");
  const [stream,setStream]=useState("");
  const [storyboard,setStoryboard]=useState([]);
  const [err,setErr]=useState("");

  const run=async()=>{
    if(!form.producto){setErr("Completá primero los datos en Campaña.");return;}
    if(credits<COSTS.video){setErr(`Necesitás ${COSTS.video} créditos.`);return;}
    setErr("");setStream("");setPhase("gen");useCredits(COSTS.video);
    const prompt=`Director creativo de publicidad. Producto: "${form.producto}". ${form.descripcion||""}
Objetivo: ${form.objetivo||"ventas"}. Canal: ${form.canal||"Meta Ads"}. Formato: ${vidFormat}.

Storyboard completo:

ESCENA 1
Duración: [X seg]
Descripción visual: [qué se ve exactamente]
Narración: [texto exacto]
Texto en pantalla: [texto sobreimpreso]

[todas las escenas necesarias]

HOOK PRINCIPAL: [gancho 2 seg]
MÚSICA SUGERIDA: [estilo]
CTA FINAL: [llamada a acción]`;
    try{
      let full="";await callAI(prompt,t=>{full=t;setStream(t);});
      const scenes=full.split(/ESCENA \d+/i).slice(1).map((s,i)=>{
        const tm=s.match(/Duración[:\s]+([^\n]+)/i);
        const dm=s.match(/(?:Descripción visual|Visual)[:\s]+([^\n]+(?:\n(?![A-Z])[^\n]+)*)/i);
        const sm=s.match(/(?:Narración|Script|Voz)[:\s]+([^\n]+(?:\n(?![A-Z])[^\n]+)*)/i);
        return{num:i+1,time:tm?tm[1].trim():"3–5 seg",visual:dm?dm[1].trim():"",script:sm?sm[1].trim():""};
      }).filter(s=>s.visual||s.script);
      setStoryboard(scenes.length?scenes:[{num:1,time:"",visual:full.slice(0,300),script:""}]);
      setPhase("result");
    }catch{setErr("Error al generar.");setPhase("form");}
  };

  const allText=storyboard.map(s=>`ESCENA ${s.num} (${s.time})\nVisual: ${s.visual}\nScript: ${s.script}`).join("\n\n");

  if(phase==="gen")return<div className="gen-wrap"><div className="spin"/><div className="gen-title">Creando storyboard…</div><div className="gen-step">Diseñando escenas para {vidFormat}…</div><div className="stream-box">{stream||"Iniciando…"}<span className="cursor"/></div></div>;

  if(phase==="result"&&storyboard.length)return(
    <div className="inner">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:24}}>
        <div><div className="pg-title">Storyboard listo ✓</div><div className="pg-sub">{vidFormat} · {storyboard.length} escenas</div></div>
        <div style={{display:"flex",gap:8}}><CopyBtn text={allText} label="📋 Copiar todo"/><button className="btn-sm" onClick={()=>setPhase("form")}>← Nuevo</button></div>
      </div>
      <div className="storyboard">
        {storyboard.map(s=>(
          <div className="sb-card" key={s.num}>
            <div className="sb-header"><div className="sb-num">{s.num}</div><span style={{fontFamily:"'Clash Display',sans-serif",fontSize:14,fontWeight:600}}>Escena {s.num}</span><span className="sb-time">⏱ {s.time}</span></div>
            <div className="sb-body"><div><div className="sb-section-title">🎬 Visual</div><div className="sb-visual">{s.visual||"—"}</div></div><div><div className="sb-section-title">🎙 Script</div><div className="sb-text">{s.script||"—"}</div></div></div>
          </div>
        ))}
      </div>
      <button className="new-btn" onClick={()=>setPhase("form")}>+ Nuevo storyboard</button>
    </div>
  );

  return(
    <div className="inner">
      <div style={{marginBottom:32}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><div className="pg-title">Storyboard de video</div><span className="cost-tag">◆ {COSTS.video} créditos</span></div>
        <div className="pg-sub">Escena por escena. Listo para grabar o enviar al editor.</div>
      </div>
      <UpsellBanner credits={credits} onBuy={(c,p)=>createMPPayment({title:`AVANTI — ${c} créditos`,price:p,credits:c})}/>
      {err&&<div className="err-box">⚠ {err}</div>}
      {!form.producto&&<div className="err-box">💡 Completá primero los datos en Campaña.</div>}
      <div className="field"><label className="lbl">Formato de video</label><div className="chips">{VID_FORMATS.map(f=><button key={f} className={`chip${vidFormat===f?" on":""}`} onClick={()=>setVidFormat(f)}>{f}</button>)}</div></div>
      <button className="btn-run" onClick={run} disabled={!form.producto||credits<COSTS.video}>
        {credits<COSTS.video?`Sin créditos (necesitás ${COSTS.video})`:"🎬 Generar storyboard"}
      </button>
    </div>
  );
}

/* ═══ LANDING MODULE ════════════════════════════════════ */
function LandingModule({form,credits,useCredits,onBuy}){
  const [phase,setPhase]=useState("form");
  const [stream,setStream]=useState("");
  const [landingData,setLandingData]=useState(null);
  const [err,setErr]=useState("");
  const [colorScheme,setColorScheme]=useState("Oscuro (dark)");
  const COLORES=["Oscuro (dark)","Claro (light)","Naranja / Energía","Verde / Confianza","Azul / Corporativo"];
  const schemeMap={"Oscuro (dark)":{bg:"#0A0A0F",s1:"#111118",acc:"#FF4D00",t1:"#F0F0FF",t2:"#8888AA",bd:"#1E1E2E"},"Claro (light)":{bg:"#FAFAFA",s1:"#F0F0F5",acc:"#FF4D00",t1:"#0A0A14",t2:"#555570",bd:"#E0E0EE"},"Naranja / Energía":{bg:"#0D0800",s1:"#1A1000",acc:"#FF8800",t1:"#FFF8F0",t2:"#AA8855",bd:"#2A1800"},"Verde / Confianza":{bg:"#020D08",s1:"#061510",acc:"#00C96E",t1:"#F0FFF8",t2:"#558877",bd:"#0A2A1A"},"Azul / Corporativo":{bg:"#020810",s1:"#060E1A",acc:"#3B82F6",t1:"#F0F5FF",t2:"#6677AA",bd:"#0E1A2E"}};

  const run=async()=>{
    if(!form.producto){setErr("Completá primero los datos en Campaña.");return;}
    if(credits<COSTS.landing){setErr(`Necesitás ${COSTS.landing} créditos.`);return;}
    setErr("");setStream("");setPhase("gen");useCredits(COSTS.landing);
    const prompt=`Copywriter elite para landing pages. PRODUCTO: "${form.producto}". ${form.descripcion||""}
OBJ: ${form.objetivo||"ventas"}. TONO: ${form.tono||"Urgente"}. DIFER: ${form.diferenciador||""}.

SOLO JSON sin markdown:
{"hero_titulo":"[7 palabras]","hero_subtitulo":"[1-2 líneas]","hero_cta":"[acción]","hero_subcta":"[elimina riesgo]","problema_titulo":"[pregunta que duele]","problema_texto":"[2-3 líneas]","solucion_titulo":"[cómo resuelve]","solucion_texto":"[2-3 líneas]","beneficios":[{"icono":"⚡","titulo":"[específico]","desc":"[1 línea]"},{"icono":"🎯","titulo":"[específico]","desc":"[1 línea]"},{"icono":"🔥","titulo":"[específico]","desc":"[1 línea]"},{"icono":"✅","titulo":"[específico]","desc":"[1 línea]"}],"testimonios":[{"texto":"[resultado]","nombre":"[Nombre]","rol":"[rol]","avatar":"👤"},{"texto":"[resultado 2]","nombre":"[Nombre]","rol":"[rol]","avatar":"👤"},{"texto":"[emocional]","nombre":"[Nombre]","rol":"[rol]","avatar":"👤"}],"stat1_num":"[#]","stat1_label":"[qué]","stat2_num":"[#]","stat2_label":"[qué]","stat3_num":"[#]","stat3_label":"[qué]","precio_titulo":"[urgencia]","precio_valor":"[#]","precio_moneda":"USD","precio_nota":"[incluye]","garantia":"[elimina riesgo]","urgencia":"[escasez]","faq":[{"q":"[objeción 1]","a":"[respuesta]"},{"q":"[objeción 2]","a":"[respuesta]"},{"q":"[objeción 3]","a":"[respuesta]"}],"cierre_titulo":"[8 palabras]","cierre_sub":"[valor]","cta_final":"[acción]"}`;
    try{
      let full="";await callAI(prompt,t=>{full=t;setStream(t);});
      let data;try{const clean=full.replace(/```json|```/g,"").trim();data=JSON.parse(clean.slice(clean.indexOf("{"),clean.lastIndexOf("}")+1));}
      catch{data={hero_titulo:form.producto,hero_subtitulo:`Solución para ${form.objetivo||"tu negocio"}`,hero_cta:"Quiero acceso →",hero_subcta:"Garantía 7 días",problema_titulo:"¿Seguís sin resultados?",problema_texto:"Es frustrante invertir sin ver retorno.",solucion_titulo:`${form.producto} lo resuelve`,solucion_texto:form.descripcion||"Solución probada.",beneficios:[{icono:"⚡",titulo:"Rápido",desc:"Resultados inmediatos"},{icono:"🎯",titulo:"Efectivo",desc:"Probado"},{icono:"🔥",titulo:"Simple",desc:"Sin complicaciones"},{icono:"✅",titulo:"Garantizado",desc:"O te devolvemos"}],testimonios:[{texto:"Increíble.",nombre:"María G.",rol:"Empresaria",avatar:"👤"},{texto:"Lo mejor.",nombre:"Carlos M.",rol:"Marketing",avatar:"👤"},{texto:"Superó todo.",nombre:"Ana L.",rol:"Emprendedora",avatar:"👤"}],stat1_num:"500+",stat1_label:"Clientes",stat2_num:"3x",stat2_label:"Resultados",stat3_num:"98%",stat3_label:"Satisfacción",precio_titulo:"Invertí hoy",precio_valor:"97",precio_moneda:"USD",precio_nota:"Acceso completo",garantia:"7 días garantía",urgencia:"Precio limitado",faq:[{q:"¿Cómo funciona?",a:"Simple."},{q:"¿Resultados?",a:"En días."},{q:"¿Y si no funciona?",a:"Garantía total."}],cierre_titulo:"Tu mejor decisión hoy",cierre_sub:"Únete a los que ya tienen resultados",cta_final:"Empezar ahora →"};}
      setLandingData(data);setPhase("result");
    }catch{setErr("Error al generar.");setPhase("form");}
  };

  const buildHTML=(data)=>{
    const sc=schemeMap[colorScheme]||schemeMap["Oscuro (dark)"];const n=form.producto||"Tu Producto";
    return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${n}</title><link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/><style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{background:${sc.bg};color:${sc.t1};font-family:'DM Sans',sans-serif;overflow-x:hidden}.container{max-width:960px;margin:0 auto;padding:0 24px}nav{position:fixed;top:0;left:0;right:0;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:${sc.bg}E8;backdrop-filter:blur(16px);border-bottom:1px solid ${sc.bd};z-index:100}.nav-brand{font-family:'Syne',sans-serif;font-size:18px;font-weight:800}.nav-cta{padding:9px 22px;background:${sc.acc};color:white;border:none;border-radius:8px;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;cursor:pointer}.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:100px 24px 80px;position:relative;overflow:hidden}.hero-orb{position:absolute;width:700px;height:500px;background:radial-gradient(ellipse,${sc.acc}30 0%,transparent 65%);top:0;left:50%;transform:translateX(-50%);pointer-events:none}h1{font-family:'Syne',sans-serif;font-size:clamp(38px,7vw,80px);font-weight:800;line-height:.93;letter-spacing:-.05em;margin-bottom:24px}.acc{color:${sc.acc}}.hero-sub{font-size:18px;font-weight:300;color:${sc.t2};max-width:520px;margin:0 auto 44px;line-height:1.65}.cta-main{padding:18px 44px;background:${sc.acc};color:white;border:none;border-radius:12px;font-family:'Syne',sans-serif;font-size:17px;font-weight:800;cursor:pointer;text-decoration:none;display:inline-block}.stats{display:flex;justify-content:center;gap:48px;padding:48px 24px;border-top:1px solid ${sc.bd};border-bottom:1px solid ${sc.bd};flex-wrap:wrap;background:${sc.s1}}.stat-n{font-family:'Syne',sans-serif;font-size:44px;font-weight:800;color:${sc.acc}}.stat-l{font-size:12px;color:${sc.t2};margin-top:4px;text-transform:uppercase;letter-spacing:.06em}section{padding:80px 0}.sec-tag{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:${sc.acc};font-weight:700;margin-bottom:16px}h2{font-family:'Syne',sans-serif;font-size:clamp(28px,4vw,52px);font-weight:800;letter-spacing:-.04em;line-height:.95;margin-bottom:16px}.problem-box{background:${sc.s1};border:1px solid ${sc.bd};border-radius:16px;padding:40px;max-width:680px}.benefits{display:grid;grid-template-columns:1fr 1fr;gap:16px}.ben-card{padding:28px;background:${sc.s1};border:1px solid ${sc.bd};border-radius:14px}.ben-icon{font-size:28px;margin-bottom:14px}.ben-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;margin-bottom:8px}.ben-desc{font-size:13px;color:${sc.t2}}.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.testi{background:${sc.s1};border:1px solid ${sc.bd};border-radius:14px;padding:24px}.testi-text{font-size:14px;color:${sc.t1};line-height:1.7;font-style:italic;margin-bottom:16px}.price-box{background:${sc.s1};border:2px solid ${sc.acc};border-radius:20px;padding:48px;text-align:center;max-width:480px;margin:0 auto;position:relative}.btn-price{width:100%;padding:18px;background:${sc.acc};color:white;border:none;border-radius:12px;font-family:'Syne',sans-serif;font-size:17px;font-weight:800;cursor:pointer}.faq-item{border-bottom:1px solid ${sc.bd};padding:20px 0}.faq-q{font-size:15px;font-weight:500;margin-bottom:10px}.faq-a{font-size:14px;color:${sc.t2};line-height:1.7}.final{text-align:center;padding:100px 24px;background:${sc.s1};border-top:1px solid ${sc.bd}}footer{padding:32px 24px;border-top:1px solid ${sc.bd};text-align:center;font-size:12px;color:${sc.t2}}@media(max-width:700px){.testi-grid,.benefits{grid-template-columns:1fr}}</style></head><body>
<nav><div class="nav-brand">${n}</div><a class="nav-cta" href="#precio">${data.hero_cta}</a></nav>
<div class="hero"><div class="hero-orb"></div><div class="container" style="position:relative"><div style="display:inline-flex;align-items:center;gap:8px;padding:6px 16px;background:${sc.acc}18;border:1px solid ${sc.acc}44;border-radius:100px;font-size:12px;color:${sc.acc};margin-bottom:32px;text-transform:uppercase;letter-spacing:.08em">${form.canal||"Campaña"} · ${form.objetivo||"Resultados"}</div><h1>${data.hero_titulo.split(" ").slice(0,-2).join(" ")} <span class="acc">${data.hero_titulo.split(" ").slice(-2).join(" ")}</span></h1><p class="hero-sub">${data.hero_subtitulo}</p><a class="cta-main" href="#precio">${data.hero_cta}</a><div style="margin-top:12px;font-size:12px;color:${sc.t2}">${data.hero_subcta}</div></div></div>
<div class="stats"><div style="text-align:center"><div class="stat-n">${data.stat1_num}</div><div class="stat-l">${data.stat1_label}</div></div><div style="text-align:center"><div class="stat-n">${data.stat2_num}</div><div class="stat-l">${data.stat2_label}</div></div><div style="text-align:center"><div class="stat-n">${data.stat3_num}</div><div class="stat-l">${data.stat3_label}</div></div></div>
<section><div class="container"><div class="sec-tag">El problema</div><div class="problem-box"><h3 style="font-family:'Syne',sans-serif;font-size:24px;font-weight:700;margin-bottom:16px">${data.problema_titulo}</h3><p style="font-size:15px;color:${sc.t2};line-height:1.75">${data.problema_texto}</p></div></div></section>
<section style="background:${sc.s1};border-top:1px solid ${sc.bd};border-bottom:1px solid ${sc.bd}"><div class="container"><div class="sec-tag">La solución</div><h2>${data.solucion_titulo} <span class="acc">ya.</span></h2><p style="font-size:16px;color:${sc.t2};line-height:1.65;max-width:540px">${data.solucion_texto}</p></div></section>
<section><div class="container"><div class="sec-tag">Beneficios</div><h2>Todo lo que <span class="acc">obtenés.</span></h2><div class="benefits" style="margin-top:36px">${data.beneficios.map(b=>`<div class="ben-card"><div class="ben-icon">${b.icono}</div><div class="ben-title">${b.titulo}</div><div class="ben-desc">${b.desc}</div></div>`).join("")}</div></div></section>
<section style="background:${sc.s1};border-top:1px solid ${sc.bd};border-bottom:1px solid ${sc.bd}"><div class="container"><div class="sec-tag">Testimonios</div><h2>Resultados <span class="acc">reales.</span></h2><div class="testi-grid" style="margin-top:36px">${data.testimonios.map(t=>`<div class="testi"><div style="color:#FFB800;font-size:13px;margin-bottom:12px">★★★★★</div><div class="testi-text">"${t.texto}"</div><div style="display:flex;align-items:center;gap:10px"><div style="width:36px;height:36px;border-radius:50%;background:${sc.acc}22;display:flex;align-items:center;justify-content:center;font-size:18px">${t.avatar}</div><div><div style="font-size:13px;font-weight:600">${t.nombre}</div><div style="font-size:11px;color:${sc.t2}">${t.rol}</div></div></div></div>`).join("")}</div></div></section>
<section id="precio"><div class="container" style="text-align:center"><div class="sec-tag" style="justify-content:center;display:flex">Precio</div><h2 style="margin-bottom:48px">Invertí una vez.<br/><span class="acc">Ganás para siempre.</span></h2><div class="price-box"><div style="position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:${sc.acc};color:white;font-size:11px;font-weight:700;padding:4px 16px;border-radius:100px;white-space:nowrap">🔥 Oferta de lanzamiento</div><div style="font-family:'Syne',sans-serif;font-size:20px;font-weight:700;margin-bottom:24px">${data.precio_titulo}</div><div style="font-family:'Syne',sans-serif;font-size:80px;font-weight:800;letter-spacing:-.06em;line-height:1">$${data.precio_valor}</div><div style="font-size:14px;color:${sc.t2};margin-bottom:8px">${data.precio_moneda} · pago único</div><div style="font-size:13px;color:${sc.t2};margin-bottom:28px">${data.precio_nota}</div><button class="btn-price" onclick="alert('Reemplazá esto con tu link de MercadoPago')">${data.cta_final}</button><div style="margin-top:20px;font-size:13px;color:${sc.t2}">🛡️ ${data.garantia}</div><div style="margin-top:8px;font-size:12px;color:${sc.acc};font-weight:600">⚡ ${data.urgencia}</div></div></div></section>
<section style="background:${sc.s1};border-top:1px solid ${sc.bd};border-bottom:1px solid ${sc.bd}"><div class="container"><div class="sec-tag">FAQ</div><h2 style="margin-bottom:40px">Preguntas <span class="acc">frecuentes.</span></h2><div style="max-width:640px">${data.faq.map(f=>`<div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`).join("")}</div></div></section>
<div class="final"><div class="container"><h2>${data.cierre_titulo} <span class="acc">hoy.</span></h2><p style="font-size:16px;color:${sc.t2};max-width:440px;margin:16px auto 40px;line-height:1.65">${data.cierre_sub}</p><a class="cta-main" href="#precio">${data.cta_final}</a></div></div>
<footer>© ${new Date().getFullYear()} ${n} · ${data.urgencia}</footer>
</body></html>`;
  };

  const dl=()=>{if(!landingData)return;const html=buildHTML(landingData);const blob=new Blob([html],{type:"text/html"});const u=URL.createObjectURL(blob);const a=document.createElement("a");a.href=u;a.download=`landing-${form.producto?.replace(/\s+/g,"-")||"producto"}.html`;a.click();URL.revokeObjectURL(u);};
  const preview=()=>{if(!landingData)return;const html=buildHTML(landingData);window.open(URL.createObjectURL(new Blob([html],{type:"text/html"})),"_blank");};

  const [publishing,setPublishing]=useState(false);
  const [publishedUrl,setPublishedUrl]=useState("");

  const publishToNetlify=async()=>{
    if(!landingData)return;
    setPublishing(true);
    setPublishedUrl("");
    try{
      const html=buildHTML(landingData);
      const slug=(form.producto||"avanti").toLowerCase().replace(/[^a-z0-9]/g,"-").slice(0,30)+"-"+Date.now().toString(36);
      // Netlify API - crear sitio y subir archivo en un solo paso
      const res=await fetch("https://api.netlify.com/api/v1/sites",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:slug})
      });
      const site=await res.json();
      if(!site.id){throw new Error("No se pudo crear el sitio");}
      // Subir el HTML
      const deploy=await fetch(`https://api.netlify.com/api/v1/sites/${site.id}/deploys`,{
        method:"POST",
        headers:{"Content-Type":"application/zip"},
        body:await zipHTML(html,"index.html")
      });
      const deployData=await deploy.json();
      const url=`https://${slug}.netlify.app`;
      setPublishedUrl(url);
    }catch(e){
      // Fallback: abrir Netlify Drop con instrucción
      setPublishedUrl("MANUAL");
    }
    setPublishing(false);
  };

  // Crear ZIP con el HTML para Netlify
  const zipHTML=async(html,filename)=>{
    // Usamos una técnica simple: blob con contenido del archivo
    // Netlify acepta ZIP con un solo archivo index.html
    const enc=new TextEncoder();
    const data=enc.encode(html);
    // Crear ZIP mínimo válido
    const makeZip=(filename,content)=>{
      const name=new TextEncoder().encode(filename);
      const crc=crc32(content);
      const local=new Uint8Array([0x50,0x4b,0x03,0x04,20,0,0,0,0,0,0,0,0,0,crc&0xff,(crc>>8)&0xff,(crc>>16)&0xff,(crc>>24)&0xff,content.length&0xff,(content.length>>8)&0xff,(content.length>>16)&0xff,(content.length>>24)&0xff,0,0,0,0,name.length,0,0,0,...name,...content]);
      const central=new Uint8Array([0x50,0x4b,0x01,0x02,20,0,20,0,0,0,0,0,0,0,0,0,crc&0xff,(crc>>8)&0xff,(crc>>16)&0xff,(crc>>24)&0xff,content.length&0xff,(content.length>>8)&0xff,(content.length>>16)&0xff,(content.length>>24)&0xff,0,0,0,0,0,0,0,0,0,0,0,0,0,0,name.length,0,0,0,...name]);
      const offset=local.length;
      const eocd=new Uint8Array([0x50,0x4b,0x05,0x06,0,0,0,0,1,0,1,0,central.length&0xff,(central.length>>8)&0xff,0,0,offset&0xff,(offset>>8)&0xff,(offset>>16)&0xff,(offset>>24)&0xff,0,0]);
      const zip=new Uint8Array(local.length+central.length+eocd.length);
      zip.set(local,0);zip.set(central,local.length);zip.set(eocd,local.length+central.length);
      return zip;
    };
    const crc32=(data)=>{let c=-1;for(let i=0;i<data.length;i++){c=((c>>8)^[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918000,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117][(c^data[i])&0xff])>>>0;}return(c^-1)>>>0;};
    return makeZip(filename,data).buffer;
  };

  if(phase==="gen")return<div className="gen-wrap"><div className="spin"/><div className="gen-title">Construyendo landing…</div><div className="gen-step">Copy + diseño visual en proceso…</div><div className="stream-box">{stream||"Iniciando…"}<span className="cursor"/></div></div>;

  if(phase==="result"&&landingData){
    const sc=schemeMap[colorScheme]||schemeMap["Oscuro (dark)"];
    return(
      <div className="inner" style={{maxWidth:860}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:24}}>
          <div><div className="pg-title">Landing HTML lista ✓</div><div className="pg-sub">{form.producto} · {colorScheme}</div></div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button className="btn-sm" onClick={preview}>👁 Preview</button>
            <button className="btn-sm" onClick={dl}>⬇ Descargar</button>
            <button className="btn-sm" onClick={()=>setPhase("form")}>← Nueva</button>
          </div>
        </div>

        {/* PUBLISH BOX */}
        {!publishedUrl?(
          <div style={{background:`linear-gradient(135deg,${T.s2},${T.bg})`,border:`1px solid ${T.grn}44`,borderRadius:16,padding:24,marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,flexWrap:"wrap"}}>
              <div style={{width:44,height:44,background:T.grnD,border:`1px solid ${T.grn}44`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🚀</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:17,fontWeight:700,marginBottom:4}}>Publicar online — gratis</div>
                <div style={{fontSize:12,color:T.t2}}>Tu landing queda online en segundos con una URL pública lista para compartir.</div>
              </div>
            </div>
            <button onClick={publishToNetlify} disabled={publishing} style={{width:"100%",padding:14,background:publishing?"#1A3A1A":T.grn,color:publishing?T.t2:"#000",border:"none",borderRadius:10,fontFamily:"'Clash Display',sans-serif",fontSize:15,fontWeight:700,cursor:publishing?"not-allowed":"pointer",transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              {publishing?<><div style={{width:16,height:16,border:"2px solid #333",borderTopColor:T.grn,borderRadius:"50%",animation:"spin .8s linear infinite"}}/> Publicando…</>:"🌐 Publicar ahora — gratis"}
            </button>
          </div>
        ):(
          publishedUrl==="MANUAL"?(
            <div style={{background:T.yelD,border:`1px solid ${T.yel}44`,borderRadius:12,padding:20,marginBottom:20}}>
              <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:15,fontWeight:700,marginBottom:8,color:T.yel}}>⚡ Publicá en 30 segundos</div>
              <div style={{fontSize:13,color:T.t2,marginBottom:12,lineHeight:1.7}}>1. Descargá el archivo .html<br/>2. Andá a <strong style={{color:T.t1}}>netlify.com/drop</strong><br/>3. Arrastrá el archivo → URL lista</div>
              <button onClick={dl} style={{padding:"10px 20px",background:T.yel,color:"#000",border:"none",borderRadius:8,fontFamily:"'Clash Display',sans-serif",fontSize:13,fontWeight:700,cursor:"pointer"}}>⬇ Descargar .html</button>
            </div>
          ):(
            <div style={{background:T.grnD,border:`1px solid ${T.grn}44`,borderRadius:12,padding:20,marginBottom:20}}>
              <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:15,fontWeight:700,marginBottom:8,color:T.grn}}>🎉 ¡Tu landing está online!</div>
              <div style={{display:"flex",alignItems:"center",gap:8,background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 14px",marginBottom:12}}>
                <span style={{fontSize:12,color:T.t1,flex:1,fontFamily:"monospace",wordBreak:"break-all"}}>{publishedUrl}</span>
                <CopyBtn text={publishedUrl} label="Copiar"/>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>window.open(publishedUrl,"_blank")} style={{flex:1,padding:"10px",background:T.grn,color:"#000",border:"none",borderRadius:8,fontFamily:"'Clash Display',sans-serif",fontSize:13,fontWeight:700,cursor:"pointer"}}>↗ Abrir sitio</button>
                <button onClick={()=>setPublishedUrl("")} style={{padding:"10px 14px",background:T.s1,border:`1px solid ${T.border}`,borderRadius:8,color:T.t2,fontSize:12,cursor:"pointer",fontFamily:"Epilogue, sans-serif"}}>Republicar</button>
              </div>
            </div>
          )
        )}

        <div style={{background:sc.bg,border:`2px solid ${sc.acc}44`,borderRadius:14,overflow:"hidden",marginBottom:16}}>
          <div style={{background:sc.s1,padding:"10px 16px",borderBottom:`1px solid ${sc.bd}`,display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:10,height:10,borderRadius:"50%",background:"#FF5F57"}}/><div style={{width:10,height:10,borderRadius:"50%",background:"#FEBC2E"}}/><div style={{width:10,height:10,borderRadius:"50%",background:"#28C840"}}/>
            <span style={{fontSize:11,color:T.t2,marginLeft:8,fontFamily:"monospace"}}>{form.producto?.toLowerCase().replace(/\s+/g,"-")||"producto"}.html</span>
            <button onClick={preview} style={{marginLeft:"auto",fontSize:11,padding:"3px 10px",background:sc.acc,color:"white",border:"none",borderRadius:6,cursor:"pointer"}}>Abrir →</button>
          </div>
          <div style={{padding:20,maxHeight:300,overflowY:"auto"}}>
            {[{l:"🚀 HERO",v:`"${landingData.hero_titulo}"`},{l:"❗ PROBLEMA",v:landingData.problema_titulo},{l:"✅ SOLUCIÓN",v:landingData.solucion_titulo},{l:"⚡ BENEFICIOS",v:landingData.beneficios.map(b=>`${b.icono} ${b.titulo}`).join(" · ")},{l:"💰 PRECIO",v:`$${landingData.precio_valor} ${landingData.precio_moneda}`}].map((s,i)=>(
              <div key={i} style={{padding:"8px 0",borderBottom:`1px solid ${sc.bd}`}}>
                <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:".08em",color:sc.acc,fontWeight:700,marginBottom:3}}>{s.l}</div>
                <div style={{fontSize:12,color:sc.t1,lineHeight:1.5,marginBottom:4}}>{s.v}</div>
                <CopyBtn text={s.v}/>
              </div>
            ))}
          </div>
        </div>
        <button className="new-btn" onClick={()=>{setPhase("form");setPublishedUrl("");}}>+ Nueva landing</button>
      </div>
    );
  }

  return(
    <div className="inner">
      <div style={{marginBottom:32}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><div className="pg-title">Landing page HTML</div><span className="cost-tag">◆ {COSTS.landing} créditos</span></div>
        <div className="pg-sub">Diseño visual completo descargable. Lista para publicar o entregar al cliente.</div>
      </div>
      <UpsellBanner credits={credits} onBuy={(c,p)=>createMPPayment({title:`AVANTI — ${c} créditos`,price:p,credits:c})}/>
      {err&&<div className="err-box">⚠ {err}</div>}
      {!form.producto&&<div className="err-box">💡 Completá primero los datos en Campaña.</div>}
      <div className="field"><label className="lbl">Paleta de colores</label><div className="chips">{COLORES.map(c=><button key={c} className={`chip${colorScheme===c?" on":""}`} onClick={()=>setColorScheme(c)}>{c}</button>)}</div></div>
      <button className="btn-run" onClick={run} disabled={!form.producto||credits<COSTS.landing}>
        {credits<COSTS.landing?`Sin créditos (necesitás ${COSTS.landing})`:"🌐 Generar landing HTML"}
      </button>
    </div>
  );
}

/* ═══ TOUR COMPONENT ════════════════════════════════════ */
const TOUR_STEPS = [
  {icon:"🐿️", title:"Bienvenido a AVANTI", desc:"La herramienta de IA para crear campañas de marketing completas en segundos. Te vamos a guiar en 3 pasos rápidos."},
  {icon:"📝", title:"Paso 1 — Describí tu producto", desc:"Entrás al módulo Campaña, completás el nombre, descripción, objetivo y canal. Cuanto más detalle, mejor resultado."},
  {icon:"⚡", title:"Paso 2 — Elegí el módulo", desc:"Campaña genera hooks y copies. Imágenes crea prompts para Midjourney. Video arma el storyboard. Landing genera el HTML completo."},
  {icon:"🚀", title:"Paso 3 — Copiá y publicá", desc:"Cada resultado tiene un botón para copiar al portapapeles o descargar. Pegalo directamente en Meta Ads, TikTok o donde necesites."},
  {icon:"💳", title:"Sistema de créditos", desc:"Cada generación consume créditos. Empezás con 0 — comprás 100 créditos por $37 USD. Recargás cuando querés, sin vencimiento."},
];

function TourModal({onClose}){
  const [step,setStep]=useState(0);
  const current=TOUR_STEPS[step];
  const isLast=step===TOUR_STEPS.length-1;
  return(
    <div className="tour-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="tour-card">
        <div className="tour-step-indicator">
          {TOUR_STEPS.map((_,i)=><div key={i} className={`tour-dot${i===step?" active":""}`}/>)}
        </div>
        <div className="tour-icon-big">{current.icon}</div>
        <div className="tour-title">{current.title}</div>
        <div className="tour-desc">{current.desc}</div>
        <div className="tour-btns">
          <button className="tour-skip" onClick={onClose}>Saltar tutorial</button>
          <div style={{display:"flex",gap:8}}>
            {step>0&&<button onClick={()=>setStep(s=>s-1)} style={{padding:"10px 18px",background:T.s2,border:`1px solid ${T.border}`,borderRadius:9,color:T.t2,fontSize:13,cursor:"pointer",fontFamily:"Epilogue, sans-serif"}}>← Atrás</button>}
            <button onClick={()=>isLast?onClose():setStep(s=>s+1)} style={{padding:"10px 22px",background:T.acc,color:"white",border:"none",borderRadius:9,fontFamily:"'Clash Display',sans-serif",fontSize:14,fontWeight:700,cursor:"pointer"}}>
              {isLast?"¡Empezar! →":"Siguiente →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ MAIN APP ═══════════════════════════════════════════ */
export default function App(){
  const [screen,setScreen]=useState("home");
  const [mod,setMod]=useState("campaign");
  const [showPricing,setShowPricing]=useState(false);
  const DEMO_FORM={
    producto:"Curso de Finanzas Personales",
    descripcion:"Curso online de 4 semanas que enseña a ahorrar, invertir y salir de deudas. Resultados en 30 días.",
    objetivo:"Ventas directas",
    canal:"Meta Ads",
    tono:"Urgente / FOMO",
    audiencia:"25–34",
    diferenciador:"resultados garantizados en 30 días"
  };

  const isDemo=typeof window!=="undefined"&&new URLSearchParams(window.location.search).get("demo")==="true";
  const [form,setForm]=useState(isDemo?DEMO_FORM:{producto:"",descripcion:"",objetivo:"",canal:"",tono:"",audiencia:"",diferenciador:""});

  const [showTour,setShowTour]=useState(()=>{
    if(typeof window==="undefined")return false;
    return !localStorage.getItem("avanti_tour_done");
  });
  const closeTour=()=>{localStorage.setItem("avanti_tour_done","1");setShowTour(false);};

  const [credits,setCredits]=useState(()=>{
    if(typeof window==="undefined")return 0;
    const p=new URLSearchParams(window.location.search);
    if(p.get("paid")==="true"||p.get("status")==="approved"){
      const bonus=parseInt(p.get("credits")||"100");
      const saved=parseInt(localStorage.getItem("avanti_credits")||"0");
      const total=saved+bonus;
      localStorage.setItem("avanti_credits",String(total));
      window.history.replaceState({},"",window.location.pathname);
      return total;
    }
    // MODO DEMO: si viene con ?demo=true carga 50 créditos + form pre-llenado
    if(p.get("demo")==="true"){
      localStorage.setItem("avanti_credits","50");
      return 50;
    }
    return parseInt(localStorage.getItem("avanti_credits")||"0");
  });

  const useCredits=n=>setCredits(c=>{const next=Math.max(0,c-n);localStorage.setItem("avanti_credits",String(next));return next;});
  const addCredits=n=>setCredits(c=>{const next=c+n;localStorage.setItem("avanti_credits",String(next));return next;});

  const creditColor=credits>50?T.grn:credits>20?T.yel:"#FF4444";
  const creditStatus=credits>50?"high":credits>20?"low":"empty";

  const MODULES=[{id:"campaign",icon:"⚡",label:"Campaña"},{id:"images",icon:"🎨",label:"Imágenes"},{id:"video",icon:"🎬",label:"Videos"},{id:"landing",icon:"🌐",label:"Landing"}];

  return(
    <>
      <style>{G}</style>
      <div style={{minHeight:"100vh",background:T.bg}}>
        <div className="grid-bg"/>
        <div className="orb"/>

        <nav className="nav">
          <div className="nav-logo" onClick={()=>setScreen("home")}>
            <div className="logo-mark">A</div>
            AVANTI
            <SquirrelLogo size={40}/>
          </div>
          <div className="nav-right">
            {screen==="app"&&(
              <div className="credit-badge" onClick={()=>setShowPricing(true)} title="Ver planes">
                <div className={`credit-dot ${creditStatus}`}/>
                <span style={{color:creditColor,fontWeight:700}}>{credits}</span>
                <span style={{color:T.t2,fontSize:11}}>créditos</span>
              </div>
            )}
            <button onClick={()=>setShowTour(true)} style={{width:32,height:32,borderRadius:"50%",background:T.s1,border:`1px solid ${T.border}`,color:T.t2,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Epilogue, sans-serif",fontWeight:700,flexShrink:0}} title="Ver tutorial">?</button>
            {screen==="home"
              ?<button className="nav-cta" onClick={()=>setScreen("app")}>Empezar →</button>
              :<button className="nav-cta" onClick={()=>setShowPricing(true)}>💳 Recargar</button>
            }
          </div>
        </nav>

        {showPricing&&<PricingModal onClose={()=>setShowPricing(false)} onPurchase={addCredits}/>}
        {showTour&&<TourModal onClose={closeTour}/>}

        {screen==="home"&&(
          <div className="screen">
            <div className="hero">
              <div className="hero-badge"><div className="dot-live"/>IA para Performance Marketing</div>
              <h1 className="hero-h">Creá anuncios<br/><span className="acc">que venden.</span><br/><span className="dim">En 60 segundos.</span></h1>
              <p className="hero-p">Hooks, copies, imágenes, video y landing. Todo con IA. 100 créditos incluidos.</p>
              <div className="hero-btns">
                <button className="btn-hero" onClick={()=>setShowPricing(true)}>Obtener AVANTI — $37 USD →</button>
                <button className="btn-ghost" onClick={()=>setScreen("app")}>Probar gratis primero</button>
              </div>
              {/* EJEMPLO BUTTON */}
              <div style={{marginTop:16,animation:"fadeUp .5s .32s ease both"}}>
                <button onClick={()=>{setForm(DEMO_FORM);setMod("campaign");setScreen("app");}} style={{background:"transparent",border:"none",color:T.t3,fontSize:13,cursor:"pointer",fontFamily:"Epilogue, sans-serif",display:"flex",alignItems:"center",gap:6,margin:"0 auto",transition:"color .2s",padding:"8px 16px",borderRadius:8,borderBottom:`1px dashed ${T.t3}`}}
                  onMouseOver={e=>e.currentTarget.style.color=T.t2}
                  onMouseOut={e=>e.currentTarget.style.color=T.t3}
                >
                  👀 Ver un ejemplo real primero
                </button>
              </div>
            </div>
            <div className="features">
              {[{icon:"⚡",name:"Campaña completa",desc:"Hooks, copies, CTAs y script. 2 créditos.",mod:"campaign"},{icon:"🎨",name:"Prompts de imágenes",desc:"4 prompts para Midjourney y DALL·E. 4 créditos.",mod:"images"},{icon:"🎬",name:"Storyboard de video",desc:"Escena por escena para Reels y Stories. 3 créditos.",mod:"video"},{icon:"🌐",name:"Landing persuasiva",desc:"HTML descargable con diseño completo. 2 créditos.",mod:"landing"}].map(f=>(
                <div className="feat-card" key={f.mod} onClick={()=>{setMod(f.mod);setScreen("app");}}><div className="feat-icon">{f.icon}</div><div className="feat-name">{f.name}</div><div className="feat-desc">{f.desc}</div></div>
              ))}
            </div>
            {/* ── CÓMO FUNCIONA ── */}
            <div className="how-section">
              <div style={{textAlign:"center",maxWidth:600,margin:"0 auto"}}>
                <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:T.acc,fontWeight:700,marginBottom:12}}>Cómo funciona</div>
                <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(24px,4vw,42px)",fontWeight:700,letterSpacing:"-.03em",lineHeight:1.05}}>De cero a campaña lista<br/><span style={{color:T.acc}}>en 3 pasos.</span></div>
              </div>
              <div className="how-steps">
                {[
                  {num:"01",icon:"📝",title:"Describí tu producto",desc:"Ingresá el nombre, descripción, objetivo de campaña y canal. Cuanto más detalle, mejor resultado genera la IA.",color:T.acc},
                  {num:"02",icon:"⚡",title:"Elegí el módulo",desc:"Seleccioná Campaña, Imágenes, Video o Landing según lo que necesites. Cada módulo genera contenido específico.",color:T.blu},
                  {num:"03",icon:"🚀",title:"Copiá y publicá",desc:"Copiás el resultado al portapapeles o lo descargás. Pegalo en Meta Ads, TikTok, Canva o donde lo necesites.",color:T.grn},
                ].map((s,i)=>(
                  <div className="how-step" key={i} style={{borderColor:`${s.color}22`}}>
                    {i<2&&<div className="how-arrow">→</div>}
                    <div className="how-num" style={{background:`${s.color}18`,borderColor:`${s.color}44`,color:s.color}}>{s.num}</div>
                    <div className="how-icon">{s.icon}</div>
                    <div className="how-title">{s.title}</div>
                    <div className="how-desc">{s.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{textAlign:"center",marginTop:40}}>
                <button onClick={()=>setShowTour(true)} style={{padding:"10px 24px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:100,color:T.t2,fontSize:13,cursor:"pointer",fontFamily:"Epilogue, sans-serif",display:"inline-flex",alignItems:"center",gap:8}}>
                  <span>?</span> Ver tutorial interactivo
                </button>
              </div>
            </div>

            <div className="proof-strip">
              {[{num:"100",label:"Créditos incluidos"},{num:"60s",label:"Por generación"},{num:"4",label:"Módulos IA"},{num:"$37",label:"Pago único"}].map(p=>(
                <div className="proof-item" key={p.label}><div className="proof-num">{p.num}</div><div className="proof-label">{p.label}</div></div>
              ))}
            </div>
            <div style={{textAlign:"center",padding:"60px 24px 80px",borderTop:`1px solid ${T.border}`}}>
              <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(28px,5vw,52px)",fontWeight:700,letterSpacing:"-.03em",marginBottom:16,lineHeight:1.1}}>Tu campaña completa.<br/><span style={{color:T.acc}}>Lista para publicar.</span></div>
              <div style={{fontSize:15,color:T.t2,marginBottom:36,maxWidth:480,margin:"0 auto 36px"}}>100 créditos por $37. Sin vencimiento. Recargás cuando querés.</div>
              <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
                <button className="btn-hero" onClick={()=>setShowPricing(true)}>Obtener AVANTI — $37 USD →</button>
                <button className="btn-ghost" onClick={()=>setScreen("app")}>Probar gratis primero</button>
              </div>
            </div>
          </div>
        )}

        {screen==="app"&&(
          <div className="screen">
            {isDemo&&(
              <div style={{background:`linear-gradient(90deg,${T.accD},${T.yelD})`,borderBottom:`1px solid ${T.acc}33`,padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap",position:"sticky",top:60,zIndex:160}}>
                <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:T.t1}}>
                  <span style={{fontSize:18}}>🎬</span>
                  <strong>Modo Demo</strong> — <span style={{color:T.t2}}>50 créditos cargados · Formulario pre-llenado · Todo listo para grabar</span>
                </div>
                <button onClick={()=>setShowPricing(true)} style={{padding:"6px 16px",background:T.acc,color:"white",border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Epilogue, sans-serif",flexShrink:0}}>
                  Obtener acceso real →
                </button>
              </div>
            )}
            <div className="mod-nav">
              {MODULES.map(m=><button key={m.id} className={`mod-tab${mod===m.id?" active":""}`} onClick={()=>setMod(m.id)}><span>{m.icon}</span>{m.label}</button>)}
              <button className="mod-tab" style={{marginLeft:"auto",color:creditColor}} onClick={()=>setShowPricing(true)}>
                <div className={`credit-dot ${creditStatus}`} style={{width:6,height:6,borderRadius:"50%",background:creditColor,flexShrink:0}}/>
                {credits} créditos
              </button>
            </div>
            {mod!=="campaign"&&<div style={{maxWidth:780,margin:"0 auto",padding:"16px 24px 0"}}><CreditBar credits={credits} onBuy={()=>setShowPricing(true)}/></div>}
            {mod==="campaign"&&<CampaignModule form={form} setForm={setForm} credits={credits} useCredits={useCredits} onBuy={()=>setShowPricing(true)}/>}
            {mod==="images"&&<ImageModule form={form} credits={credits} useCredits={useCredits} onBuy={()=>setShowPricing(true)}/>}
            {mod==="video"&&<VideoModule form={form} credits={credits} useCredits={useCredits} onBuy={()=>setShowPricing(true)}/>}
            {mod==="landing"&&<LandingModule form={form} credits={credits} useCredits={useCredits} onBuy={()=>setShowPricing(true)}/>}
          </div>
        )}
      </div>
    </>
  );
}
