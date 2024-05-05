const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [
    {
      model: Product,
      through: ProductTag,
    },
  ],
})
.then((tags) => res.json(tags))
.catch((err) => res.status(500).json(err));
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
      model: Product,
      through: ProductTag,
    },
  ],
})
// be sure to include its associated Products
.then((tag) => res.json(tag))
.catch((err) => res.status(400).json(err));
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => res.json(tag))
  .catch((err) => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => res.json(tag))
  .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => res.json(tag))
  .catch((err) => res.status(400).json(err));
});

module.exports = router;
