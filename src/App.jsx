import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [showAssistant, setShowAssistant] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  // enkel “AI”-respons för demon
  const send = () => {
    if (!msg.trim()) return;
    const user = { from: "du", text: msg };
    setChat((c) => [...c, user]);
    setMsg("");
    setTimeout(() => {
      setChat((c) => [
        ...c,
        { from: "assistant", text: "Noterat! Vi väljer plagg i din stil ✨" },
      ]);
    }, 500);
  };

  // fade in on load
  useEffect(() => {
    document.body.classList.add("mounted");
  }, []);

  return (
    <div className="min-h-screen text-white">
      {/* HEADER */}
      <header className="container-xl py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/images/wardrobebox-logo.png"
            alt="WardrobeBox"
            className="h-10 w-auto drop-glow"
          />
          <span className="font-semibold tracking-wide text-white/90">
            WardrobeBox
          </span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#plans" className="nav-link">Planer</a>
          <button onClick={() => setShowAssistant(true)} className="nav-link">
            Wardrobe Assistant
          </button>
        </nav>
      </header>

      {/* HERO */}
      <main className="container-xl py-10 md:py-16">
        <section className="text-center space-y-6 animate-fade-in">
          <h1 className="hero-title">
            Din personliga stilassistent
          </h1>
          <p className="hero-sub">
            Surprise-box varje månad med nya och cirkulerade plagg.
            Behåll det du älskar, returnera resten – enkelt, hållbart och lyxigt.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="#plans" className="btn-gold">Börja nu</a>
            <button className="btn-ghost" onClick={() => setShowAssistant(true)}>
              Fråga stylist
            </button>
          </div>

          <img
            src="/images/wardrobebox-box.png"
            alt="WardrobeBox paket"
            className="mx-auto mt-10 rounded-3xl shadow-xl hero-box"
            width="460"
            height="320"
          />
        </section>

        {/* PLANER */}
        <section id="plans" className="mt-20 md:mt-28 space-y-3">
          <h2 className="section-title">Välj din plan</h2>
          <p className="section-sub">Pausa eller ändra när som helst.</p>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              { name: "Basic", price: "29 €/mån", desc: "3 utvalda plagg – prova hemma" },
              { name: "Standard", price: "49 €/mån", desc: "5 plagg – mix av nya & pre-loved" },
              { name: "Premium", price: "79 €/mån", desc: "Lyxigare urval & varumärken" }
            ].map((p) => (
              <div key={p.name} className="card hover-card">
                <div className="flex items-center justify-between">
                  <h3 className="card-title">{p.name}</h3>
                  <span className="price">{p.price}</span>
                </div>
                <p className="muted mt-2 mb-5">{p.desc}</p>
                <button className="btn-gold w-full">Välj {p.name}</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="container-xl py-12 text-center text-sm text-white/60">
        © 2025 WardrobeBox — Style made simple
      </footer>

      {/* ASSISTANT MODAL */}
      {showAssistant && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="card w-[92vw] max-w-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Wardrobe Assistant</span>
                <span className="badge">online</span>
              </div>
              <button className="close" onClick={() => setShowAssistant(false)}>✕</button>
            </div>
            <div className="chat">
              {chat.length === 0 && (
                <div className="muted text-sm">Beskriv din stil, storlek eller budget så kör vi igång ✨</div>
              )}
              {chat.map((m, i) => (
                <div key={i} className={m.from === "du" ? "msg me" : "msg bot"}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <input
                className="input"
                placeholder="Skriv ett meddelande…"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <button className="btn-gold" onClick={send}>Skicka</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
