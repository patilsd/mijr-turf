const express = require('express');
const router = express.Router();
const userController = require('../controllers/userRegistration');

// User Registration Routes
router.post('/user/register', userController.registerUser);
router.get('/user/getall', userController.getAllUsers);
router.get('/teamName/:teamName', userController.getByTeam);
// router.put('/:userId', userController.updateUser);
router.delete('/delete/:userId', userController.deleteUser);
router.post('/verify-otp', userController.verifyOTP);
router.post('/addmember/:teamName', userController.addTeamMember);
router.get('/teams/unique', userController.getUniqueTeamNames)

module.exports = router;