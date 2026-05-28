import { connectDB } from "../../../lib/db";
import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,

  // ✅ NEW
  category: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);

// 👉 GET (fetch articles)
export async function GET() {
  await connectDB();

  const articles = await Article.find().sort({ _id: -1 });

  return Response.json(articles);
}

// 👉 POST (save article)
export async function POST(req: Request) {
  const body = await req.json();

  await connectDB();

  const article = await Article.create({
    title: body.title,
    content: body.content,
    image: body.image,

    // ✅ NEW
    category: body.category,
  });

  return Response.json(article);
}