const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


router.get('/', (req, res) => {

  Product.findAll({
    include: [{ model: Category }, { model: Tag }]
  }).then((DbproductData) => {
    res.json(DbproductData);
  });
});


router.get('/:id', (req, res) => {

  Product.findByPk(req.params.id, {
    include: [{ model: Category }, { model: Tag }]
  }).then((DbproductData) => {
    res.json(DbproductData);
  })
  .catch((err) => {
    res.json(err);
  });
});


router.post('/', (req, res) => {


  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
   
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


router.put('/:id', (req, res) => {
 
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
     
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
   
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
     
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
  
      const productTagsDelete = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsDelete } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
    
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((deletedProduct) => {
      res.json(deletedProduct);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;