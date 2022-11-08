import useFetch from "./useFetch";
import UpdateModal from "./Update";
import { useState } from 'react'

const Table = () => {

    const url = '/productapi';
    const { data, isPending, Error } = useFetch(url);

    // const [searchData, setSearchData] = useState()
    
    const handleDelete = (id) => {
        
        fetch(url,{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'DELETE',
            body: JSON.stringify({
                id: id,
            }) 
        })
        .then(()=>{
            console.log("Product Deleted !")
            window.location.reload();
        });
    }

    const [modalState,setModalState] = useState({state:false, product:''});

    return (
        <div>
            <h2>Products</h2>
            {isPending && <div>loading..</div>}
            {Error && <div>error</div>}
            <table>
                <tbody>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
                {data && data.map((product,i) =>{
                    return(
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{product.name}</td>
                        <td>&#x20b9; {product.price}</td>
                        <td>{product.quantity}</td>
                        <td><button onClick={() => setModalState({state:true,product:product}) }>Update</button></td>
                        <td><button onClick={() => handleDelete( product.id )}>Delete</button></td>
                    </tr>
                    );
                    }
                )}
                </tbody>
            </table>
            {modalState.state && <UpdateModal setModalState={setModalState} product={modalState.product} />}
        </div >
    );
}

export default Table;