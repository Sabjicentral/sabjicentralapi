import { createOrderModel, deleteOrderByIdModel, editOrderByIdModel, getAllOrderModel, getOrderByIdModel } from "../../models/order.model.js";


export const createOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, totalPrice, orderStatus, quantity } = req.body;
        
        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required or invalid.' });
        }

        // Check if required fields are provided
        if (!productId || !totalPrice || !orderStatus || !quantity) {
            return res.status(400).json({ message: "All fields (productId, totalPrice, orderStatus, quantity) are required!" });
        }

        // Create order and check for errors
        const result = await createOrderModel(userId, productId, totalPrice, orderStatus, quantity);

        // Handle specific error cases
        if (result.error === 'Invalid userId') {
            return res.status(400).json({ message: "Invalid userId. Please provide a valid user ID." });
        }

        if (result.error === 'Invalid productId') {
            return res.status(400).json({ message: "Invalid productId. Please provide a valid product ID." });
        }

        if (!result) {
            return res.status(400).json({ message: "Order not created!" });
        }

        // Success response
        return res.status(201).json({ message: "Order created successfully!" });

    } catch (error) {
        console.log('CreateOrder Error', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const getAllOrder = async (req, res) => {
    try {
        const results = await getAllOrderModel();

        if(!results) {
            return res.status(400).json({message : 'Order is not present'});
        }

        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        
    }
}

export const getOrderById = async (req, res) => {
    try {
        const {orderId} = req.params;

        if(!orderId) {
            return res.status(400).json({message : "Please Provide Order Id or Invalid"});
        }

        const results = await getOrderByIdModel(orderId);

        if(!results) {
            return res.status(400).json({message : "Order is not Present"});
        }

        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        
    }
}

export const editOrderById = async (req, res) => {
    try {
        const {orderId} = req.params;
        const {status} = req.body;

        console.log(req.params);
        console.log(req.body);
        
        

        if(!orderId) {
            return res.status(400).json({message : "Please Provide Order Id or Invalid"});
        }

        if(!status) {
            return res.status(400).json({message : "Status is Required!"});
        }

        const results = await editOrderByIdModel(status,orderId);

        if(!results) {
            return res.status(400).json({message : "Order is not Present"});
        }

        return res.status(200).json('Order Update Successfully!');
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteOrderById = async (req, res) => {
    try {
        const {orderId} = req.params;

        if(!orderId) {
            return res.status(400).json({message : "Please Provide Product Id or Invalid"});
        }

        const results = await deleteOrderByIdModel(orderId);

        if(!results) {
            return res.status(400).json({message : "Order is not Present"});
        }

        return res.status(200).json({message : "Order deleted Successfully!"});
    } catch (error) {
        console.log(error);
        
    }
}