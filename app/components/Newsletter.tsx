export default function Newsletter() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-14">
      <div className="rounded-3xl bg-black p-8 text-white flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black leading-tight">
            STAY UPTO DATE ABOUT <br /> OUR LATEST OFFERS
          </h2>
        </div>

        <form className="w-[420px]">
          <input
            className="w-full rounded-full px-5 py-3 text-sm text-black outline-none"
            placeholder="Enter your email address"
            type="email"
          />
          <button
            type="submit"
            className="mt-3 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            Subscribe to Newsletter
          </button>
        </form>
      </div>
    </section>
  );
}