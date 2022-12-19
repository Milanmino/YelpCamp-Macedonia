const express = require('express');
const router = express.Router();
const campgrounds = require('../controlers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })

const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')

//===========UTILITIES==========
const catchAsync = require('../utilities/catchAsync');

//=========MODELS=========
const Campground = require('../models/campground');

//============ROUTES===========
//New fancy way to restructure routes
router.route('/')
    .get(catchAsync(campgrounds.indexPage))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampgdround))


router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    //==========ROUTE FOR UPDATING VIA THE BUTTON=========
    .put(isLoggedIn, upload.array('image'), isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;