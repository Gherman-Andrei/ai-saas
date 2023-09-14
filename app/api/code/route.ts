import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Configuration from "openai";
import OpenAIApi from "openai";
import { CreateChatCompletionRequestMessage } from "openai/resources/chat/index.mjs";
const configuration = new Configuration({
    organization: "org-BnyiaRER7PlCCkCKN5xtsjNz",
    apiKey: process.env.OPENAIA_API_KEY,

});


const openai = new OpenAIApi({
    apiKey: process.env.OPENAIA_API_KEY
});

const instructionMessage : CreateChatCompletionRequestMessage ={
    role:"system",
    content:" You are a code generator , you must answer only in markdown code snippets. Use code comments to explanation."
}

export async function POST(
    req:Request
){
        try {

            const{userId} = auth();
            const body = await req.json();
            const{messages } = body;

            if(!userId) {
                return new NextResponse("Unauthorized", {
                    status: 401,
                });
            }

            if (!configuration.apiKey) {
                return new NextResponse("OpenAI API Key not configured.", { status: 500 });
              }

            if(!messages) {
                return new NextResponse("Messages are required", {
                    status:400
                });
            }
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages : [instructionMessage, ...messages]
            });

            return NextResponse.json(response.choices[0].message);

        } catch (error){

            console.log("[CODE_ERROR]",error);
            return new NextResponse("Internal error:" , {status:500})
        }


}