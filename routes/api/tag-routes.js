const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: {
        all: true
      }
    });

    if (!tags) res.status(404).json({ message: 'Could not find data!' });
    else res.status(200).json(tags);
  } 
  catch(err) {
    res.status(500).json('Internal server error!');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        all: true
      }
    });

    if (!tag) res.status(404).json({ message: 'Could not find data by that id!' });
    else res.status(200).json(tag);
  } 
  catch(err) {
    res.status(500).json('Internal server error!');
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
      
    res.status(200).json(newTag);

  } catch(err) {
    res.status(500).json('Internal server error!');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
      
    res.status(200).json(updatedTag);

  } catch(err) {
    res.status(500).json('Internal server error!');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedTag) res.status(404).json({ message: 'Could not find data by that id!' });
    else res.status(200).json(deletedTag);

  } catch(err) {
    res.status(500).json('Internal server error!');
  }
});

module.exports = router;
