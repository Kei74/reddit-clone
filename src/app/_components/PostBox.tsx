"use client"
import { useSession } from "next-auth/react";
import React, { useState } from "react"
import Avatar from "./Avatar";
import { useForm } from "react-hook-form";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { prisma } from "@/lib/prisma/client";

type FormData = {
	postTitle: string
	postBody: string
	community: string
	imageURL: string
}

type Prop = {
	communityName: string | undefined
}

function PostBox({ communityName = undefined }:Prop) {
	const { data: session } = useSession();
	const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>()

	const onSubmit = handleSubmit(async (formData) => {
		console.log(formData);
		const community = prisma.community.findUnique({
			where: {
				name: formData.community,
			},
			select: {
				name: true,
			}
		});

		if(community && session?.user?.name) {
			prisma.post.create({
				data: {
					title: formData.postTitle,
					content: formData.postBody,
					imageUrl: formData.imageURL,
					community: {
						connect: {
							name: community.name,
						}
					},
					author: {
						connect: {
							id: session.user.name
						}
					},
				},
			})
		}

	});

	return (
		<form className="sticky top-20 z-50 bg-white rounded-md border border-slate-300 py-1">
			<div className="flex items-center space-x-3">
				<Avatar />

				<input
					{...register("postTitle", { required: true })}
					disabled={!session}
					className="flex-1 rounded-md bg-slate-200 p-2 pl-5 outline-none"
					type="text"
					placeholder={
						session ? "Enter post title" : "Sign in to create a post"
					}
				/>

				<PhotoIcon onClick={() => setImageBoxOpen(!imageBoxOpen)} 
						className={`h-6 cursor-pointer mr-3`}/>
			</div>

			{!!watch("postTitle") && (
				<div className="flex flex-col py-2">
					<div className="flex items-center px-2">
						<p className="min-w-[90px]">Body</p>
						<input
							className="m-2 flex-1 bg-slate-200 p-2 outline-none"
							{...register("postBody",)}
							type="text"
							placeholder="Post Body"
						/>
					</div>

					<div className="flex items-center px-2">
						<p className="min-w-[90px]">Community</p>
						<input
							className="m-2 flex-1 bg bg-slate-200 p-2 outline-none" 
							{...register("community", { required: true })}
							type="text" 
							placeholder="Community"
						/>
					</div>

					{ imageBoxOpen && (
						<div className="flex items-center px-2">
						<p className="min-w-[90px]">Image URL</p>
						<input
							className="m-2 flex-1 bg bg-slate-200 p-2 outline-none" 
							{...register("imageURL")}
							type="text" 
							placeholder="Optional"
						/>
					</div>
					)}

					{Object.keys(errors).length > 0 && (
						<div className="space-y-2 p-2 text-red-500">
							{errors.postTitle?.type === "required" && (
								<p>Post Title required</p>
							)}
							{errors.community?.type === "community" && (
								<p>community required</p>
							)}
						</div>
					)}

					{!!watch("postTitle") && !!watch("community") &&(
						<button type="submit" className="w-full rounded-full bg-blue-400 p-2 text-white">
							Create Post
						</button>
					)}
				</div>

			)}
		</form>
	);
}

export default PostBox