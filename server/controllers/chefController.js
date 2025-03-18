const Chef = require('../models/Chef');

// Get all chefs
exports.getAllChefs = async (req, res) => {
    try {
        const chefs = await Chef.find();
        res.status(200).json(chefs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get chef by ID
exports.getChefById = async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id);
        if (!chef) {
            return res.status(404).json({ message: 'Chef not found' });
        }
        res.status(200).json(chef);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create a new chef
exports.createChef = async (req, res) => {
    const { name, specialty, availability } = req.body;
    try {
        const newChef = new Chef({ name, specialty, availability });
        await newChef.save();
        res.status(201).json(newChef);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update chef by ID
exports.updateChef = async (req, res) => {
    try {
        const chef = await Chef.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!chef) {
            return res.status(404).json({ message: 'Chef not found' });
        }
        res.status(200).json(chef);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete chef by ID
exports.deleteChef = async (req, res) => {
    try {
        const chef = await Chef.findByIdAndDelete(req.params.id);
        if (!chef) {
            return res.status(404).json({ message: 'Chef not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};