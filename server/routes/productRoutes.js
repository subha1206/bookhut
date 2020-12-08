const router = require('express').Router();

const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

router
  .route('/')
  .post(productController.createProduct)
  .get(productController.getAllProducts);
router.route('/:id').get(productController.getOneProduct);
router
  .route('/:id/add-review')
  .post(authController.protectedRoute, productController.createReview);

module.exports = router;
