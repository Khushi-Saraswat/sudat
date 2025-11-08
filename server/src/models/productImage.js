import mongoose from 'mongoose';

const productImageSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // references the Product model
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    variantId:{
       type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductVariant', // references the Product model
      required: true,
    },
    altText: {
      type: String,
      default: '',
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false, // since Sequelize model had timestamps: false
  }
);

const ProductImage = mongoose.model('ProductImage', productImageSchema);

export default ProductImage;
