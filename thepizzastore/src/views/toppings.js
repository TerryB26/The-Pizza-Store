import React, {useEffect, useState} from 'react';

const Toppings = (props) => {

    const [toppings, setToppings] = useState(null);

    useEffect(() => {
        fetch('http://localhost:2663/toppings')
            .then (res => {
                return res.json();
            })
            .then(data => {
                //console.log(data);
                setToppings(data);
            })
    }, []);

    return(
        <div>
            {toppings && toppings.map((topping) =>(
                <div className="container d-flex menu-row" data-bss-disabled-mobile="true"
                     data-bss-hover-animate="pulse" key={topping.id}>
                    <img src="/images/pizza1.png" width="150"  />
                    <div>
                        <h1 className="pizza-title">{topping.name}</h1>
                        <p>{topping.toppings}</p>
                        <h1 className="pizza-price">R{topping.price}</h1>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Toppings;