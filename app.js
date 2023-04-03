const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const { User } = require('./models/User');

app.get('/users', async (req, res) => {
    const users = await User.findAll({});
    return res.status(201).json({
        data: users,
        meta: {
            page: 1,
            per_page: 10,
            totalItems: users.length
        }
    });
});

app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    return res.status(201).json(user);
});

app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        await user.reload();
        return res.status(201).json({user});
    } catch (e) {
        return res.json(e);
    }
    
});

app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
    }
    await user.save();
    return res.status(200).json({});
});

app.delete('/users/:id', async (req, res) => {
    try {        
        const user = await User.findByPk(req.params.id);
        await user.destroy();
        return res.status(204).json({user});
    } catch (e) {
        return res.json(e);
    }
    return res.status(200).json({});
});

app.listen(port, async () => {
    try {
        await User.sync({
            alter: true,
            force: false
        });
        await Review.sync({
            alter: true,
            force: false
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log(`Example app listening on port ${port}`)
});

const { Review } = require('./models/Review');

app.get('/reviews', async (req, res) => {
    const reviews = await Review.findAll({});
    return res.status(201).json({
        data: reviews,
        meta: {
            page: 1,
            per_page: 10,
            totalItems: reviews.length
        }
    });
});

app.get('/reviews/:author_id', async (req, res) => {
    const review = await Review.findAll(req.params.author_id);
    return res.status(201).json(user);
});

app.post('/reviews', async (req, res) => {
    try {
        const review = await Review.create(req.body);
        await review.reload();
        return res.status(201).json({review});
    } catch (e) {
        return res.json(e);
    }
    
});

app.patch('/reviews/:id', async (req, res) => {
    const review = await Review.findByPk(req.params.id);
    if (review) {
        review.author_id = req.body.author_id;
        review.book_id = req.body.book_id;
        review.text = req.body.text;
    }
    await review.save();
    return res.status(200).json({});
});

app.delete('/reviews/:id', async (req, res) => {
    try {        
        const review = await Review.findByPk(req.params.id);
        await review.destroy();
        return res.status(204).json({review});
    } catch (e) {
        return res.json(e);
    }
    return res.status(200).json({});
});
