import Image from "next/image";

export default function DressStyle() {
  const items = [
    { title: "Casual", img: "/casual.png", span: "col-span-1" },
    { title: "Formal", img: "/formal.png", span: "col-span-2" },
    { title: "Party", img: "/party.png", span: "col-span-2" },
    { title: "Gym", img: "/gym.png", span: "col-span-1" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="rounded-3xl bg-[#FFFFF] p-10">
        <h2 className="text-center text-3xl font-black tracking-tight">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="mt-10 grid grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className={`relative ${item.span} h-40 overflow-hidden rounded-2xl bg-gray-white border border-neutral-200`}
            >
              <Image
                src={item.img}
                alt={item.title}
                width={400}
                height={400}
                className="absolute right-0 top-0 h-full w-auto object-contain"
              />

              <h3 className="absolute left-6 top-6 text-lg font-bold">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}