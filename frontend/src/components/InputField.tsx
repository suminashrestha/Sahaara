interface InputField{ 
    placeholder: string;
    type: string;
    className?: string;
    value?: string ;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=>void
}
const InputField: React.FC <InputField>=({placeholder, type ,className=" ",value,onChange})=>{
    return (
        <input type={type} placeholder={placeholder} className={`${className} p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none`} value={value} onChange={onChange}/>
    )
}
export default InputField
