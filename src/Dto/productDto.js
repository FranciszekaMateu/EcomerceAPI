class ProductDTO {
    constructor(id, title, code, category, imageUrl, stock, price, description) {
        this.id = id;
        this.title = title;
        this.code = code;
        this.category = category;
        this.imageUrl = imageUrl;
        this.stock = stock;
        this.price = price;
        this.description = description;
    }
}

module.exports = ProductDTO;