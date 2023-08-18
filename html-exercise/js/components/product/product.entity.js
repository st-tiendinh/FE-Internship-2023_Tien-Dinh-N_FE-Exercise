class Product {
    constructor(props) {
        this.calcDiscountPrice = (originalPrice, discount) => {
            let discountPrice = originalPrice;
            discountPrice -= (discount * originalPrice) / 100;
            return parseFloat(discountPrice.toFixed(2));
        };
        this.calcProductTotalPrice = (price, quantity) => {
            return parseFloat((price * quantity).toFixed(2));
        };
        const { id, name, discount, price, imageUrl, status } = props;
        this.id = id;
        this.name = name;
        this.discount = discount;
        this.price = price;
        this.imageUrl = imageUrl;
        this.status = status;
    }
}
export default Product;
