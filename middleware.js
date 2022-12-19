const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utilities/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review.js');


module.exports.isLoggedIn = (req, res, next) => {
    //console.log('Req.user...', req.user)
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl //originalUrl is a built-in method for seeing the original url from where you have been redirected
        req.flash('error', 'You must be signed-in first')
        return res.redirect('/login')  //if you do not RETURN this, the res.render in the route still runs
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(element => element.message).join(',') //for every element display every message in case there are multiple, and then join them with a comma
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(element => element.message).join(',') //for every element display every message in case there are multiple, and then join them with a comma
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}