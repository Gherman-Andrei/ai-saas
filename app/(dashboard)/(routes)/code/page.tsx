"use client"
import axios from "axios"
import * as z from "zod";
import OpenAI from "openai";
import {zodResolver} from "@hookform/resolvers/zod";
import { Heading } from "@/components/heading";
import { CodeIcon} from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/bot-avar";
import { UserAvatar } from "@/components/user-avatar";
import ReactMarkdown from "react-markdown";

const CodePage = ()=> {

    const router = useRouter();

    const[messages, setMessages] = useState<OpenAI.Chat.ChatCompletionMessage[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try{
            const userMessage: OpenAI.Chat.ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt,
              };
        const NewMessage = [...messages , userMessage];
        const response = await axios.post("/api/code",{
            messages: NewMessage,
        });
        if (response.data) {
            setMessages((current) => [...current, userMessage, response.data]);
        } else {
            // Tratează cazul în care răspunsul nu conține date
            console.error("Răspunsul de la server nu conține date valide.");
        }

        form.reset();
        } catch(error){
            console.log(error);
        } finally {
            router.refresh();
        }

    }



    return(
        <div>
            <Heading
                title="Code Generation"
                description="Generation code using descriptive text"
                icon={CodeIcon}
                iconColor = "text-pink-700"
                bgColor = "text-pink-700/10"     
            />
            <div className= "px-4 lg:px-8">
                <div>
                    <Form{...form}>
                        <form onSubmit ={form.handleSubmit( onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadows-sm grid grid-cols-12 gap-2">
                            <FormField name="prompt" render = {({field })=> (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    disabled = {isLoading} placeholder="Simple toggle button using react hooks" {...field}/> 
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                            Generate
                        </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader/>
                        </div>
                    )}            



                    {messages.length === 0 && !isLoading && (
                       <Empty label={"No conversation"} />
                    )} 
                        <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) =>(
                            <div 
                            key = {message.content}
                            className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10":"bg-muted")}                            >
                                {message.role === "user" ? <UserAvatar /> :<BotAvatar/>} 
                               <p className="text-sm">
                                <ReactMarkdown
                                components={
                                    {
                                        pre : ({node , ...props}) => (
                                          <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                            <pre {...props}/>
                                        </div>  
                                        ),
                                        code: ({node, ...props}) => (
                                            <code className="bg-black/10- rounded-lg p-1" {...props} />
                                        )
                                    }
                                }
                                className = "text-sm overflow-hidden leading-7">
                                {message.content || ""}
                                </ReactMarkdown>
                                </p>
                            </div>
                        ))}                      
                        
                        </div>
                </div>
            </div>
        </div>
    );
}

export default CodePage;