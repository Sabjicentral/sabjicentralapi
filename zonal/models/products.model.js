import db from "../db/db.js";

// Check if the category, subcategory, and brand exist
export const checkForeignKeys = async (categoryId, subcategoryId, brandId) => {
  try {
    const [category] = await db.query("SELECT category_id FROM categories WHERE category_id = ?", [categoryId]);
    const [subcategory] = await db.query("SELECT subcategory_id FROM subcategories WHERE subcategory_id = ?", [subcategoryId]);
    const [brand] = await db.query("SELECT brand_id FROM brands WHERE brand_id = ?", [brandId]);

    if (!category.length || !subcategory.length || !brand.length) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error validating foreign keys:", error);
    throw new Error("Error validating foreign keys");
  }
};

// Create a new product in the database
export const createProductModal = async (
  productName,
  productPrice,
  productDetails,
  productDescription,
  weight,
  storeInfo,
  unit,
  refundable,
  exchangeable,
  imageUrls,
  productType,
  tags,
  manufacturingDate,
  expiryDate,
  sku,
  status,
  categoryId,
  subcategoryId,
  brandId,
  discountPrice
) => {
  try {
    const query = `
      INSERT INTO product (
        product_name, product_price, product_details, product_description, 
        weight, store_info, unit, refundable, exchangeable, product_image, 
        product_type, tags, manufacturing_date, expiry_date, sku, status, 
        category_id, subcategory_id, brand_id, discount_price
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await db.query(query, [
      productName,productPrice,productDetails,productDescription,
      weight,storeInfo,unit,refundable,exchangeable,JSON.stringify(imageUrls),
      productType,tags,manufacturingDate,expiryDate,sku,status,categoryId,subcategoryId,brandId,discountPrice
    ]);

    const [rows] = await db.query(`SELECT * FROM product WHERE product_id = ?`, [result.insertId]);
    return rows[0];
  } catch (error) {
    console.log("Error in createProductModal:", error);
    throw new Error(`Error in createProductModal: ${error.message}`);
  }
};

export const getAllroductModal = async () => {
  try {
    const query = `SELECT * FROM product`;

    const [result] = await db.query(query);

    return result;
  } catch (error) {
    throw new Error(`Error in getAllroductModal  ${error}`);
  }
};

export const getProductByIdModal = async (productId) => {
  console.log("pr", productId);

  try {
    const query = `SELECT * FROM product WHERE product_id = ?`;

    const [result] = await db.query(query, [productId]);

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    throw new Error(`Error in getProductByIdModal  ${error}`);
  }
};

// Get Product by ID
export const getProductByIds = async (productId) => {
  try {
    const [rows] = await db.query(`SELECT * FROM product WHERE product_id = ?`, [productId]);
    return rows[0];
  } catch (error) {
    console.error("Error in getProductById:", error);
    throw new Error(`Error retrieving product: ${error.message}`);
  }
};

// Update Product
export const updateProductModel = async (
  productId,
  productName,
  productPrice,
  productDetails,
  productDescription,
  weight,
  storeInfo,
  unit,
  refundable,
  exchangeable,
  imageUrls,
  productType,
  tags,
  manufacturingDate,
  expiryDate,
  sku,
  status,
  categoryId,
  subcategoryId,
  brandId,
  discountPrice
) => {
  try {
    const query = `
      UPDATE product SET 
        product_name = ?, 
        product_price = ?, 
        product_details = ?, 
        product_description = ?, 
        weight = ?, 
        store_info = ?, 
        unit = ?, 
        refundable = ?, 
        exchangeable = ?, 
        product_image = ?, 
        product_type = ?, 
        tags = ?, 
        manufacturing_date = ?, 
        expiry_date = ?, 
        sku = ?, 
        status = ?, 
        category_id = ?, 
        subcategory_id = ?, 
        brand_id = ?,
        discount_price = ?
      WHERE product_id = ?`;

    // Only stringify if imageUrls is an array (new images are provided)
    const productImage = Array.isArray(imageUrls) ? JSON.stringify(imageUrls) : imageUrls;

    const [result] = await db.query(query, [
      productName,
      productPrice,
      productDetails,
      productDescription,
      weight,
      storeInfo,
      unit,
      refundable,
      exchangeable,
      productImage,
      productType,
      tags,
      manufacturingDate,
      expiryDate,
      sku,
      status,
      categoryId,
      subcategoryId,
      brandId,
      productId,
      discountPrice
    ]);

    // Return the updated product
    const [rows] = await db.query(`SELECT * FROM product WHERE product_id = ?`, [productId]);
    return rows[0];
  } catch (error) {
    console.error("Error in updateProductModel:", error);
    throw new Error(`Error updating product: ${error.message}`);
  }
};


export const deleteProductByIdModal = async (productId) => {
  try {
    const query = `DELETE FROM product WHERE product_id = ?`;

    const [result] = await db.query(query, [productId]);

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    throw new Error(`Error in deleteProductByIdModal  ${error}`);
  }
};
