import db from '../db/db.js';

export const getAllProductByFilterModel = async (filter) => {
    try {
        const { productName, tags, categoryName } = filter;
        let query = `
            SELECT product.*, categories.category_name
            FROM product
            JOIN categories ON product.category_id = categories.category_id
            WHERE 1=1
        `;
        let queryParams = [];

        if (productName) {
            queryParams.push(`%${productName}%`);
            query += ` AND product.product_name LIKE ?`;
        }

        if (tags) {
            queryParams.push(`%${tags}%`);
            query += ` AND product.tags LIKE ?`;
        }

        if (categoryName) {
            queryParams.push(`%${categoryName}%`);
            query += ` AND categories.category_name LIKE ?`;
        }

        // Log the query and parameters for debugging
        console.log("Query:", query);
        console.log("Parameters:", queryParams);

        // Execute the query
        const [results] = await db.query(query, queryParams);
        return results;
    } catch (error) {
        console.log("Database Query Error:", error);
        throw error; // Re-throw error to be handled by the calling function
    }
};

