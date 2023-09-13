"use client"
import axios from "axios"
import * as z from "zod";
import OpenAI from "openai";
import {zodResolver} from "@hookform/resolvers/zod";
import { Heading } from "@/components/heading";
import { MessageSquareIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/Empty";

const ConversationPage = ()=> {

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
        const response = await axios.post("/api/conversation",{
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
                title="Conversation"
                description="Our most advanced conversation"
                icon={MessageSquareIcon}
                iconColor = "text-violet-500"
                bgColor = "text-violet-500/10"     
            />
            <div className= "px-4 lg:px-8">
                <div>
                    <Form{...form}>
                        <form onSubmit ={form.handleSubmit( onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadows-sm grid grid-cols-12 gap-2">
                            <FormField name="prompt" render = {({field })=> (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    disabled = {isLoading} placeholder="Ask me anything!" {...field}/> 
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
                    {messages.length === 0 && !isLoading && (
                       <Empty label={""} />
                    )} 
                        <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) =>(
                            <div key = {message.content}>
                                {message.content}
                            </div>
                        ))}                      
                        
                        </div>
                </div>
            </div>
        </div>
    );
}

export default ConversationPage;