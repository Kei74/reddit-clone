import React from "react"
import VotesComponent from "./VotesComponent";
import Avatar from "../Avatar";
import { PostWithAuthorCommunity } from '@/lib/prisma/types'
import TimeAgo from "../../../lib/clientComponents/TimeAgo";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import PostFooter from "./PostFooter";
import Link from "next/link";

type Props = {
  post: PostWithAuthorCommunity
};

function PostComponent({ post }: Props) {

  return (
    <div className="flex flex-col cursor-pointer border border-slate-400 
    bg-gray-200 shadow-sm hover:bg-slate-200 hover:border hover:border-slate-600
    m-4 p-2 rounded-md">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Avatar seed={post.author.name} />
        <p className="text-sm text-slate-800">
          <span className="hover:text-slate-500 hover:underline">{post.author.name}</span>
          &nbsp;in:&nbsp;
          <Link href={`/community/${post.community.name}`}>
            <span className="font-bold hover:text-slate-500 hover:underline">{post.community.name}</span>
          </Link>
          &nbsp;<TimeAgo date={post.createdAt} />
        </p>
      </div>
      {/* Votes */}

      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-start p-3 rounded-l-md -300">
          <VotesComponent />
        </div>
        <div className="flex-1 flex-col rounded-r-md">

          {/* Body */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.content}</p>
          </div>
          {/* Image */}
          <div className="flex bg-blue-400">

          </div>
          {/* Footer */}
          <div className="flex ">
            <PostFooter />

          </div>
        </div>
      </div>

    </div>
  )
}

export default PostComponent