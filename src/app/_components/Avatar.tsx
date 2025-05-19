"use client"
import { useSession } from "next-auth/react";
import Image from "next/image"
import React from "react"

type Props = {
	seed?: string
	large?: boolean
}

function Avatar({ seed, large }: Props) {
	const { data: session } = useSession();
	return (
		<div className={`relative overflow-hidden ml-1 h-10 w-10 rounded-full border-slate-400 bg-slate-200 ${large && "h-20 w-20"
			}`}
		>
			<Image
				fill
				src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${seed || session?.user?.name || "placeholder"}}`}
				alt={""}
			/>
		</div>
	)
}

export default Avatar