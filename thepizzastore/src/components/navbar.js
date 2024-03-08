import React from 'react';

const Navbar = (props) => {
    return(
        <div>
            <div className="container">
                <nav className="navbar navbar-expand-md bg-body">
                    <div className="container-fluid">
                        <div className="brand-section">
                            <img src="/images/brandPizza.png" width="70" height="70" alt={1}/>
                        </div>
                        <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span
                            className="visually-hidden">Toggle navigation</span><span
                            className="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse" id="navcol-1">
                            <ul className="navbar-nav">
                                <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
                                <li className="nav-item"><a className="nav-link" href="/menu">Menu</a></li>
                                <li className="nav-item"><a className="nav-link" href="/toppings">Our Toppings</a></li>
                                <li className="nav-item"><a className="nav-link" href="/new-order">Place Order</a></li>
                                <li className="nav-item"><a className="nav-link" href="/view-orders">View Orders</a></li>
                                <li className="nav-item"><a className="nav-link" href="/sales">View Sales</a></li>
                            </ul>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item"><a className="nav-link" href="#">John Doe</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        </div>
    )
};

export default Navbar;