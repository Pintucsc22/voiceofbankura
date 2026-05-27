import { connectDB } from "../../../lib/db";
import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
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
  params: { id: string };
}) {
  const article = await getArticle(params.id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">
        {article.title}
      </h1>

      {article.image && (
        <img src={article.image} className="mb-4 w-full" />
      )}

      <p>{article.content}</p>
    </div>
  );
}