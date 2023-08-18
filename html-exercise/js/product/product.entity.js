class Product {
    constructor(props) {
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
