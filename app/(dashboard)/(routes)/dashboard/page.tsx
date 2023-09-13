"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, Image, MessageSquare, Music, Video } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversion",
    icon: MessageSquare,
    color:"text-violet-500",
    bgColor:"bg-purple-500/10",
    href:"/conversation"
  },
  {
    label: "Image Generation",
    icon: Image,
    color:"text-green-500",
    bgColor:"bg-green-500/10",
    href:"/image"
  },
  {
    label: "Video Generation",
    icon: Video,
    color:"text-orange-500",
    bgColor:"bg-orange-500/10",
    href:"/video"
  },
  {
    label: "Music Generation",
    icon: Music,
    color:"text-yellow-500",
    bgColor:"bg-yellow-500/10",
    href:"/music"
  },
  {
    label: "Code Generation",
    icon: Code,
    color:"text-pink-500",
    bgColor:"bg-pink-500/10",
    href:"/code"
  }
]



const DashBoardPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
            <h2 className=" text-2xl md:text-4xl font-bold text-center"> Explore the Artificial Inteligence </h2>
            <div className="text-muted-foreground font-light text-sm md:text-lg text-center ">Chat with the AI , ChatGPT 3.5</div>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
            {tools.map((tool)=>(
              <Card
              onClick={()=>router.push(tool.href)}
              key={tool.href}
              className="p-4 border-black/5 flex items-center justify-between hover:shadow-sm transition cursor-pointer"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("w-8 h-8",tool.color)} />


                  </div>
                  <div className="font-semibolt">
                    {tool.label}
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </div>

              </Card>
            ))}
      </div>
    </div>
  );
}

export default DashBoardPage;
