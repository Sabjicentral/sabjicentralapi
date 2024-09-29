import db from '../db/db.js';

export const createCategoryModel = async (categoryName, description, categoryUrl, status ) => {
    try {
        const query = 'INSERT INTO categories (category_name, description, category_url, status) VALUES (?, ?, ?, ?)';

        const [result] = await db.query(query, [categoryName, description, categoryUrl, status]);

        if(result.length === 0) {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getAllCategoryModel = async () => {
    try {
        const query = 'SELECT * FROM categories';

        const [result] = await db.query(query);

        if(result.length === 0 ) {
            return null
        }

        return result;
        
    } catch (error) {
        console.log(error);
        
    }
}

export const getCategoryByIdModel = async (categoryId) => {
    try {
        const query = 'SELECT * FROM categories WHERE category_id = ?';

        const [result] = await db.query(query, [categoryId]);
        console.log('m', result);
        

        if(result.length === 0 ) {
            return null
        }

        return result;
        
    } catch (error) {
        console.log(error);
        
    }
}

// Edit
export const getCategoryByIdModels = async (categoryId) => {
    try {
        const query = 'SELECT * FROM categories WHERE category_id = ?';
        const [rows] = await db.query(query, [categoryId]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const editCategoryByIdModel = async (categoryName, description, categoryUrl, status, categoryId) => {
    try {
        const query = 'UPDATE categories SET category_name = ?, description = ?, category_url = ?, status = ? WHERE category_id = ?';
        const [result] = await db.query(query, [categoryName, description, categoryUrl, status, categoryId]);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const deleteCategoryByIdModel = async (categoryId) => {
    try {
       const query = 'DELETE FROM categories WHERE category_id = ?'

       const [result] = await db.query(query, [categoryId]);

       if(result.length === 0) {
        return null
       }

       return result;
        
    } catch (error) {
        console.log(error);
        
    }
}