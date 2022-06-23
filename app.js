//Dependencies
const express = require('express');
const app = express();
const { projects } = require('./data.json');

//Set Pug view engine
app.set('view engine', 'pug');

//Static route to serve static files in 'public' folder
app.use('/static', express.static('public'));

//Index route
app.get('/', (req, res) => {
    res.locals.projects = projects;
    res.render('index');

});

//About route
app.get('/about', (req, res) => {
    res.render('about');
    
})

//Dynamic projects route
 app.get('/projects/:id', (req, res, next) => {
    const id = +req.params.id;
    if (projects[id]) {
        const project = projects[id];
        return res.render('project', { project });
    } else {
        const err = new Error(`Oops, that project does not exist (,,>﹏<,,) `);
        err.status = 400;
        next(err); 
    }
});

//404 Error Handler
app.use((req, res, next) => {
    const err = new Error('That page does not exist. ૮ ˶ᵔ ᵕ ᵔ˶ ა Please check the URL.');
    err.status = 404;
    next(err);


})
//Global Error Handler
app.use((err, req, res, next) => {
    err.message = err.message || "Apologies, a problem occurred with our server!";
    err.status = err.status || 500;
    console.log(`${err.status}: ${err.message}`);
    res.status(err.status)
    res.send(`Error ${err.status}: ${err.message}`);

});


//Starts app, listening on port 3000
app.listen(3000, () => {
    console.log('Testing 1...2...3');
  
  })