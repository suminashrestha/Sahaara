import { useState } from "react"
import Button from "./Button"

function Login() {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    return (
        <div className="flex flex-col h-fit bg-black p-5 gap-8">
            <input className="p-2 text-lg text-black rounded-lg focus:outline-none" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='enter email/username' />

            <input className="p-2 text-lg text-black rounded-lg focus:outline-none" type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter password' />
          
            <Button className="bg-blue-500">Login</Button>
        </div>
    )
}

export default Login
