"use client"

import { useEffect } from "react"
import {Crisp} from "crisp-sdk-web"

export const CrispChat =() => {

    useEffect(() =>{
        Crisp.configure("5434fe4f-f159-4147-8b58-609cb7d46d9d");
    },[])

    return null;
}