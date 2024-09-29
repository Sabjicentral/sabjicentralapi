import {
  checkForeignKeys,
  createProductModal,
  deleteProductByIdModal,
  getAllroductModal,
  getProductByIdModal,
  getProductByIds,
  updateProductModel,
} from "../../models/products.model.js";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";

export const createProduct = async (req, res) => {
  const {
    productName,
    productPrice,
    productDetails,
    productDescription,
    weight,
    storeInfo,
    unit,
    refundable,
    exchangeable,
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
  } = req.body;

  // Required fields validation
  if (
    !productName ||
    !productPrice ||
    !productDetails ||
    !productDescription ||
    !weight ||
    !storeInfo ||
    !unit ||
    !categoryId ||
    !subcategoryId ||
    !brandId
  ) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  const productImages = req.files;

  // Image upload validation
  if (!productImages || productImages.length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No images uploaded",
    });
  }

  try {
    // Validate foreign keys (category_id, subcategory_id, brand_id)
    const isValidKeys = await checkForeignKeys(categoryId, subcategoryId, brandId);
    if (!isValidKeys) {
      return res.status(400).json({
        status: "error",
        message: "Invalid category, subcategory, or brand",
      });
    }

    // Upload images to Cloudinary
    const uploadPromises = productImages.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: "product_images",
        public_id: `${Date.now()}-${file.originalname}`,
      })
    );
    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((result) => result.secure_url);

    // Clean up uploaded files locally
    const cleanupPromises = productImages.map((file) => fs.unlinkSync(file.path));
    await Promise.all(cleanupPromises);

    // Create product in database
    const result = await createProductModal(
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
    );

    return res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      status: "error",
      message: "Server error while creating product",
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const result = await getAllroductModal();

    if (!result) {
      return res.send(400).json({
        status: "error",
        message: "Product is not available",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getProductByID = async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log("pr2", productId);

    if (!productId) {
      return res.status(400).json({
        status: "error",
        message: "productId is Required",
      });
    }

    const result = await getProductByIdModal(productId);

    if (!result) {
      return res.status(400).json({
        status: "error",
        message: "Product is not available",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Edit Product
export const editProductById = async (req, res) => {
  const {
    productName,
    productPrice,
    productDetails,
    productDescription,
    weight,
    storeInfo,
    unit,
    refundable,
    exchangeable,
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
  } = req.body;
  
  const productId = req.params.productId;

  try {
    // Get the existing product details to keep any field that is not updated
    const existingProduct = await getProductByIds(productId);
    
    if (!existingProduct) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    // Handle product images
    let imageUrls = existingProduct.product_image;
    const productImages = req.files;

    if (productImages && productImages.length > 0) {
      // Upload new images to Cloudinary
      const uploadPromises = productImages.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: "product_images",
          public_id: `${Date.now()}-${file.originalname}`,
        })
      );
      const uploadResults = await Promise.all(uploadPromises);
      imageUrls = uploadResults.map((result) => result.secure_url);

      // Clean up uploaded files locally
      const cleanupPromises = productImages.map((file) => fs.unlinkSync(file.path));
      await Promise.all(cleanupPromises);
    }

    // Update product with new values or keep old values if not provided
    const updatedProduct = await updateProductModel(
      productId,
      productName || existingProduct.product_name,
      productPrice || existingProduct.product_price,
      productDetails || existingProduct.product_details,
      productDescription || existingProduct.product_description,
      weight || existingProduct.weight,
      storeInfo || existingProduct.store_info,
      unit || existingProduct.unit,
      refundable !== undefined ? refundable : existingProduct.refundable,
      exchangeable !== undefined ? exchangeable : existingProduct.exchangeable,
      imageUrls,
      productType || existingProduct.product_type,
      tags || existingProduct.tags,
      manufacturingDate || existingProduct.manufacturing_date,
      expiryDate || existingProduct.expiry_date,
      sku || existingProduct.sku,
      status || existingProduct.status,
      categoryId || existingProduct.category_id,
      subcategoryId || existingProduct.subcategory_id,
      brandId || existingProduct.brand_id,
      discountPrice || existingProduct.discount_price
    );

    return res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      status: "error",
      message: "Server error while updating product",
    });
  }
};


export const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    // console.log("pr2", productId);

    if (!productId) {
      return res.status(400).json({
        status: "error",
        message: "productId is Required",
      });
    }

    const result = await deleteProductByIdModal(productId);

    if (!result) {
      return res.status(400).json({
        status: "error",
        message: "Product is not available",
      });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
