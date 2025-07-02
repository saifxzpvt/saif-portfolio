const micBtn = document.getElementById("mic-btn");
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.continuous = false;

micBtn.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = (e) => {
  const transcript = e.results[0][0].transcript;
  document.getElementById("zeroni-input").value = transcript;
  sendMessage();
};

function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  synth.speak(utter);
}
