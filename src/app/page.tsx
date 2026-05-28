import Link from "next/link";

async function getArticles() {
  const res = await fetch("http://localhost:3001/api/articles", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const articles = await getArticles();

  const featured = articles[0];

  return (
    <div>

      {/* 🔴 TOP BAR */}
      <div className="bg-red-700 text-white text-sm py-2 px-4 flex justify-between">
        <span>ভয়েস অফ বাঁকুড়া</span>
        <span>বাংলার খবর বাংলার ভাষায়</span>
      </div>

      {/* 🔥 HEADER */}
      <div className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">

          <h1 className="text-4xl font-bold text-red-700">
            Voice Of Bankura
          </h1>

          <div className="hidden md:flex gap-6 font-medium">
            <span>রাজ্য</span>
            <span>দেশ</span>
            <span>খেলা</span>
            <span>বিনোদন</span>
            <span>স্থানীয় খবর</span>
          </div>

        </div>
      </div>

      {/* 🚨 BREAKING NEWS */}
      <div className="bg-black text-white py-2 overflow-hidden">
        <marquee>
          🔥 ব্রেকিং নিউজ: ভয়েস অফ বাঁকুড়া এখন ডিজিটাল নিউজ পোর্টাল
        </marquee>
      </div>

      <div className="max-w-7xl mx-auto p-4">

        {/* FEATURED */}
        {featured && (
          <Link href={`/article/${featured._id}`}>
            <div className="relative mb-10 rounded-2xl overflow-hidden group">

              <img
                src={featured.image}
                className="w-full h-[450px] object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

              <div className="absolute bottom-0 p-6">
                <h2 className="text-white text-4xl font-bold max-w-3xl leading-snug">
                  {featured.title}
                </h2>
              </div>

            </div>
          </Link>
        )}

        {/* NEWS GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {articles.slice(1).map((item: any) => (
            <Link href={`/article/${item._id}`} key={item._id}>

              <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl transition duration-300 group">

                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-5">

                  <h2 className="font-bold text-xl leading-snug group-hover:text-red-700 transition">
                    {item.title}
                  </h2>

                  <p className="text-gray-600 mt-3 text-sm">
                    {item.content?.slice(0, 90)}...
                  </p>

                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>
    </div>
  );
}