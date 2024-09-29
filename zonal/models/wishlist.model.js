import db from '../db/db.js';

export const addToWishlistModel = async (userId, productId) => {
    try {
    // Check if the product already exists in the user's wishlist
    const existWishlistQuery = 'SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?';
    const [existWishlist] = await db.query(existWishlistQuery, [userId, productId]);

    if (existWishlist.length > 0) {
        // Product is already in the wishlist
        return { alreadyExists: true };
    }

    const query = 'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)';
    const [result] = await db.query(query, [userId, productId]);
    return result.length === 0 ? null : result;
    } catch (error) {
        console.log('Whishlist Model Error', error);
    }
}

export const getAllWishlistModel = async (userId) => {
    try {
        const query = `
        SELECT wishlist.*, product.product_name, product.product_price,product.product_details,
        product.product_description,product.store_info,product.category,product.sub_category,
        product.brand,product.product_image,product.tags,product.manufacturing_date,product.expiry_date,product.sku,
        product.product_type
        FROM wishlist
        JOIN product ON wishlist.product_id = product.product_id
        WHERE wishlist.user_id = ?
    `;

    const [result] = await db.query(query, [userId]);
    return result.length === 0 ? null : result;
    } catch (error) {
        console.log('Whishlist Model Error', error);
    }
}

export const deleteWishlistModel = async (userId, productId) => {
    try {
        const query = 'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?';
        const [result] = await db.query(query, [userId, productId]);
        return result.length === 0 ? null : result;
    } catch (error) {
        console.log('Whishlist Model Error', error);
    }
}