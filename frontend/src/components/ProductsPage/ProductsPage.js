import { useState, useEffect } from "react"
import { ProductItem } from "../ProductItem/ProductItem"
import Swal from 'sweetalert2'
import { AddButton } from "../AddButton/AddButton"


export const ProductsPage = ()=>{

    const [query, setQuery] = useState("");

    const [products, setProducts] = useState([])

    

    useEffect(()=>{
        getProducts()

    }, [query])

    const getProducts = async()=>{
        let response = await fetch(`/api/products/`)
        
        let data = await response.json()
        console.log("data: "+ data)
        setProducts(data)
    }



    const updateProduct= async(formValues, id)=>{
      fetch(`/api/products/${id}/update/`,{
      method:"PUT",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify(formValues)
      })
  }


    const createProduct= async(datos)=>{
        await fetch(`api/products/create/`,{
        method:"POST",
        headers:{
            "content-type":"application/json",
            
        },
        body:JSON.stringify(datos)
        })
    }


    const updateHandler= async(id, amount, price)=>{


      const { value: formValues }= await Swal.fire({
          title: 'Actualizar producto',
          html:
            `<input id="swal-input2" class="swal2-input" placeholder="cantidad" value=${amount}>` +
            `<input id="swal-input3" class="swal2-input" placeholder="precio" value=${price}>`,
          focusConfirm: false,
          preConfirm: () => {
            return [
              document.getElementById('swal-input2').value,
              document.getElementById('swal-input3').value
             
            ]
          }
        })
        
        if (formValues) {
          
          console.log("id: "+ id, "valores: " + formValues)
          updateProduct(formValues, id)
          window.location.reload()
          
        }}

    
    const alert= async()=>{

    
        const { value: formValues }= await Swal.fire({
            title: 'Añadir producto',
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
      fetch (`/api/products/${id}/delete/`,{
          method:"DELETE",
          headers:{
              "content-type":"application/json"
          },
      })
      window.location.reload()
      }
    

      
          

          
            

    return(
    
    <div className="main__container">
        <div className="search">
            <input
            className="input-search" 
            type={"text"} 
            placeholder="buscar..." 
            onChange={e=> setQuery(e.target.value)}
            />
            <div>
            <AddButton addProduct={alert}/>
            </div>
        </div>
        
        <div className="main__container-element">

            {products.filter((product)=>
              product.name.toLowerCase().includes(query)
            ).map((product, index)=> (
                
                <ProductItem key={index} product={product} deleteP={deleteNote} updateP={updateHandler}/>
            ))}
        </div>
    </div>
    
    )
}