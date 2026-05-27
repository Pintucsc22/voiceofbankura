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
    <div className="bg-gray-100 min-h-screen">

      {/* 🔥 HEADER */}
      <div className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">
            Voice Of Bankura
          </h1>
          <span className="text-sm text-gray-500">
            Bengali News Portal
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">

        {/* 🔥 FEATURED NEWS */}
        {featured && (
          <Link href={`/article/${featured._id}`}>
            <div className="relative mb-8 group cursor-pointer">

              {featured.image && (
                <img
                  src={featured.image}
                  className="w-full h-[350px] object-cover rounded-xl"
                />
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-5 rounded-xl">
                <h2 className="text-white text-2xl font-bold group-hover:underline">
                  {featured.title}
                </h2>
              </div>

            </div>
          </Link>
        )}

        {/* 🎥 VIDEO SECTION */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-white p-3 rounded-xl shadow">
            <h2 className="font-semibold mb-2">YouTube</h2>
            <iframe
              className="w-full h-56 rounded"
              src="https://www.youtube.com/embed?listType=user_uploads&list=YOUR_CHANNEL_ID"
              allowFullScreen
            />
          </div>

          <div className="bg-white p-3 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Facebook</h2>
            <iframe
              className="w-full h-56 rounded"
              src="https://www.facebook.com/plugins/video.php?href=YOUR_VIDEO_LINK"
              allowFullScreen
            />
          </div>

        </div>

        {/* 📰 NEWS GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.slice(1).map((item: any) => (
            <Link href={`/article/${item._id}`} key={item._id}>
              <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300 cursor-pointer">

                {item.image && (
                  <img
                    src={item.image}
                    className="w-full h-40 object-cover"
                  />
                )}

                <div className="p-3">
                  <h3 className="font-semibold text-lg hover:text-red-600 transition">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-1">
                    {item.content?.slice(0, 70)}...
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