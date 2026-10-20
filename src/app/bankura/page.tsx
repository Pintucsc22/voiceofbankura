import Link from "next/link";
import { headers } from "next/headers";

type Article = {
  _id: string;
  title?: string;
  content?: string;
  image?: string;
  category?: string;
};

async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get("host");

  if (!host) {
    return "http://localhost:3000";
  }

  const protocol =
    process.env.NODE_ENV === "development"
      ? "http"
      : "https";

  return `${protocol}://${host}`;
}

async function getArticles(): Promise<Article[]> {
  try {
    const baseUrl = await getBaseUrl();

    const response = await fetch(
      `${baseUrl}/api/articles?category=Bankura`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function BankuraPage() {
  const articles = await getArticles();

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5">

          <Link
            href="/"
            className="text-2xl font-extrabold text-red-700"
          >
            Voice Of Bankura
          </Link>

          <p className="mt-1 text-sm text-gray-500">
            বাঁকুড়ার সর্বশেষ খবর
          </p>

        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8">

        <div className="mb-7">
          <p className="text-sm font-bold text-red-600">
            BANKURA NEWS
          </p>

          <h1 className="mt-1 text-3xl font-extrabold">
            বাঁকুড়ার খবর
          </h1>

          <p className="mt-2 text-gray-500">
            বাঁকুড়া জেলার সর্বশেষ সংবাদ ও গুরুত্বপূর্ণ খবর
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-2xl border bg-white p-10 text-center">
            <p className="text-gray-500">
              বর্তমানে কোনো খবর পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {articles.map((article) => (
              <Link
                key={article._id}
                href={`/article/${article._id}`}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Image */}
                <div className="aspect-video overflow-hidden bg-gray-100">

                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title || "বাঁকুড়ার খবর"}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}

                </div>

                {/* Content */}
                <div className="p-5">

                  {article.category && (
                    <p className="mb-2 text-sm font-bold text-red-600">
                      {article.category}
                    </p>
                  )}

                  <h2 className="line-clamp-2 text-xl font-bold leading-7 group-hover:text-red-700">
                    {article.title || "শিরোনাম নেই"}
                  </h2>

                  {article.content && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {article.content}
                    </p>
                  )}

                  <p className="mt-4 text-sm font-semibold text-red-600">
                    বিস্তারিত পড়ুন →
                  </p>

                </div>

              </Link>
            ))}

          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="mt-10 border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Voice Of Bankura
        </div>
      </footer>

    </main>
  );
}