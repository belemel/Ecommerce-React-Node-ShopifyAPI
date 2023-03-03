import React, { Fragment, useEffect, useState } from "react";
import { RiMouseFill } from "react-icons/ri";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import Load from "../Load/Load";
import Slider from "../Slider/slider"
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../../component/ProductList/ProductList"
import { 
  fetchAsyncProducts, 
  getAllProducts, 
  getAllProductsStatus } from "../../store/productSlice"
import { STATUS } from "../../utils/status";

const Home = () => {
 //let [loading, setLoading] = useState(false); 
 let [color, setColor] = useState("#ffffff"); 
 //const { loading, error, products, productsCount } = useSelector((state) = state.products)
 const alert = useAlert(); 
 const dispatch = useDispatch();
 
/*useEffect(() => {
    const fetchProduct = async () => {
      const response = await productApi.get(`products`)
      .catch((err) => {
        console.log("Err: ", err);
       });
       dispatch(addProducts(response.data))
       console.log("response in api", response.data.products)
    };
    fetchProduct()
}, [])*/

useEffect(() => {
 dispatch(fetchAsyncProducts());
}, [])

const products = useSelector(getAllProducts);
console.log(products)
const productStatus = useSelector(getAllProductsStatus);
console.log(productStatus)
// randomizing the products
const tempProducts = [] 
if(products.length > 0){
  for (let i in products){
     let randomIndex = Math.floor(Math.random() * 
     products.length); 
     
     while(tempProducts.includes(products[randomIndex])){
      randomIndex = Math.floor(Math.random() * 
      products.length)
     }
     tempProducts[i] = products[randomIndex]
    }
}

/*function Loading() {   
  setTimeout(setLoading(false), 100) 
}

useEffect(() => {
 // Loading();
})*/


  return (
    <Fragment>
      {productStatus === STATUS.LOADING ? (
        <Load />
      ) : (
          <Fragment>
          <MetaData title="ECOMMERCE" />
          
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <Slider />
            <a href="#container">
              <button>
                Scroll <RiMouseFill />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
               { productStatus === STATUS.LOADING ? <Load /> :
                <ProductList products={tempProducts}/>}
           </div>
        </Fragment>
      )

      }
      
     
    </Fragment>
  );
};

export default Home;