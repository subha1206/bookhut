const router = require('express').Router();

const productController = require('../controllers/productController');

router
  .route('/')
  .post(productController.createProduct)
  .get(productController.getAllProducts);
router.route('/:id').get(productController.getOneProduct);

module.exports = router;
