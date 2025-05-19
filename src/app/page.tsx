import Image from "next/image";
import PostBox from "./_components/PostBox";
import PostsList from "./_components/PostsList";

export default async function Home() {
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <PostBox />
      <PostsList />
    </div>
  );
}
