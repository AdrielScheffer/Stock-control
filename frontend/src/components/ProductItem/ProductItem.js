import { Link } from "react-router-dom"


export const ProductItem= ({product, deleteP})=>{
    
    
    return(
        <div>
            <div className="notes__body">
                
                <h3>{product.name}</h3>
                <p>cantidad: {product.amount}</p>
                <p>precio: ${product.price}</p>
                <Link to={'/'} onClick={()=>{deleteP(product.id)}}>borrar</Link>
                <hr></hr>
            </div>
        </div>
    )
}