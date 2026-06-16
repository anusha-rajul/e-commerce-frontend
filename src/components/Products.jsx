import { useContext, useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductContextComponent } from "../context/ProductsContext";
import useDebounce from "./useDebounce";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams] = useSearchParams()
  const { products, setIndex, isLoading } = useContext(ProductContextComponent);
 
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState(searchParams.get('category') || "");
  const [price, setPrice] = useState("");

 const categoryParam = searchParams.get('category') || ''

  let numbers = [1, 2, 3, 4, 5];

  const debouncedSearch = useDebounce(search, 300);

  let [min, max] = price
    ? price.split("-").map(Number)
    : [0, Infinity];

  let filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.title
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) &&
        (selection === "" ||
          product.category.toLowerCase() === selection) &&
        (price === "" ||
          (product.price >= min && product.price <= max))
      );
    });
  }, [products, selection, price, debouncedSearch]);

  let items = filteredProducts.length;

  useEffect(() => {
     setSelection(categoryParam)
  },[categoryParam])

  return (
    <>
     {/* Search Section */}
<div className="relative flex justify-center items-center">

  {/* Search + Filters */}
  <div className="w-[90%] md:w-[80%] relative rounded-xl mt-5 overflow-hidden shadow-xl">

    {/* Background Image covering whole search box */}
    <img
      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop"
      alt="search-bg"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Inputs on top of image */}
    <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row justify-center items-center gap-4">

      <input
        value={search}
        type="text"
        placeholder="Search products"
        className="px-4 py-3 w-full md:w-1/3 rounded-lg outline-none bg-white text-black"
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={selection}
        onChange={(e) => setSelection(e.target.value)}
        className="px-4 py-3 rounded-lg w-full md:w-auto bg-white text-black"
      >
        <option value="">All</option>
        <option value="beauty">Beauty</option>
        <option value="groceries">Groceries</option>
        <option value="fragrances">Fragrances</option>
      </select>

      <select
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="px-4 py-3 rounded-lg w-full md:w-auto bg-white text-black"
      >
        <option value="">All Prices</option>
        <option value="1-50">$1-$50</option>
        <option value="51-100">$51-$100</option>
        <option value="101-150">$101-$150</option>
      </select>

    </div>
  </div>
</div>

      {/* Products */}
      <div className="mt-10">
        {items === 0 ? (
          <h1 className="flex justify-center items-center font-bold text-2xl">
            No product with that name
          </h1>
        ) : (
          <>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="p-4 my-10 flex flex-col gap-3"
                    >
                      <Skeleton height={150} />
                      <Skeleton height={20} />
                      <Skeleton height={20} />
                      <Skeleton height={20} />
                      <Skeleton height={20} />
                      <Skeleton height={20} />
                    </div>
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mx-10 max-w-7xl mx-auto items-center justify-items-center">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-5 md:gap-20 m-10">
        {numbers.map((number) => (
          <div
            key={number}
            className="bg-[#26292b] text-white rounded-md p-4 cursor-pointer hover:bg-black transition"
            onClick={() => setIndex(number)}
          >
            {number}
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;