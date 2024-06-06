import Product from "../models/product.js";
import mongoose from "mongoose";

export const get_product = async (req,res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


export const post_product = (req,res) => {
  let image_filename=`${req.file.filename}`;
  const newProduct = new Product({
      title:req.body.title,
      description:req.body.description,
      price:req.body.price,
      stock:req.body.stock,
      category:req.body.category,
      images:image_filename
  });
  newProduct.save()
  .then(item => {
    return res.json(item);
    // Or you can use res.send() if you want to send a custom message
    // res.send("Product saved to the database!");
  })
  .catch(error => {
    res.status(500).json({ message: error.message });
  });
}


//Update a product based on the id
export const update_product= async (req, res) => {
  const { id } = req.params;
  const { title, description, price,  stock,  category,  images } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

  const updatedProduct = { title, description, price,  stock,  category,  images , _id: id };

  await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

  res.json(updatedProduct);
  
    res.send("Product updated successfully!");
  };

  //Delete a product based on the id
export const delete_product= async (req, res) => {
const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

  await Product.findByIdAndDelete(id);

  res.json({ message: "Product deleted successfully." });
};