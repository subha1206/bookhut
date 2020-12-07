const router = require('express').Router();
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

router
  .route('/')
  .post(authController.protectedRoute, orderController.createOrder);

router
  .route('/myOrders')
  .get(authController.protectedRoute, orderController.getMyOrders);

router
  .route('/:id')
  .get(authController.protectedRoute, orderController.getOneOrder)
  .patch(authController.protectedRoute, orderController.updateOrder);

router.route('/:id/pay').post(orderController.initiatePayment);

module.exports = router;
