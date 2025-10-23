const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Predefined bot responses
const botResponses = [
  "That's interesting! Tell me more.",
  "I see. What are your thoughts on that?",
  "How does that make you feel?",
  "Could you elaborate a bit?",
  "Thanks for sharing!",
  "I'm not sure I understand. Can you rephrase?",
  "Let me think about that for a moment."
];

/**
 * Scrolls the message container to the bottom
 */
const scrollToBottom = () => {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

/**
 * Adds a message to the chat window
 */
const addMessage = (text, sender) => {
  const messageWrapper = document.createElement('div');
  messageWrapper.classList.add('flex');

  const messageBubble = document.createElement('div');
  messageBubble.classList.add('p-3', 'rounded-xl', 'max-w-xs', 'shadow');
  messageBubble.textContent = text;

  if (sender === 'user') {
    messageWrapper.classList.add('justify-end');
    messageBubble.classList.add('bg-blue-600', 'text-white');
  } else {
    messageWrapper.classList.add('justify-start');
    messageBubble.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
  }

  messageWrapper.appendChild(messageBubble);
  messagesContainer.appendChild(messageWrapper);
  scrollToBottom();
};

/**
 * Handles the bot's response
 */
const handleBotResponse = () => {
  setTimeout(() => {
    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
    addMessage(randomResponse, 'bot');
  }, 1000);
};

/**
 * Handles user message sending
 */
const handleSendMessage = () => {
  const text = userInput.value.trim();
  if (text) {
    addMessage(text, 'user');
    userInput.value = '';
    handleBotResponse();
  }
};

// Event listeners
sendBtn.addEventListener('click', handleSendMessage);
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSendMessage();
  }
});

window.onload = () => {
  scrollToBottom();
  userInput.focus();
};
