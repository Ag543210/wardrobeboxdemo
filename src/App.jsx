import { useState } from "react";

function App(){
  const [step, setStep] = useState("intro");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const plans = [
    {id:"basic", name:"Basic", price:"29 €/mån", desc:"3 utvalda plagg – prova hemma"},
    {id:"standard", name:"Standard", price:"49 €/mån", desc:"5 plagg – mix av nya & pre-loved"},
    {id:"premium", name:"Premium", price:"79 €/mån", desc:"Lyxigare urval & varumärken"}
  ];

  function sendChat(message){
    if(!message.trim()) return;
    setChat(prev => [...prev, {from:"user", text:message}]);
    setInput("");
    setTimeout(()=> {
      setChat(prev => [...prev, {from:"bot", text:"Tack! Vi återkommer med stilförslag ✨"}]);
    }, 600);
  }

  return (
    <div>
      {/* HEADER */}
      <header className="container-xl py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/WardrobeBox Logo Design.png" 
            alt="WardrobeBox Logo" 
            className="h-10 w-auto drop-shadow-[0_4px_10px_rgba(212,163,115,.3)]" 
          />
          <span className="text-xl tracking-wide font-bold">WardrobeBox</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm">
          <button onClick={()=>setStep("intro")} className="btn-ghost">Hem</button>
          <button onClick={()=>setStep("plan")} className="btn-ghost">Planer</button>
          <button onClick={()=>setStep("chat")} className="btn-ghost">Assistant</button>
        </nav>
      </header>

      {/* HUVUDINNEHÅLL */}
      <main className="container-xl py-10 md:py-14">
        {/* INTRO */}
        {step==="intro" && (
          <section className="text-center">
            <h1 className="h1 mb-4">Din personliga stilassistent</h1>
            <p className="muted max-w-2xl mx-auto mb-8">
              Surprise-box varje månad med både nya och cirkulerade plagg. 
              Behåll det du älskar, returnera resten – enkelt, hållbart och lyxigt.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button className="btn-gold" onClick={()=>setStep("plan")}>Börja nu</button>
              <button className="btn-ghost" onClick={()=>setStep("chat")}>Fråga stylist</button>
            </div>

            {/* Här visas boxbilden */}
            <img 
              src="/WardrobeBox Packaging Close-Up (1).png" 
              alt="WardrobeBox paket" 
              className="mx-auto mt-10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,.35)] w-full max-w-lg" 
            />
          </section>
        )}

        {/* PLANER */}
        {step==="plan" && (
          <section>
            <h2 className="h2 mb-2">Välj din plan</h2>
            <p className="muted mb-6">Alla planer kan pausas eller ändras när som helst.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map(p=>(
                <div key={p.id} className="card text-center">
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <div className="mt-2 text-[var(--lux-gold)] font-bold">{p.price}</div>
                  <p className="muted mt-2 mb-5">{p.desc}</p>
                  <button className="btn-gold w-full" onClick={()=>{setSelectedPlan(p); setStep("checkout");}}>
                    Välj {p.name}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CHECKOUT */}
        {step==="checkout" && selectedPlan && (
          <section className="max-w-lg mx-auto card">
            <h2 className="h2 mb-2">Slutför beställning</h2>
            <p className="muted mb-4">Plan: <b>{selectedPlan.name}</b> – {selectedPlan.price}</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="btn-ghost">Kort</button>
              <button className="btn-ghost">MobilePay</button>
              <button className="btn-ghost">Klarna</button>
              <button className="btn-ghost">Apple Pay</button>
            </div>
            <button className="btn-gold w-full" onClick={()=>setStep("chat")}>Bekräfta & chatta med stylist</button>
          </section>
        )}

        {/* CHAT */}
        {step==="chat" && (
          <section className="max-w-2xl mx-auto">
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Wardrobe Assistant</h3>
                <span className="text-xs text-gray-400">AI-stylist • online</span>
              </div>
              <div className="h-64 overflow-y-auto rounded-2xl bg-black/30 border border-white/10 p-3 mb-3">
                {chat.length===0 && (
                  <div className="text-gray-400 text-sm">Börja skriva så matchar vi din stil ✨</div>
                )}
                {chat.map((m,i)=>(
                  <div key={i} className={`mb-2 ${m.from==="user" ? "text-right" : "text-left text-gray-300"}`}>
                    <span className={`inline-block px-3 py-2 rounded-2xl ${m.from==="user" ? "bg-[var(--lux-gold)] text-black" : "bg-white/10"}`}>
                      {m.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  className="flex-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-[var(--lux-gold)]"
                  placeholder="Skriv ett meddelande…"
                  value={input}
                  onChange={(e)=>setInput(e.target.value)}
                  onKeyDown={(e)=>e.key==="Enter" && sendChat(input)}
                />
                <button className="btn-gold" onClick={()=>sendChat(input)}>Skicka</button>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="container-xl py-10 text-center text-sm text-gray-400">
        © 2025 WardrobeBox — Style made simple
      </footer>
    </div>
  );
}

export default App;
