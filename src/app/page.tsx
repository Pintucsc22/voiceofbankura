import Link from "next/link";
import { headers } from "next/headers";

type Article = {
  _id: string;
  title?: string;
  content?: string;
  image?: string;
  category?: string;
};

type Video = {
  _id: string;
  title?: string;
  thumbnail?: string;
  videoUrl?: string;
  createdAt?: string;
};

type Weather = {
  _id: string;
  city?: string;
  temperature?: string;
  condition?: string;
  humidity?: string;
  wind?: string;
  image?: string;
};

type GoldPrice = {
  _id: string;
  gold24k?: string;
  gold22k?: string;
  silver?: string;
};

type Rashifal = {
  _id: string;
  zodiac?: string;
  image?: string;
  content?: string;
  date?: string;
};

async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get("host");

  if (!host) {
    return "http://localhost:3000";
  }

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  return `${protocol}://${host}`;
}

async function getData<T>(endpoint: string): Promise<T[]> {
  try {
    const baseUrl = await getBaseUrl();

    const response = await fetch(`${baseUrl}${endpoint}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

const zodiacNames: Record<string, string> = {
  Aries: "মেষ",
  Taurus: "বৃষ",
  Gemini: "মিথুন",
  Cancer: "কর্কট",
  Leo: "সিংহ",
  Virgo: "কন্যা",
  Libra: "তুলা",
  Scorpio: "বৃশ্চিক",
  Sagittarius: "ধনু",
  Capricorn: "মকর",
  Aquarius: "কুম্ভ",
  Pisces: "মীন",
};

const zodiacIcons: Record<string, string> = {
  মেষ: "♈",
  বৃষ: "♉",
  মিথুন: "♊",
  কর্কট: "♋",
  সিংহ: "♌",
  কন্যা: "♍",
  তুলা: "♎",
  বৃশ্চিক: "♏",
  ধনু: "♐",
  মকর: "♑",
  কুম্ভ: "♒",
  মীন: "♓",
};

function getYouTubeId(url?: string) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "").split("?")[0];
    }

    if (parsed.searchParams.get("v")) {
      return parsed.searchParams.get("v");
    }

    const parts = parsed.pathname.split("/");

    const embedIndex = parts.indexOf("embed");

    if (embedIndex !== -1 && parts[embedIndex + 1]) {
      return parts[embedIndex + 1];
    }

    return null;
  } catch {
    return null;
  }
}

function getYouTubeEmbedUrl(url?: string) {
  const id = getYouTubeId(url);

  if (!id) return null;

  return `https://www.youtube.com/embed/${id}`;
}
function getYouTubeThumbnail(video: Video) {
  // Database thumbnail থাকলে সেটাই আগে ব্যবহার হবে
  if (video.thumbnail?.trim()) {
    return video.thumbnail;
  }

  // না থাকলে YouTube URL থেকে automatically thumbnail তৈরি হবে
  const id = getYouTubeId(video.videoUrl);

  if (!id) {
    return null;
  }

  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export default async function Home() {
  const [
    articles,
    videos,
    weatherData,
    goldData,
    rashifalData,
  ] = await Promise.all([
    getData<Article>("/api/articles"),
    getData<Video>("/api/videos"),
    getData<Weather>("/api/weather"),
    getData<GoldPrice>("/api/gold-price"),
    getData<Rashifal>("/api/rashifal"),
  ]);

  const latestVideos = videos.slice(0, 6);
  const mainVideo = latestVideos[0] || null;
  const sideVideos = latestVideos.slice(1, 6);

  const weather =
  weatherData.find(
    (item) =>
      item.temperature?.trim() ||
      item.condition?.trim() ||
      item.humidity?.trim() ||
      item.wind?.trim()
  ) || weatherData[0];
  const goldPrice = goldData[0] || null;

  const latestArticles = articles.slice(0, 5);

  const rashifalMap = new Map<string, Rashifal>();

rashifalData.forEach((item) => {
  if (!item.zodiac) return;

  const existing = rashifalMap.get(item.zodiac);

  if (!existing) {
    rashifalMap.set(item.zodiac, item);
    return;
  }

  const existingDate = new Date(
    existing.date || existing.createdAt || 0
  ).getTime();

  const currentDate = new Date(
    item.date || item.createdAt || 0
  ).getTime();

  if (currentDate > existingDate) {
    rashifalMap.set(item.zodiac, item);
  }
});

  const rashifal = Object.keys(zodiacNames).map((zodiac) => ({
    zodiac,
    data: rashifalMap.get(zodiac) || null,
  }));

  const today = new Date();

  const bengaliDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* =====================================================
          TOP HEADER
      ====================================================== */}

      <header className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-4">

          <div className="grid grid-cols-1 items-center gap-5 py-5 md:grid-cols-3">

            {/* LOGO */}

            <div className="flex items-center justify-center gap-3 md:justify-start">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-xl font-extrabold text-white shadow">
                VOB
              </div>

              <div>
                <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                  Voice Of Bankura
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  বাংলার খবর বাংলার ভাষায়
                </p>
              </div>

            </div>


            {/* DATE / HISTORY */}

            <div className="text-center">

              <p className="text-sm font-medium text-gray-500">
                আজ
              </p>

              <h2 className="mt-1 text-lg font-bold text-red-700 md:text-xl">
                {bengaliDate}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                আজকের বাংলা তারিখ ও ঐতিহাসিক তথ্য
              </p>

            </div>


            {/* SOCIAL */}

            <div className="flex justify-center gap-3 md:justify-end">

              <div className="rounded-lg border bg-gray-50 px-4 py-3 text-center">
                <p className="text-xs text-gray-500">
                  Facebook
                </p>

                <p className="font-bold text-blue-600">
                  Follow Us
                </p>
              </div>

              <div className="rounded-lg border bg-gray-50 px-4 py-3 text-center">
                <p className="text-xs text-gray-500">
                  YouTube
                </p>

                <p className="font-bold text-red-600">
                  Subscribe
                </p>
              </div>

            </div>

          </div>

        </div>

      </header>


      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <nav className="sticky top-0 z-40 border-b bg-gray-950 text-white shadow">

        <div className="mx-auto max-w-7xl overflow-x-auto">

          <div className="flex min-w-max items-center">

            <Link
              href="/"
              className="border-b-2 border-red-500 px-4 py-4 text-sm font-bold transition hover:bg-gray-800"
            >
              আজকের খবর
            </Link>

            <Link
              href="/bankura"
              className="px-4 py-4 text-sm font-medium transition hover:bg-gray-800"
            >
              বাঁকুড়া
            </Link>

            <Link
              href="/state"
              className="px-4 py-4 text-sm font-medium transition hover:bg-gray-800"
            >
              রাজ্য
            </Link>

            <Link
              href="/rashifal"
              className="px-4 py-4 text-sm font-medium transition hover:bg-gray-800"
            >
              রাশিফল
            </Link>

            <Link
              href="/gold-price"
              className="px-4 py-4 text-sm font-medium transition hover:bg-gray-800"
            >
              সোনার দাম
            </Link>

            <Link
              href="/weather"
              className="px-4 py-4 text-sm font-medium transition hover:bg-gray-800"
            >
              আবহাওয়া
            </Link>

            <Link
              href="/sports"
              className="px-4 py-4 text-sm font-medium transition hover:bg-gray-800"
            >
              খেলা
            </Link>

          </div>

        </div>

      </nav>


      {/* =====================================================
          BREAKING NEWS
      ====================================================== */}

      <div className="border-b bg-red-700 text-white">

        <div className="mx-auto flex max-w-7xl items-center">

          <div className="shrink-0 bg-red-900 px-4 py-3 text-sm font-bold">
            BREAKING
          </div>

          <div className="overflow-hidden px-4 py-3">

            <div className="whitespace-nowrap text-sm">
              Voice Of Bankura — বাঁকুড়া ও বাংলার সর্বশেষ খবর
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-8">


        {/* =================================================
            YOUTUBE NEWS
        ================================================== */}

        <section>

          <div className="mb-5 flex items-center justify-between">

            <div>

              <p className="text-sm font-bold text-red-600">
                VIDEO NEWS
              </p>

              <h2 className="mt-1 text-2xl font-extrabold md:text-3xl">
                সর্বশেষ ভিডিও সংবাদ
              </h2>

            </div>

            <Link
              href="/videos"
              className="text-sm font-bold text-red-600 hover:underline"
            >
              সব ভিডিও →
            </Link>

          </div>


          {mainVideo ? (

            <div className="grid gap-6 lg:grid-cols-3">

              {/* MAIN VIDEO */}

              <div className="overflow-hidden rounded-xl border bg-white shadow-sm lg:col-span-2">

                {getYouTubeEmbedUrl(mainVideo.videoUrl) ? (

                  <div className="aspect-video bg-black">

                    <iframe
                      src={getYouTubeEmbedUrl(mainVideo.videoUrl)!}
                      title={mainVideo.title || "Voice Of Bankura Video"}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />

                  </div>

                ) : getYouTubeThumbnail(mainVideo) ? (

                  <a
                    href={mainVideo.videoUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={getYouTubeThumbnail(mainVideo)!}
                      alt={mainVideo.title || "Video news"}
                      className="aspect-video w-full object-cover"
                    />
                  </a>

                ) : (

                  <div className="flex aspect-video items-center justify-center bg-gray-100 text-gray-500">
                    ভিডিও উপলব্ধ নয়
                  </div>

                )}

                <div className="p-5">

                  <span className="text-xs font-bold text-red-600">
                    সর্বশেষ ভিডিও
                  </span>

                  <h3 className="mt-2 text-xl font-bold leading-snug">
                    {mainVideo.title || "সর্বশেষ ভিডিও সংবাদ"}
                  </h3>

                </div>

              </div>


              {/* SIDE VIDEOS */}

              <div className="space-y-3">

                {sideVideos.length > 0 ? (

                  sideVideos.map((video) => (

                    <a
                      key={video._id}
                      href={video.videoUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex gap-3 rounded-lg border bg-white p-2 transition hover:border-red-300 hover:shadow-sm"
                    >

                      <div className="h-20 w-28 shrink-0 overflow-hidden rounded-md bg-gray-100">

                        {getYouTubeThumbnail(video) ? (

                            <img
                              src={getYouTubeThumbnail(video)!}
                              alt={video.title || "Video"}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />

                          ) : (

                            <div className="flex h-full items-center justify-center bg-gray-100 text-xs text-gray-400">
                              Video
                            </div>

                          )}

                      </div>

                      <div className="min-w-0">

                        <h3 className="line-clamp-3 text-sm font-bold leading-5 group-hover:text-red-700">
                          {video.title || "ভিডিও সংবাদ"}
                        </h3>

                      </div>

                    </a>

                  ))

                ) : (

                  <div className="rounded-xl border bg-gray-50 p-6 text-center text-sm text-gray-500">
                    আরও ভিডিও শীঘ্রই আসছে।
                  </div>

                )}

              </div>

            </div>

          ) : (

            <div className="rounded-xl border bg-gray-50 p-10 text-center text-gray-500">
              বর্তমানে কোনো ভিডিও সংবাদ নেই।
            </div>

          )}

        </section>


        {/* =================================================
            WEATHER + GOLD
        ================================================== */}

        <section className="mt-10 grid gap-6 md:grid-cols-2">


          {/* WEATHER */}

          <div className="rounded-xl border bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <p className="text-sm font-bold text-blue-600">
                  WEATHER
                </p>

                <h2 className="mt-1 text-xl font-extrabold">
                  আজকের আবহাওয়া
                </h2>

              </div>

              <Link
                href="/weather"
                className="text-sm font-bold text-blue-600"
              >
                বিস্তারিত →
              </Link>

            </div>


            {weather ? (

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <p className="text-sm text-gray-500">
                    {weather.city || "বাঁকুড়া"}
                  </p>

                  <p className="mt-2 text-4xl font-extrabold">
                    {weather.temperature || "--"}
                  </p>

                  <p className="mt-2 font-semibold text-gray-700">
                    {weather.condition || "আবহাওয়ার তথ্য"}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">

                    <p>
                      💧 আর্দ্রতা: {weather.humidity || "--"}
                    </p>

                    <p>
                      🌬 বাতাস: {weather.wind || "--"}
                    </p>

                  </div>

                </div>


                <div className="overflow-hidden rounded-lg bg-gray-100">

                  {weather.image ? (

                    <img
                      src={weather.image}
                      alt={weather.condition || "Weather"}
                      className="h-full min-h-40 w-full object-cover"
                    />

                  ) : (

                    <div className="flex h-full min-h-40 items-center justify-center text-sm text-gray-400">
                      Weather
                    </div>

                  )}

                </div>

              </div>

            ) : (

              <p className="py-8 text-center text-sm text-gray-500">
                আবহাওয়ার তথ্য পাওয়া যায়নি।
              </p>

            )}

          </div>


          {/* GOLD */}

          <div className="rounded-xl border bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <p className="text-sm font-bold text-yellow-600">
                  GOLD & SILVER
                </p>

                <h2 className="mt-1 text-xl font-extrabold">
                  আজকের সোনা ও রূপার দাম
                </h2>

              </div>

              <Link
                href="/gold-price"
                className="text-sm font-bold text-yellow-700"
              >
                বিস্তারিত →
              </Link>

            </div>


            {goldPrice ? (

              <div className="grid grid-cols-3 divide-x rounded-lg border bg-gray-50">

                <div className="p-4 text-center">

                  <p className="text-xs text-gray-500">
                    ২৪ ক্যারেট
                  </p>

                  <p className="mt-2 text-lg font-extrabold">
                    {goldPrice.gold24k || "--"}
                  </p>

                </div>


                <div className="p-4 text-center">

                  <p className="text-xs text-gray-500">
                    ২২ ক্যারেট
                  </p>

                  <p className="mt-2 text-lg font-extrabold">
                    {goldPrice.gold22k || "--"}
                  </p>

                </div>


                <div className="p-4 text-center">

                  <p className="text-xs text-gray-500">
                    রূপা
                  </p>

                  <p className="mt-2 text-lg font-extrabold">
                    {goldPrice.silver || "--"}
                  </p>

                </div>

              </div>

            ) : (

              <p className="py-8 text-center text-sm text-gray-500">
                সোনা ও রূপার দামের তথ্য পাওয়া যায়নি।
              </p>

            )}

          </div>

        </section>


        {/* =================================================
            LATEST NEWS
        ================================================== */}

        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <p className="text-sm font-bold text-red-600">
                NEWS
              </p>

              <h2 className="mt-1 text-2xl font-extrabold">
                সর্বশেষ খবর
              </h2>

            </div>

            <Link
              href="/bankura"
              className="text-sm font-bold text-red-600"
            >
              আরও খবর →
            </Link>

          </div>


          {latestArticles.length > 0 ? (

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

              {latestArticles.map((article) => (

                <Link
                  href={`/article/${article._id}`}
                  key={article._id}
                  className="group overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-md"
                >

                  <div className="aspect-video overflow-hidden bg-gray-100">

                    {article.image ? (

                      <img
                        src={article.image}
                        alt={article.title || "News"}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No Image
                      </div>

                    )}

                  </div>

                  <div className="p-4">

                    {article.category && (

                      <p className="text-xs font-bold text-red-600">
                        {article.category}
                      </p>

                    )}

                    <h3 className="mt-2 line-clamp-3 text-base font-bold leading-6 group-hover:text-red-700">
                      {article.title || "সংবাদ"}
                    </h3>

                  </div>

                </Link>

              ))}

            </div>

          ) : (

            <div className="rounded-xl border bg-gray-50 p-10 text-center text-gray-500">
              বর্তমানে কোনো সংবাদ নেই।
            </div>

          )}

        </section>


        {/* =================================================
            RASHIFAL
        ================================================== */}

        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <p className="text-sm font-bold text-purple-600">
                DAILY RASHIFAL
              </p>

              <h2 className="mt-1 text-2xl font-extrabold">
                আজকের রাশিফল
              </h2>

            </div>

            <Link
              href="/rashifal"
              className="text-sm font-bold text-purple-600"
            >
              বিস্তারিত →
            </Link>

          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

            {rashifal.map((item) => {

              const bengaliName =
                zodiacNames[item.zodiac] || item.zodiac;

              return (

                <div
                  key={item.zodiac}
                  className="rounded-xl border bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-md"
                >

                  <div className="text-3xl">
                    {zodiacIcons[bengaliName]}
                  </div>

                  <h3 className="mt-2 font-bold">
                    {bengaliName}
                  </h3>

                  {item.data ? (

                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-600">
                      {item.data.content || "আজকের রাশিফল দেখুন"}
                    </p>

                  ) : (

                    <p className="mt-2 text-xs text-gray-400">
                      আজকের তথ্য নেই
                    </p>

                  )}

                </div>

              );

            })}

          </div>

        </section>
      </div>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="mt-12 bg-gray-950 text-white">

        <div className="mx-auto max-w-7xl px-4 py-8">

          <div className="grid gap-6 md:grid-cols-3">

            <div>

              <h2 className="text-xl font-extrabold">
                Voice Of Bankura
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                বাঁকুড়া ও বাংলার নির্ভরযোগ্য সংবাদ।
              </p>

            </div>


            <div>

              <h3 className="font-bold">
                গুরুত্বপূর্ণ লিঙ্ক
              </h3>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400">

                <Link href="/bankura" className="hover:text-white">
                  বাঁকুড়া
                </Link>

                <Link href="/state" className="hover:text-white">
                  রাজ্য
                </Link>

                <Link href="/rashifal" className="hover:text-white">
                  রাশিফল
                </Link>

                <Link href="/weather" className="hover:text-white">
                  আবহাওয়া
                </Link>

                <Link href="/sports" className="hover:text-white">
                  খেলা
                </Link>

              </div>

            </div>


            <div className="md:text-right">

              <p className="text-sm text-gray-400">
                © {today.getFullYear()} Voice Of Bankura
              </p>

              <p className="mt-1 text-sm text-gray-500">
                All Rights Reserved
              </p>

            </div>

          </div>

        </div>

      </footer>

    </main>
  );
}