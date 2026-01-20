const eventSource = new EventSource("/price");

const priceEl = document.getElementById("price-display");
const investBtn = document.getElementById("invest-btn");
const investmentAmountEl = document.getElementById("investment-amount");
const connectionEl = document.getElementById("connection-status")

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    priceEl.textContent = data.price;
    connectionEl.textContent = "Live Price 🟢";
};

eventSource.onerror = () => {
    console.log("Connection lost. Attempting to reconnect...")
    connectionEl.textContent = "Disconnected 🔴";
    priceEl.textContent = "";
};

async function processPurchase(event) {
    // Prevent the default form submission
    event.preventDefault();
    
    const goldSold = Math.round((investmentAmountEl.value / priceEl.textContent) * 10000) / 10000;

    const purchase = {
        purchaseDate: new Date(),
        amountPaid: `£${investmentAmountEl.value}`,
        pricePerOz: `£${priceEl.textContent}`,
        goldSold: `${goldSold} Oz`
    }

    try {
        const response = await fetch("/api", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchase)
        });

        if (response.ok) {
            investmentAmountEl.value = "";
            alert("Purchase successful")
        } else {
            console.error("Server Error:", response.statusText)
        }

    } catch (err) {
        throw new Error("We couldn't process the purchase. Please try again");
    }
   
}

investBtn.addEventListener("click", processPurchase);