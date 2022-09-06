import { Link } from "react-router-dom"

export const AddButton=({addProduct})=>{



    return(

        <div className="main__container-add-button">
            
        <Link to={"/"} onClick={()=>{addProduct()}} className="add-button-link">agregar producto</Link>
            
        
        

        </div>
    )
}