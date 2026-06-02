import { useContext, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductContextComponent } from "../context/ProductsContext";
import useDebounce from "./useDebounce";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const { products, setIndex, isLoading } = useContext(ProductContextComponent);

  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState("");
  const [price, setPrice] = useState("");

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

  return (
    <>
      {/* Hero Image */}
      <div className="relative">
        <div
          className="h-[200px] bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Search + Filters */}
        <div className="absolute left-1/2 bottom-[-45px] -translate-x-1/2 z-10 w-[90%] md:w-[80%]">
          <div className="bg-white shadow-xl rounded-xl p-4 md:p-6 flex flex-col md:flex-row justify-center items-center gap-4">
            
            <input
              value={search}
              type="text"
              placeholder="Search products"
              className="px-4 py-2 w-full md:w-1/3  rounded-lg outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={selection}
              onChange={(e) => setSelection(e.target.value)}
              className="px-4 py-2 rounded-lg w-full md:w-auto"
            >
              <option value="">All</option>
              <option value="beauty">Beauty</option>
              <option value="groceries">Groceries</option>
              <option value="fragrances">Fragrances</option>
            </select>

            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="px-4 py-2 rounded-lg w-full md:w-auto"
            >
              <option value="">All Prices</option>
              <option value="1-50">$1-$50</option>
              <option value="51-100">$51-$100</option>
              <option value="101-150">$101-$150</option>
            </select>
          </div>
        </div>
      </div>

      {/* Extra Space for Overlapping Filters */}
      <div className="mt-24">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mx-10">
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