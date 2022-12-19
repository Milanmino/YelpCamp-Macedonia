const mongoose = require('mongoose');
const cities = require('./citiesMacedonia');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')
const Review = require('../models/review')

mongoose.connect('mongodb://localhost:27017/campgrounds', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("Error", console.error.bind(console, "connection error:")); //An old way of catching errors instead of .then and .catch
db.once("open", () => {                                           //The newer syntax is .then .catch
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    await Review.deleteMany({});
    // const c = new Campground({ title: 'purple field' });
    // await c.save();
    for (let i = 0; i < 50; i++) {
        const random69 = Math.floor(Math.random() * 69);
        const price = Math.floor(Math.random() * 10) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '637bc57040e0b11d3c406fe5',
            location: `${cities[random69].city}, ${cities[random69].country}`, //code for making the location of the camps
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'A cosy campsite for spending your free time outdoors. Available for group camping so you and your extended friend group can have a new adventure!',
            price: price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random69].lng,
                    cities[random69].lat
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dgulkyeth/image/upload/v1669928306/YelpCamp/hergx39xriqogyzkbkfp.jpg',
                    filename: 'YelpCamp/hergx39xriqogyzkbkfp',
                },
                {
                    url: 'https://res.cloudinary.com/dgulkyeth/image/upload/v1669928306/YelpCamp/y9dj94mypizgy5e3s1ey.jpg',
                    filename: 'YelpCamp/y9dj94mypizgy5e3s1ey',
                }
            ],

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})