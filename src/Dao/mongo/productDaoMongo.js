
const { productModel } = require("./models/productModel");
class ProductDaosMongo {
    constructor() {
        this.product = productModel;
    }

    async get({ limit = 10, page = 1, category = '', sort = 1 }) {
        try {
            const options = {
                limit,
                page,
                lean: true,
                sort: { price: sort }
            };
    
            // If category is not empty, add it to the query
            const query = category ? { category } : {};
    
            let result = await this.product.paginate(query, options);
        
            if (!result.docs || !Array.isArray(result.docs)) {
                throw new Error("Failed to get products");
            }
        
            return result;
        
        } catch (error) {
            throw new Error(error);
        }
    }
    

    async getById(pid) {
        try {
            return await this.product.findById(pid);
        } catch (err) {
            return new Error(err);
        }
    }

    async create(newProduct) {
        try {
          return await this.product.create(newProduct);
        } catch (err) {
          throw new Error(err); 
        }
    }

    async update(pid, updateProduct) {
        try {
            return await this.product.findByIdAndUpdate(
                { _id: pid },
                updateProduct,
                { new: true }
            );
        } catch (err) {
            return new Error(err);
        }
    }

    async remove(pid) {
        try {
            return await this.product.findByIdAndUpdate(
                { _id: pid },
                { isActive: false },
                { new: true }
            );
        } catch (err) {
            return new Error(err);
        }
    }
}

module.exports = ProductDaosMongo;