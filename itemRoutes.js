const express = require('express');
const router = new express.Router();
const fakeDB = require('./fakeDB');
const ExpressError = require('./expressError');

// created route to seedDB if using server to avoid interference with testing file.

router.get('/seedDB', (request, response) => {
    fakeDB.seedDB();
    response.json({ Message : "Database seeded." })
})

// routes

router.get('/', (request, response) => {
    try {
        response.json({ items : ITEMS })
    }
    catch (e) {
        return next(e);
    }
})

router.post('/', (request, response, next) => {
    try {
            let newItem = {
            'name': request.body.name,
            'price': request.body.price
        }
        fakeDB.ITEMS.push(newItem);
        response.json({ Added: newItem})
    }
    catch (e) {
        return next(e);
    }
})

router.get('/:name', (request, response, next) => {
    try {
        const targetItem = ITEMS.find(i => i['name'] === request.params.name);
        if (targetItem) {
        response.json(targetItem);
        } else {
           throw new ExpressError("Sorry. Item not found in list. Consider adding it.", 404)
        }
    } 
    catch (e) {
        return next(e);
    }
});

router.patch('/:name', (request, response) => {
    try {
        const targetItem = ITEMS.find(i => i['name'] === request.params.name);
        if (request.body.name !== targetItem['name']) {
            targetItem['name'] = request.body.name;
        }
        if (request.body.price !== targetItem['price']) {
            targetItem['price'] = request.body.price;
        }
        response.json({ Updated: targetItem });
    } 
    catch (e) {
        return next(e);
    }
})

router.delete('/:name', (request, response) => {
    try {
        const idx = ITEMS.findIndex(i => i['name'] === request.params.name)
        ITEMS.splice(idx, 1);
        response.json({ message: "Item Deleted." })
    } catch (e) {
        return next(e)
    }
})


module.exports = router;