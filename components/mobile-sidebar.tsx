"use client"

import { Menu } from "lucide-react";
import  Sidebar  from "@/components/Sidebar";
import { Button } from "./ui/button";
import {Sheet, SheetTrigger , SheetContent} from "./ui/sheet";
import { useState,useEffect } from "react";

interface MobileSidebarProps{
    apiLimitCount:number;
    isPro: boolean;
}

const MobileSidebar =( {
    apiLimitCount = 0,
    isPro = false,
}:MobileSidebarProps) =>{
    const [isMonted , setisMonted] = useState(false);
    useEffect(() =>{
      setisMonted(true);  
    },[]);
    if (!isMonted) {
        return null;
    }
    return (
    <Sheet>
        <SheetTrigger>
            <Button variant ="ghost" size = "icon" className="md:hidden">
                <Menu /> 
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0" >
            <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
        </SheetContent>
    </Sheet>
    );
} 

export default MobileSidebar;