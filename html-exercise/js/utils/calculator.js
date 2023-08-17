export const calcCartQuantity = (cartStorage) => {
    return cartStorage.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);
};
export const calcDiscountPrice = (originalPrice, discount) => {
    let discountPrice = originalPrice;
    discountPrice -= (discount * originalPrice) / 100;
    return parseFloat(discountPrice.toFixed(2));
};
export const calcProductTotalPrice = (price, quantity) => {
    return (price * quantity).toFixed(2);
};
export const calcProductAllTotalPrice = (cartStorage) => {
    return cartStorage
        .reduce((sum, item) => {
        return sum + item.quantity * item.price;
    }, 0)
        .toFixed(2);
};
