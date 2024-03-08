import React, { useEffect, useState } from 'react';

const Orders = (props) => {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        fetch('http://localhost:2663/orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data);
            });
    }, []);

    const getStatusColor = (statusType) => {
        switch (statusType) {
            case 'New':
                return { backgroundColor: 'red',color: 'white' };
            case 'In-Progress':
                return { backgroundColor: 'yellow', color: 'black' };
            case 'Ready':
                return { backgroundColor: 'green', color: 'white' };
            default:
                return {};
        }
    };

    return (
        <div>
            <div className="container">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Order Ref</th>
                            <th>Customer</th>
                            <th>Pizza Name</th>
                            <th>Order Total</th>
                            <th>Order Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders && orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.orderRef}</td>
                                <td>{order.custName}</td>
                                <td>{order.name}</td>
                                <td>R{order.orderTotal}</td>
                                <td style={getStatusColor(order.statusType)}>{order.statusType}</td>
                                <td>{order.date}</td>
                                <td><a href={"view-orders/" + order.orderId}>View Order</a></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
