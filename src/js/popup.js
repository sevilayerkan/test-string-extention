document.addEventListener('DOMContentLoaded', function () {
  clearTextarea();
  initializeTabs();
  initializeCharacterCounter();
  initializeMiscTab();

  const generateButton = document.getElementById('generateButton');
  const copyButton = document.getElementById('copyButton');

  generateButton.addEventListener('click', () => {
    const length = parseInt(document.getElementById('lengthInput').value);
    const removePunct = document.getElementById('removePunct').checked;
    const removeSpace = document.getElementById('removeSpace').checked;

    if (isNaN(length) || length <= 0) {
      showFeedback('Please enter a valid positive number for length', 'error');
      clearTextarea();
    } else {
      document.getElementById('resultText').value = window.generateLoremIpsum(
        length,
        removeSpace,
        removePunct
      );
    }
  });

  copyButton.addEventListener('click', copyToClipboard);
});

function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

function initializeCharacterCounter() {
  const counterText = document.getElementById('counterText');
  const characterCount = document.getElementById('characterCount');

  function updateCount() {
    const text = counterText.value;
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const lines = text.trim() === '' ? '-' : text.split('\n').length;

    characterCount.textContent = 
      `Characters: ${chars} | Words: ${words} | Lines: ${lines}`;
  }

  counterText.addEventListener('input', updateCount);
  // Initialize with empty state
  updateCount();
}

// Clear textarea when the popup is shown
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === 'popup') {
    clearTextarea();
  }
});

function copyToClipboard() {
  const resultText = document.getElementById('resultText').value;
  if (!resultText.trim()) {
    showFeedback('No text to copy', 'error');
    return;
  }
  navigator.clipboard
    .writeText(resultText)
    .then(() => showFeedback('Copied to clipboard!', 'success'))
    .catch((err) => {
      console.error('Failed to copy: ', err);
      showFeedback('Failed to copy to clipboard', 'error');
    });
}

function showFeedback(message, type) {
  const feedbackElement = document.createElement('div');
  feedbackElement.textContent = message;
  feedbackElement.className = `feedback ${type}`;
  document.body.appendChild(feedbackElement);

  setTimeout(() => {
    feedbackElement.remove();
  }, 3000);
}

// Function to clear the textarea
function clearTextarea() {
  const resultText = document.getElementById('resultText');
  if (resultText) {
    resultText.value = '';
  }
}
