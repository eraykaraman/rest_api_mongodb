const router = require("express").Router();
const Category = require("..//models/Category");

router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  const category = await Category.findOne({ name: newCat.name });
  if (!category) {
    try {
      const savedCat = await newCat.save();
      res.status(201).json(savedCat);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(400).json("Category name is already exist.");
  }
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    try {
      await Category.deleteOne(category);
      res.status(200).json("Category has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json("Category not found.");
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
