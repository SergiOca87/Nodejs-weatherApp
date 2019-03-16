const request = require('request');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


//The or is used for when a variable does not exist, like when we are in Local
const port = process.env.PORT || 3000;

const app = express();

//Serve static files from the public directory, like stylesheet
app.use(express.static( path.join(__dirname, '/public')) );

//Templating engine
app.set('view engine', 'hbs');

//Register the partials folder to use in handlebars
hbs.registerPartials( path.join(__dirname, '/views/partials') )

//ROUTES
//Root
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather forecast'
    });
});

//Help Page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'The Help Page'
    });
});

//AboutPage
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'The About Page'
    });
});


app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        });
    }

    //Notice how in the destructured Object parameter we put an equal to an empty Object,
    //That is the default parameter so if we pass nothing, the app won't crash, cannot destructure undefined, we still get an error but not a crash
    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({forecastData,
            location,
            address: req.query.address
            })
        })
    })
})

//404 Page, needs to be last so if nothing else matches
app.get('*', (req, res) => {
    res.render('404');
});


app.listen( port, () => {
    console.log(`App running on port ${port}`);
})