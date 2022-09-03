import { Link } from "react-router-dom"
import {AiOutlineEdit} from "react-icons/ai";
import {RiDeleteBin6Line} from "react-icons/ri";

export const ProductItem= ({product, deleteP, updateP})=>{
    
    
    return(
        
        <div className="element-container">
            <div className="element-container-inside">
            <h2 className="element-name">{product.name}</h2>
            <p className="element-amount">cantidad: {product.amount} 
                <Link className="update" to={"/"} onClick={()=>{
                    updateP(product.id, product.amount, product.price)}}><AiOutlineEdit className="icon-modify"/></Link> 
            </p>
            <p className="element-price">precio: ${product.price}</p>
            <Link className="delete" to={'/'} onClick={()=>{deleteP(product.id)}}><RiDeleteBin6Line className="icon-delete"/></Link>
            </div>
        </div>
        
    )
}