import { useState } from "react";

function App() {
  const [step, setStep] = useState("intro");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  // Skicka meddelande (enkelt exempel)
  function sendChat(message) {
    if (!message.trim()) return;
    setChat([...chat, { text: message, from: "user" }]);
    setInput("");
  }

  // Visa olika steg
  function renderStep() {
    if (step === "intro") {
      return (
        <div className="text-center mt-10">
          <h1 className="text-2xl font-bold mb-4">Välkommen till WardrobeBox 👗</h1>
          <p className="text-gray-600 mb-4">
            Din personliga stilassistent. Välj en plan för att komma igång!
          </p>
          <button
            onClick={() => setStep("plan")}
            className="bg-lux-gold text-lux-dark px-4 py-2 rounded-xl"
          >
            Börja nu
          </button>
        </div>
      );
    }

    if (step === "plan") {
      return (
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold mb-3">Välj din plan:</h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setSelectedPlan("basic");
                setStep("checkout");
              }}
              className="bg-lux-gold text-lux-dark px-4 py-2 rounded-xl"
            >
              Basic
            </button>
            <button
              onClick={() => {
                setSelectedPlan("premium");
                setStep("checkout");
              }}
              className="bg-lux-gold text-lux-dark px-4 py-2 rounded-xl"
            >
              Premium
            </button>
          </div>
        </div>
      );
    }

    if (step === "checkout" && selectedPlan) {
      return (
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold mb-3">
            Du valde: {selectedPlan.toUpperCase()}
          </h2>
          <p className="text-gray-600 mb-4">Bekräfta din beställning:</p>
          <button
            onClick={() => setStep("chat")}
            className="bg-lux-gold text-lux-dark px-4 py-2 rounded-xl"
          >
            Fortsätt till chatten
          </button>
        </div>
      );
    }
    if (step === "chat") {
      return (
        <div className="max-w-md mx-auto mt-10">
          <h2 className="text-xl font-semibold mb-3 text-center">
            Chatta med din stilassistent 💬
          </h2>
          <div className="bg-white border rounded-lg p-4 h-64 overflow-y-auto mb-4 shadow">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  msg.from === "user" ? "text-right text-lux-dark" : "text-left text-gray-600"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Skriv ett meddelande..."
              className="flex-1 border rounded-lg px-3 py-2"
            />
            <button
              onClick={() => sendChat(input)}
              className="bg-lux-gold text-lux-dark px-3 rounded-xl"
            >
              Skicka
            </button>
          </div>
        </div>
      );
    }

    if (step === "faq") {
      return <div className="text-center mt-10">Här kommer FAQ senare 📦</div>;
    }
  }

  return (
    <div className="min-h-screen bg-lux-bg text-lux-dark font-sans">
      {renderStep()}
      <footer className="text-center text-sm text-gray-500 mt-6">
        © 2025 WardrobeBox – Style made simple
      </footer>
    </div>
  );
}

export default App;
