export class CartItem {
    constructor(props) {
        this.calcDiscountPrice = () => {
            return parseFloat((this.price * (1 - this.discount / 100)).toFixed(2));
        };
        this.calcProductTotalPrice = () => {
            return parseFloat((this.price * (1 - this.discount / 100) * this.quantity).toFixed(2));
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
        this.calcCartAllQuantity = () => {
            return this.cartItems.reduce((sum, item) => {
                return sum + item.quantity;
            }, 0);
        };
        this.calcProductAllTotalPrice = () => {
            return parseFloat(this.cartItems
                .reduce((sum, item) => {
                return sum + item.quantity * item.price * (1 - item.discount / 100);
            }, 0)
                .toFixed(2));
        };
        this.cartItems = cartItems;
    }
}
