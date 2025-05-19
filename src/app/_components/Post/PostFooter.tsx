import { ChatBubbleBottomCenterTextIcon, ShareIcon } from "@heroicons/react/24/outline"
import React from "react"

function PostFooter() {
	return (
		<div className="flex flex-row space-x-4 text-slate-600">
			<ChatBubbleBottomCenterTextIcon className="postButton" />
			<p className="hidden sm:inline">Comments</p> 
			<ShareIcon className="postButton" />
			<p className="hidden sm:inline">Share</p>
		</div>
	)
}

export default PostFooter