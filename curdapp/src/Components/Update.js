import "./Modal.css";
import { useState } from "react";

const UpdateModal = (props) => {
    
    const url = '/productapi/';

    const id = props.product.id;
    const [name,setName] = useState(props.product.name);
    const [price,setPrice] = useState(props.product.price);
    const [quantity,setQuantity] = useState(props.product.quantity);

    
    const handleUpdate = (e) => {
        e.preventDefault();
        const product = {id, name, price, quantity}
        let pro = Object.entries(product).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
        fetch(url,  {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'PUT',
            body: JSON.stringify(pro) 
        })
        .then(()=>{
            console.log(product);
        },[url]);
        props.setModalState(false);
        window.location.reload();
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => {props.setModalState(false)}}>
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>Update the Product !</h1>
                </div>
                <div className="body">
                    <form className="addPro" onSubmit={handleUpdate}>
                        <label>Name:</label>
                        <input type="text" value={name}  onChange={(e) => setName(e.target.value)} />
                        <br />
                        <label>Price:</label>
                        <input type="float" value={price}  onChange={(e) => setPrice(e.target.value)} />
                        <br />
                        <label>Quantity:</label>
                        <input type="integer" value={quantity}  onChange={(e) => setQuantity(e.target.value)} />
                        <br />
                        <input className="submitBtn" type="submit" />
                    </form>               
                </div>
            </div>
        </div>
    );
}

export default UpdateModal;