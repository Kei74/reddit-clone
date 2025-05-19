"use client"
import { Bars3Icon, ChevronDownIcon, HomeIcon, MagnifyingGlassIcon, } from "@heroicons/react/24/solid";
import {
	BellIcon,
	ChatBubbleLeftIcon,
	GlobeAsiaAustraliaIcon,
	PlusIcon,
	SparklesIcon,
	SpeakerWaveIcon,
	VideoCameraIcon
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function AuthButton() {
	const { data: session } = useSession();

	if (session) {
		return (
			<div className="flex-1 text-xs">
			<p>   {session?.user?.name} </p>

			<div className="border-slate-300 border-2 rounded-lg mx-2 p-1 cursor-pointer hover:bg-slate-500
		lg:flex">
				<button className="cursor-pointer" onClick={() => signOut()}>Sign out</button>
			</div>
			</div>
		)
	}
	return (
		<div className="border-slate-300 border-2 rounded-lg mx-2 p-1 cursor-pointer hover:bg-slate-500
		lg:flex">
			<button onClick={() => signIn()}
				className="cursor-pointer"
			>
				Sign in
			</button>
		</div>
	)
}

export default function Header() {
	return (
		<div className="sticky top-0 z-50 h-14 flex flex-1 bg-slate-700 px-4 py-2 shadow-sm text-white">
			
			<div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
				<Image
					objectFit="contain"
					src="https://play-lh.googleusercontent.com/nlptFyxNsb8J0g8ZLux6016kunduV4jCxIrOJ7EEy-IobSN1RCDXAJ6DTGP81z7rr5Zq"
					alt={""}
					fill
				/>
			</div>

			<div className="mx-7 flex items-center xl:min-w-[100px]">
				<HomeIcon className="h-5 w-5" />
				<p className="ml-2 hidden grow lg:inline">Home</p>
				<ChevronDownIcon className="h-5 w-5" />
			</div>

			<form action="" className="flex grow items-center space-x-2 rounded-sm border border-slate-500 bg-slate-600 px-3 py-1">
				<MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
				<input type="text" placeholder="Search Peddit" className="grow bg-transparent outline-none" />
				<button type="submit" hidden />
			</form>

			<div className="mx-5 hidden items-center spaxe-x-2 lg:inline-flex text-slate-300">
				<SparklesIcon className="icon" />
				<GlobeAsiaAustraliaIcon className="icon" />
				<VideoCameraIcon className="icon" />
				<ChatBubbleLeftIcon className="icon" />
				<BellIcon className="icon" />
				<PlusIcon className="icon" />
				<SpeakerWaveIcon className="icon" />
			</div>

			<div className="ml-5 flex items-center lg:hidden text-slate-300">
				<Bars3Icon className="icon" />
			</div>

			<div className="flex items-center">
				<AuthButton />
			</div>

		</div>
	)
}