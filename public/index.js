const eventSource = new EventSource("/price");

const priceEl = document.getElementById("price-display");

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    priceEl.textContent = data.price;
};

eventSource.onerror = () => {
    console.log("Connection lost. Attempting to reconnect...")
};