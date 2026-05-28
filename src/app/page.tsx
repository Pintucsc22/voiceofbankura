import Link from "next/link";

async function getArticles() {
  const res = await fetch("http://localhost:3001/api/articles", {
    cache: "no-store",
  });

  return res.json();
}

async function getMedia() {
  const res = await fetch("http://localhost:3001/api/media", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const articles = await getArticles();
  const media = await getMedia();

  const latestMedia = media[0];

  const featured = articles[0];

  const bankuraNews = articles.filter(
    (item: any) => item.category === "Bankura News"
  );

  const stateNews = articles.filter(
    (item: any) => item.category === "State News"
  );

  const rashifalNews = articles.filter(
    (item: any) => item.category === "Rashifal"
  );

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

        {/* 🏙 BANKURA NEWS */}
        <div className="mb-14">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-red-700 rounded"></div>

            <h2 className="text-3xl font-bold">
              🏙 বাঁকুড়া সংবাদ
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {bankuraNews.map((item: any) => (
              <Link href={`/article/${item._id}`} key={item._id}>

                <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl transition duration-300 group">

                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <div className="p-5">

                    <p className="text-red-600 text-sm font-semibold mb-2">
                      {item.category}
                    </p>

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

        {/* 🏛 STATE NEWS */}
        <div className="mb-14">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-blue-700 rounded"></div>

            <h2 className="text-3xl font-bold">
              🏛 রাজ্য সংবাদ
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {stateNews.map((item: any) => (
              <Link href={`/article/${item._id}`} key={item._id}>

                <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl transition duration-300 group">

                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <div className="p-5">

                    <p className="text-blue-600 text-sm font-semibold mb-2">
                      {item.category}
                    </p>

                    <h2 className="font-bold text-xl leading-snug group-hover:text-blue-700 transition">
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

        {/* 🔮 RASHIFAL */}
        <div className="mb-14">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-yellow-500 rounded"></div>

            <h2 className="text-3xl font-bold">
              🔮 আজকের রাশিফল
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {rashifalNews.map((item: any) => (
              <Link href={`/article/${item._id}`} key={item._id}>

                <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition">

                  <h2 className="font-bold text-2xl mb-3">
                    {item.title}
                  </h2>

                  <p className="text-gray-700">
                    {item.content?.slice(0, 180)}...
                  </p>

                </div>

              </Link>
            ))}

          </div>

        </div>

        {/* 🎥 VIDEO SECTION */}
        {latestMedia && (
          <div className="mt-16">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-red-700 rounded"></div>

              <h2 className="text-3xl font-bold">
                🎥 ভিডিও সংবাদ
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

              {/* YOUTUBE */}
              {latestMedia.youtubeLink && (
                <div className="bg-white rounded-2xl p-4 shadow">

                  <h3 className="font-bold mb-4 text-xl">
                    YouTube Video
                  </h3>

                  <iframe
                    className="w-full h-[300px] rounded-xl"
                    src={latestMedia.youtubeLink.replace(
                      "watch?v=",
                      "embed/"
                    )}
                    allowFullScreen
                  ></iframe>

                </div>
              )}

              {/* FACEBOOK */}
              {latestMedia.facebookLink && (
                <div className="bg-white rounded-2xl p-4 shadow">

                  <h3 className="font-bold mb-4 text-xl">
                    Facebook Video
                  </h3>

                  <a
                    href={latestMedia.facebookLink}
                    target="_blank"
                    className="block bg-blue-600 text-white text-center py-20 rounded-xl text-2xl font-bold hover:bg-blue-700 transition"
                  >
                    ▶ Watch Facebook Video
                  </a>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}