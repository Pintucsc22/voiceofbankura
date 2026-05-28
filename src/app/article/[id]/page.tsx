import { connectDB } from "../../../lib/db";
import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  category: String,
});

const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);

async function getArticle(id: string) {
  await connectDB();

  const article = await Article.findById(id);

  return article;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const article = await getArticle(id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="bg-red-700 text-white py-4 px-5 shadow">
        <h1 className="text-3xl font-bold">
          Voice Of Bankura
        </h1>
      </div>

      <div className="max-w-4xl mx-auto bg-white mt-10 p-6 rounded-2xl shadow">

        {/* CATEGORY */}
        <p className="text-red-600 font-semibold mb-3">
          {article.category}
        </p>

        {/* TITLE */}
        <h1 className="text-4xl font-bold leading-snug mb-6">
          {article.title}
        </h1>

        {/* IMAGE */}
        {article.image && (
          <img
            src={article.image}
            className="w-full rounded-2xl mb-8"
          />
        )}

        {/* CONTENT */}
        <div className="text-lg leading-9 text-gray-800 whitespace-pre-line">
          {article.content}
        </div>

      </div>
    </div>
  );
}