
import { connectDB } from "../../../lib/db";
import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  category: String,
  video: String,
});

const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);

async function getArticle(id: string) {
  await connectDB();
  return Article.findById(id);
}

function getVideoEmbed(videoUrl: string) {
  try {
    const url = new URL(videoUrl);

    // YouTube links
    if (
      url.hostname === "youtube.com" ||
      url.hostname === "www.youtube.com" ||
      url.hostname === "m.youtube.com" ||
      url.hostname === "youtu.be" ||
      url.hostname === "www.youtu.be"
    ) {
      let videoId = "";

      if (url.hostname.includes("youtu.be")) {
        videoId = url.pathname.split("/").filter(Boolean)[0] || "";
      } else if (url.pathname === "/watch") {
        videoId = url.searchParams.get("v") || "";
      } else {
        const match = url.pathname.match(
          /^\/(?:embed|shorts)\/([a-zA-Z0-9_-]+)/
        );
        videoId = match?.[1] || "";
      }

      if (/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        return {
          type: "youtube",
          url: `https://www.youtube.com/embed/${videoId}`,
        };
      }
    }

    // Facebook video links
    if (
      url.hostname === "facebook.com" ||
      url.hostname === "www.facebook.com" ||
      url.hostname === "m.facebook.com" ||
      url.hostname === "web.facebook.com"
    ) {
      if (url.pathname.includes("/videos/") ||
          url.pathname.includes("/watch")) {
        return {
          type: "facebook",
          url: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=false&width=800`,
        };
      }
    }
  } catch {
    return null;
  }

  return null;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return <div className="p-8">Article not found</div>;
  }

  const videoUrl =
    typeof article.video === "string" ? article.video.trim() : "";

  const video = videoUrl ? getVideoEmbed(videoUrl) : null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-red-700 px-5 py-4 text-white shadow">
        <h1 className="text-3xl font-bold">Voice Of Bankura</h1>
      </header>

      <main className="mx-auto mt-6 max-w-4xl rounded-2xl bg-white p-4 shadow sm:mt-10 sm:p-6">
        {/* CATEGORY */}
        <p className="mb-3 font-semibold text-red-600">
          {article.category}
        </p>

        {/* TITLE */}
        <h1 className="mb-6 text-3xl font-bold leading-snug sm:text-4xl">
          {article.title}
        </h1>

        {/* IMAGE */}
        {article.image && (
          <img
            src={article.image}
            alt={article.title || "Voice Of Bankura news"}
            className="mb-8 w-full rounded-2xl"
          />
        )}

        {/* VIDEO */}
        {video && (
          <section className="mb-8">
            <h2 className="mb-3 text-xl font-bold">
              ভিডিও দেখুন
            </h2>

            <div className="overflow-hidden rounded-xl bg-black">
              <iframe
                src={video.url}
                title={
                  video.type === "facebook"
                    ? "Facebook video"
                    : "YouTube video"
                }
                className="aspect-video w-full"
                style={{ border: 0 }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </section>
        )}

        {/* FALLBACK LINK */}
        {videoUrl && !video && (
          <p className="mb-8">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 underline"
            >
              ভিডিও দেখতে এখানে ক্লিক করুন
            </a>
          </p>
        )}

        {/* CONTENT */}
        <div className="whitespace-pre-line text-lg leading-9 text-gray-800">
          {article.content}
        </div>
      </main>
    </div>
  );
}