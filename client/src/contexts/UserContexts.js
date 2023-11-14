import {createContext} from "react";


const TokenContext= createContext(null)
const UserContext= createContext()

const LogOutContext=createContext()
const TicketContext = createContext({})

export {TokenContext,UserContext,LogOutContext,TicketContext}