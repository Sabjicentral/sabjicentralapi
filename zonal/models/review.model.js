import db from '../db/db.js'

export const createReviewModel = async (userId,productId,rating,comment) => {
    try {
        const query = 'INSERT into reviews (user_id,product_id,rating,comment) VALUES (?, ?, ?, ?)';

        const [result] = await db.query(query, [userId, productId, rating, comment]);

        if(result.length === 0) {
            return null;
        }

        return result;
    } catch (error) {
        console.log(error);
        return {error : "Database error"} 
    }
}

export const getAllReviewModel = async () => {
    try {
        const query = 'SELECT * FROM reviews';

        const [result] = await db.query(query);

        if(result.length === 0) {
            return null;
        }
        return result;
    } catch (error) {
        console.log(error);
        return {error : "Database error"} 
    }
}

export const getReviewByIdModel = async (reviewId) => {
    try {
        const query = 'SELECT * FROM reviews WHERE review_id = ?';

        const [result] = await db.query(query, [reviewId]);

        if(result.length === 0) {
            return null;
        }
        return result;
    } catch (error) {
        console.log(error);
        return {error : "Database error"} 
    }
}

export const editReviewByIdModel = async (rating, comment, reviewId) => {
    try {
        const query = 'UPDATE reviews SET rating = ?, comment = ? WHERE review_id = ?';

        const [result] = await db.query(query, [rating, comment, reviewId]);

        if(result.length === 0) {
            return null;
        }

        return result;
    } catch (error) {
        console.log(error);
        return {error : "Database error"} 
    }
}

export const deleteReviewByIdModel = async (reviewId) => {
    try {
        const query = 'DELETE FROM reviews WHERE review_id = ?';

        const [result] = await db.query(query, [reviewId]);

        if(result.length === 0) {
            return null;
        }

        return result;
    } catch (error) {
        console.log(error);
        return {error : "Database error"} 
    }
}