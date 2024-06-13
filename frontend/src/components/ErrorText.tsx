function ErrorText({message}: {message: string}) {
    return (
        <span className="text-red-400 text-sm">
            {message}
        </span>
    )
}

export default ErrorText
