import { newsData } from "../../data";
import Image from "next/image";

export default function NewsDetail({ params }: any) {
  const post = newsData.find((n) => n.slug === params.slug);

  if (!post) return <div className="text-white p-10">Not Found</div>;

  return (
    <main className="bg-white min-h-screen text-black p-10">

      <h1 className="text-4xl font-bold mb-4">
        {post.title}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        {post.date}
      </p>

      <div className="mb-10">
        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={800}
          className="rounded-xl"
        />
      </div>

      <p className="leading-relaxed whitespace-pre-line">
        {post.content}
      </p>

    </main>
  );
}