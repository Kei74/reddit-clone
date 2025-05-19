import PostComponent from '@/app/_components/Post/PostComponent'
import { prisma } from '@/lib/prisma/client';
import React from 'react'

async function PostPage({ params }: { params: Promise<{ name: string,  id: string }> }) {
	const { name: communityName, id: postId } = await params;
	const post = await prisma.post.findUnique({
		where: {
			id: postId,
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
	if (!post || post.community.name != communityName)
		return (
			<div>
				Not Found {communityName}
			</div>
		);
	return (
		//	<PostComponent post={post}/>

		<div>
			<PostComponent post={post} />
		</div>
	);
}

export default PostPage