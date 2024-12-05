const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    let userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        res.status(200).json(users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(user => user.id !== id);
    res.status(200).send(`User with ID ${id} deleted`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});