function ErrorText({message}: {message: string}) {
    return (
        <span className="text-red-400">
            {message}
        </span>
    )
}

export default ErrorText
