import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { addItem } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(productResponse.data);

        const productsResponse = await axios.get('https://fakestoreapi.com/products');
        setRelatedProducts(productsResponse.data.slice(0, 4)); 
      } catch (error) {
        console.error('Gagal mengambil data produk:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Silakan login terlebih dahulu.");
      navigate("/login");
      return;
    }

    dispatch(addItem({ ...product, quantity: 1 }));
    toast.success(`Produk "${product.title}" berhasil ditambahkan ke keranjang.`);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 text-center mt-5">
        <div className="loading loading-ring loading-lg" style={{ width: "100px", height: "100px" }}></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 container mx-auto my-5">
      <h1 className="text-center text-3xl font-bold mb-4">{product.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="text-center">
          <img src={product.image} alt={product.title} className="rounded-lg shadow-lg max-h-96 object-contain mx-auto" />
        </div>
        <div>
          <h3 className="text-2xl text-primary font-bold">${product.price.toLocaleString()}</h3>
          <p className="mt-4">{product.description}</p>

          <button className="btn btn-primary w-full py-2 mt-4" onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-center text-2xl font-semibold mb-4">Others</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="card shadow-lg hover:shadow-xl">
              <figure className="relative">
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.title} 
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />

              </figure>
              <div className="card-body">
                <h4 className="card-title text-lg text-primary">{relatedProduct.title}</h4>
                <h3 className="text-2xl text-primary font-bold">${product.price.toLocaleString()}</h3>
                <p className="text-gray-600 text-sm">{relatedProduct.description.substring(0, 60)}...</p>
                <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(relatedProduct)}
                  >
                    Add To Chart
                  </button>
 
                  <Link to={`/product/${relatedProduct.id}`} className=" btn btn-outline btn-primary">Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
