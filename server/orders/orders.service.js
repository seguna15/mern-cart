const { Order } = require("./orders.model");

const createOrder = async(customer, data) => {
    
    const items = JSON.parse(customer.metadata.cart);

     const newOrder = new Order({
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        products: items,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        payment_status: data.payment_status,
    });

    try {
        const saveOrder = await  newOrder.save();
        console.log(saveOrder);
    } catch (error) {
        console.log(error)
    } 
} 



module.exports = createOrder;