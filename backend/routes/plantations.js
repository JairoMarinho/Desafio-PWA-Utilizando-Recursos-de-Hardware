const express = require('express');
const router = express.Router();
const plantationsController = require('../controllers/plantationsController');

router.get('/', plantationsController.getAllPlantations);
router.post('/', plantationsController.createPlantation);
router.put('/:id', plantationsController.updatePlantation);
router.delete('/:id', plantationsController.deletePlantation);

module.exports = router;
