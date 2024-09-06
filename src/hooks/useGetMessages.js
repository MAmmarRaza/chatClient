import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading,setLoading]=useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(()=>{
        console.log(selectedConversation);
        const getMessage=async()=>{
            setLoading(true)
            try {
                const res=await fetch(`/api/doctor/chat/${selectedConversation._id}`,
                {
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${localStorage.getItem("authToken")}`
                    }
                });

                const data=await res.json()
                console.log(data);
                if(!data){throw new Error(data.error)}
                setMessages(data?.data)
            } catch (error) {
                toast.error(error.message);
            }finally{setLoading(false)}
        }
            if(selectedConversation?._id) getMessage()
            }, [selectedConversation?._id, setMessages]);
       return{messages,loading}
    }
export default useGetMessages