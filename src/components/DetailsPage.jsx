import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ProductContextComponent } from "../context/ProductsContext"


const DetailsPage = () => {
  const navigate = useNavigate()
    const { id } = useParams()
    const NumberId = Number(id)
  const { products , addToCart} = useContext(ProductContextComponent)

  if (products.length === 0) {
    return <h1>Loading...</h1>
  }
    const product = products.find((item) => item.id === NumberId)
  
  
  return (
    
    <div>
      <div className="cursor-pointer px-4 py-2 mx-3 text-lg bg-blue-400 rounded-md w-fit" onClick={()=> navigate('/products')}>
         Back
      </div>
          {product ? <div className="max-w-7xl mx-auto px-4 py-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl shadow-md p-6">

    {/* Product Image */}
    <div className="flex justify-center items-center">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full max-w-md h-[450px] object-contain rounded-xl"
      />
    </div>

    {/* Product Details */}
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold text-gray-800">
        {product.title}
      </h1>

      <p className="text-gray-600 text-lg">
        {product.description}
      </p>

      <div className="flex flex-wrap gap-3">
              <p className="text-gray-600 text-lg">Ratings: <span className="text-gray-800 font-semibold">{product.rating}</span></p>
              <p className="bg-blue-100 rounded-md text-blue-800 px-2 py-1">{product. availabilityStatus}</p>
      </div>

      <div className="text-3xl font-bold text-blue-700">
        ${product.price}
      </div>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Brand:</span>{" "}
          {product.brand}
        </p>

        <p>
          <span className="font-semibold">Warranty:</span>{" "}
          {product.warrantyInformation}
        </p>

        <p>
          <span className="font-semibold">Return Policy:</span>{" "}
          {product.returnPolicy}
        </p>
      </div>

      <button className="w-fit px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition" onClick={()=>addToCart(product.id, 1)}>
        Add To Cart
      </button>
    </div>
  </div>

  {/* Reviews Section */}
  <div className="mt-10">
    <h2 className="text-3xl font-bold mb-6">
      Customer Reviews
          </h2>
          <div className="flex flex-col gap-4">
            {product.reviews.map((review) => (
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <p><span className="text-gray-700">Reviewer Name:</span> {review.reviewerName}</p>
                <p>{review.rating}</p>
                <p className="text-lg "><span className="text-gray-700">Comment: </span>{review.comment}</p>
              </div>
            ))}
            </div>

  </div>
</div>
          :
             <h1>No product</h1>
          }
    </div>
  )
}

export default DetailsPage
