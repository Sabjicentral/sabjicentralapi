import db from "../db/db.js";

export const createBrandModel = async (brandName, status) => {
    try {
        const query = 'INSERT INTO brands (brand_name, status) VALUES (?,?)';

        const [result] = await db.query(query, [brandName,status]);

        if(result.length === 0) {
            return null;
        }

        return result;
    } catch (error) {
        console.log(error);
        return {error : "Database error"}
    }
}

export const getAllBrandModel = async () => {
    try {
        const query = 'SELECT * FROM brands';

        const [result] = await db.query(query);

        if(result.length === 0) {
            return null
        }

        return result;
    } catch (error) {
        console.log(error);
        return {error : "Database error"}
    }
}

export const getBrandByIdModel = async (brandId) => {
    try {
        const query = 'SELECT * FROM brands WHERE brand_id = ?';

        const [result] = await db.query(query, [brandId]);

        if(result.length === 0) {
            return null
        }

        return result;
    } catch (error) {
        console.log(error);
        return {error : "Database error"}
    }
}

export const ediBrandByIdModel = async (brandId,brandName,status) => {
    try {
        const query = 'UPDATE brands SET brand_name = ?, status = ? WHERE brand_id  = ?';

        const [result] = await db.query(query, [brandId, brandName, status]);

        if(result.length === 0) {
            return null
        }

        return result;
    } catch (error) {
        console.log(error);
        return {error : "Database error"}
    }
}

export const deleteBrandByIdModel = async (brandId) => {
    try {
        const query = 'DELETE FROM brands WHERE brand_id = ?';

        const [result] = await db.query(query, [brandId]);

        if(result.length === 0) {
            return null;
        }
        return result;
    } catch (error) {
        console.log(error);
        return {error : "Database error"}
    }
}