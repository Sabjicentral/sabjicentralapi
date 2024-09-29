import db from "../db/db.js";

export const createSubcategoryModel = async (subcategoryName, description, categoryId,status) => {
    try {
        const checkCategoryQuery = 'SELECT * FROM categories WHERE category_id = ?';
        
        const [category] = await db.query(checkCategoryQuery, [categoryId]);

        if (category.length === 0) {
            return { error: "Category does not exist" };
        }

        const query = 'INSERT INTO subcategories (subcategory_name, description, category_id, status) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [subcategoryName, description, categoryId, status]);

        return result;
    } catch (error) {
        console.log('SubcategoryModel Error', error);
        return { error: 'Database error' };
    }
};


export const getAllSubcategoryModel = async () => {
    try {
        const query = `
            SELECT subcategories.*, categories.category_name
            FROM subcategories
            JOIN categories ON subcategories.category_id = categories.category_id
        `;

        const [result] = await db.query(query);

        if (result.length === 0) {
            return null;
        }

        return result;
    } catch (error) {
        console.log('SubcategoryModel Error', error);
    }
};


export const getSubcategoryByIdModel = async (subcategoryId) => {
    try {
        const query = `SELECT subcategories.*, categories.category_name
                       FROM subcategories
                       JOIN categories ON subcategories.category_id = categories.category_id
                       WHERE subcategories.subcategory_id = ?
                     `;
        // const query = 'SELECT * FROM subcategories WHERE subcategory_id = ?'

        const [result] = await db.query(query, [subcategoryId]);

        if(result.length === 0) {
            return null;
        }

        return result;
    } catch (error) {
        console.log('SubcategoryModel Error', error);
        
    }
}

export const editSubcategoryByIdModel = async (subcategoryName, description, status, categoryId) => {
    try {
        const query ='update subcategories set subcategory_name=?,description=?,status=? where subcategory_id=?';
        const [result] = await db.query(query,[subcategoryName, description, status, categoryId]);

        if(result.length === 0) {
            return null;
        }

        return result;
    } catch (error) {
        console.log('SubcategoryModel Error', error);
        return {error : "Database error"};

        
    }
}

export const deleteSubcategoryByIdModel = async (subcategoryId) => {
    try {
        const query = 'DELETE FROM subcategories WHERE subcategory_id = ?';

        const [result] = await db.query(query, [subcategoryId]);

        if(result.length === 0) {
            return null;
        }
        return result;
    } catch (error) {
        console.log('SubcategoryModel Error', error);
        
    }
}

export const filterSubcategoryByIdModel = async (categoryId) => {
    try {
        const query = 'SELECT * FROM subcategories WHERE category_id = ?';

        const [result] = await db.query(query, [categoryId]);

        if(result.length === 0) {
            return null;
        }
        return result;
    } catch (error) {
        console.log('categoryModel Error', error);   
    }
};