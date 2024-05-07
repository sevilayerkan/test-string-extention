document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click", generateString);

    const copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", copyToClipboard);
});

