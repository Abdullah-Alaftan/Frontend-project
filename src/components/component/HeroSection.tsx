
import { Link } from "react-router-dom"

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center">
      <div className="relative z-10 container px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-black tracking-tight">
            Step Into Style with Our Shoe Collection
          </h1>
          <p className="text-lg md:text-xl text-black-200 max-w-md">
            Discover the perfect pair to elevate your look and comfort. Explore our latest shoe designs that blend
            fashion and function.
          </p>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#6366F1] shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
            to="https://assets.adidas.com/images/w_450,f_auto,q_auto/8c4158c4c39a4ab09b8ba8c000c96fd0_9366/B75806_010_hover_standard.jpg"
         >
            Shop Shoes
          </Link>
        </div>
        <img
          alt="https://assets.adidas.com/images/w_450,f_auto,q_auto/8c4158c4c39a4ab09b8ba8c000c96fd0_9366/B75806_010_hover_standard.jpg"
          className="w-full h-full object-cover"
          height={1080}
          src="https://assets.adidas.com/images/w_450,f_auto,q_auto/8c4158c4c39a4ab09b8ba8c000c96fd0_9366/B75806_010_hover_standard.jpg"
          style={{
            aspectRatio: "1920/1080",
            objectFit: "cover",
          }}
          width={1920}
        />
      </div>
    </section>
  )
}
