import Image from "next/image";

export default function DressStyle() {
  const items = [
    { title: "Casual", img: "/styles/casual.jpg" },
    { title: "Formal", img: "/styles/formal.jpg" },
    { title: "Party", img: "/styles/party.jpg" },
    { title: "Gym", img: "/styles/gym.jpg" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="rounded-3xl bg-[#F4F0F0] p-8">
        <h2 className="text-center text-2xl font-black">BROWSE BY DRESS STYLE</h2>

        <div className="mt-8 grid grid-cols-2 gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              className="relative h-40 overflow-hidden rounded-2xl bg-gray-200"
            >
              <Image src={it.img} alt={it.title} className="h-full w-full object-cover" />
              <div className="absolute left-5 top-5 text-lg font-black">{it.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}