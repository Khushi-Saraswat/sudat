import Product from '../models/product.js';
import Tag from '../models/tag.js';
import ProductImage from '../models/productImage.js';
import ProductVariant from '../models/productVariants.js';
import Store from '../models/store.js';
import mongoose from 'mongoose';

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
      images = [],
      storeId,
      stock
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
      [{ title, description, storeId, slug: slugValue, fabric, work, type, stock }],
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
    let thumbnail = "";
    // Create images
    const imageIds = await Promise.all(
      images.map(async (image) => {
        if(image.isPrimary){
          thumbnail = image.url;
        }
        const [newImage] = await ProductImage.create(
          [
            {
              productId: newProduct[0]._id,
              url: image.url,
              altText: image.altText || '',
              isPrimary: image.isPrimary || false,
            },
          ],
          { session }
        );
        return newImage._id;
      })
    );

    // Link variant and tags to product
    newProduct[0].tags = tagIds;
    newProduct[0].images = imageIds;
    newProduct[0].thumbnail = {
      url: thumbnail,
      public_id: "to_be_filled" // Placeholder, replace with actual public_id if available
    }
    await newProduct[0].save({ session });

    await session.commitTransaction();

    const productWithRelations = await Product.findById(newProduct[0]._id)
      .populate('tags')
      .populate('storeId')
      .populate({
        path: 'variants',
        populate: { path: 'images', model: 'ProductImage' },
      });

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

export const getStoreProducts = async (req, res) => {
  try {
    const { storeId } = req.query;

    // If storeId is provided, verify store exists
    if (storeId) {
      const store = await Store.findById(storeId);
      if (!store) {
        return res.status(404).json({
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
//create product route
// get store product route
// update product rout

// delete product route
// add variant route
