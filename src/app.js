// ************ Require's ************
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); 
const port = process.env.PORT || 3300;
const session = require('express-session');
const userMenu = require('./middleware/userMenu');
const cookies = require('cookie-parser')

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
}))

app.use(cookies());
app.use(userMenu);

app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas



// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const mainRouter = require('./routes/main'); // Rutas main
const userRouter = require('./routes/users'); // Rutas /users

app.use('/' ,mainRouter);
app.use('/users', userRouter);


// ************ exports app - dont'touch ************
module.exports = app;
