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

  const latestNews = articles.slice(1, 6);
  const bankuraNews = articles.filter(
    (item: any) => item.category === "Bankura News"
  );

  const stateNews = articles.filter(
    (item: any) => item.category === "State News"
  );

  const sportsNews = articles.filter(
    (item: any) => item.category === "Sports"
  );

  const entertainmentNews = articles.filter(
    (item: any) => item.category === "Entertainment"
  );
  const videoNews = articles.filter(
    (item: any) => item.video
  );
  const rashis = [
  { icon: "♈", name: "মেষ" },
  { icon: "♉", name: "বৃষ" },
  { icon: "♊", name: "মিথুন" },
  { icon: "♋", name: "কর্কট" },
  { icon: "♌", name: "সিংহ" },
  { icon: "♍", name: "কন্যা" },
  { icon: "♎", name: "তুলা" },
  { icon: "♏", name: "বৃশ্চিক" },
  { icon: "♐", name: "ধনু" },
  { icon: "♑", name: "মকর" },
  { icon: "♒", name: "কুম্ভ" },
  { icon: "♓", name: "মীন" },
];

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* 🔥 TOP BREAKING BAR */}
      <div className="bg-red-700 text-white py-2 overflow-hidden">

        <div className="max-w-7xl mx-auto flex items-center gap-4">

          <span className="bg-white text-red-700 px-3 py-1 font-bold rounded">
            BREAKING
          </span>

          <marquee className="font-medium">
            🌤 আজকের আবহাওয়া • 🪙 আজকের সোনার দাম • 🔥 Voice Of Bankura Digital News Portal
          </marquee>

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

                    <img
                      src={item.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />

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
        <div className="max-w-7xl mx-auto px-4 mt-14 mb-20">

          {/* TITLE */}
          <div className="flex items-center justify-between mb-8">

            <div>
              <h2 className="text-4xl font-extrabold text-gray-900">
                🔮 আজকের রাশিফল
              </h2>

              <p className="text-gray-500 mt-2">
                প্রতিদিনের রাশিফল দেখুন
              </p>
            </div>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

            {rashis.map((rashi) => (

              <div
                key={rashi.name}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  bg-white/70
                  backdrop-blur-lg
                  border border-white/30
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  cursor-pointer
                "
              >

                {/* GLOW EFFECT */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <div className="relative p-6 text-center">

                  {/* ICON */}
                  <div className="
                    text-6xl
                    mb-4
                    transition
                    duration-500
                    group-hover:scale-125
                    group-hover:rotate-12
                  ">
                    {rashi.icon}
                  </div>

                  {/* NAME */}
                  <h3 className="text-2xl font-bold text-gray-800">
                    {rashi.name}
                  </h3>

                  {/* BUTTON */}
                  <button className="
                    mt-5
                    bg-red-700
                    text-white
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-medium
                    hover:bg-black
                    transition
                  ">
                    বিস্তারিত দেখুন
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>
                {/* 🌦 WEATHER + GOLD PRICE */}
        <div className="max-w-7xl mx-auto px-4 mb-20">

          <div className="grid lg:grid-cols-2 gap-8">

            {/* 🌦 WEATHER CARD */}
            <div className="
              relative
              overflow-hidden
              rounded-3xl
              bg-gradient-to-br
              from-sky-500
              to-blue-700
              text-white
              shadow-2xl
              p-8
            ">

              {/* BG EFFECT */}
              <div className="absolute top-0 right-0 text-[180px] opacity-10">
                ☁
              </div>

              <div className="relative">

                <p className="text-lg opacity-90">
                  আজকের আবহাওয়া
                </p>

                <h2 className="text-4xl font-extrabold mt-2">
                  বাঁকুড়া
                </h2>

                <div className="flex items-center gap-6 mt-8">

                  <div className="text-8xl">
                    🌤
                  </div>

                  <div>

                    <h1 className="text-7xl font-black">
                      32°
                    </h1>

                    <p className="text-xl mt-2">
                      Partly Cloudy
                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-3 gap-4 mt-10">

                  <div className="bg-white/20 rounded-2xl p-4 text-center backdrop-blur-md">

                    <p className="text-sm opacity-80">
                      Humidity
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      68%
                    </h3>

                  </div>

                  <div className="bg-white/20 rounded-2xl p-4 text-center backdrop-blur-md">

                    <p className="text-sm opacity-80">
                      Wind
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      11km/h
                    </h3>

                  </div>

                  <div className="bg-white/20 rounded-2xl p-4 text-center backdrop-blur-md">

                    <p className="text-sm opacity-80">
                      Rain
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      12%
                    </h3>

                  </div>

                </div>

              </div>

            </div>


            {/* 🪙 GOLD PRICE */}
            <div className="
              relative
              overflow-hidden
              rounded-3xl
              bg-gradient-to-br
              from-yellow-400
              to-orange-500
              shadow-2xl
              p-8
              text-black
            ">

              {/* BG EFFECT */}
              <div className="absolute top-0 right-0 text-[180px] opacity-10">
                🪙
              </div>

              <div className="relative">

                <p className="text-lg font-medium">
                  আজকের সোনার দাম
                </p>

                <h2 className="text-4xl font-extrabold mt-2">
                  Gold & Silver Price
                </h2>

                <div className="space-y-5 mt-10">

                  {/* 24K */}
                  <div className="
                    bg-white/40
                    backdrop-blur-md
                    rounded-2xl
                    p-5
                    flex
                    items-center
                    justify-between
                  ">

                    <div>

                      <p className="text-sm font-medium">
                        24K Gold
                      </p>

                      <h3 className="text-3xl font-black mt-1">
                        ₹9,850
                      </h3>

                    </div>

                    <div className="text-5xl">
                      🥇
                    </div>

                  </div>


                  {/* 22K */}
                  <div className="
                    bg-white/40
                    backdrop-blur-md
                    rounded-2xl
                    p-5
                    flex
                    items-center
                    justify-between
                  ">

                    <div>

                      <p className="text-sm font-medium">
                        22K Gold
                      </p>

                      <h3 className="text-3xl font-black mt-1">
                        ₹9,020
                      </h3>

                    </div>

                    <div className="text-5xl">
                      🪙
                    </div>

                  </div>


                  {/* SILVER */}
                  <div className="
                    bg-white/40
                    backdrop-blur-md
                    rounded-2xl
                    p-5
                    flex
                    items-center
                    justify-between
                  ">

                    <div>

                      <p className="text-sm font-medium">
                        Silver
                      </p>

                      <h3 className="text-3xl font-black mt-1">
                        ₹114/g
                      </h3>

                    </div>

                    <div className="text-5xl">
                      ⚪
                    </div>

                  </div>

                </div>

              </div>

            </div>

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
        <div className="max-w-7xl mx-auto px-4 mb-20">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-4xl font-extrabold text-gray-900">
              🎥 ভিডিও সংবাদ
            </h2>

            <button className="text-red-700 font-bold">
              আরও ভিডিও →
            </button>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {videoNews.slice(0, 2).map((item: any) => (

              <div
                key={item._id}
                className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-xl
                "
              >

                {/* VIDEO */}
                {/* VIDEO THUMBNAIL */}
                  <a
                    href={item.video}
                    target="_blank"
                  >

                    <div className="relative group cursor-pointer overflow-hidden">

                      <img
                        src={item.image}
                        className="
                          w-full
                          h-[260px]
                          object-cover
                          group-hover:scale-105
                          transition
                          duration-500
                        "
                      />

                      {/* DARK OVERLAY */}
                      <div className="absolute inset-0 bg-black/30"></div>

                      {/* PLAY BUTTON */}
                      <div className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                      ">

                        <div className="
                          w-20
                          h-20
                          rounded-full
                          bg-red-700
                          flex
                          items-center
                          justify-center
                          text-white
                          text-4xl
                          shadow-2xl
                          group-hover:scale-110
                          transition
                        ">
                          ▶
                        </div>

                      </div>

                    </div>

                  </a>

                {/* CONTENT */}
                <div className="p-6">

                  <p className="text-red-700 font-semibold mb-3">
                    {item.category}
                  </p>

                  <h3 className="text-2xl font-bold leading-snug">

                    {item.title}

                  </h3>

                  <p className="text-gray-600 mt-4 leading-7">

                    {item.content?.slice(0, 140)}...

                  </p>

                </div>

              </div>

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