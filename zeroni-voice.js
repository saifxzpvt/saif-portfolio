// Text-to-Speech
function speakZeroni(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

// Voice Input
function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";
  recognition.start();

  recognition.onstart = () => {
    document.getElementById("zeroni-reply").textContent = "🎙️ Listening...";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("zeroni-input").value = transcript;
    sendToZeroni();
  };

  recognition.onerror = (event) => {
    document.getElementById("zeroni-reply").textContent = "❌ Mic Error: " + event.error;
  };
}
