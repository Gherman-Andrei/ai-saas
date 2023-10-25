"use client"

import { Zap } from "lucide-react";
import { useState } from "react";
import axios from "axios";

import {Button} from "@/components/ui/button";

interface SubscriptionButton {
    isPro:boolean,
}


export const SubscriptionButton = ({isPro =false}:SubscriptionButton) =>{

    const [loading, setLoading] = useState(false);

    const onClick = async () =>{
        try{
            const respone = await axios.get("/api/stripe")
            window.location.href = respone.data.url

        }catch(error){
            console.log("BILLING ERROR", error);
        }finally{
            setLoading(false);
        }
    }

    return (
        <Button disabled={loading} variant={isPro ? "default": "premium"} onClick = {onClick}>
            {isPro ? "Manage Subscriptions" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}