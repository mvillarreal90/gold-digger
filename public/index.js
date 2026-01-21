const priceEl = document.getElementById("price-display");
const investBtn = document.getElementById("invest-btn");
const investmentAmountEl = document.getElementById("investment-amount");
const connectionEl = document.getElementById("connection-status")
const dialogEl = document.getElementById("confirmation-dialog");
const closeDialogBtn = document.getElementById("close-dialog");
const summaryEl = document.getElementById("investment-summary");

const eventSource = new EventSource("/price");

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

async function downloadPDF() {
    try {
        const response = await fetch("/download-pdf");
        if (!response.ok) throw new Error(response.statusText);

        const blob = await response.blob();          
        const url = window.URL.createObjectURL(blob);      

        const a = document.createElement("a");         
        a.href = url;
        a.download = "investment-report.pdf";
        document.body.appendChild(a);
        a.click();                                   
        a.remove();                          
        window.URL.revokeObjectURL(url);       
    } catch (err) {
        console.error("Could not generate PDF:", err);
    }
}

async function processPurchase(event) {
    // Prevent the default form submission
    event.preventDefault();
    
    const goldSold = Math.round((investmentAmountEl.value / priceEl.textContent) * 10000) / 10000;

    const purchase = {
        purchaseDate: new Date(),
        amountPaid: investmentAmountEl.value,
        pricePerOz: priceEl.textContent,
        goldSold: goldSold
    }

    try {
        const response = await fetch("/purchase", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchase)
        });

        if (response.ok) {
            dialogEl.showModal();
            summaryEl.textContent = `You just bought ${purchase.goldSold} Oz for £${purchase.amountPaid}. You will receive a document with your updated purchases.`;
            investmentAmountEl.value = "";
            downloadPDF();
        } else {
            console.error("Server Error:", response.statusText)
        }
    } catch (err) {
        throw new Error("We couldn't process the purchase. Please try again");
    }
}

function closeDialog() {
    dialogEl.close();
}

investBtn.addEventListener("click", processPurchase);
closeDialogBtn.addEventListener("click", closeDialog)