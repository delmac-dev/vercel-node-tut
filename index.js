const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const Book = require('./models/Books');

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

const connectDB = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/add-note', async (req, res) => {
    try{
        await Book.insertMany([
            {
                title: 'Book 1',
                author: 'Author 1',
                description: 'Description 1',
                image: 'image 1',
                link: 'link 1'
            },
            {
                title: 'Book 2',
                author: 'Author 2',
                description: 'Description 2',
                image: 'image 2',
                link: 'link 2'
            },
            {
                title: 'Book 3',
                author: 'Author 3',
                description: 'Description 3',
                image: 'image 3',
                link: 'link 3'
            }
        ]);
        res.send('Notes added');
    }catch(error){
        console.log(error);
    }
})

app.get('/books', async (req, res) => {
    try{
        const books = await Book.find();
        res.json(books);
    }catch(error){
        console.log(error);
    }
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})
