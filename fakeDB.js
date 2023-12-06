/* items should be formatted including name and price. 
    ex: item = {
        name: "Name",
        price: "Price"
    }
*/


global.ITEMS = [];

function seedDB() {
    item1 = {
        'name': 'Cheerios',
        'price': 4.29
    }
    item2 = {
        'name': 'milk',
        'price': 5.50
    }
    ITEMS.push(item1, item2);
}

module.exports = { ITEMS, seedDB };