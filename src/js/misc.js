// Load the JSON data
let DATA = {
  maleNames: [],
  femaleNames: [],
  surnames: [],
  emails: [],
  addresses: [],
  passwords: []
};

// Load all JSON data
async function loadData() {
  try {
    const [maleNames, femaleNames, surnames, emails, addresses, passwords] = await Promise.all([
      fetch('data/maleFirstName.json').then(r => r.json()),
      fetch('data/femaleFirstName.json').then(r => r.json()),
      fetch('data/surname.json').then(r => r.json()),
      fetch('data/email.json').then(r => r.json()),
      fetch('data/address.json').then(r => r.json()),
      fetch('data/password.json').then(r => r.json())
    ]);

    DATA = {
      maleNames,
      femaleNames,
      surnames,
      emails,
      addresses,
      passwords
    };
  } catch (error) {
    console.error('Error loading data:', error);
    showFeedback('Error loading data', 'error');
  }
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateFullName(gender) {
  const nameArray = gender === 'male' ? DATA.maleNames : DATA.femaleNames;
  const firstName = getRandomItem(nameArray);
  const surname = getRandomItem(DATA.surnames);
  return `${firstName} ${surname}`;
}

function generateEmail(domainType, customDomain) {
  if (domainType === 'random') {
    return getRandomItem(DATA.emails);
  }
  
  const name = generateFullName(Math.random() > 0.5 ? 'male' : 'female')
    .toLowerCase()
    .replace(' ', '.');
  
  const domain = domainType === 'custom' ? customDomain : domainType;
  return `${name}@${domain}`;
}

function initializeMiscTab() {
  loadData();
  
  const dataType = document.getElementById('dataType');
  const nameOptions = document.getElementById('nameOptions');
  const emailOptions = document.getElementById('emailOptions');
  const emailDomain = document.getElementById('emailDomain');
  const customDomain = document.getElementById('customDomain');
  const generateButton = document.getElementById('generateMiscButton');
  const copyButton = document.getElementById('copyMiscButton');
  const resultText = document.getElementById('miscResultText');

  dataType.addEventListener('change', () => {
    nameOptions.style.display = dataType.value === 'name' ? 'block' : 'none';
    emailOptions.style.display = dataType.value === 'email' ? 'block' : 'none';
  });

  emailDomain.addEventListener('change', () => {
    customDomain.style.display = emailDomain.value === 'custom' ? 'block' : 'none';
  });

  generateButton.addEventListener('click', () => {
    let result = '';
    
    switch (dataType.value) {
      case 'name':
        const gender = document.querySelector('input[name="gender"]:checked').value;
        result = generateFullName(gender);
        break;
      case 'email':
        result = generateEmail(emailDomain.value, customDomain.value);
        break;
      case 'address':
        result = getRandomItem(DATA.addresses);
        break;
      case 'password':
        result = getRandomItem(DATA.passwords);
        break;
      default:
        showFeedback('Please select a data type', 'error');
        return;
    }

    resultText.value = result;
  });

  copyButton.addEventListener('click', () => {
    if (!resultText.value) {
      showFeedback('No text to copy', 'error');
      return;
    }
    
    navigator.clipboard.writeText(resultText.value)
      .then(() => showFeedback('Copied to clipboard!', 'success'))
      .catch(() => showFeedback('Failed to copy to clipboard', 'error'));
  });
}
