const router = require('express').Router();
const { Category, Product } = require('../../models');
const sequelize = require('../../config/connection.js');
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: {
        model: Product
      }
    });

    if (!categories) res.status(404).json({ message: 'Could not find data!' });
    else res.status(200).json(categories);
  } 
  catch(err) {
    res.status(500).json('Internal server error!');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: {
        model: Product
      }
    });
      
    if (!category) res.status(404).json({ message: 'Could not find data by that id!' });
    else res.status(200).json(category);

  } catch(err) {
    res.status(500).json('Internal server error!');
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
      
    res.status(200).json(newCategory);

  } catch(err) {
    res.status(500).json('Internal server error!');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
      
    res.status(200).json(updatedCategory);

  } catch(err) {
    res.status(500).json('Internal server error!');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedCategory) res.status(404).json({ message: 'Could not find data by that id!' });
    else res.status(200).json(deletedCategory);

  } catch(err) {
    res.status(500).json('Internal server error!');
  }
});

module.exports = router;
