import React, {useEffect, useState} from 'react';

const Sales = (props) => {

    const [sales, setSales] = useState(null);

    useEffect(() => {
        fetch('http://localhost:2663/sales')
            .then (res => {
                return res.json();
            })
            .then(data => {
                setSales(data);
            })
    }, []);

    return(
        <div>
            {sales && sales.length > 0 ? (
                sales.map((sale) => (
                    <div className="container" key={sale.id}>
                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Daily Sales</h4>
                                        <h4 className="card-title">R{sale.totalMoney}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Daily Orders</h4>
                                        <h4 className="card-title">{sale.TotalOrders}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">No Orders Today</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
};

export default Sales;


