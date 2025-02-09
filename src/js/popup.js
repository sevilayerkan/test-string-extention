document.addEventListener('DOMContentLoaded', function() {
  // Initialize main functionality
  const generateBtn = document.getElementById('generateBtn');
  const copyBtn = document.getElementById('copyBtn');
  const generatedText = document.getElementById('generatedText');

  generateBtn.addEventListener('click', () => {
    const size = parseInt(document.getElementById('character-size').value);
    const noSpaces = document.getElementById('noSpaces').checked;
    const noSpecialChars = document.getElementById('noSpecialChars').checked;

    if (isNaN(size) || size <= 0) {
      showFeedback('Please enter a valid number', 'error');
      return;
    }

    generatedText.value = window.generateLoremIpsum(size, noSpaces, noSpecialChars);
  });

  copyBtn.addEventListener('click', () => {
    if (!generatedText.value) {
      showFeedback('No text to copy', 'error');
      return;
    }
    copyToClipboard(generatedText.value);
  });

  // Initialize tabs
  initializeTabs();
  initializeMiscTab();

  // Initialize counter functionality
  const counterText = document.getElementById('counterText');
  counterText?.addEventListener('input', updateCounterStats);

  document.getElementById('password-length').addEventListener('input', (e) => {
    document.getElementById('length-value').textContent = e.target.value;
  });

  // Initialize theme toggle
  initializeTheme();
});

function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      const targetId = button.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => showFeedback('Copied to clipboard!'))
    .catch(() => showFeedback('Failed to copy', 'error'));
}

function showFeedback(message, type = 'success') {
  const alert = document.getElementById('copyAlert');
  alert.textContent = message;
  alert.className = `alert ${type}`;
  alert.style.display = 'block';
  setTimeout(() => alert.style.display = 'none', 2000);
}

function updateCounterStats() {
  const text = document.getElementById('counterText').value;
  const stats = {
    characters: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    spaces: text.match(/\s/g)?.length || 0
  };

  const counterStats = document.getElementById('characterCount');
  counterStats.innerHTML = `
    <div class="stat-item">
      <div class="stat-value">${stats.characters}</div>
      <div class="stat-label">Characters</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">${stats.words}</div>
      <div class="stat-label">Words</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">${stats.lines}</div>
      <div class="stat-label">Lines</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">${stats.spaces}</div>
      <div class="stat-label">Spaces</div>
    </div>
  `;
}

function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';

  // We set data-theme on <body> to match our final CSS approach
  document.body.setAttribute('data-theme', savedTheme);
  themeToggle.checked = savedTheme === 'dark';

  themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
