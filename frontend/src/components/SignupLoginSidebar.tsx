function SignupLoginSidebar({ status }) {
    return (
        <div className=" h-[80%] w-[40%] shadow-md bg-cover bg-[url('/dog.avif')] flex flex-cols flex-col-reverse items-center">
            {status === 'login' && 
                <div>login</div>
            }
            {status === 'signup' && <div>signup</div>}
        </div>
    )
}

export default SignupLoginSidebar;
