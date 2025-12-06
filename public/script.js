// DOM elements
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// Conversation history for context
const conversationHistory = [];

// Form submit event handler
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Add user message to chat box
  appendMessage("user", userMessage);

  // Clear input field
  input.value = "";

  // Disable form while processing
  setFormDisabled(true);

  // Add user message to conversation history
  conversationHistory.push({
    role: "user",
    text: userMessage,
  });

  // Show temporary thinking animation
  const thinkingMessage = appendThinkingMessage();

  try {
    // Send POST request to backend
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation: conversationHistory,
      }),
    });

    // Check if response is OK
    if (!response.ok) {
      throw new Error(
        `Server error: ${response.status} ${response.statusText}`
      );
    }

    // Parse JSON response
    const data = await response.json();

    // Check if result exists
    if (!data.result) {
      throw new Error("No response received from AI");
    }

    // Replace thinking message with actual AI response
    updateMessage(thinkingMessage, data.result);

    // Add bot response to conversation history
    conversationHistory.push({
      role: "model",
      text: data.result,
    });
  } catch (error) {
    console.error("Error fetching response:", error);

    // Show error message based on error type
    let errorMessage = "Failed to get response from server.";

    if (error.message.includes("No response received")) {
      errorMessage = "Sorry, no response received.";
    } else if (
      error.message.includes("NetworkError") ||
      error.message === "Failed to fetch"
    ) {
      errorMessage = "Network error. Please check your connection.";
    }

    // Replace thinking message with error message
    updateMessage(thinkingMessage, errorMessage);

    // Remove last user message from history on error
    conversationHistory.pop();
  } finally {
    // Re-enable form
    setFormDisabled(false);

    // Focus back on input
    input.focus();
  }
});

/**
 * Appends a new message to the chat box
 * @param {string} sender - Either "user" or "bot"
 * @param {string} text - The message text
 * @returns {HTMLElement} The created message element
 */
function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);

  // Auto-scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  return msg;
}

/**
 * Appends a thinking indicator with animated bubbles
 * @returns {HTMLElement} The created thinking message element
 */
function appendThinkingMessage() {
  const msg = document.createElement("div");
  msg.classList.add("message", "bot");

  // Create container for thinking text and animation
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.gap = "8px";

  // Add "Thinking" text
  const thinkingText = document.createElement("span");
  thinkingText.textContent = "Thinking";
  container.appendChild(thinkingText);

  // Create animated dots container
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("typing-indicator");

  // Create three animated dots
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("span");
    dotsContainer.appendChild(dot);
  }

  container.appendChild(dotsContainer);
  msg.appendChild(container);
  chatBox.appendChild(msg);

  // Auto-scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  return msg;
}

/**
 * Updates an existing message element with new text
 * @param {HTMLElement} messageElement - The message element to update
 * @param {string} newText - The new text content
 */
function updateMessage(messageElement, newText) {
  // Remove typing indicator class if present
  messageElement.classList.remove("typing-indicator");

  // Clear existing content (animated dots)
  messageElement.innerHTML = "";

  // Set new text content
  messageElement.textContent = newText;

  // Auto-scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * Enables or disables the form to prevent multiple submissions
 * @param {boolean} disabled - Whether to disable the form
 */
function setFormDisabled(disabled) {
  input.disabled = disabled;
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = disabled;
  }
}
