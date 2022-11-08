import { useState } from "react";

const AddProduct = () => {

    const [Name,setName] = useState('');
    const [Price,setPrice] = useState('');
    const [Quantity,setQuantity] = useState('');

    const handleSubmit =(e) => {
        e.preventDefault();
        const product = {Name, Price, Quantity}
        const url = '/productapi/';
        fetch(url,{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body: JSON.stringify({
                name:Name,
                price:Price,
                quantity:Quantity,
            }) 
        })
        .then((data)=>{
            console.log("Product Added !")
            alert("product added !")
        });
    }

    return (
        <div>
            <div className="addPro-title">Add product</div>
            <form className="addPro" onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" required value={Name}  onChange={(e) => setName(e.target.value)} />
                <br />
                <label>Price:</label>
                <input type="float" required value={Price}  onChange={(e) => setPrice(e.target.value)} />
                <br />
                <label>Quantity:</label>
                <input type="integer" required value={Quantity}  onChange={(e) => setQuantity(e.target.value)} />
                <br />
                <input className="submitBtn" type="submit" />
            </form>
        </div>
    );
}

export default AddProduct;