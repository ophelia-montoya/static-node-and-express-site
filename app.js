const express = require('express');
const { send } = require('process');

const app = express();

const { projects } = require('./data.json');

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.locals.projects = projects;
    res.render('index');

});

app.get('/about', (req, res) => {
    res.render('about');
    
})

 app.get('/projects/:id', (req, res, next) => {
    const id = +req.params.id +1;
    if (projects[id]) {
        const project = projects[id];
        return res.render('project', { project });
    } else {
        const err = new Error(`Oops, that project does not exist (,,>﹏<,,) `);
        err.status = 400;
        next(err); 
    }
});

app.use((req, res, next) => {
    const err = new Error('That page does not exist. ૮ ˶ᵔ ᵕ ᵔ˶ ა Please check the URL.');
    err.status = 404;
    next(err);


})

app.use((err, req, res, next) => {
    err.message = err.message || "Apologies, a problem occurred with our server!";
    err.status = err.status || 500;
    console.log(`${err.status}: ${err.message}`);
    res.status(err.status)
    res.send(`Error ${err.status}: ${err.message}`);

});



app.listen(3000, () => {
    console.log('Testing 1...2...3');
  
  })