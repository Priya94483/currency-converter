async function convertCurrency() {

    let amount = document.getElementById("amount").value;
    let from = document.getElementById("fromCurrency").value;
    let to = document.getElementById("toCurrency").value;
    let result = document.getElementById("result");

    if (amount === "" || amount <= 0) {
        result.innerHTML = "Please enter a valid amount.";
        return;
    }

    if (from === to) {
        result.innerHTML =
            amount + " " + from + " = " + amount + " " + to;
        return;
    }

    result.innerHTML = "Converting...";

    try {

        let response = await fetch(
            "https://open.er-api.com/v6/latest/" + from
        );

        let data = await response.json();

        let rate = data.rates[to];

        let convertedAmount = amount * rate;

        result.innerHTML =
            amount + " " + from + " = " +
            convertedAmount.toFixed(2) + " " + to;

    } catch (error) {

        result.innerHTML = "Unable to get exchange rate.";

    }
}