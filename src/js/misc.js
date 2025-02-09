// Load the JSON data
let DATA = {
  maleNames: [],
  femaleNames: [],
  surnames: [],
  addresses: [],
  passwords: []
};

async function loadData() {
  try {
    const response = await Promise.all([
      fetch('data/maleFirstName.json'),
      fetch('data/femaleFirstName.json'),
      fetch('data/surname.json'),
      fetch('data/address.json'),
      fetch('data/password.json')
    ]);

    const [maleNames, femaleNames, surnames, addresses, passwords] = 
      await Promise.all(response.map(r => r.json()));

    DATA = {
      maleNames,
      femaleNames,
      surnames,
      addresses,
      passwords
    };
    return true;
  } catch (error) {
    console.error('Error loading data:', error);
    showFeedback('Error loading data. Please try again.', 'error');
    return false;
  }
}

function initializeMiscTab() {
  const miscTabs = document.querySelectorAll('.misc-tab');
  const miscContents = document.querySelectorAll('.misc-content');

  // Hide all except first misc content
  miscContents.forEach((content, index) => {
    if (index !== 0) {
      content.style.display = 'none';
    }
  });

  // Tab switching
  miscTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      miscTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Hide all contents and show the selected one
      const targetId = `${tab.getAttribute('data-misc-tab')}-tab`;
      miscContents.forEach(content => {
        content.style.display = content.id === targetId ? 'block' : 'none';
      });
    });
  });

  // Initialize generators and copy buttons
  document.getElementById('generate-email')?.addEventListener('click', generateEmail);
  document.getElementById('generate-name')?.addEventListener('click', generateName);
  document.getElementById('generate-address')?.addEventListener('click', generateAddress);
  document.getElementById('generate-password')?.addEventListener('click', generatePassword);

  // Initialize copy buttons
  document.querySelectorAll('.copy-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const inputId = btn.getAttribute('data-copy');
      const text = document.getElementById(inputId)?.value;
      if (text) copyToClipboard(text);
    });
  });

  // Initialize password length slider
  const lengthSlider = document.getElementById('password-length');
  const lengthValue = document.getElementById('length-value');
  
  lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
    generatePassword();
  });

  // Load initial data
  loadData().then(() => {
    generatePassword();
  });
}

function generateEmail() {
  const domain = document.getElementById('custom-domain').value.trim();
  const firstName = DATA.maleNames[Math.floor(Math.random() * DATA.maleNames.length)].toLowerCase();
  const lastName = DATA.surnames[Math.floor(Math.random() * DATA.surnames.length)].toLowerCase();
  
  const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
  const selectedDomain = domain || domains[Math.floor(Math.random() * domains.length)];
  
  const emailFormats = [
    `${firstName}.${lastName}@${selectedDomain}`,
    `${firstName}${lastName}@${selectedDomain}`,
    `${firstName}_${lastName}@${selectedDomain}`,
    `${firstName}${Math.floor(Math.random() * 100)}@${selectedDomain}`
  ];
  
  document.getElementById('email-result').value = emailFormats[Math.floor(Math.random() * emailFormats.length)];
}

function generateName() {
  const gender = document.querySelector('input[name="gender"]:checked').value;
  let firstName;
  
  if (gender === 'male') {
    firstName = DATA.maleNames[Math.floor(Math.random() * DATA.maleNames.length)];
  } else if (gender === 'female') {
    firstName = DATA.femaleNames[Math.floor(Math.random() * DATA.femaleNames.length)];
  } else {
    const names = [...DATA.maleNames, ...DATA.femaleNames];
    firstName = names[Math.floor(Math.random() * names.length)];
  }
  
  const lastName = DATA.surnames[Math.floor(Math.random() * DATA.surnames.length)];
  document.getElementById('name-result').value = `${firstName} ${lastName}`;
}

function generateAddress() {
  const addresses = DATA.addresses;
  if (addresses && addresses.length > 0) {
    document.getElementById('address-result').value = addresses[Math.floor(Math.random() * addresses.length)];
  } else {
    document.getElementById('address-result').value = 'Atatürk Cad. No:123\nİstanbul, Türkiye';
  }
}

function generatePassword() {
  const length = parseInt(document.getElementById('password-length').value) || 12;
  
  // Use provided password data if available
  if (DATA.passwords && DATA.passwords.length > 0) {
    let password = DATA.passwords[Math.floor(Math.random() * DATA.passwords.length)];
    while (password.length < length) {
      password += DATA.passwords[Math.floor(Math.random() * DATA.passwords.length)];
    }
    document.getElementById('password-result').value = password.substring(0, length);
    return;
  }
  
  // Fallback to generated password
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('password-result').value = password;
}

function generateRandomString(length) {
  return Math.random().toString(36).substring(2, length + 2);
}
