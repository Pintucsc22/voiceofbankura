import cloudinary from "../../../lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return Response.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploaded = await cloudinary.uploader.upload(base64, {
      folder: "voiceofbankura",
    });

    return Response.json({
      imageUrl: uploaded.secure_url,
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}