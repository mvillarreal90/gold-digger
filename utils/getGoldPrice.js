let price = 3450;

export function getGoldPrice(min = 3400, max = 3500) {
    
    const diff = Math.random() < 0.5 ? -10 : 10;
    price += diff;  
    price = Math.max(min, Math.min(max, price));

    return price;
}