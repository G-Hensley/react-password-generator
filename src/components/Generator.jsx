import { useState } from "react";

const Generator = () => {

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+{}:"<>?|[];,./`~';

    const [password, setPassword] = useState('');
    const [passwordLength, setPasswordLength] = useState(8);
    const [specialCharacters, setSpecialCharacters] = useState(true);
    const [copied, setCopied] = useState(false);

    const updatePasswordLength = (e) => {
        setPasswordLength(e.target.value);
    }

    const updateSpecialCharacters = (e) => {
        setSpecialCharacters(e.target.checked);
    }

    const generatePassword = () => {
        const characters = `${letters}${numbers}${specialCharacters ? special : ''}`;
        let newPassword = '';
        for ( let i = 0; i < passwordLength; i++ ) {
            const character = characters.charAt(Math.floor(Math.random() * characters.length));
            newPassword += character;
        }
        setPassword(newPassword);
    }

    const copyPasword = () => {
        navigator.clipboard.writeText(password);
        const passwordInput = document.querySelector('input[type="text"]');
        passwordInput.select();
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2500);
    }

    return (

        <main className='border-4 p-8 rounded-xl border-cyan-600 flex flex-col items-center justify-center gap-4'>

            <h1 className='text-blue-200 text-4xl'>Password Generator</h1>
            <div className="flex">
                <input placeholder="Password" value={password} type="text" className="border-2 border-cyan-200 p-2 rounded-md caret-cyan-300" />
                <button onClick={copyPasword} className="text-white p-2 rounded-md ml-2 border-transparent border-2 hover:border-cyan-300 cursor-pointer bg-cyan-900 transition-all duration-300">{copied ? "Copied" : "Copy"}</button>
            </div>
            
            <div className="flex gap-8">

                <div className="flex flex-col">
                    <input className="accent-cyan-300" onChange={updatePasswordLength} value={passwordLength} type="range" name="passwordSize" id="lengthRange" min={8} max={20} />
                    <label htmlFor="passwordSize">Length: {passwordLength}</label>
                </div>

                <div className="flex flex-col">
                    <input onChange={updateSpecialCharacters} checked={specialCharacters} className="accent-cyan-300" type="checkbox" name="special-characters" id="special-characters" />
                    <label htmlFor="special-characters">Special Characters</label>
                </div>

            </div>

            <button onClick={generatePassword} className="text-white p-2 rounded-md ml-2 border-transparent border-2 hover:border-cyan-300 cursor-pointer bg-cyan-900 transition-all duration-300">Generate Password</button>

        </main>

    );

};

export default Generator;