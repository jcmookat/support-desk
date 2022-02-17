const express = require('express')
const router = express.Router()
const {
	registerUser,
	loginUser,
	getMe,
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe) // add protect as second argument to make the route private

module.exports = router
