import React from "react";
import AdminMenu from "../../components/layout/AdminMenu.jsx";
import Layout from "../../components/layout/Layout.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../const.js";

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const getProducts = async () => {
    try {
      const { data } = await axios(`${SERVER_URL}/api/v1/products/all-products`);
      setProducts(data.products);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };
  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout title={"Dashboard - Products"}>
      <div className="flex flex-row gap-8 sm:flex-row h-full overflow-hidden -z-10">
        <div className=" shadow-lg w-[280px] sm:w-64">
          <AdminMenu />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 w-full p-4">
          {products.map((p) => (
            <Link
              to={`/dashboard/admin/product/${p.slug}`}
              key={p._id}
              className="hover:scale-105 transform transition duration-300"
            >
              <div className="w-full rounded-md border shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img
                  src={`${SERVER_URL}/api/v1/products/product/photo/${p._id}`}
                  alt={p.name}
                  className="h-[200px] w-full rounded-t-md object-contain"
                />
                <div className="p-4">
                  <h1 className="text-lg font-semibold">{p.name}</h1>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-black">
                      ${p.price}
                    </span>
                    <button
                      type="button"
                      className="rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
