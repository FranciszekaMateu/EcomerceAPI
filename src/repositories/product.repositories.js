class ProductRepository {
    constructor(productDao) {
        this.productDao = productDao;
    }

    async getProducts({ limit = 10, page = 1, category = '', sort = 1 }) {
        try {
            return await this.productDao.get({ limit, page, category, sort });
        } catch (err) {
            throw new Error(err);
        }
    }

    async getProductById(pid) {
        try {
            return await this.productDao.getById(pid);
        } catch (err) {
            throw new Error(err);
        }
    }

    async createProduct(newProduct) {
        try {
            return await this.productDao.create(newProduct);
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateProduct(pid, updateProduct) {
        try {
            return await this.productDao.update(pid, updateProduct);
        } catch (err) {
            throw new Error(err);
        }
    }

    async removeProduct(pid) {
        try {
            return await this.productDao.remove(pid);
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = ProductRepository;