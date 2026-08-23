(function runFuncTests(global) {
  const {
    CHARACTER_SETS,
    generateLoremIpsum,
    generateAlphanumerical,
    generateWithSpecialChars,
    generateWithTurkishGerman,
    generateCustomText,
    generateTextByType,
    generatePhone,
    generateUuid,
    generateDate,
    generateTckn,
    isValidTckn
  } = global;

  const results = [];

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  function test(name, fn) {
    try {
      fn();
      results.push({ name, ok: true });
    } catch (error) {
      results.push({ name, ok: false, error: error.message });
    }
  }

  test('CHARACTER_SETS should contain all expected characters', () => {
    assert(/[a-z]/.test(CHARACTER_SETS.alphabetical) && /[A-Z]/.test(CHARACTER_SETS.alphabetical), 'alphabetical set incomplete');
    assert(CHARACTER_SETS.numerical === '0123456789', 'numerical set incomplete');
    assert(/[,.()%/+?*]/.test(CHARACTER_SETS.special), 'special set incomplete');
    assert(/[çğıöşüäöß]/.test(CHARACTER_SETS.turkishGerman), 'turkish/german set incomplete');
  });

  test('generateLoremIpsum should return correct length', () => {
    assert(generateLoremIpsum(50).length === 50, 'expected length 50');
  });

  test('generateLoremIpsum should remove punctuation when requested', () => {
    const text = generateLoremIpsum(200, false, true);
    assert(!/[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(text), 'punctuation still present');
    assert(text.length === 200, 'length changed after filter');
  });

  test('generateLoremIpsum should remove spaces when requested', () => {
    const text = generateLoremIpsum(200, true, false);
    assert(!/\s/.test(text), 'spaces still present');
    assert(text.length === 200, 'length changed after filter');
  });

  test('generateAlphanumerical should contain only letters and numbers', () => {
    const text = generateAlphanumerical(100);
    assert(/^[a-zA-Z0-9]+$/.test(text), 'non-alphanumerical characters found');
    assert(!/\s/.test(text), 'spaces found');
    assert(text.length === 100, 'expected length 100');
  });

  test('generateAlphanumerical should contain both letters and numbers over large sample', () => {
    const text = generateAlphanumerical(1000);
    assert(/[a-zA-Z]/.test(text), 'no letters found');
    assert(/[0-9]/.test(text), 'no numbers found');
  });

  test('generateWithSpecialChars should contain special characters', () => {
    const text = generateWithSpecialChars(500);
    assert(/[a-zA-Z]/.test(text), 'no letters found');
    assert(/[0-9]/.test(text), 'no numbers found');
    assert(/[,.()%/+?*\-_=!@#$^&[\]{}|;:'"<>~`]/.test(text), 'no special characters found');
    assert(text.length === 500, 'expected length 500');
  });

  test('generateWithTurkishGerman should contain Turkish/German characters', () => {
    const text = generateWithTurkishGerman(500);
    assert(/[çğıöşüÇĞIÖŞÜäöüßÄÖÜ]/.test(text), 'no turkish/german characters found');
    assert(/[a-zA-Z]/.test(text), 'no regular letters found');
    assert(text.length === 500, 'expected length 500');
  });

  test('generateCustomText with only alphabetical should work', () => {
    const text = generateCustomText(50, { alphabetical: true });
    assert(/^[a-zA-Z]+$/.test(text), 'expected letters only');
  });

  test('generateCustomText with only numerical should work', () => {
    const text = generateCustomText(50, { numerical: true });
    assert(/^[0-9]+$/.test(text), 'expected numbers only');
  });

  test('generateCustomText with no options should default to alphabetical', () => {
    const text = generateCustomText(50);
    assert(/^[a-zA-Z]+$/.test(text), 'expected alphabetical default');
  });

  test('generateTextByType custom should honor charset mix', () => {
    const text = generateTextByType('custom', 80, false, false, {
      alphabetical: true,
      numerical: true
    });
    assert(/^[a-zA-Z0-9]+$/.test(text), 'custom mix should stay alphanumerical');
    assert(text.length === 80, 'expected length 80');
  });

  test('All functions should handle length 1', () => {
    assert(generateLoremIpsum(1).length === 1, 'lorem length 1 failed');
    assert(generateAlphanumerical(1).length === 1, 'alphanumerical length 1 failed');
    assert(generateWithSpecialChars(1).length === 1, 'special chars length 1 failed');
    assert(generateWithTurkishGerman(1).length === 1, 'turkish/german length 1 failed');
  });

  test('All functions should handle large lengths', () => {
    assert(generateLoremIpsum(10000).length === 10000, 'lorem large length failed');
    assert(generateAlphanumerical(10000).length === 10000, 'alphanumerical large length failed');
    assert(generateWithSpecialChars(10000).length === 10000, 'special chars large length failed');
    assert(generateWithTurkishGerman(10000).length === 10000, 'turkish/german large length failed');
  });

  test('Generated text should be random', () => {
    const a = generateAlphanumerical(80);
    const b = generateAlphanumerical(80);
    const c = generateAlphanumerical(80);
    assert(!(a === b && b === c), 'three generations were identical');
  });

  test('Alphanumerical should have reasonable character distribution', () => {
    const text = generateAlphanumerical(10000);
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const numbers = (text.match(/[0-9]/g) || []).length;
    const letterRatio = letters / text.length;
    const numberRatio = numbers / text.length;
    assert(letterRatio >= 0.7 && letterRatio <= 0.95, `letter ratio out of range: ${letterRatio}`);
    assert(numberRatio >= 0.05 && numberRatio <= 0.3, `number ratio out of range: ${numberRatio}`);
  });

  test('generatePhone should return a TR mobile number for tr locale', () => {
    const phone = generatePhone('tr');
    assert(/^05[0-9]{9}$/.test(phone), `unexpected TR phone: ${phone}`);
  });

  test('generatePhone should return a fictional US number for en locale', () => {
    const phone = generatePhone('en');
    assert(/^\+1-555-[0-9]{3}-[0-9]{4}$/.test(phone), `unexpected EN phone: ${phone}`);
  });

  test('generateUuid should return a UUID v4', () => {
    const uuid = generateUuid();
    assert(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid),
      `unexpected UUID: ${uuid}`
    );
  });

  test('generateDate should return an ISO date in range', () => {
    const date = generateDate(2000, 2010);
    assert(/^\d{4}-\d{2}-\d{2}$/.test(date), `unexpected date: ${date}`);
    const year = parseInt(date.slice(0, 4), 10);
    assert(year >= 2000 && year <= 2010, `year out of range: ${date}`);
  });

  test('generateTckn should produce valid 11-digit numbers', () => {
    for (let i = 0; i < 50; i++) {
      const tckn = generateTckn();
      assert(isValidTckn(tckn), `invalid TCKN: ${tckn}`);
    }
  });

  const passed = results.filter((item) => item.ok).length;
  const failed = results.length - passed;

  if (typeof document !== 'undefined') {
    const list = document.getElementById('results');
    const summary = document.getElementById('summary');
    results.forEach((item) => {
      const row = document.createElement('li');
      row.textContent = `${item.ok ? 'PASS' : 'FAIL'} — ${item.name}${item.error ? `: ${item.error}` : ''}`;
      row.className = item.ok ? 'pass' : 'fail';
      list.appendChild(row);
    });
    summary.textContent = `${passed}/${results.length} passed`;
    summary.className = failed ? 'fail' : 'pass';
  }

  if (failed && typeof console !== 'undefined') {
    console.error(results.filter((item) => !item.ok));
  }

  const summary = { passed, failed, results };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = summary;
  }
  return summary;
})(typeof window !== 'undefined' ? window : global);
