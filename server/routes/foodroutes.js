
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploads');
const {
    createfood,
    getfoods,
    updatedfood,
    deletefood
} = require('../controllers/foodctrl');

router.post('/',upload.single('image'),createfood);
router.get('/',getfoods);
router.put('/:id',upload.single('image'),updatedfood);
router.delete('/:id',deletefood);

module.exports = router;
