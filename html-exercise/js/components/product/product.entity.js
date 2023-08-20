class Product {
    constructor(props) {
        this.calcDiscountPrice = () => {
            return parseFloat((this.price * (1 - this.discount / 100)).toFixed(2));
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
