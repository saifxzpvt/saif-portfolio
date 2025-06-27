document.addEventListener("DOMContentLoaded", () => {
  const chatbox = document.getElementById("zeroni-box");
  const toggleBtn = document.getElementById("zeroni-btn");
  const closeBtn = document.getElementById("zeroni-close");
  const messages = document.getElementById("zeroni-messages");
  const input = document.getElementById("zeroni-input");
  const sendBtn = document.getElementById("send-btn");

  toggleBtn.onclick = () => chatbox.classList.toggle("show");
  closeBtn.onclick = () => chatbox.classList.remove("show");

  document.addEventListener("click", (e) => {
    if (!chatbox.contains(e.target) && !toggleBtn.contains(e.target)) {
      chatbox.classList.remove("show");
    }
  });

  const micBtn = document.getElementById("mic-btn");

// Check browser compatibility
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-IN'; // You can also use 'hi-IN' for Hindi

// On voice result
recognition.onresult = (event) => {
  const spokenText = event.results[0][0].transcript;
  input.value = spokenText;
  sendBtn.click(); // auto-send after speech
};

// On error
recognition.onerror = (e) => {
  console.error("Mic error: ", e.error);
  alert("🎤 Mic error: " + e.error);
};

// Start recognition on mic button click
micBtn.onclick = () => {
  recognition.start();
};


  sendBtn.onclick = async () => {
    const userText = input.value.trim();
    if (!userText) return;
    addMessage(userText, "user");
    input.value = "";
    const botReply = await askZeroni(userText);
    addMessage(botReply, "bot");
  };

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  async function askZeroni(message) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer sk-proj-...", // Your key here
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Sorry, couldn't respond.";
  }
});
