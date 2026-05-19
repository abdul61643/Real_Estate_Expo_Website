import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./assets/css/responsive.css";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";



// ── Styles ──────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── SPONSOR MARQUEE ── */
.sponsor-section {
  margin-top: 4rem;
  overflow: hidden;
  background: #fff;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  padding: 1rem 0;
}

.sponsor-track {
  display: flex;
  gap: 5rem;
  width: max-content;
  animation: marquee 8s linear infinite;
}

.sponsor-track img {
  height: 60px;
  width: auto;
  object-fit: contain;
  filter: grayscale(100%);
  transition: filter 0.3s;
}
  .sponsor-title{

  font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem; letter-spacing: .06em;
    color: var(--text); margin-bottom: .6rem;
  
  }

.sponsor-track img:hover {
  filter: grayscale(0%);
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* WHATSAPP PRIMARY BUTTON */
.btn-primary-whatsapp {
  background: #25D366; /* WhatsApp green */
  color: #ffffff !important; 
  padding: 12px 28px;
  border: none;
  cursor: pointer;

  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 160px;
  height: 48px;

  border-radius: 6px;

  transition: all 0.25s ease;
}

.btn-primary-whatsapp:hover {
  background: #1ebe5d;
  transform: translateY(-2px);
}

  :root {
    --bg: #fff9e9
;
    --surface: #7e4d02;
    --border: #1e1e2a; 
    --accent: #623702;
    --accent2: #ffb347;
    --text: #000000;
    --muted: #af791c;
    --o_text: #000000;
    --card: #ffffff;
    --nav-h: 68px;
    --footer_color: #2a1703;
    --footer-tcolor: #f8f3e6
  }

  html { scroll-behavior: smooth; }

  // whatsapp css


  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
  }

  /* ── NAVBAR ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0;
    height: var(--nav-h);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5vw;
    z-index: 999;
    background: #3b2205;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    transition: all .3s;
  }
  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.9rem;
    letter-spacing: .12em;
    color: var(--text);
    cursor: pointer;
  }
  .nav-logo  { color: #ffffff; }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links button {
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: .88rem; font-weight: 500;
    letter-spacing: .08em; text-transform: uppercase;
    color: #ffffff;
    padding: 4px 0;
    border-bottom: 2px solid transparent;
    transition: color .25s, border-color .25s;
  }
  .nav-links button:hover,
  .nav-links button.active { color: #b8860b; border-bottom-color: #b8860b; }

  .hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 4px;
  }
  .hamburger span {
    display: block; width: 24px; height: 2px;
    background: var(--text); transition: all .3s;
  }

  /* ── SECTIONS ── */
  .section {
  min-height: auto;
  padding-top: 5px;
padding-right: 5vw;
padding-bottom: 40px;
padding-left: 5vw;
}

.phone-container {
  width: 100%;
}

.phone-input-field {
  width: 100% !important;
  height: 52px !important;
  padding-left: 55px !important;
  border: 1px solid var(--border) !important;
  background: var(--card) !important;
  color: var(--text) !important;
  font-size: 0.95rem !important;
  font-family: 'DM Sans', sans-serif !important;
}

.phone-dropdown {
  border: 1px solid var(--border) !important;
  background: var(--card) !important;
}

  /* ── HOME ── */
  .home {
    display: flex; flex-direction: column;
    justify-content: center; align-items: flex-start;
    position: relative; overflow: hidden;
    padding-top: calc(var(--nav-h) + 40px);
    min-height: 100vh;
  }
  .home-noise {
    position: absolute; inset: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    opacity: .4;
  }
  .home-glow {
    position: absolute; top: -20%; right: -10%;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,.18) 0%, transparent 70%);
    animation: pulse 6s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes pulse {
    0%,100% { transform: scale(1); opacity: .6; }
    50% { transform: scale(1.15); opacity: 1; }
  }
  .home-tag {
    font-size: 1.8rem; font-weight: 700; letter-spacing: .22em;
    text-transform: uppercase; color: var(--accent);
    margin-bottom: 1.2rem;
    opacity: 0; animation: fadeUp .6s .2s forwards;
    max-width: 820px;
  text-align: center;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  }
  .home-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 8vw, 3rem);
  line-height: .95;
  letter-spacing: .03em;
  color: var(--text);

  max-width: 820px;
  text-align: center;
  margin: 0 auto;

    padding-top: 30px;
  padding-bottom: 30px;

  opacity: 0;
  animation: fadeUp .7s .35s forwards;
}

  .home-headline em {
    font-style: normal;
    -webkit-text-stroke: 1.5px var(--accent);
    color: transparent;
  }
  .home-sub {
    margin-top: 1.8rem;
    max-width: 480px;
    font-size: 1.05rem; font-weight: 300; line-height: 1.7;
    color: var(--muted);
    opacity: 0; animation: fadeUp .7s .5s forwards;
      max-width: 820px;
  text-align: center;
  margin: 0 auto;
  }
  .home-cta {
    margin-top: 2.8rem; display: flex; gap: 1rem; flex-wrap: wrap;
    opacity: 0; animation: fadeUp .7s .65s forwards;
      max-width: 820px;
  text-align: center;
  margin: 0 auto;
    padding-top: 20px;
  padding-bottom: 20px;
  }
  .btn-primary {
    background: var(--accent); color: #fff;
    padding: .85rem 2.2rem;
    border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: .9rem; font-weight: 600;
    letter-spacing: .06em; text-transform: uppercase;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
    transition: background .25s, transform .2s;
  }
  .btn-primary:hover { background: #232323; transform: translateY(-2px); }
  .btn-outline {
    background: transparent; color: var(--text);
    padding: .85rem 2.2rem;
    border: 1px solid var(--border); cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: .9rem; font-weight: 500;
    letter-spacing: .06em; text-transform: uppercase;
    transition: border-color .25s, color .25s, transform .2s;
  }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

  .home-stats {
    margin-top: 2rem; display: flex; gap: 3.5rem; flex-wrap: wrap;
    opacity: 0; animation: fadeUp .7s .8s forwards;
    max-width: 820px;
  text-align: center;
  margin: 0 auto;

    padding-top: 20px;
  padding-bottom: 20px;
  }
  .stat-item {}
  .stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.8rem; color: var(--accent); line-height: 1;
  }
  .stat-label {
    font-size: .78rem; font-weight: 500; letter-spacing: .1em;
    text-transform: uppercase; color: var(--muted); margin-top: .3rem;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── ABOUT ── */
  .section-label {
    font-size: .75rem; font-weight: 700; letter-spacing: .24em;
    text-transform: uppercase; color: var(--accent);
    margin-bottom: 1rem;
    text-align: center;
    margin: 0 auto;
  }
    

  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.6rem, 5vw, 4.5rem);
    line-height: 1; letter-spacing: .04em;
    color: var(--text); margin-bottom: 1.5rem;
    text-align: center;
    margin: 0 auto;
  }
  .section-desc {
    font-size: 1.2rem; font-weight: 300; line-height: 1.8;
    color: var(--o_text); max-width: 540px;
    text-align: center;
    margin: 0 auto;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem; align-items: center;
    margin-top: 3rem;
  }
  .about-visual {
    position: relative; aspect-ratio: 1;
    max-width: 440px;
  }
  .about-box-main {
    position: absolute; inset: 10% 0 0 10%;
    background: var(--card);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
  }
  .about-box-accent {
    position: absolute; top: 0; left: 0;
    width: 60%; height: 60%;
    background: var(--accent); opacity: .12;
  }
  .about-box-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 9rem; color: var(--border);
    user-select: none; line-height: 1;
  }
  .about-badge {
    position: absolute; bottom: 6%; right: -4%;
    background: var(--accent); color: #fff;
    padding: 1rem 1.4rem;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.6rem; letter-spacing: .08em;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }
  .about-badge span { font-size: .65rem; font-family: 'DM Sans', sans-serif; font-weight: 500; display: block; letter-spacing: .15em; }

  .about-features { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 1.2rem; }
  .feature-item {
    display: flex; gap: 1rem; align-items: flex-start;
    padding: 1rem 1.2rem;
    background: var(--card); border: 1px solid var(--border);
    transition: border-color .25s, transform .25s;
    cursor: default;
  }
  .feature-item:hover { border-color: var(--accent); transform: translateX(6px); }
  .feature-icon { font-size: 1.5rem; min-width: 36px; margin-top: 2px; }
  .feature-title { font-weight: 600; font-size: .95rem; color: var(--text); }
  .feature-desc { font-size: .85rem; color: var(--muted); margin-top: .25rem; line-height: 1.5; }

  /* ── SERVICES ── */
  .services-intro { 
  max-width: 560px;
   margin-bottom: 1.5rem; }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .service-card {
    background: var(--card);
    padding: 2.2rem;
    transition: background .25s;
    cursor: default;
    position: relative; overflow: hidden;
  }
  .service-card::after {
    content: '';
    position: absolute; left: 0; bottom: 0;
    height: 3px; width: 0;
    background: var(--accent);
    transition: width .35s;
  }
  .service-card:hover { background: #a2a2a2; }
  .service-card:hover::after { width: 100%; }
  .service-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: .95rem; letter-spacing: .18em;
    color: var(--accent); margin-bottom: 1.2rem;
  }
  .service-icon { font-size: 2.2rem; margin-bottom: 1rem; }
  .service-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem; letter-spacing: .06em;
    color: var(--text); margin-bottom: .6rem;
  }
  .service-desc { font-size: .88rem; color: var(--muted); line-height: 1.7; }
  .service-tags { margin-top: 1.2rem; display: flex; flex-wrap: wrap; gap: .5rem; }
  .service-tag {
    font-size: .7rem; font-weight: 600; letter-spacing: .1em;
    text-transform: uppercase; color: var(--accent2);
    background: rgba(255,179,71,.08);
    padding: .2rem .6rem; border: 1px solid rgba(255,179,71,.2);
  }

  /* ── CONTACT ── */
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1.4fr;
    gap: 4rem; align-items: start;
    margin-top: 3rem;
  }
  .contact-info { display: flex; flex-direction: column; gap: 1.5rem; }
  .contact-detail {
    display: flex; gap: 1rem; align-items: flex-start;
    padding: 1.2rem;
    border: 1px solid var(--border);
    background: var(--card);
    transition: border-color .25s;
  }
  .contact-detail:hover { border-color: var(--accent); }
  .contact-detail-icon { font-size: 1.4rem; }
  .contact-detail-label {
    font-size: .72rem; font-weight: 700; letter-spacing: .15em;
    text-transform: uppercase; color: var(--accent); margin-bottom: .3rem;
  }
  .contact-detail-val { font-size: .95rem; color: var(--text); line-height: 1.5; }

  .contact-form { display: flex; flex-direction: column; gap: 1.2rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
  .form-group { display: flex; flex-direction: column; gap: .4rem; }
  .form-label {
    font-size: .75rem; font-weight: 600; letter-spacing: .12em;
    text-transform: uppercase; color: var(--muted);
  }
  .form-input, .form-textarea {
    background: var(--card); border: 1px solid var(--border);
    color: var(--text); padding: .85rem 1rem;
    font-family: 'DM Sans', sans-serif; font-size: .95rem;
    outline: none; transition: border-color .25s;
    resize: none;
  }
  .form-input:focus, .form-textarea:focus { border-color: var(--accent); }
  .form-input::placeholder, .form-textarea::placeholder { color: var(--muted); }
  .form-textarea { min-height: 130px; }
  .form-success {
    padding: 1rem; background: rgba(255,77,0,.1);
    border: 1px solid var(--accent); color: var(--accent);
    font-size: .9rem; font-weight: 500; text-align: center;
  }

  /* ════════════════════════════════════════
     REGISTRATION MODAL  (new section)
  ════════════════════════════════════════ */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 1100;
    background: rgba(0,0,0,.72);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    animation: overlayIn .2s ease;
  }
  @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }

  .modal-box {
    background: #fff;
    border: 1px solid #e0e0e0;
    width: 100%; max-width: 820px;
    max-height: 90vh; overflow-y: auto;
    position: relative;
    animation: modalUp .3s ease;
  }
  @keyframes modalUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .modal-close {
    position: absolute; top: 1.1rem; right: 1.3rem;
    background: none; border: none; cursor: pointer;
    color: #aaa; font-size: 1.3rem; line-height: 1;
    transition: color .2s; z-index: 2;
  }
  .modal-close:hover { color: var(--accent); }

  .modal-header {
    padding: 2.2rem 2.5rem 1.4rem;
    border-bottom: 1px solid #ebebeb;
  }
  .modal-step-tag {
    font-size: .7rem; font-weight: 700; letter-spacing: .22em;
    text-transform: uppercase; color: var(--accent); margin-bottom: .5rem;
  }
  .modal-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem; letter-spacing: .06em; color: #111;
  }
  .modal-subtitle { font-size: .88rem; color: var(--muted); margin-top: .35rem; }

  /* Choice cards */
 .reg-choice-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 🔥 FIX */
  gap: 1.5rem;
  padding: 2rem;
}
  .reg-choice-card {
    border: 2px solid #e8e8e8;
    padding: 1.8rem; cursor: pointer; background: #fafafa;
    text-align: left; position: relative; overflow: hidden;
    transition: border-color .25s, box-shadow .25s, transform .25s;
  }
  .reg-choice-card:hover {
    border-color: var(--accent);
    box-shadow: 0 8px 32px rgba(255,77,0,.1);
    transform: translateY(-4px);
  }
  .reg-card-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: #e8e8e8; transition: background .25s;
  }
  .reg-choice-card:hover .reg-card-bar { background: var(--accent); }

  .reg-choice-icon { font-size: 2.6rem; margin-bottom: .9rem; }
  .reg-choice-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.7rem; letter-spacing: .05em; color: #111; margin-bottom: .4rem;
  }
  .reg-choice-desc { font-size: .84rem; color: var(--muted); line-height: 1.6; }
  .reg-choice-perks { margin-top: 1.1rem; display: flex; flex-direction: column; gap: .35rem; }
  .reg-choice-perk { font-size: .8rem; color: #333; display: flex; align-items: flex-start; gap: .45rem; }
  .perk-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; margin-top: 5px; }
  .reg-choice-price {
    margin-top: 1.4rem; padding-top: 1rem; border-top: 1px solid #ebebeb;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.4rem; color: var(--accent); letter-spacing: .04em;
  }
  .reg-choice-price small { font-size: .72rem; font-family: 'DM Sans',sans-serif; font-weight: 400; color: var(--muted); margin-left: .3rem; }

  /* Registration form */
  .reg-form-wrap { padding: 2rem 2.5rem 2.5rem; }
  .reg-back-btn {
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: .8rem; font-weight: 600;
    letter-spacing: .1em; text-transform: uppercase; color: var(--muted);
    display: flex; align-items: center; gap: .4rem;
    margin-bottom: 1.8rem; transition: color .2s;
  }
  .reg-back-btn:hover { color: var(--accent); }
  .reg-type-pill {
    display: inline-flex; align-items: center; gap: .5rem;
    background: rgba(255,77,0,.08); border: 1px solid rgba(255,77,0,.25);
    color: var(--accent); padding: .3rem .9rem;
    font-size: .76rem; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; margin-bottom: 1.6rem;
  }
  .reg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
  .reg-full { grid-column: 1 / -1; }
  .reg-select {
    width: 100%; background: var(--card); border: 1px solid var(--border);
    color: var(--text); padding: .85rem 2.2rem .85rem 1rem;
    font-family: 'DM Sans', sans-serif; font-size: .95rem;
    outline: none; cursor: pointer; transition: border-color .25s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b6b7a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 1rem center;
  }
  .reg-select:focus { border-color: var(--accent); }
  .reg-actions {
    display: flex; gap: 1rem; margin-top: 1.8rem;
    padding-top: 1.5rem; border-top: 1px solid #ebebeb; flex-wrap: wrap;
  }

  /* Success */
  .reg-success { text-align: center; padding: 3.5rem 2rem; }
  .reg-success-icon { font-size: 3.8rem; margin-bottom: 1rem; }
  .reg-success-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.4rem; letter-spacing: .06em; color: #111; margin-bottom: .7rem;
  }
  .reg-success-msg { font-size: .93rem; color: var(--muted); line-height: 1.7; max-width: 380px; margin: 0 auto 2rem; }
  .reg-success-msg strong { color: #111; }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid var(--border);
    padding: 1rem 2vw;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 1rem;
    background: var(--footer_color);
  }
  .footer-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.4rem; letter-spacing: .1em; color: var(--footer-tcolor);
  }
  .footer-copy { font-size: .8rem; color: var(--footer-tcolor); }

  /* ── SCROLL REVEAL ── */
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity .6s, transform .6s; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  
  
  /* ── RESPONSIVE ── */
  @media (max-width: 820px) 
  
  {

        .home-tag {
        letter-spacing: 0.08em;
        font-size: 1.25rem;
        font-weight: 1000;
        font-family: 'Bebas Neue', sans-serif;
        font-size: clamp(4rem, 8vw, 8rem);
        line-height: .95; letter-spacing: .03em;
      }
        .home-cta {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }

      .btn-primary,
      .btn-outline {
        width: auto;
        padding: 12px 18px;
        font-size: 0.75rem;
      }
        .home-stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        text-align: center;
      }

      .footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .footer-organizer {
      justify-content: center;
      align-items: center;
    }

        .reg-choice-wrap {
      grid-template-columns: 1fr;
          }

    .about-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .about-visual {
      display: block;
      width: 100%;
      max-width: 320px;
      margin: 0 auto;
    }

    .about-box-num {
      font-size: 5rem;
    }

    .about-badge {
      font-size: 1.1rem;
      padding: 0.8rem 1rem;
      right: 0;
    }



  
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .mobile-menu {
      position: fixed; inset: 0; top: var(--nav-h);
      background: var(--surface);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 2.5rem; z-index: 998;
    }
    .mobile-menu button {
      background: none; border: none; cursor: pointer;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2.5rem; letter-spacing: .1em; color: var(--text);
    }
    .mobile-menu button:hover { color: var(--accent); }
    .about-grid { grid-template-columns: 1fr; }
    .about-visual {
       display: block;
        max-width: 100%;
        margin: 2rem auto 0;}

    .contact-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .home-stats { gap: 2rem; }
    /* modal responsive */
    .reg-choice-wrap { grid-template-columns: 1fr; padding: 1.4rem; }
    .reg-grid { grid-template-columns: 1fr; }
    .modal-header { padding: 1.6rem 1.4rem 1.1rem; }
    .reg-form-wrap { padding: 1.4rem; }
  }
          .social-links {
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
      }

.social-links a {
  width: 42px;
  height: 42px;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 1.2rem;
  text-decoration: none;
  background: #fff;
  transition: 0.3s ease;
}

.social-links a:hover {
  background: var(--accent);
  color: #fff;
  transform: translateY(-3px);
}
  .nav-logo {
  display: flex;
  align-items: center;
  gap: 5px;
}

.logo-img {
  width: 60px;
  height: 50px;
  object-fit: contain;

  background: #fff;
  padding: 2px;
  border-radius: 14px;

  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
  .footer-organizer {
  display: flex;
  align-items: center;
  gap: 14px;
}

.footer-org-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  background: transparent;
  padding: 10px 14px;

  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 14px;
}

.footer-org-title {
  color: #ffffff;

  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer-second-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
}


`;

// ── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { num: "01", icon: "🏠", title: "Property Showcase", desc: "Explore premium residential, commercial, and luxury properties from top developers and trusted builders.", tags: ["Live", "Clarity"] },
  { num: "02", icon: "🤝", title: "Investment Opportunities", desc: "Discover profitable real estate investment options with high growth potential and secure returns.", tags: ["Safe", "Reliable"] },
  { num: "03", icon: "🏛️", title: "Exhibition Stalls", desc: "Hundreds of exhibitors showcasing next-generation products and innovations under one roof.", tags: ["Demos", "Launches"] },
  { num: "04", icon: "👨‍💼", title: "Top Notch Celebrity Engagement", desc: "Intensive hands-on sessions led by industry practitioners. Earn certifications.", tags: ["Interactive", "CPD"] },
  { num: "05", icon: "⚖️", title: "Legal & Documentation Support", desc: "Receive expert advice on property verification, registration, legal checks, and documentation processes.", tags: ["Legal", "Rights"] },
  { num: "06", icon: "🌐", title: "Influences & Media Coverage", desc: "Full remote attendance with live streams, virtual booths, and online networking.", tags: ["Hybrid", "On-demand"] },
];
const FEATURES = [

];
const CONTACT_DETAILS = [
  { icon: "📍", label: "Venue", val: "MALLESWARAM GROUND, BENGALURU" },

  { icon: "📞", label: "Phone", val: "+91 98765 43210" },

  { icon: "✉️", label: "Email", val: "brx2026@dgateis.com" },

  { icon: "🕐", label: "Date", val: "December, 25 2030" },

  {
    icon: "🔗",
    label: "Social Links",
    val: ""
  },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ══════════════════════════════════════════════════════
//  REGISTRATION MODAL  ← new component
// ══════════════════════════════════════════════════════
const STALL_PERKS = [
  "Ready customer flow.",
  "Brand visibility.",
  "One to One Interaction.",
  "Sales opportunities.",
];
const INVESTOR_PERKS = [
  "Premium positioning",
  "Maximum visibility",
  "Direct business exposure",
  "Celebrity Promotions/ Endorsments",
];

function RegistrationModal({ onClose }) {
  // step: "choose" → show 2 option cards
  //       "stall"  → show stall form
  //       "investor" → show investor form
  //       "success"  → confirmation screen
  const [step, setStep] = useState("choose");
  const [regType, setRegType] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const pickType = (type) => {
    setRegType(type);

    if (type === "visitor") {
      setStep("visitor");   // form
    } else {
      setStep("details");   // info page
    }
  };

  const submit = async () => {

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone
    ) {

      alert("Please fill all fields");

      return;
    }

    try {

      console.log("Sending Data...");

      const response = await axios.post(
        "http://localhost:5000/register",
        {
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone
        }
      );

      console.log(response.data);

      alert(response.data.message);

      setStep("success");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
    }
  };


  /* const submit = () => {
    if (!form.firstName || !form.lastName || !form.email) return; // basic validation
    setStep("success");
  }; */

  /* const submit = async () => {

    if (!form.name || !form.email) {
      alert("Please fill required fields");
      return;
    }

    try {

      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStep("success");
      } else {
        alert("Failed to save registration");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  }; */

  // click outside modal box → close
  const onOverlayClick = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div className="modal-overlay" onClick={onOverlayClick}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* STEP 1 */}
        {step === "choose" && (
          <>
            <div className="modal-header">
              <div className="modal-step-tag">Registration </div>
              <div className="modal-title">Complete Your Registration</div>
              <div className="modal-subtitle">
                Register now to join the expo event.
              </div>
            </div>

            <div className="reg-choice-wrap">

              {/* ✅ Visitor */}
              <button className="reg-choice-card" onClick={() => pickType("visitor")}>
                <div className="reg-card-bar" />
                <div className="reg-choice-icon">🎟️</div>
                <div className="reg-choice-title">Visitor</div>
                <div className="reg-choice-desc">
                  Attend the expo and explore sessions & stalls.
                </div>
                <div className="reg-choice-price"></div>
              </button>

              {/* ✅ Stall */}
              <button className="reg-choice-card" onClick={() => pickType("stall")}>
                <div className="reg-card-bar" />
                <div className="reg-choice-icon">🏪</div>
                <div className="reg-choice-title">Stall</div>
                <div className="reg-choice-desc">
                  Showcase your products and get leads.
                </div>
                <div className="reg-choice-price"></div>
              </button>

              {/* ✅ Investor */}
              <button className="reg-choice-card" onClick={() => pickType("investor")}>
                <div className="reg-card-bar" />
                <div className="reg-choice-icon">💼</div>
                <div className="reg-choice-title">Investor</div>
                <div className="reg-choice-desc">
                  Connect with startups and explore investments.
                </div>
                <div className="reg-choice-price"></div>
              </button>

            </div>
          </>
        )}

        {/* VISITOR FORM */}
        {step === "visitor" && (
          <div className="reg-form-wrap">

            <button
              className="reg-back-btn"
              onClick={() => setStep("choose")}
            >
              ← Back
            </button>

            <div className="modal-title">
              Visitor Registration
            </div>

            <div className="modal-subtitle">
              Fill in your details to attend the expo.
            </div>

            <div
              className="form-row"
              style={{ marginTop: "1.5rem" }}
            >

              <div className="form-group">
                <label className="form-label">
                  First Name *
                </label>

                <input
                  className="form-input"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={form.firstName}
                  onChange={handle}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Last Name *
                </label>

                <input
                  className="form-input"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={form.lastName}
                  onChange={handle}
                />
              </div>

            </div>

            <div className="form-group">
              <label className="form-label">
                Email *
              </label>

              <input
                className="form-input"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handle}
              />
            </div>

            {/* Phone number field */}
            <div className="form-group">
              <label className="form-label">
                Phone Number *
              </label>

              <input
                className="form-input"
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={handle}
              />
            </div>

            <div className="reg-actions">

              <button
                className="btn-primary"
                onClick={submit}
              >
                Confirm Registration →
              </button>

              <button
                className="btn-outline"
                onClick={() => setStep("choose")}
              >
                Cancel
              </button>

            </div>

          </div>
        )}

        {/* DETAILS (Investor & Stall) */}
        {step === "details" && (
          <div className="reg-form-wrap">
            <button className="reg-back-btn" onClick={() => setStep("choose")}>
              ← Back
            </button>

            <div className="modal-title">
              {regType === "stall" ? "Stall" : "Investor"}
            </div>

            <div className="modal-subtitle">
              {regType === "stall"
                ? "Showcase your brand and attract customers."
                : "Connect with startups and explore investment opportunities."}
            </div>

            {/* 🔥 Highlight Card */}
            <div className="details-card">
              <div className="details-card-header">
                {regType === "stall" ? "🏪 Stall Benefits" : "💼 Investor Benefits"}
              </div>

              <div className="details-list">
                {(regType === "stall" ? STALL_PERKS : INVESTOR_PERKS).map((p, i) => (
                  <div className="details-item" key={i}>
                    <span className="details-icon">✔</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="reg-actions">
              <button
                className="btn-primary-whatsapp"
                onClick={() => {
                  const phone = "919538562600"; // your WhatsApp number
                  const message = encodeURIComponent(
                    `Hello, I am interested in ${regType} registration for Expo.`
                  );

                  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
                }}
              > Contact on Whatsapp
              </button>

              <button className="btn-outline" onClick={() => setStep("choose")}>
                Back
              </button>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {step === "success" && (
          <div className="reg-success">
            <h2>Registered Successfully!</h2>
            <p>
              {form.firstName} {form.lastName}
            </p>
            <button onClick={onClose}>Close</button>
          </div>
        )}

      </div>
    </div>
  );

}


// ── Components ────────────────────────────────────────────────────────────────
function Navbar({ active, setActive, menuOpen, setMenuOpen }) {
  const links = ["Home", "About", "Services", "Contact"];
  return (
    <>
      <nav className="nav">
        <div className="nav-logo" onClick={() => setActive("Home")}>
          <img
            src="/src/assets/brx.png"
            alt="logo"
            className="logo-img"

          />

        </div>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l}>
              <button className={active === l ? "active" : ""} onClick={() => setActive(l)}>{l}</button>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          {links.map(l => (
            <button key={l} onClick={() => { setActive(l); setMenuOpen(false); }}>{l}</button>
          ))}
        </div>
      )}
    </>
  );
}





// openModal prop added — triggers the registration modal
function Home({ setActive, openModal }) {
  return (
    <section id="Home" className="section home">
      <div className="home-noise" />
      <div className="home-glow" />
      <div className="home-tag">BENGALURU REAL ESTATE EXPO 2026</div>
      <h1 className="home-headline">
        A Business <em>Platform</em><br />Connecting Buyers,<br />Investors & Developers
      </h1>
      <p className="home-sub">
        “Connecting real buyers with real sellers in a trusted environment”
      </p>
      <div className="home-cta">
        <button className="btn-primary" onClick={() => setActive("Services")}>Explore Expo</button>
        <button className="btn-outline" onClick={openModal}>Register Now</button>
      </div>
      <div className="home-stats">
        {[["500+", "Exhibitors"], ["12K+", "Attendees"], ["80+", "Speakers"], ["3", "Days"]].map(([n, l]) => (
          <div className="stat-item" key={l}>
            <div className="stat-num">{n}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const r1 = useReveal(), r2 = useReveal();
  return (
    <section id="About" className="section">
      <div className="about-grid">
        <div ref={r1} className="reveal">
          <div className="section-label">About The Expo</div>
          <h2 className="section-title">Built For Bold<br />Thinkers</h2>
          <p className="section-desc">
            Today, real estate marketing is becoming expensive and less predictable.
            Developers are spending heavily on ads but still struggle to get
            serious buyers.
            At the same time, buyers are confused and lack trust in online
            platforms.
          </p>
          <div className="about-features">
            {FEATURES.map(f => (
              <div className="feature-item" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div ref={r2} className="reveal about-visual">
          <div className="about-box-accent" />
          <div className="about-box-main">
            <div className="about-box-num">5</div>
          </div>
          <div className="about-badge">
            5 Years<span>of innovation</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const r = useReveal();

  return (
    <section id="Services" className="section">

      {/* Intro */}
      <div ref={r} className="reveal services-intro">
        <div className="section-label">What We Offer</div>
        <h2 className="section-title">Everything You<br />Need At One Place</h2>
        <p className="section-desc">
          This is not about showcasing properties.
          This is about generating business
        </p>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {SERVICES.map((s, i) => {
          const rr = useReveal();
          return (
            <div
              ref={rr}
              className="reveal service-card"
              key={s.num}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="service-num">{s.num}</div>
              <div className="service-icon">{s.icon}</div>
              <div className="service-title">{s.title}</div>
              <div className="service-desc">{s.desc}</div>
              <div className="service-tags">
                {s.tags.map(t => (
                  <span className="service-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>


      {/* ✅ Sponsor Marquee (correct place) 
      <div className="sponsor-section">
        <h2 className="sponsor-title">Our Sponsors</h2>
        <div className="sponsor-track">

          {[...SPONSORS, ...SPONSORS].map((logo, i) => (
            <img key={i} src={logo} alt="sponsor" />
          ))}
        </div>
      </div> */}

    </section>
  );
}


const SPONSORS = [
  "/public/images/deal.png",
  "/public/images/sponsor-investment.png",
  "/public/images/support.png",
  "/public/images/deal2.png",
  "/public/images/investor.png",

];


function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const r = useReveal();

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="Contact" className="section">
      <div ref={r} className="reveal">
        <div className="section-label">Get In Touch</div>
        <h2 className="section-title">Let's Connect</h2>
        <p className="section-desc">“Let’s build one of Bengaluru’s
          most impactful real estate
          business platforms together”</p>
      </div>
      <div className="contact-grid">
        <div className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input className="form-input" name="name" placeholder="John Doe" value={form.name} onChange={handle} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" name="email" placeholder="john@email.com" value={form.email} onChange={handle} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input className="form-input" name="subject" placeholder="How can we help?" value={form.subject} onChange={handle} />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-textarea" name="message" placeholder="Write your message here..." value={form.message} onChange={handle} />
          </div>
          {sent
            ? <div className="form-success">✓ Message sent! We'll get back to you shortly.</div>
            : <button className="btn-primary" onClick={submit}>Send Message →</button>
          }
        </div>
        <div className="contact-info">
          {CONTACT_DETAILS.map(d => (
            <div className="contact-detail" key={d.label}>
              <div className="contact-detail-icon">{d.icon}</div>
              <div>
                <div className="contact-detail-label">{d.label}</div>
                {d.label === "Social Links" ? (
                  <div className="social-links">

                    <a href="https://www.instagram.com/brx.2026/" target="_blank" rel="noreferrer">
                      <FaInstagram />
                    </a>

                    <a href="https://www.facebook.com/profile.php?id=61589084353808" target="_blank" rel="noreferrer">
                      <FaFacebookF />
                    </a>

                    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                      <FaLinkedinIn />
                    </a>

                    <a href="https://www.youtube.com/channel/UCQ9NuSWZm3-9IE8e8OC5S5Q" target="_blank" rel="noreferrer">
                      <FaYoutube />
                    </a>

                    <a href="https://wa.me/919538562600" target="_blank" rel="noreferrer">
                      <FaWhatsapp />
                    </a>

                    <a
                      href="mailto:brx2026@dgateis.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaEnvelope />
                    </a>

                  </div>
                ) : (
                  <div
                    className="contact-detail-val"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {d.val}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Footer({ setActive }) {
  return (
    <footer className="footer">

      <div className="footer-organizer">

        <img
          src="/src/assets/brx.png"
          alt="logo"
          className="logo-img"
        />

        <div className="footer-org-content">

          <div className="footer-org-title">
            Organized By:
          </div>

          <a
            href="https://www.dgateis.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/src/assets/dgate.jpeg"
              alt="dgate-logo"
              className="footer-second-logo"
            />
          </a>

        </div>

      </div>

      <div style={{ display: "flex", gap: "1.8rem" }}>
        {["Home", "About", "Services", "Contact"].map(l => (
          <button
            key={l}
            onClick={() => setActive(l)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--footer-tcolor)",
              fontSize: ".82rem",
              fontFamily: "DM Sans, sans-serif",
              letterSpacing: ".08em",
              textTransform: "uppercase"
            }}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="footer-copy">
        © D-GATE Integrated Services 2026. All rights reserved.
      </div>

    </footer>
  );
}




// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showReg, setShowReg] = useState(false); // ← NEW: controls modal visibility

  const navigate = (page) => {
    setActive(page);
    setMenuOpen(false);
    const el = document.getElementById(page);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>
      <Navbar active={active} setActive={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Home setActive={navigate} openModal={() => setShowReg(true)} />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer setActive={navigate} />

      {/* Modal renders on top of everything when showReg is true */}
      {showReg && <RegistrationModal onClose={() => setShowReg(false)} />}
    </>
  );
}





