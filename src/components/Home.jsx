import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  const categories = [
    { name: 'Beauty', filter: 'beauty', color: '#993556', emoji: '✨' },
    { name: 'Fragrances', filter: 'fragrances', color: '#534AB7', emoji: '🌸' },
    { name: 'Groceries', filter: 'groceries', color: '#0F6E56', emoji: '🛒' },
  ]

  const features = [
    { icon: '📦', title: 'Free shipping', desc: 'On all orders above $50' },
    { icon: '⭐', title: 'Top rated', desc: 'Curated top-rated products' },
    { icon: '🔐', title: 'Secure checkout', desc: 'Your data is always safe' },
  ]

  return (
    <div className="m-5">

      {/* Hero */}
      <div className="w-full bg-zinc-800 rounded-xl text-white grid grid-cols-1 sm:grid-cols-2 gap-5 items-center justify-items-center py-10 px-8 mb-8">
        <div className="flex flex-col gap-6 items-start justify-center">
          <p className="text-xs tracking-widest text-zinc-400 uppercase">New arrivals every week</p>
          <div>
            <h1 className="font-bold text-4xl md:text-5xl mb-3 leading-tight">
              Shop The Latest<br />Products
            </h1>
            <p className="text-zinc-400 text-lg">
              Find best deals on beauty, fragrances and more.
            </p>
          </div>
          <button
            className="bg-white text-zinc-800 px-4 py-2 rounded-xl font-medium w-1/2 hover:bg-zinc-100 transition cursor-pointer"
            onClick={() => navigate('/products')}
          >
            Shop Now 
          </button>
        </div>
        <div>
          <img
            className="h-80 rounded-xl object-cover w-full"
            src="https://media.istockphoto.com/id/1660821332/photo/online-grocery-shopping-app-on-smartphone.jpg?s=2048x2048&w=is&k=20&c=hOprEZAC2aG7P3zYXWeMrZThV4TD4xGVTuiEDVuXsuY="
            alt="shopping"
          />
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto mb-8">
        <p className="text-xs tracking-widest text-zinc-400 uppercase mb-4">Why shop with us</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div key={i} className="bg-zinc-50 px-8 py-6 rounded-xl border border-zinc-200 hover:scale-105 transition">
              <p className="text-2xl mb-3">{feature.icon}</p>
              <p className="text-base font-semibold text-zinc-800 mb-1">{feature.title}</p>
              <p className="text-zinc-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-widest text-zinc-400 uppercase mb-4">Shop by category</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {categories.map((category, i) => (
            <div
              key={i}
              
              className="bg-zinc-50 px-8 py-8 rounded-xl cursor-pointer hover:scale-105 hover:opacity-90 transition"
              onClick={() => navigate(`/products?category=${category.filter}`)}
            >
              <p className="text-3xl mb-3">{category.emoji}</p>
              <p className="font-semibold text-lg">{category.name}</p>
              <p className="text-sm mt-1">Shop now →</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home