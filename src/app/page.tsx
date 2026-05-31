import Link from "next/link";
import { headers } from "next/headers";

async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get("host");

  return `${
    process.env.NODE_ENV === "development" ? "http" : "https"
  }://${host}`;
}

async function getArticles() {
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/articles`, {
    cache: "no-store",
  });

  return res.json();
}

async function getRashifal() {
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/rashifal`, {
    cache: "no-store",
  });

  return res.json();
}

async function getWeather() {
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/weather`, {
    cache: "no-store",
  });

  return res.json();
}

async function getGoldPrice() {
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/gold-price`, {
    cache: "no-store",
  });

  return res.json();
}

async function getVideos() {
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/videos`, {
    cache: "no-store",
  });

  return res.json();
}
export default async function Home() {

  let articles = await getArticles();

  if (!Array.isArray(articles)) {
    articles = [];
  }

  const featured = articles.length > 0 ? articles[0] : null;

  const latestNews = Array.isArray(articles)
    ? articles.slice(1, 6)
    : [];

  const bankuraNews = Array.isArray(articles)
    ? articles.filter((item: any) => item.category === "Bankura News")
    : [];

  const stateNews = Array.isArray(articles)
    ? articles.filter((item: any) => item.category === "State News")
    : [];

  const sportsNews = Array.isArray(articles)
    ? articles.filter((item: any) => item.category === "Sports")
    : [];

  const entertainmentNews = Array.isArray(articles)
    ? articles.filter((item: any) => item.category === "Entertainment")
    : [];

  const videoNews = Array.isArray(articles)
    ? articles.filter((item: any) => item.video)
    : [];
  const rashifals = await getRashifal();
  const zodiacMap: any = {
  Aries: { icon: "♈", name: "মেষ" },
  Taurus: { icon: "♉", name: "বৃষ" },
  Gemini: { icon: "♊", name: "মিথুন" },
  Cancer: { icon: "♋", name: "কর্কট" },
  Leo: { icon: "♌", name: "সিংহ" },
  Virgo: { icon: "♍", name: "কন্যা" },
  Libra: { icon: "♎", name: "তুলা" },
  Scorpio: { icon: "♏", name: "বৃশ্চিক" },
  Sagittarius: { icon: "♐", name: "ধনু" },
  Capricorn: { icon: "♑", name: "মকর" },
  Aquarius: { icon: "♒", name: "কুম্ভ" },
  Pisces: { icon: "♓", name: "মীন" },
  };
  const videos = await getVideos();
  const weatherData = await getWeather();
  const weather = Array.isArray(weatherData) ? weatherData[0] : null;
  const goldPriceData = await getGoldPrice();
  const goldPrice = Array.isArray(goldPriceData) ? goldPriceData[0] : null;
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* 🔥 TOP BREAKING BAR */}
      <div className="bg-red-700 text-white py-2 overflow-hidden">

        <div className="max-w-7xl mx-auto flex items-center gap-4">

          <span className="bg-white text-red-700 px-3 py-1 font-bold rounded">
            BREAKING
          </span>

          <div className="flex-1 overflow-hidden">
            <div
              className="font-medium whitespace-nowrap"
              style={{ display: "inline-block", animation: "vobMarquee 18s linear infinite" }}
            >
              🌤 আজকের আবহাওয়া • 🪙 আজকের সোনার দাম • 🔥 Voice Of Bankura Digital News Portal
            </div>

            <style>{`
              @keyframes vobMarquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
            `}</style>
          </div>

        </div>

      </div>


      {/* 🔥 MAIN HEADER */}
      <div className="bg-white shadow-md">

        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">

          {/* LEFT LOGO */}
          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-red-700 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
              VOB
            </div>

            <div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Voice Of Bankura
              </h1>

              <p className="text-gray-500 mt-1">
                বাংলার খবর বাংলার ভাষায়
              </p>

            </div>

          </div>

          {/* RIGHT TEXT */}
          <div className="hidden md:block text-right">

            <p className="text-gray-500">
              আজকের খবর
            </p>

            <h2 className="text-2xl font-bold text-red-700">
              বাংলা নিউজ
            </h2>

          </div>

        </div>

      </div>


      {/* 🔥 MENU */}
      <div className="bg-gray-900 text-white shadow">

        <div className="max-w-7xl mx-auto flex overflow-x-auto">

          {[
            "আজকের খবর",
            "বাঁকুড়া",
            "রাজ্য",
            "রাশিফল",
            "সোনার দাম",
            "আবহাওয়া",
            "খেলা",
            "বিনোদন",
          ].map((item) => (

            <div
              key={item}
              className="px-6 py-4 whitespace-nowrap border-r border-gray-700 hover:bg-red-700 transition cursor-pointer font-medium"
            >
              {item}
            </div>

          ))}

        </div>

      </div>


      {/* 📰 MAIN NEWS SECTION */}
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-12 gap-6 mt-6">

        {/* 🔥 FEATURED */}
        <div className="col-span-12 lg:col-span-7">

          {featured && (

            <Link href={`/article/${featured._id}`}>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">

                <img
                  src={featured.image}
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-0 p-8">

                  <span className="bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {featured.category}
                  </span>

                  <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight mt-5 max-w-4xl">

                    {featured.title}

                  </h2>

                  <p className="text-gray-200 mt-5 text-lg max-w-3xl leading-8">

                    {featured.content?.slice(0, 180)}...

                  </p>

                </div>

              </div>

            </Link>

          )}

        </div>


        {/* 📰 LATEST NEWS */}
        <div className="col-span-12 lg:col-span-5">

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            <div className="bg-red-700 text-white px-5 py-4 text-2xl font-bold">
              সর্বশেষ খবর
            </div>

            {latestNews.map((item: any) => (

              <Link
                href={`/article/${item._id}`}
                key={item._id}
              >

                <div className="flex gap-4 p-4 border-b hover:bg-gray-50 transition group">

                  {/* IMAGE */}
                  <div className="w-[130px] h-[90px] overflow-hidden rounded-xl flex-shrink-0">

                    {item.image ? (
                    <img
                      src={item.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}

                  </div>

                  {/* TITLE */}
                  <div>

                    <p className="text-red-700 text-sm font-semibold mb-2">
                      {item.category}
                    </p>

                    <h2 className="font-bold text-lg leading-snug group-hover:text-red-700 transition">

                      {item.title}

                    </h2>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </div>
              {/* 🔮 RASHIFAL SECTION */}
        {/* 🔮 DAILY RASHIFAL */}
      <div className="max-w-7xl mx-auto px-4 mb-20">

        <div className="flex items-center gap-3 mb-8">

          <div className="w-2 h-10 bg-purple-600 rounded-full"></div>

          <h2 className="text-4xl font-extrabold">
            🔮 আজকের রাশিফল
          </h2>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {rashifals.slice(0, 12).map((item: any) => (
            <Link
              href={`/rashifal/${item._id}`}
              key={item._id}
            >

            <div
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-500
                hover:-translate-y-2
                group
              "
            >

              <div className="overflow-hidden">

                {item.image && (
                  <img
                    src={item.image}
                    className="w-full h-[500px] object-cover rounded-b-3xl"
                  />
                )}

              </div>

              <div className="p-4 text-center">

                <h3 className="
                  font-bold
                  text-lg
                  group-hover:text-purple-700
                  transition
                ">
                  {zodiacMap[item.zodiac]?.icon}{" "}
                  {zodiacMap[item.zodiac]?.name}
                </h3>

              </div>

            </div>
            </Link>

          ))}

        </div>

      </div>
                {/* 🌦 WEATHER + GOLD PRICE */}
        <div className="max-w-7xl mx-auto px-4 mb-20">

          <div className="grid lg:grid-cols-2 gap-8">

            {/* 🌤 WEATHER */}

            {weather && (

            <div className="max-w-7xl mx-auto px-4 mb-20">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-2 h-10 bg-sky-500 rounded-full"></div>

                <h2 className="text-4xl font-extrabold">
                  🌤 আজকের আবহাওয়া
                </h2>

              </div>

              <div className="
                bg-gradient-to-r
                from-sky-500
                to-blue-700
                text-white
                rounded-3xl
                overflow-hidden
                shadow-2xl
              ">

                <div className="grid md:grid-cols-2">

                  <div className="p-8">

                    <p className="text-xl mb-2">
                      📍 {weather.city}
                    </p>

                    <h3 className="text-7xl font-bold mb-4">
                      {weather.temperature}
                    </h3>

                    <p className="text-2xl mb-6">
                      {weather.condition}
                    </p>

                    <div className="space-y-2 text-lg">

                      <p>
                        💧 Humidity: {weather.humidity}
                      </p>

                      <p>
                        🌬 Wind: {weather.wind}
                      </p>

                    </div>

                  </div>

                  <div>

                    <img
                      src={weather.image}
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                  </div>

                </div>

              </div>

            </div>

            )}


            {/* 🪙 GOLD PRICE */}
            {/* 🥇 GOLD PRICE */}

            {goldPrice && (

            <div className="max-w-7xl mx-auto px-4 mb-20">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-2 h-10 bg-yellow-500 rounded-full"></div>

                <h2 className="text-4xl font-extrabold">
                  🥇 আজকের সোনা ও রূপার দাম
                </h2>

              </div>

              <div className="
                bg-gradient-to-r
                from-yellow-400
                via-yellow-500
                to-amber-600
                rounded-3xl
                shadow-2xl
                overflow-hidden
              ">

                <div className="
                  grid
                  md:grid-cols-3
                  text-center
                  text-white
                ">

                  <div className="p-8">

                    <div className="text-5xl mb-3">
                      🏅
                    </div>

                    <h3 className="font-bold text-2xl">
                      ২৪ ক্যারেট
                    </h3>

                    <p className="text-3xl mt-3 font-bold">
                      {goldPrice.gold24k}
                    </p>

                  </div>

                  <div className="p-8 border-y md:border-y-0 md:border-x border-white/30">

                    <div className="text-5xl mb-3">
                      🥇
                    </div>

                    <h3 className="font-bold text-2xl">
                      ২২ ক্যারেট
                    </h3>

                    <p className="text-3xl mt-3 font-bold">
                      {goldPrice.gold22k}
                    </p>

                  </div>

                  <div className="p-8">

                    <div className="text-5xl mb-3">
                      ⚪
                    </div>

                    <h3 className="font-bold text-2xl">
                      রূপা
                    </h3>

                    <p className="text-3xl mt-3 font-bold">
                      {goldPrice.silver}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            )}

          </div>

        </div>
        {/* 🏙 BANKURA NEWS */}
        <div className="max-w-7xl mx-auto px-4 mb-16">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-4xl font-extrabold text-gray-900">
              🏙 বাঁকুড়া সংবাদ
            </h2>

            <button className="text-red-700 font-bold">
              আরও দেখুন →
            </button>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {bankuraNews.slice(0, 4).map((item: any) => (

              <Link
                href={`/article/${item._id}`}
                key={item._id}
              >

                <div className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  group
                ">

                  <div className="overflow-hidden">

                    <img
                      src={item.image}
                      className="
                        w-full
                        h-[220px]
                        object-cover
                        group-hover:scale-110
                        transition
                        duration-700
                      "
                    />

                  </div>

                  <div className="p-5">

                    <p className="text-red-700 text-sm font-bold mb-3">
                      {item.category}
                    </p>

                    <h3 className="
                      text-xl
                      font-bold
                      leading-snug
                      group-hover:text-red-700
                      transition
                    ">

                      {item.title}

                    </h3>

                    <p className="text-gray-600 mt-3 text-sm leading-7">

                      {item.content?.slice(0, 90)}...

                    </p>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>


        {/* 🏛 STATE NEWS */}
        <div className="max-w-7xl mx-auto px-4 mb-16">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-4xl font-extrabold text-gray-900">
              🏛 রাজ্য সংবাদ
            </h2>

            <button className="text-red-700 font-bold">
              আরও দেখুন →
            </button>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {stateNews.slice(0, 4).map((item: any) => (

              <Link
                href={`/article/${item._id}`}
                key={item._id}
              >

                <div className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  group
                ">

                  <div className="overflow-hidden">

                    <img
                      src={item.image}
                      className="
                        w-full
                        h-[220px]
                        object-cover
                        group-hover:scale-110
                        transition
                        duration-700
                      "
                    />

                  </div>

                  <div className="p-5">

                    <p className="text-blue-700 text-sm font-bold mb-3">
                      {item.category}
                    </p>

                    <h3 className="
                      text-xl
                      font-bold
                      leading-snug
                      group-hover:text-blue-700
                      transition
                    ">

                      {item.title}

                    </h3>

                    <p className="text-gray-600 mt-3 text-sm leading-7">

                      {item.content?.slice(0, 90)}...

                    </p>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>
        {/* 🎥 VIDEO NEWS */}
        {/* 📺 VIDEO NEWS */}

        <div className="max-w-7xl mx-auto px-4 mb-20">

          <div className="flex items-center gap-3 mb-8">

            <div className="w-2 h-10 bg-red-600 rounded-full"></div>

            <h2 className="text-4xl font-extrabold">
              📺 ভিডিও সংবাদ
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {videos.slice(0, 6).map((item: any) => (

              <a
                href={item.videoUrl}
                target="_blank"
                key={item._id}
              >

                <div className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  group
                ">

                  <div className="relative">

                    <img
                      src={item.thumbnail}
                      className="
                        w-full
                        h-56
                        object-cover
                        group-hover:scale-105
                        transition
                        duration-500
                      "
                    />

                    <div className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                    ">

                      <div className="
                        bg-red-600
                        text-white
                        w-16
                        h-16
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-3xl
                        shadow-xl
                      ">
                        ▶
                      </div>

                    </div>

                  </div>

                  <div className="p-5">

                    <h3 className="
                      font-bold
                      text-lg
                      leading-snug
                    ">
                      {item.title}
                    </h3>

                  </div>

                </div>

              </a>

            ))}

          </div>

        </div>
        {/* 📱 MOBILE BOTTOM NAV */}
        <div className="
          fixed
          bottom-0
          left-0
          right-0
          bg-white
          border-t
          shadow-2xl
          z-50
          md:hidden
        ">

          <div className="grid grid-cols-5 text-center">

            <div className="py-3">
              <div className="text-2xl">🏠</div>
              <p className="text-xs mt-1">Home</p>
            </div>

            <div className="py-3">
              <div className="text-2xl">📰</div>
              <p className="text-xs mt-1">News</p>
            </div>

            <div className="py-3">
              <div className="text-2xl">🔮</div>
              <p className="text-xs mt-1">Rashi</p>
            </div>

            <div className="py-3">
              <div className="text-2xl">🌤</div>
              <p className="text-xs mt-1">Weather</p>
            </div>

            <div className="py-3">
              <div className="text-2xl">☰</div>
              <p className="text-xs mt-1">Menu</p>
            </div>

          </div>

        </div>

    </div>
  );
}