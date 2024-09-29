import { createCartModel, deleteCartByIdModel, getAllCardByUserIdModel, getAllCartModel, getCardByIdModel } from "../../models/cart.model.js";


export const createCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId,totalPrice,quantity,cartStatus } = req.body;
          
        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required or invalid.' });
        }

        // Check if required fields are provided
        if (!productId || !totalPrice || !quantity || !cartStatus) {
            return res.status(400).json({ message: "All fields (productId, totalPrice, orderStatus, quantity) are required!" });
        }

        // Create order and check for errors
        const result = await createCartModel(userId, productId, totalPrice, quantity, cartStatus);

        // Handle specific error cases
        if (result.error === 'Invalid userId') {
            return res.status(400).json({ message: "Invalid userId. Please provide a valid user ID." });
        }

        if (result.error === 'Invalid productId') {
            return res.status(400).json({ message: "Invalid productId. Please provide a valid product ID." });
        }

        if (!result) {
            return res.status(400).json({ message: "Cart not created!" });
        }

        // Success response
        return res.status(201).json({ message: "Cart created successfully!" });

    } catch (error) {
        console.log('CreateOrder Error', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const getAllCart = async (req, res) => {
    try {
        const results = await getAllCartModel();

        if(!results) {
            return res.status(400).json({message : 'Cart is not present'});
        }

        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        
    }
}

export const getCartById = async (req, res) => {
    try {
        const {cartId} = req.params;

        if(!cartId) {
            return res.status(400).json({message : "Please Provide Order Id or Invalid"});
        }

        const results = await getCardByIdModel(cartId);

        if(!results) {
            return res.status(400).json({message : "Order is not Present"});
        }

        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        
    }
}

export const getAllCartByUserId = async (req, res) => {
    try {
        const {userId} = req.params;

        if(!userId) {
            return res.status(400).json({message : "Please Provide Order Id or Invalid"});
        }

        const results = await getAllCardByUserIdModel(userId);

        if(!results) {
            return res.status(400).json({message : "Cart is not Present"});
        }

        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteCartById = async (req, res) => {
    try {
        const {cartId} = req.params;

        if(!cartId) {
            return res.status(400).json({message : "Please Provide Product Id or Invalid"});
        }

        const results = await deleteCartByIdModel(cartId);

        if(!results) {
            return res.status(400).json({message : "Order is not Present"});
        }

        return res.status(200).json({message : "Order deleted Successfully!"});
    } catch (error) {
        console.log(error);
        
    }
}