import { useState, useEffect } from "react"
import { ProductItem } from "../ProductItem/ProductItem"
import Swal from 'sweetalert2'
import { AddButton } from "../AddButton/AddButton"


export const ProductsPage = ()=>{

    

    const [products, setProducts] = useState([])

    

    useEffect(()=>{
        getProducts()

    }, [])

    const getProducts = async()=>{
        let response = await fetch('/api/products/')
        let data = await response.json()
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
        fetch(`api/products/create/`,{
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify(datos)
        })
    }


    const updateHandler= async(id, amount, price)=>{


      const { value: formValues }= await Swal.fire({
          title: 'Multiple inputs',
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
        <AddButton addProduct={alert}/>
        <div className="main__container-element">
            {products.map((product, index)=> (
                
                <ProductItem key={index} product={product} deleteP={deleteNote} updateP={updateHandler}/>
            ))}
        </div>
    </div>
    
    )
}