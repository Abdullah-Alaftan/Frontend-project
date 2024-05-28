import { Link as ScrollLink } from "react-scroll";

export function HeroBar() {
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <video className="w-full h-full object-cover pointer-events-none" autoPlay loop muted playsInline>
          <source src="./vid/runningGuy.mp4" type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div>
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 container h-full flex flex-col items-center justify-center px-4 text-center text-white pointer-events-none">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight pointer-events-none">
          Experience the Future of Footwear
        </h1>
        <p className="mt-4 max-w-3xl text-lg md:text-xl pointer-events-none">
          Discover our latest collection of high-performance shoes designed to elevate your every step.
        </p>
        <div className="mt-8 pointer-events-none">
          <ScrollLink
            to="products"
            smooth={true}
            duration={500}
            className="inline-flex items-center justify-center rounded-md bg-primary-500 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer pointer-events-auto"
          >     Shop Now
          </ScrollLink>
        </div>
      </div>
    </section>
  );
}
