import React , {useEffect, useState} from 'react';

const Menu = (props) => {

    const [pizzas, setPizzas] = useState(null);

    useEffect(() => {
       fetch('http://localhost:2663/pizzas')
           .then (res => {
               return res.json();
           })
           .then(data => {
               //console.log(data);
               setPizzas(data);
           })
    }, []);




    return(
        <div>
            {pizzas && pizzas.map((pizza) =>(
            <div className="container d-flex menu-row" data-bss-disabled-mobile="true"
                 data-bss-hover-animate="pulse" key={pizza.id}>
                <img src="/images/pizza1.png" width="150"  />
                <div>
                    <h1 className="pizza-title">{pizza.name}</h1>
                    <p>{pizza.ingredients}</p>
                    <h1 className="pizza-price">R{pizza.price}</h1>
                </div>
            </div>
            ))}
        </div>
    )
};

export default Menu;