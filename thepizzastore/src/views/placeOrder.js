import React , {useEffect, useState} from 'react';

const PlaceOrder = (props) => {
    function generateRefNumber(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let refNumber = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            refNumber += characters.charAt(randomIndex);
        }
        return refNumber;
    }

    const [pizzas, setPizzas] = useState(null);
    const [toppings, setToppings] = useState(null);
    const [bases, setBases] = useState(null);

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

    useEffect(() => {
        fetch('http://localhost:2663/pizza-base')
            .then (res => {
                return res.json();
            })
            .then(data => {
                //console.log(data);
                setBases(data);
            })
    }, []);

    const [username, setName] = useState();
    const [surname, setSurname] = useState();
    const [phone, setPhone] = useState();
    const [note, setNote] = useState();
    const [pizzaNum, setPizzaNum] = useState();
    const [baseNum, setBaseNum] = useState();
    const [topNum, setTopNum] = useState();


    let status = "1";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedPizza = pizzas.find(pizza => pizza.id === parseInt(pizzaNum));
        const selectedTopping = toppings.find(topping => topping.toppingId === parseInt(topNum));

        const pizzaPrice = selectedPizza ? selectedPizza.price : 0;
        const toppingPrice = selectedTopping ? selectedTopping.price : 0;
        const totalPrice = (parseFloat(pizzaPrice) + parseFloat(toppingPrice));
        const refNumber = generateRefNumber(9);

        const newOrder = { username, surname, phone, note, pizzaNum, baseNum, topNum, status, totalPrice, refNumber };

        const res = await fetch('http://localhost:2663/orders', {
            method: 'POST',
            headers: {'Content-type': 'application/json',

            },

            body: JSON.stringify(newOrder),

        })

    };

    return(
        <div>
            <div className="container">
                <section className="position-relative py-4 py-xl-5">
                    <div className="container position-relative">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                                <div className="card mb-5">
                                    <div className="card-body p-sm-5">
                                        <h2 className="text-center mb-4">Order Pizza</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <select className="form-select"
                                                        required
                                                        value={pizzaNum}
                                                        onChange={(e) => setPizzaNum(e.target.value)}>
                                                <optgroup label="Select Pizzas">
                                                    <option value="" disabled selected>Select A Pizza</option>
                                                    {pizzas && pizzas.map(pizza => (
                                                        <option key={pizza.id} value={pizza.id}>
                                                            {pizza.name} - R{pizza.price}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            </select>
                                            </div>
                                            <div className="mb-3">
                                                <select className="form-select"
                                                        required
                                                        value={topNum}
                                                        onChange={(e) => setTopNum(e.target.value)}>
                                                    <optgroup label="Select Pizzas">
                                                        <option value="" disabled selected>Select A Topping</option>
                                                        {toppings && toppings.map(topping => (
                                                            <option key={topping.toppingId} value={topping.toppingId}>
                                                                {topping.name} - R{topping.price}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <select className="form-select"
                                                        required
                                                        value={baseNum}
                                                        onChange={(e) => setBaseNum(e.target.value)}>
                                                <optgroup label="Choose A Base">
                                                    <option value="" disabled selected>Select A Base</option>
                                                    {bases && bases.map(base => (
                                                        <option key={base.baseId} value={base.baseId}>
                                                            {base.type}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            </select>
                                            </div>
                                            <div className="mb-3"><input className="form-control" type="text"
                                                                          placeholder="Name" name="name"
                                                                         required value={username}
                                                                         onChange={(e) => setName(e.target.value)}/></div>
                                            <div className="mb-3"><input className="form-control" type="text"
                                                                         placeholder="Surname" name="surname"
                                                                         required value={surname}
                                                                         onChange={(e) => setSurname(e.target.value)}/></div>

                                            <div className="mb-3"><input className="form-control" type="number"
                                                                         placeholder="Phone Number" name="phone"
                                                                         minLength={10} maxLength={11}
                                                                         required value={phone}
                                                                         onChange={(e) => setPhone(e.target.value)}/></div>

                                            <div className="mb-3"><textarea className="form-control" id="message-2"
                                                                            name="message" rows="6"
                                                                            placeholder="Add A note"
                                                                            value={note}
                                                                            onChange={(e) => setNote(e.target.value)}></textarea></div>
                                            <div>
                                                <button className="btn btn-primary d-block w-100">Place
                                                    Order
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
};

export default PlaceOrder;