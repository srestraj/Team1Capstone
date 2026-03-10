import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#F4F0F0]">
      <div className="max-w-6xl mx-auto pt-14 grid md:grid-cols-2 grid-cols-1 gap-10 items-center">
        <div className="px-6">
          <h1 className="text-6xl font-black leading-[0.95] tracking-tight">
            FIND CLOTHES <br />
            THAT MATCHES <br />
            YOUR STYLE
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-gray-700">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex rounded-full bg-black px-8 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Shop Now
          </Link>

          <div className="mt-10 flex flex-wrap items-center divide-x divide-gray-300 gap-8">
            <div className="pr-8">
              <p className="text-3xl font-black">200+</p>
              <p className="text-xs text-gray-600">International Brands</p>
            </div>
            <div className="pr-8">
              <p className="text-3xl font-black">2,000+</p>
              <p className="text-xs text-gray-600">High-Quality Products</p>
            </div>
            <div>
              <p className="text-3xl font-black">30,000+</p>
              <p className="text-xs text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute right-6 top-10 h-10 w-10 rotate-12 bg-black [clip-path:polygon(50%_0,60%_35%,100%_50%,60%_65%,50%_100%,40%_65%,0_50%,40%_35%)]" />
          <div className="absolute left-10 top-1/2 h-7 w-7 -translate-y-1/2 bg-black [clip-path:polygon(50%_0,60%_35%,100%_50%,60%_65%,50%_100%,40%_65%,0_50%,40%_35%)]" />

          <div className="md:h-[700px] h-[510px] w-full overflow-hidden rounded-3xl bg-gray-200">
            <Image
              width={800}
              height={600}
              src="/hero.jpg"
              alt="Fashion hero"
              className="transition-all duration-300 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-black">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-white">
          <span className="text-2xl font-serif tracking-wide">VERSACE</span>
          <span className="text-2xl font-serif tracking-wide">ZARA</span>
          <span className="text-2xl font-serif tracking-wide">GUCCI</span>
          <span className="text-2xl font-serif tracking-wide">PRADA</span>
          <span className="text-2xl font-serif tracking-wide">
            Calvin Klein
          </span>
        </div>
      </div>
    </section>
  );
}
