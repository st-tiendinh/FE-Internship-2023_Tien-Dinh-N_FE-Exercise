export class CartItem {
    constructor(props) {
        this.calcDiscountPrice = (originalPrice, discount) => {
            let discountPrice = originalPrice;
            discountPrice -= (discount * originalPrice) / 100;
            return parseFloat(discountPrice.toFixed(2));
        };
        this.calcProductTotalPrice = (price, quantity) => {
            return parseFloat((price * quantity).toFixed(2));
        };
        const { id, name, discount, price, imageUrl, quantity } = props;
        this.id = id;
        this.name = name;
        this.discount = discount;
        this.price = price;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
    }
}
export class Cart {
    constructor(cartItems) {
        this.calcCartQuantity = (cartStorage) => {
            return cartStorage.reduce((sum, item) => {
                return sum + item.quantity;
            }, 0);
        };
        this.calcProductAllTotalPrice = (cartStorage) => {
            return parseFloat(cartStorage
                .reduce((sum, item) => {
                return sum + item.quantity * item.price * (1 - item.discount / 100);
            }, 0)
                .toFixed(2));
        };
        this.cartItems = cartItems;
    }
}
