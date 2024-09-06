import { useAuthContext } from "../../context/AuthContext"
import useConversation from "../../zustand/useConversation";
import { extractTime } from './../../utils/extractTime';
import image1 from "./Ammar.png";

const Message = ({message}) => {
  const {authUser}=useAuthContext();
  const {selectedConversation}=useConversation();
  const fromMe=message?.senderId==authUser;
  console.log(fromMe);
  console.log(typeof(message.senderId), typeof(authUser));
  const formatedTime=extractTime(message.createdAt);
  const chatClassName=fromMe?'chat-end':'chat-start';
  const profilePic="fromMe?image1:selectedConversation?.avatar.url";
  const bubbleBgColor=fromMe?'bg-blue-500':""
  const shakeClass=message.shouldShake?"shake":""
  return (
    <div className={`chat ${chatClassName}`}>
    <div className="chat-image avatar">
    <div className="w-10 rounded-full">
    <img src={profilePic} alt="user image"/>
    </div>
    </div>
    <div className={`chat-bubble text-white pb-1 ${bubbleBgColor} ${shakeClass} `}>{message.message}</div>
    <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">{formatedTime}</div>
    </div>
  )
}

export default Message