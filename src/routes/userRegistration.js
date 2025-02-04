// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userRegistration');
// const multer = require('multer');

// const path = require('path');
// // Set storage engine for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Folder where the files will be stored
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname); // Unique filename with timestamp
//     }
//   });
  
//   // File filter for validating image types
//   const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true); // Accept image files
//     } else {
//       cb(new Error('Only image files are allowed'), false); // Reject non-image files
//     }
//   };
  
//   // Set up multer middleware for image upload
//   const upload = multer({ storage: storage, fileFilter: fileFilter });


// // User Registration Routes
// router.post('/user/register', userController.registerUser);
// router.get('/user/allcaptain', userController.getAllCaptain);
// router.get('/teamName/:teamName', userController.getByTeam);
// // router.put('/:userId', userController.updateUser);
// router.delete('/delete/:userId', userController.deleteUser);
// router.post('/verifyOtp', userController.verifyOTP);
// // router.post('/addmember/:teamName', userController.addTeamMember);
// router.get('/teams/unique', userController.getUniqueTeamNames)
// router.put('/teamStatus', userController.updateTeamStatus);
// router.get('/getAllTeams',userController.getAllTeams);
// router.post('/addmember/:teamName', upload.fields([
//     { name: 'passport_picture', maxCount: 1 },
//     { name: 'age_proof', maxCount: 1 }
//   ]), userController.addTeamMember);
// router.put('/editmember/:team_id', upload.fields([
//     { name: 'passport_picture', maxCount: 1 },
//     { name: 'age_proof', maxCount: 1 }
// ]), userController.editTeamMember);


// // router.put('/editmember/:team_id',userController.editTeamMember);
// // router.post('/uploadImages/:teamId', upload.fields([{name:'passport_picture', maxCount:1},
// // {name:'age_proof', maxCount:1}]), userController.uploadImages);


// module.exports = router;



const express = require('express');
const router = express.Router();
const userController = require('../controllers/userRegistration');
const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddlewares'); 
const path = require('path');
// Set storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder where the files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename with timestamp
    }
  });
  
  // File filter for validating image types
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept image files
    } else {
      cb(new Error('Only image files are allowed'), false); // Reject non-image files
    }
  };
  
  // Set up multer middleware for image upload
  const upload = multer({ storage: storage, fileFilter: fileFilter });


// User Registration Routes
router.post('/user/register', userController.registerUser);
router.get('/user/allcaptain', userController.getAllCaptain);
router.get('/teamName/:teamName', userController.getByTeam);
// router.put('/:userId', userController.updateUser);
router.delete('/delete/:userId', userController.deleteUser);
router.post('/verifyOtp', userController.verifyOTP);
// router.post('/addmember/:teamName', userController.addTeamMember);
router.get('/teams/unique', userController.getUniqueTeamNames)
router.put('/teamStatus', userController.updateTeamStatus);
router.get('/getAllTeams',userController.getAllTeams);
router.post('/addmember/:teamName', upload.fields([
    { name: 'passport_picture', maxCount: 1 },
    { name: 'age_proof', maxCount: 1 }
  ]), userController.addTeamMember);
router.put('/editmember/:team_id', upload.fields([
    { name: 'passport_picture', maxCount: 1 },
    { name: 'age_proof', maxCount: 1 }
]), userController.editTeamMember);


// router.put('/editmember/:team_id',userController.editTeamMember);
// router.post('/uploadImages/:teamId', upload.fields([{name:'passport_picture', maxCount:1},
// {name:'age_proof', maxCount:1}]), userController.uploadImages);


module.exports = router;