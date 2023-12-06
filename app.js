const express = require('express');
const morgan = require('morgan');
const itemRoutes = require('./itemRoutes');
const ExpressError = require('./expressError')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/items', itemRoutes);
app.get('/favicon.ico', (request, response) => response.sendStatus(204))

// 404 handler
app.use(function(request, response, next) {
    return next(new ExpressError('Item not found in list.', 404));
})

app.use(function (err, request, response, next) {
    let status = err.status || 500;

    return response.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    });
});

module.exports = app;