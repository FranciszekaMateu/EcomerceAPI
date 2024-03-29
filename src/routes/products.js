const { Router } = require('express');
const router = Router();
const ProductRepository = require('../repositories/product.repositories'); 
const {ProductDao} = require('../Dao/factory'); 
const {adminMiddleware} = require("../middlewares/auth")
const productRepository = new ProductRepository(ProductDao);

router.get('/', async (req, res) => {
  let { limit = 10, page = 1, sort, query } = req.query;
  try {
    
    sortOptions = sort === 'asc' ? 1 : -1;

    const { docs, hasNextPage, totalPages, hasPrevPage, page: currentPage } = await productRepository.getProducts({
      limit,
      page,
      category: query,
      sort: sortOptions
    });

    const prevLink = hasPrevPage ? `?sort=${sort}&page=${currentPage - 1}&query=${query}&limit=${limit}` : null;
    const nextLink = hasNextPage ? `?sort=${sort}&page=${currentPage + 1}&query=${query}&limit=${limit}` : null;

    res.status(200).json({
      status: 'success',
      payload: docs,
      totalDocs: docs.length,
      totalPages: totalPages,
      hasPrevPage,
      hasNextPage,
      nextLink,
      prevLink,
      page: currentPage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get products'
    });
  }
});


router.post('/create',adminMiddleware, async (req, res) => {
  try {
    const {
      title,
      code,
      category,
      imageUrl,
      isActive = true,
      stock,
      price,
      description
    } = req.body;

    const newProduct = {
      title,
      code,
      category,
      imageUrl,
      isActive,
       stock,
      price,
      description
    };

    const createdProduct = await productRepository.createProduct(newProduct);

    res.status(201).json({
      status: 'success',
      payload: createdProduct
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create product'
    });
  }
});
router.put('/update/:pid',adminMiddleware, async (req, res) => {
  try {
    const { pid } = req.params;
    const updateProduct = req.body;
    const result = await productRepository.updateProduct(pid, updateProduct);
    
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  router.delete('/delete/:pid',adminMiddleware, async (req, res) => {
    try {
      const { pid } = req.params;
      const result = await productRepository.removeProduct(pid);
      
      if (!result) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;
