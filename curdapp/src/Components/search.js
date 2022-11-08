import { useState } from "react";
import UpdateModal from "./Update";

const Search = () => {

    const url = '/product';
    
    const [searchKey, setSearchKey] = useState('');
    const [ isPending, setIsPending ] = useState(true);
    const [ error, setError ] = useState(null);
    const [searchData, setSearchData] = useState(null)

    const handleDelete = (id) => {
        
        fetch('/productapi',{
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

    const handleSearch = (e) =>{
        e.preventDefault()
        if(searchKey==''){
            console.log("Enter valid search");
            setSearchData(null)
        }
        else{
            fetch(url + '/?search=' + searchKey, {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method:'GET',
            })
            .then(res => {
                if (!res.ok) {
                    throw Error('could load there maybe some server error');
                }
                return res.json();
            })
            .then(data => {
                setSearchData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
        }
    }

    const [modalState,setModalState] = useState({state:false, product:''});

    return (  
        <div>
            <form onSubmit={handleSearch}>
                <label >Search:</label>
                <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            
            {searchData ? (
                <table>
                    <tbody>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                        {searchData && searchData.map((product,i) =>{
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
            ) : (
                <div></div>
            )}

            {modalState.state && <UpdateModal setModalState={setModalState} product={modalState.product} />}
        </div>
    );
}
 
export default Search;