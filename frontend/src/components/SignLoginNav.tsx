import {NavLink} from 'react-router-dom'
function SignLoginNav() {
    return (
        <nav>
            <ul className="flex w-[350px] justify-between h-[30px] bg-red-200 items-center p-5">
                <li>
                    <NavLink to="/login" className={({ isActive }) =>
            isActive
              ? 'text-blue-500 font-bold'
              : 'text-gray-500'
          }>Login</NavLink>
                </li>
                <li>
                    <NavLink to="/signup" className={({isActive}) => isActive? 'text-blue-500 font-bold' : 'text-black'
          }>Signup</NavLink>
                </li> 
            </ul>   
        </nav>
    )
}

export default SignLoginNav
