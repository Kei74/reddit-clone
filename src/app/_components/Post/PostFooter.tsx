import { prisma } from "@/lib/prisma/client"
import { ChatBubbleBottomCenterTextIcon, ShareIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import React from "react"

async function PostFooter({ postId }: { postId: string }) {
	const postData = await prisma.post.findUnique({
		select: {
			community: {
				select: {name: true},
			},
			comments: true,
		},
		where: {
			id: postId,
		}
	});
	if (!postData) {
		return(<></>);
	}
	return (
		<div className="flex flex-row space-x-4 text-slate-600">
			<Link href={`/community/${postData.community.name}/post/${postId}`}>
				<ChatBubbleBottomCenterTextIcon className="postButton cursor-pointer" />
				<p className="hidden sm:inline">{postData.comments.length} Comments</p>
			</Link>
			<ShareIcon className="postButton" />
			<p className="hidden sm:inline">Share</p>
		</div>
	)
}

export default PostFooter