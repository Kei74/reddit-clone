import { prisma } from "@/lib/prisma/client";
import { getServerSession } from "next-auth";
import PostComponent from "./Post/PostComponent";

type Props = {
  communityName: string | undefined
}

async function PostsList({ communityName = undefined }:Props) {
  const session = await getServerSession();
  const posts = await prisma.post.findMany({
    where: {
      author: {
        name: {
          not: session?.user?.name || "",
        },
      },
      community: {
        name: {
          equals: communityName,
        }
      },
    },
    include: {
      author: {
        select: { name: true }
      },
      community: {
        select: { name: true }
      },
    },
  });

  // console.log("Rendering feed");
  const postComponents = posts.map((post) => {
    return (<li key={post.id}><PostComponent post={post} /></li>)
  });
  return (
    <div>
      <ul>
        {postComponents}
      </ul>
    </div>
  );
}

export default PostsList