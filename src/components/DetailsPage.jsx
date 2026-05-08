import { useContext } from "react"
import { useParams } from "react-router-dom"
import { ProductContextComponent } from "../context/ProductsContext"


const DetailsPage = () => {
    const { id } = useParams()
    const NumberId = Number(id)
  const { products } = useContext(ProductContextComponent)

  if (products.length === 0) {
    return <h1>Loading...</h1>
  }
    const product = products.find((item) => item.id === NumberId)
  
  return (
    <div>
          {product ? <div className="w-3/4 mx-auto flex flex-col gap-4 grid justify-items-start text-lg mb-10">
         
              <img src={product.images[0]} alt='images' className="h-100" />
              <p className="font-bold text-2xl">{product.title}</p>
              <p>{product.description}</p>
              <p>{product.brand}</p>
        <p>Rating: {product.rating}</p>
        <p>{product.warrantyInformation}</p>
              <p className="font-bold text-2xl">Reviews : </p>
              {product.reviews.map((review) => <p>comments :   {review.comment} <p> rating :   {review.rating}</p> <p>reviewerName :   {review.reviewerName}</p></p>)}
              <p className="underline underline-offset-2">{product.returnPolicy}</p>

              </div>
          :
             <h1>No product</h1>
          }
    </div>
  )
}

export default DetailsPage
