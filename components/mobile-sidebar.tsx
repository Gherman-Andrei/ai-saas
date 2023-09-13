"use client"

import { Menu } from "lucide-react";
import  Sidebar  from "@/components/Sidebar";
import { Button } from "./ui/button";
import {Sheet, SheetTrigger , SheetContent} from "./ui/sheet";
import { useState,useEffect } from "react";

const MobileSidebar =( ) =>{
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
            <Button variant ="ghost" size = "icon" className="md:hidden" asChild>
                <Menu /> 
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0" >
            <Sidebar />
        </SheetContent>
    </Sheet>
    );
} 

export default MobileSidebar;