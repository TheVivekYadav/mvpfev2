import Button from "./ui/Button.tsx";
import Input from "./ui/Input.tsx";
import {useState} from "react";
import authService from "../api/authService.ts";
import {useNavigate} from "@tanstack/react-router";


export function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleOnSubmit() {
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }
        authService.login({email, password}).then(
            res => {
                console.log("Logging in with response:", res);
                navigate({to: "/dashboard"});
            }
        ).catch(error => {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials and try again.");
        })
        // Reset fields after submission
        setEmail("");
        setPassword("");
    }

    return <div className="bg-amber-800 w-[786px]">
        <h1 className="text-white p-4 text-center">Login to continue...</h1>
        <div className="flex flex-col items-center justify-center p-4 gap-4">
            <Input value={email} onChange={e => setEmail(e.target.value)} className="block"
                   placeholder="contact@thevivekyadav.me"></Input>
            <Input value={password} onChange={e => setPassword(e.target.value)} className="block" type="password"
                   placeholder="1234@#DJSKJ"></Input>

            <Button onClick={handleOnSubmit}>Login</Button>
        </div>
    </div>
}