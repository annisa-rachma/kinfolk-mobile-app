const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/adminController')

router.get('/products', AdminController.getAllProducts)
router.post('/products', AdminController.postProduct)
router.get('/products/:productId', AdminController.getProductById)
router.put('/products/:productId', AdminController.putProduct)
router.delete('/products/:productId', AdminController.deleteProduct)

router.get('/categories', AdminController.getAllCategories)
router.post('/categories', AdminController.postCategory)
router.get('/categories/:categoryId', AdminController.getCategoryById)
router.put('/categories/:categoryId', AdminController.putCategory)
router.delete('/categories/:categoryId', AdminController.deleteCategory)



module.exports = router