process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
const fakeDB = require("./fakeDB");
const newItem = {
    "name": "milk",
    "price": 4.27
}

beforeEach(function() {
    ITEMS.push(newItem);
})

afterEach(function() {
    ITEMS.length = 0;
})

// testing routes
describe('GET /items', function() {
    test('get a list of all items', async function() {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toEqual(200);
        console.log('resp.body is ', resp.body)
        expect(resp.body).toEqual({items: [{name: "milk", price: 4.27}]})
    })
});

describe('POST /items', function() {
    test('post new item', async function() {
        const data = {
            "name": "relish",
            "price": 2.83
        }
        const resp = (await request(app).post('/items').send(data));
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({Added: {name: "relish", price: 2.83}})
    })
})

describe('GET /items/:name', function() {
    test('get a specific item for list given name.', async function() {
        const resp = await request(app).get('/items/milk');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ name: 'milk', price: 4.27 })
    })
})

describe('PATCH /items/:name', function() {
    test('modify name or price of item given item name', async function() {
        const data = {
            "name" : "Whole Milk",
            "price" : 5.83
        }
        const resp = await request(app).patch('/items/milk').send(data);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({ Updated : { name : "Whole Milk", price: 5.83 }});
    })
})