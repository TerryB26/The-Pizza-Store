import React , {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const OrderDetails = (props) => {
const {id} = useParams();
const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        fetch('http://localhost:2663/orders')
            .then (res => {
                return res.json();
            })
            .then(data => {
                const filteredOrder = data.filter(order => order.orderId === parseInt(id));
                setOrderDetails(filteredOrder);
            })
    }, [id]);

    return(
        <div>
            <div className="container" >
                {orderDetails && orderDetails.map((orderDetail) =>(
                <div className="card card-area" key={orderDetail.orderId}>
                    <div className="card-body">
                        <header className="text-center">
                            <h1>The Pizza Shop</h1>
                            <div><img src="/images/HomePizza.png" width="120" height="120" /></div>
                        </header>
                        <h3 className="card-title">Order:&nbsp; {orderDetail.orderRef}</h3>
                        <h4 className="card-title">Pizza:&nbsp; {orderDetail.name}</h4>
                        <p>Toppings:&nbsp; ({orderDetail.topName}) - {orderDetail.toppings}</p>
                        <p>Customer:&nbsp; {orderDetail.custName}</p>
                        <p>Phone:&nbsp; {orderDetail.custPhone}</p>
                        <h4 className="card-title">R&nbsp;{orderDetail.orderTotal}</h4>
                        <textarea className="textarea" disabled="" value={"Note: " + orderDetail.orderNote}></textarea>
                        <header className="text-center">
                            <div><img src="/images/barcode.png" width="230" height="110" /></div>
                        </header>
                        <a className="btn btn-primary" role="button" href="/view-orders">Close</a>
                    </div>
                </div>

                ))}
            </div>
        </div>
    )
};

export default OrderDetails;
