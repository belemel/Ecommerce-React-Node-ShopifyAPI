import React from "react"
import Product from "../Product/Product"
import './ProductList.css';
import Carousel from "react-material-ui-carousel";

export default function ProductList({products}){
   console.log(products, "temp products")
   
    return (
    <Carousel>
      {
        products?.map((product) => {
            return (
                <>
                <Product key={product?.id} product={product} />
                </>
            )
        })
      }
    </Carousel>
   )
}