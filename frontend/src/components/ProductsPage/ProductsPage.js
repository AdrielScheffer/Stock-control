import { useState, useEffect } from "react"
import { ProductItem } from "../ProductItem/ProductItem"
import Swal from 'sweetalert2'


export const ProductsPage = ()=>{

    

    const [products, setProducts] = useState([])

    

    useEffect(()=>{
        getProducts()

    }, [])

    const getProducts = async()=>{
        let response = await fetch('http://127.0.0.1:8000/api/products/')
        let data = await response.json()
        setProducts(data)
    }

    const createProduct= async(datos)=>{
        fetch(`http://127.0.0.1:8000/api/products/create/`,{
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify(datos)
        })
    }

    

    
    const alert= async()=>{



      

    
        const { value: formValues }= await Swal.fire({
            title: 'Multiple inputs',
            html:
              '<input id="swal-input1" class="swal2-input" placeholder="nombre">' +
              '<input id="swal-input2" class="swal2-input" placeholder="cantidad">' +
              '<input id="swal-input3" class="swal2-input" placeholder="precio">',
            focusConfirm: false,
            preConfirm: () => {
              return [
                
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value
               
              ]
            }
          })
          
          if (formValues) {
            
            
            createProduct(formValues)
            window.location.reload()
            
          }}

    const deleteNote= async (id)=>{
      fetch (`http://127.0.0.1:8000/api/products/${id}/delete/`,{
          method:"DELETE",
          headers:{
              "content-type":"application/json"
          },
      })
      window.location.reload()
      }
    


          

          
            

    return(
    
    <div>
        <button onClick={alert}>agregar producto</button>
        <div>
            {products.map((product, index)=> (
                
                <ProductItem key={index} product={product} deleteP={deleteNote}/>
            ))}
        </div>
    </div>
    
    )
}