import Product from "../models/product.js";
import UserReview from "../models/productReview.js";


export const getReviewsByProductId = async(req,res)=>{
    try {
        const {id} = req.params;
        const { color } = req.query;

        if(!id){
            return res.status(400).json({
                success: false,
                message: "Missing product id."
            })
        }
        const all_reviews = await UserReview.find({productId:id}).populate("productVariantId");
        console.log(all_reviews[0].productVariantId.color.toLowerCase());
        
        const reviews = all_reviews.filter(({productVariantId})=>productVariantId.color.toLowerCase()===color.toLowerCase());
        if(!reviews){
             return res.status(400).json({
                success: false,
                message: "No reviews found"
            })
        }
         return res.status(200).json({
                success: true,
                all_reviews
            })
    } catch (error) {
         return res.status(500).json({
            success: false,
            message: `Internal server error: ${error}`
        })
    }
}
export const postReview = async (req, res) => {
    try {
        const { productId, color, rating, review } = req.body;
        if (!productId || !color || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: "Missing parameter."
            })
        }
        const product = await Product.findById(productId).populate('variants');
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Invalide product id"
            })
        }
        const variant = product.variants.find((v) => v.color.toLowerCase() === color.toLowerCase());
        if (!variant) {
            return res.status(400).json({
                success: false,
                message: "Color variant not found with respective color"
            })
        }
        const newreview = await UserReview.create({
            productId,
            userId: req.user.userId,
            rating,
            review,
            productVariantId: variant._id
        })
        return res.status(201).json({
            success: true,
            review: newreview
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error}`
        })
    }
}

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, review } = req.body;
        if (!id || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: "Missing parameter."
            })
        }
        const upreview = await UserReview.findById(id)
       
        if (!upreview) {
            return res.status(400).json({
                success: false,
                message: "No review found"
            })
        }
         if (upreview.userId.toString() !== req.user.userId) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to perfom this action."
            })
        }
        upreview.rating = rating;
        upreview.review = review;
        await upreview.save();
        return res.status(200).json({
            success: true,
            review: upreview
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error}`
        })
    }
}
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Missing id."
            })
        }
        const review = await UserReview.findById(id)
       
        if (!review) {
            return res.status(400).json({
                success: false,
                message: "No review found"
            })
        }
         if (review.userId.toString() !== req.user.userId) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to perfom this action."
            })
        }
        await review.deleteOne();
        return res.status(200).json({
            success: true,
            message:"Review Deleted" 
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error}`
        })
    }
}
