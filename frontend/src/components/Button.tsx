
export default function Button({children, className=""}:{children: React.ReactNode,className?: string}){
    return <button className={`bg-red-500 px-5 py-2 text-white rounded-lg ${className}`}>{children}</button>
}