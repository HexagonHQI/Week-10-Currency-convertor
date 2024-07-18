const apiKey = '0e30f698017588e6a236d81f'; // My personal API KEY
const supportedCurrenciesUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;

async function fetchSupportedCurrencies() {
    try {
        const response = await fetch(supportedCurrenciesUrl);
        const data = await response.json();
        const currencies = data.supported_codes.map(code => ({ value: code[0], text: code[1] }));
        populateCurrencyOptions(currencies);
    } catch (error) {
        console.error('Error fetching supported currencies:', error);
        // Handle the error (e.g., display an error message)
    }
}

function populateCurrencyOptions(currencies) {
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');

    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency.value;
        option.text = `${currency.value} - ${currency.text}`;
        fromSelect.appendChild(option);
        toSelect.appendChild(option.cloneNode(true)); // Clone to avoid duplicate references
    });
}

async function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`);
        const data = await response.json();
        const exchangeRate = data.conversion_rate;
        const result = amount * exchangeRate;
        document.getElementById('result').textContent = `Result: ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
        // Handle the error (e.g., display an error message)
    }
}

function switchCurrencies() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    document.getElementById('fromCurrency').value = toCurrency;
    document.getElementById('toCurrency').value = fromCurrency;
}

fetchSupportedCurrencies(); // Call this function on page load

const convertButton = document.getElementById('convertButton');
convertButton.addEventListener('click', convertCurrency);

const switchButton = document.getElementById('switchButton');
switchButton.addEventListener('click', switchCurrencies);
