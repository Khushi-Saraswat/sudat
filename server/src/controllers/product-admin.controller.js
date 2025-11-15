import Product from '../models/product.js';
import Tag from '../models/tag.js';
import ProductImage from '../models/productImage.js';
import ProductVariant from '../models/productVariants.js';
import Store from '../models/store.js';
import mongoose from 'mongoose';
import cloudinary from '../config/cloudinary.js';

// 06-11-25 test this api and create add prodcut as a variant api

export const createProduct = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      title,
      description,
      slug,
      fabric,
      work,
      type,
      tags = [],
      storeId,
      stock,
      color,
      price
    } = req.body;
    const user = req.user;

    const store = await Store.findById(storeId).session(session);
    if (!store) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Store not found.' });
    }
    if (store.ownerId.toString() !== user.userId.toString()) {
      await session.abortTransaction();
      return res.status(403).json({ message: 'Not authorized to add products to this store.' });
    }

    // Generate slug if not provided
    const slugValue = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Create Product
    const newProduct = await Product.create(
      [{ title, description, storeId, slug: slugValue, fabric, work, type, stock, color, price }],
      { session }
    );

    // Handle tags
    const tagIds = await Promise.all(
      tags.map(async (tagName) => {
        let tag = await Tag.findOne({ name: tagName.trim().toLowerCase() }).session(session);
        if (!tag) {
          const [createdTag] = await Tag.create(
            [{ name: tagName.trim().toLowerCase() }],
            { session }
          );
          tag = createdTag;
        }
        return tag._id;
      })
    );

    // Link variant and tags to product
    newProduct[0].tags = tagIds;

    await newProduct[0].save({ session });

    await session.commitTransaction();

    const productWithRelations = await Product.findById(newProduct[0]._id)
      .populate('tags')
      .populate('storeId')

    return res.status(201).json({
      message: 'Product created successfully.',
      product: productWithRelations,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Failed to create product.', error: error.message });
  } finally {
    session.endSession();
  }
};

export const uploadMedia = async (req, res) => {
  try {
    const { productId } = req.params;
    const files = req.files;
    const meta_data = JSON.parse(req.body.meta_data);

    if (!productId) return res.status(400).json({ success: false, message: "productId is required" });
    if (!files?.length) return res.status(400).json({ success: false, message: "No images uploaded" });
    if (meta_data.length !== files.length)
      return res.status(400).json({ success: false, message: "meta_data and files count must match" });

    // later on task:- verify product belongs to the seller

    let product = await Product.findById(productId);
    let thumbnail = {
      url: "",
      public_id: ""
    }

    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = file.buffer.toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64}`,
        { folder: "products" }
      );

      const imageDoc = await ProductImage.create({
        productId,
        url: result.secure_url,
        public_id: result.public_id,
        altText: meta_data[i].altText || "",
        isPrimary: meta_data[i].isPrimary || false,
      });
      if (meta_data[i].isPrimary) {
        thumbnail.url = result.secure_url
        thumbnail.public_id = result.public_id
      }
      await imageDoc.save();
      uploadedImages.push(imageDoc._id);
    }

    product.images = uploadedImages
    product.thumbnail = thumbnail
    await product.save()

    return res.status(201).json({
      message: "Images uploaded successfully",
      images: uploadedImages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error })
  }
}

export const getStoreProducts = async (req, res) => {
  try {
    const { storeId } = req.query;

    // If storeId is provided, verify store exists
    if (storeId) {
      const store = await Store.findById(storeId);
      if (!store) {
        return res.status(404).json({
          success: false,
          message: 'Store not found'
        });
      }

      // Get products for specific store
      const storeProducts = await Product.find({ storeId }) // filter by storeId
        .sort({ createdAt: -1 }) // descending order
        .limit(10)               // limit to 10 documents
        .populate({
          path: 'tags',        // the field in Product that references Tag  // optional: select only fields you want
        });

      console.log(storeProducts);

      if (!storeProducts.length) {
        return res.status(404).json({
          message: 'No products found in this store'
        });
      }

      return res.status(200).json({
        message: 'Store products retrieved successfully',
        count: storeProducts.length,
        products: storeProducts
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

export const updateProduct = async (req, res) => {

  try {
    const { productId } = req.params;
    const { title, description, fabric, work, type, stock, color, slug } = req.body;
    if (!productId) {
      return res.status(404).json({
        success: false,
        message: 'Product id not found'
      });
    }
    const product = await Product.findById(productId).populate("storeId images")
    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Product not found'
      });
    }
    if (product.storeId.ownerId.toString() !== userId.toString()) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized to delete this product.'
      });
    }
    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }
    if (fabric) {
      product.fabric = fabric;
    }
    if (slug) {
      product.slug = slug;
    }
    if (work) {
      product.work = work;
    }
    if (type) {
      product.type = type;
    }
    if (stock) {
      product.stock = stock;
    }
    if (color) {
      product.color = color;
    }
    await product.save();
    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error ${error}`
    });

  }

}

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;
    if (!productId) {
      return res.status(404).json({
        success: false,
        message: 'Product id not found'
      });
    }
    const product = await Product.findById(productId).populate("storeId images variants")
    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Product not found'
      });
    }
    if (product.storeId.ownerId.toString() !== userId.toString()) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized to delete this product.'
      });
    }
    const images = product.images
    for (let image of images) {
      await cloudinary.uploader.destroy(image.public_id);
      await image.deleteOne();
    }
    const productsVariants = product.variants;
    
    for (let productVariant of productsVariants) {
      const product = await Product.findById(productVariant.productId).populate("variants");
      const idx = product.variants.findIndex(async(v) => {
        if(v.productId.toString() === productId.toString()){
          await v.deleteOne();
          return true;
        }
      })
      if (idx !== -1) {
        product.variants.splice(idx, 1);
        await product.save();
      }
    }
    await product.deleteOne();
    return res.status(200).json({
      success: true,
      message: 'Product deleted'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error ${error}`
    });
  }
}

// back to add variant tommorrow, it needs to be write for creating duplicate variants

export const addVariant = async (req, res) => {
  try {
    const { productIDs } = req.body;
    if (!Array.isArray(productIDs)) {
      return res.status(400).json({
        success: false,
        message: "ProductIds should be array."
      })
    }
    let products = []
    let productVariants = []
    for (let i = 0; i < productIDs.length; i++) {
      const pro = await Product.findById(productIDs[i]).populate("variants");
      products.push(pro)
    }
    for (let i = 0; i < productIDs.length; i++) {
      const productVariant = await ProductVariant.create({
        productId: products[i]._id,
        color: products[i].color,
        thumbnail: products[i].thumbnail,
        price: products[i]?.price || 1500,
        inStock: products[i].stock == 0 ? false : true
      })
      productVariants.push(productVariant)
    }

    for (let i = 0; i < productIDs.length; i++) {
      for (let j = 0; j < productIDs.length; j++) {
        if (i == j) continue;
        const idx = products[i].variants.findIndex((v) => v.color === productVariants[j].color)
        if (idx === -1) {
          products[i].variants.push(productVariants[j]._id);
        }
      }
    }
    const variants = [];
    for (let product of products) {
      const variant = product.variants
      variants.push({
        variant
      })
      await product.save();
    }
    return res.status(200).json({
      success: true,
      products: variants
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error."
    })
  }
}




