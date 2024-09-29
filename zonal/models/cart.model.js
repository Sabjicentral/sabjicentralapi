import db from "../db/db.js";

export const createCartModel = async (userId,productId,totalPrice,quantity,cartStatus) => {
    try {
         const checkUserQuery = 'SELECT * FROM users WHERE id = ?';
         const [userExists] = await db.query(checkUserQuery, [userId]);
         if(userExists.length === 0) {
            return {error : "Invalid userId"}
         }

         const checkProductQuery = 'SELECT * FROM product WHERE product_id = ?';
         const [productExists] = await db.query(checkProductQuery, [productId]);
         if(productExists.length === 0) {
            return {error : "Invalid productId"}
         }

         const query = 'INSERT INTO carts (user_id,product_id,total_price,quantity,cart_status) VALUES (?,?,?,?,?)';

         const [results] = await db.query(query, [userId,productId,totalPrice,quantity,cartStatus]);

         return results.length === 0 ? null : results;

    } catch (error) {
        console.log('CartModel Error', error);
        return { error: 'Database error' };
    }
};


export const getAllCartModel = async () => {
    try {
        const query = `
            SELECT 
                carts.cart_id,
                carts.total_price,
                carts.cart_status,
                carts.quantity,
                carts.created_at,
                users.first_name AS first_name,
                users.last_name AS last_name,
                users.phone AS user_phone,
                product.product_name AS product_name,
                product.product_price AS product_price,
                product.product_image AS product_image
            FROM 
                carts
            INNER JOIN users ON carts.user_id = users.id
            INNER JOIN product ON carts.product_id = product.product_id
        `;

        const [result] = await db.query(query);
        return result.length === 0 ? null : result;
    } catch (error) {
        console.log('CartModel Error', error);
        
    }
}

export const getCardByIdModel = async (cartId) => {
    try {
        const query = `
        SELECT 
            carts.cart_id,
            carts.total_price,
            carts.cart_status,
            carts.quantity,
            carts.created_at,
            users.first_name AS first_name,
            users.last_name AS last_name,
            users.phone AS user_phone,
            product.product_name AS product_name,
            product.product_price AS product_price,
            product.product_image AS product_image
        FROM 
            carts
        INNER JOIN users ON carts.user_id = users.id
        INNER JOIN product ON carts.product_id = product.product_id
        WHERE cart_id = ?
    `;

    const [result] = await db.query(query, [cartId]);
    return result.length === 0 ? null : result;
    } catch (error) {
        console.log('OrderModel Error', error);
        
    }
}

export const getAllCardByUserIdModel = async (userId) => {
const query = `
  SELECT carts.*, product.product_image,product.product_name,product.product_price
  FROM carts 
  JOIN product ON carts.product_id = product.product_id 
  WHERE carts.user_id = ?`;
    const [result] = await db.query(query, [userId]);
    return result.length === 0 ? null : result; 
}

export const deleteCartByIdModel = async (cartId) => {
    try {
       const query = 'DELETE FROM carts WHERE cart_id = ?';
       const [result] = await db.query(query, [cartId]);
       return result.length === 0 ? null : result;
    } catch (error) {
        console.log('CartModel Error', error);
        
    }
}
