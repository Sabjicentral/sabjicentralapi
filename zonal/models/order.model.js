import db from "../db/db.js";

export const createOrderModel = async (userId,productId,totalPrice,orderStatus,quantity) => {
    try {
         // Check if user exists
         const userQuery = 'SELECT * FROM users WHERE id = ?';
         const [userExists] = await db.query(userQuery, [userId]);
         if (userExists.length === 0) {
             return { error: 'Invalid userId' };
         }
        
         // Check if product exists
         const productQuery = 'SELECT * FROM product WHERE product_id = ?';
         const [productExists] = await db.query(productQuery, [productId]);
         if (productExists.length === 0) {
             return { error: 'Invalid productId' };
         }

        const query = 'INSERT INTO orders (user_id,product_id,total_price,order_status,quantity) VALUES (?,?,?,?,?)';

        const [result] = await db.query(query, [userId,productId,totalPrice,orderStatus,quantity]);

        return result.length === 0 ? null : result;
    } catch (error) {
        console.log('OrderModel Error', error);
        return { error: 'Database error' };
    }
};


export const getAllOrderModel = async () => {
    try {
        const query = `
            SELECT 
                orders.order_id,
                orders.total_price,
                orders.order_status,
                orders.quantity,
                orders.created_at,
                users.first_name AS first_name,
                users.last_name AS last_name,
                users.phone AS user_phone,
                product.product_name AS product_name,
                product.product_price AS product_price
            FROM 
                orders
            INNER JOIN users ON orders.user_id = users.id
            INNER JOIN product ON orders.product_id = product.product_id
        `;

        const [results] = await db.query(query);
        return results.length === 0 ? null : results;
    } catch (error) {
        console.log('OrderModel Error', error);
        return { error: 'Database error' };
    }
};



export const getOrderByIdModel = async (orderId) => {
    try {
        const query = `
        SELECT 
            orders.order_id,
            orders.total_price,
            orders.order_status,
            orders.quantity,
            orders.created_at,
            users.first_name AS first_name,
            users.last_name AS last_name,
            users.phone AS user_phone,
            product.product_name AS product_name,
            product.product_price AS product_price
        FROM 
            orders
        INNER JOIN users ON orders.user_id = users.id
        INNER JOIN product ON orders.product_id = product.product_id
        WHERE order_id = ?
    `;

    const [results] = await db.query(query,[orderId]);
    return results.length === 0 ? null : results;
    } catch (error) {
        console.log('OrderModel Error', error);
        
    }
}

export const editOrderByIdModel = async (status,orderId) => {
    try {
       const query = 'UPDATE orders SET order_status = ? WHERE order_id = ?';
       const [results] = await db.query(query, [status,orderId]);
       return results.length === 0 ? null : results;
    } catch (error) {
        console.log('OrderModel Error', error);
        return {error : "Database error"};

        
    }
}

export const deleteOrderByIdModel = async (orderId) => {
    try {
       const query = 'DELETE FROM orders WHERE order_id = ?';
       const [results] = await db.query(query, [orderId]);

       return results.length === 0 ? null : results;
    } catch (error) {
        console.log('OrderModel Error', error);
        
    }
}
