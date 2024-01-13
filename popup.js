document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click", generateString);

    const copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", copyToClipboard);
});


function generateString() {
    const lengthInput = document.getElementById("lengthInput").value;
    const removePunctInput = document.getElementById("removePunct").checked;
    const removeSpaceInput = document.getElementById("removeSpace").checked;
    const resultText = document.getElementById("resultText");

    const loremIpsumWordsInput = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam";

    const length = parseInt(lengthInput);
    const useSpace = !removeSpaceInput.checked;
    const usePunct = !removePunctInput.checked;

    const generatedString = generateText(loremIpsumWordsInput, length, useSpace, usePunct);
    resultText.value = generatedString

}

function generateText(text, length, useSpace, usePunct) {

    const lorem = text;
    let resultText = lorem.repeat(Math.ceil(length / lorem.length)).substring(0, length);

    if(usePunct){
        resultText = resultText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
        console.log(resultText);
    }   
    if(useSpace){
        resultText = resultText.replace(/\s/g, '');
    }

    return resultText;
}

function copyToClipboard() {
    const resultText = document.getElementById("resultText");
    navigator.clipboard.writeText(resultText.value);
}