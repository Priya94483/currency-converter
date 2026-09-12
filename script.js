async function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;
    let result = document.getElementById("result");
    if (amount === "" || amount <= 0) {
        result.innerHTML = "Please enter an amount.";
        return;
    }
    if (fromCurrency === toCurrency) {
        result.innerHTML =
            amount + " " + fromCurrency + " = " +
            amount + " " + toCurrency;
        return;
    }
    result.innerHTML = "Loading...";
    try {
        let url =
            "https://open.er-api.com/v6/latest/" + fromCurrency;
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network error");
        }
        let data = await response.json();
        if (data.result !== "success") {
            throw new Error("API error");
        }
        let rate = data.rates[toCurrency];
        if (!rate) {
            result.innerHTML = "Currency not available.";
            return;
        }
        let convertedAmount = amount * rate;
        result.innerHTML =
            amount + " " + fromCurrency +
            " = " +
            convertedAmount.toFixed(2) +
            " " + toCurrency;
    } catch (error) {
        result.innerHTML =
            "Unable to get exchange rate. Please try again.";
        console.log(error);
    }
}