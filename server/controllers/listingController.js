import Product from '../models/productSchema.js';
import cloudinary from '../config/cloudinary.js';

export const createListing = async (req, res) => {
    try {

        console.log("FILES:", req.files); // ← ADD THIS
        console.log("BODY:", req.body);   // ← AND THIS

        const {
            title,
            stock,
            price,
            size,
            category,
            gender,
            desc
        } = req.body;

        if (!title || !desc || !price) {
            return res.status(400).json({
                message: 'Title, price and description are required!'
            });
        }

        // upload images to cloudinary
        const uploadedImages = await Promise.all(
            req.files.map((file) =>
                cloudinary.uploader.upload(file.path)
            )
        );

        const imageUrls = uploadedImages.map(
            (img) => img.secure_url
        );

        const product = await Product.create({
            seller: req.user.id,
            title,
            stock,
            desc,
            price,
            size,
            category: Array.isArray(category)
                ? category[0]
                : category,
            gender,

            images: imageUrls
        });
        

        return res.status(200).json({
            message: "Successfully Created Listing!",
            product
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error invalid!"
        });
    }
};