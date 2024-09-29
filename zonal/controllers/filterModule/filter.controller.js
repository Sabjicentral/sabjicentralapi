import { getAllProductByFilterModel } from "../../models/filter.model.js";

export const getAllProductByFilter = async (req, res) => {
    try {
        const filter = {
            productName: req.query.productName || undefined,
            tags: req.query.tags || undefined,
            categoryName: req.query.categoryName || undefined
        };

        const filteredResults = await getAllProductByFilterModel(filter);

        res.status(200).json(filteredResults);
    } catch (error) {
        console.log("getFilteredProductsAndCategoriesHandler Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

