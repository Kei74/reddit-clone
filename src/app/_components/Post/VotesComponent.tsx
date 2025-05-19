import { ArrowDownIcon } from "@heroicons/react/24/solid"
import { ArrowUpIcon } from "@heroicons/react/24/solid"
import React from "react"

function VotesComponent() {
  return (
	<div>
      <ArrowUpIcon className="voteButton hover:text-red-600"/>
      <p className="text-xs text-center font-bold text-black">0</p>
      <ArrowDownIcon className="voteButton hover:text-blue-600"/>
    </div>
  )
}

export default VotesComponent