"use client";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {usePathname} from "next/navigation";

import {cn } from "@/lib/utils";
import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, Settings, VideoIcon, MusicIcon} from "lucide-react";
const montserrtat = Montserrat({weight: "600",subsets: ["latin"]});

const routes = [
    {
        id: "dashboard",
        label : "Dashboard",
        icon: LayoutDashboard,
        href : "/dashboard",
        color : "text-sky-500",
    },
    {
        id: "conversations",
        label : "Conversations",
        icon: MessageSquare,
        href : "/conversation",
        color : "text-purple-500",
    },
    {
        id:"images",
        label : "Image Generation",
        icon: ImageIcon,
        href : "/image",
        color : "text-green-500",
    },
    {
        id:"videos",
        label : "Video Generation",
        icon:  VideoIcon,
        href : "/video",
        color : "text-orange-500",
    },
    {
        id:"music",
        label : "Music Generation",
        icon: MusicIcon,
        href : "/music",
        color : "text-yellow-500",
    },
    {
        id:"code",
        label : "Code Generation",
        icon: CodeIcon,
        href : "/code",
        color : "text-pink-500",
    },
    {
        id:"settings",
        label : "Settings",
        icon: Settings,
        href : "/settings",
    },

];
const Sidebar = () => {
    const pathName = usePathname();
    return(

        <div className="space-y-4 py-4 flex flex-col h-full bg-[#361539] text-white">
            <div className="px-3 py-2 flex-1"> 
            <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                <div className="relative h-8 w-8 mr-4">
                <Image    
                    fill
                    alt="Logo"
                    src ="/logo-color.png"
                />                
                </div>
                <h1 className={cn ("text-2xl font-bold",montserrtat.className)}>Panda</h1>
            </Link>
                <div className = "space-y-1">
                {routes.map((routes) =>(
                    <Link 
                    href={routes.href}
                    key={routes.id}
                    className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathName === routes.href ?"text-white bg-white/10":"text-zinc-400")}>
                    <div className="flex items-center flex-1">
                    <routes.icon className={cn("h-5 w-5 mr-3",routes.color)}/>
                    {routes.label}   
                    </div>    

                    </Link>
                ))}

                
                </div>
            </div>
        </div>

    );

}

export default Sidebar;