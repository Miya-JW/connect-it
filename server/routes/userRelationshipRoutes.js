const express = require('express');
const router = express.Router();
const userRelationshipController = require('../controllers/UserRelationshipController');

router.get('/user_relationships', userRelationshipController.findAllRelationships);
router.post('/user_relationships', userRelationshipController.createRelationship);
router.get('/user_relationships/:id', userRelationshipController.findRelationshipById);
router.put('/user_relationships/:id', userRelationshipController.updateRelationship);
router.delete('/user_relationships/:id', userRelationshipController.deleteRelationship);

module.exports = router;