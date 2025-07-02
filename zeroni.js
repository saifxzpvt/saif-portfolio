document.getElementById("send-btn").addEventListener("click", sendMessage);

function sendMessage() {
  const input = document.getElementById("zeroni-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  fetch("https://your-backend-url.onrender.com/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
  })
    .then((res) => res.json())
    .then((data) => {
      appendMessage("bot", data.reply || "Sorry, no response.");
    })
    .catch(() => {
      appendMessage("bot", "Server error. Try again later.");
    });
}

function appendMessage(sender, text) {
  const messagesDiv = document.getElementById("zeroni-messages");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
