/* eslint-disable quote-props */
const router = require('express').Router();

router.get('/show/', (req, res) => {
    res.render('item', {
        name: 'Faded SkyBlu Denim Jeans',
        category: 'clothes',
        description: 'Beryl Cook is one of Britain’s most talented and amusing artists .Beryl’s pictures feature women of all shapes and sizes enjoying themselves .Born between the two world wars, Beryl Cook eventually left Kendrick School in Reading at the age of 15, where she went to secretarial school and then into an insurance office. After moving to London and then Hampton, she eventually married her next door neighbour from Reading, John Cook. He was an officer in the Merchant Navy and after he left the sea in 1956, they bought a pub for a year before John took a job in Southern Rhodesia with a motor company. Beryl bought their young son a box of watercolours, and when showing him how to use it, she decided that she herself quite enjoyed painting. John subsequently bought her a child’s painting set for her birthday and it was with this that she produced her first significant work, a half-length portrait of a dark-skinned lady with a vacant expression and large drooping breasts. It was aptly named ‘Hangover’ by Beryl’s husband and It is often frustrating to attempt to plan meals that are designed for one. Despite this fact, we are seeing more and more recipe books and Internet websites that are dedicated to the act of cooking for one. Divorce and the death of spouses or grown children leaving for college are all reasons that someone accustomed to cooking for more than one would suddenly need to learn how to adjust all the cooking practices utilized before into a streamlined plan of cooking that is more efficient for one person creating less',
        quantity: 20,
        images: [
            '/img/category/s-p1.jpg',
            '/img/category/s-p1.jpg',
            '/img/category/s-p1.jpg',
        ],
        attributes: {
            'Width': '128mm',
            'Height': '508mm',
            'Depth': '52mm',
            'Weight': '52gm',
            'Quality checking': 'yes',
            'Freshness Duration': '03days',
            'When packeting': 'Without touch of hand',
            'Each Box contains': '60pcs',
        },
        variants: [
            {
                id: 'var_1_1',
                title: 'Blue Colored variant',
                price: 'LKR 4900',
                amount: 5,
                attributes: {
                    'Color': 'Blue',
                },
            },
            {
                id: 'var_1_2',
                title: 'Red Colored variant with 1GB',
                price: 'LKR 5440',
                amount: 0,
                attributes: {
                    'Color': 'Red',
                    'Additional Storage': '1GB',
                },
            },
            {
                id: 'var_1_3',
                title: 'Green Colored variant',
                price: 'LKR 3000',
                amount: 20,
                attributes: {
                    'Color': 'Green',
                },
            },
        ],
    });
});

module.exports = router;
