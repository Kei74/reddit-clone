import PostComponent from '@/app/_components/Post/PostComponent'
import { prisma } from '@/lib/prisma/client';
import React from 'react'

async function PostPage({ params, }: { params: Promise<{ id: string }> }) {
	const { id: postId } = await params;
	const post = await prisma.post.findUnique({
		where: {
			id: postId,
		},
		include: {
			author: true,
			community: true,
		},
	});
	if (!post)
		return (
			<div>
				Not Found
			</div>
		);
	return (
		//	<PostComponent post={post}/>

		<div>
			Post Page. Id: {postId}
			<PostComponent post={post} />
		</div>
	);
}

export default PostPage