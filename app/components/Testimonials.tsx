import StarRating from "./StarRating";

type Review = {
  name: string;
  text: string;
  stars: number;
};

const reviews: Review[] = [
  { name: "Sarah M.", stars: 5, text: "I'm blown away by the quality and the fit. Everything looks premium!" },
  { name: "Alex P.", stars: 5, text: "Fast delivery and amazing styles. My go-to store now." },
  { name: "James K.", stars: 4, text: "Great value and nice materials. Will buy again for sure." },
];


export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">OUR HAPPY CUSTOMERS</h2>
        <div className="flex gap-2">
          <button className="h-10 w-10 rounded-full border border-gray-300">‹</button>
          <button className="h-10 w-10 rounded-full border border-gray-300">›</button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="rounded-2xl border border-gray-200 bg-white p-6">
            <StarRating rating={r.stars} readonly={true} />
            <p className="mt-3 text-sm text-gray-700">{r.text}</p>
            <p className="mt-4 text-sm font-bold">{r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}