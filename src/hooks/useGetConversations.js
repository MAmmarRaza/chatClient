    import { useEffect, useState } from "react"
    import toast from "react-hot-toast";
    const useGetConversations=()=>{
        const [loading,setLoading]=useState(false);
        const [conversations,setConversations]=useState([]);
        useEffect(()=>{
            const getConversations=async()=>{
                setLoading(true)
                try {
                    const res=await fetch("/api/doctor/all"
                    ,{
                        method:"GET",
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${localStorage.getItem("authToken")}`
                        }
                    });
                    const data=await res.json();
                    if(data.error){
                        throw new Error(data.error)
                    }
                    setConversations(data.data)
                } catch (error) {
                    toast.error(error.message)                
                }finally{setLoading(false);}
            }
            getConversations();
        },[])
        return{loading,conversations};
    }
    export default useGetConversations
