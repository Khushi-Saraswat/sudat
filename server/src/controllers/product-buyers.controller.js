import Product from "../models/product.js";

// customers
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
    })
      .select("title price description price thumbnail")
      .limit(10)

    // Fetch primary image for each product

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// customers
export const getProductById = async (req, res) => {
  try {
    console.log("Entered in getProductById");

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    console.log(id);

    const product = await Product.findById(id)
      .populate('tags')
      .populate('storeId')
      .populate('variants')
      .populate('images');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
// customers
export const searchProducts = async (req, res) => {
  try {
    const query = req.query.query?.trim();
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const results = await Product.aggregate([
      {
        $search: {
          index: "default", // name of your Atlas Search index
          compound: {
            should: [
              {
                text: {
                  query,
                  path: ["title", "description", "type", "fabric", "work"],
                  fuzzy: { maxEdits: 2, prefixLength: 2 }
                }
              },
              {
                autocomplete: {
                  query,
                  path: "title",
                  tokenOrder: "sequential"
                }
              }
            ]
          }
        }
      },
      {
        $match: { isActive: true }
      },
      {
        $limit: 20
      },
      {
        $project: {
          title: 1,
          slug: 1,
          description: 1,
          type: 1,
          fabric: 1,
          work: 1,
          discountPercentage: 1,
          thumbnail: 1,
          score: { $meta: "searchScore" }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: results.length,
      products: results
    });
  } catch (error) {
    console.error("❌ Search error:", error);
    res.status(500).json({ message: "Server error during search" });
  }
};
//review product route 


// add to card route
// product review route
// get similar products route