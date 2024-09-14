document.addEventListener("DOMContentLoaded", function () {
    clearTextarea();
  
    const generateButton = document.getElementById("generateButton");
    const copyButton = document.getElementById("copyButton");
  
    generateButton.addEventListener("click", () => {
      const length = parseInt(document.getElementById("lengthInput").value);
      const removePunct = document.getElementById("removePunct").checked;
      const removeSpace = document.getElementById("removeSpace").checked;
  
      if (isNaN(length) || length <= 0) {
        showFeedback("Please enter a valid positive number for length", "error");
        clearTextarea();
      } else {
        document.getElementById("resultText").value = window.generateLoremIpsum(length, removeSpace, removePunct);
      }
    });
  
    copyButton.addEventListener("click", copyToClipboard);
  });
  
  // Clear textarea when the popup is shown
  chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "popup") {
      clearTextarea();
    }
  });
  
  function copyToClipboard() {
    const resultText = document.getElementById("resultText").value;
    if (!resultText.trim()) {
      showFeedback("No text to copy", "error");
      return;
    }
    navigator.clipboard.writeText(resultText)
      .then(() => showFeedback("Copied to clipboard!", "success"))
      .catch((err) => {
        console.error("Failed to copy: ", err);
        showFeedback("Failed to copy to clipboard", "error");
      });
  }
  
  function showFeedback(message, type) {
    const feedbackElement = document.createElement("div");
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback ${type}`;
    document.body.appendChild(feedbackElement);
  
    setTimeout(() => {
      feedbackElement.remove();
    }, 3000);
  }
  
  // Function to clear the textarea
  function clearTextarea() {
    const resultText = document.getElementById("resultText");
    if (resultText) {
      resultText.value = "";
    }
  }