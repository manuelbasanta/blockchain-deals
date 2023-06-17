const Card = ({ children }) => {
    return (
        <div className="p-5 w-[100%] md:w-96 text-center flex flex-col border border-gray-900 rounded">
            {children}
        </div>
    )
}

export default Card;