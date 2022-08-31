import { Link } from "react-router-dom"

export const AddButton=()=>{



    return(

        <div>
            
        <Link to={"/note/new"}>
            add note
        </Link>
        

        </div>
    )
}