
const Food = require('../models/Food');
const fs = require('fs');
const path = require('path');

//create food
exports.createfood = async (req, res) => {
    const { name, price } = req.body;
    const image = req.file ? req.file.filename : null;
    const food = new Food({ name, price, image });
    await food.save();
    res.json(food);
};
//view
exports.getfoods = async (req, res) => {
    const foods = await Food.find(); 
    res.json(foods);
}
//updated
exports.updatedfood = async (req, res) => {
    const { name, price } = req.body;
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'food not found' });

    //delete old image
    if (req.file && food.image) {
        const filepath = path.join(__dirname, '../uploads', food.image);
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
    }
    food.name = name || food.name;
    food.price = price || food.price;
    if (req.file) food.image = req.file.filename;
    const updated = await food.save();
    res.json(updated);
}
//delete
exports.deletefood = async (req, res) => {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'food not found' });

    //delete old image
    if (food.image) {
        const filepath = path.join(__dirname, '../uploads', food.image);
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
    }
    await food.remove();
    res.json({ message: 'food deleted' });
}
