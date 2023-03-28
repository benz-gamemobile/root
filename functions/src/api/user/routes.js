const express = require('express');
const router = express.Router();
const userController = require('./controller.js')

/**
 * Description: method create user
 * Created: DVBen(27/03/2023)
*/
router.post('/users', (req,res,next) => {
    return userController.createUser(req,res)
})

/**
 * Description: method get list user
 * Created: DVBen(27/03/2023)
*/
router.get('/users', (req,res,next) => {
    return userController.getListUser(req,res)
})

/**
 * Description: method get detail user
 * Created: DVBen(27/03/2023)
*/
router.get('/users/:id', (req,res,next) => {
    return userController.getDetailUser(req,res)
})

module.exports = router