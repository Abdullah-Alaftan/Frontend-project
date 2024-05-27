import { Link as ScrollLink } from "react-scroll";

export function HeroBar() {
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted>
        <source src="./vid/running.mp4" type="video/mp4" />
        Your browser does not support HTML video.
      </video>
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 container h-full flex flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Experience the Future of Footwear
        </h1>
        <p className="mt-4 max-w-3xl text-lg md:text-xl">
          Discover our latest collection of high-performance shoes designed to elevate your every step.
        </p>
        <div className="mt-8">
          <ScrollLink
            to="products"
            smooth={true}
            duration={500}
            className="inline-flex items-center justify-center rounded-md bg-primary-500 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer"
          >
            Shop Now
          </ScrollLink>
        </div>
      </div>
    </section>
  );
}
