const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const reviews = require('../controlers/reviews');


//===========UTILITIES=========
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');

//=========MODELS===========
const Campground = require('../models/campground');
const Review = require('../models/review');




//==========ROUTES=============
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))



module.exports = router;