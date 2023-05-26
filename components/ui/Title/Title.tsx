const Title = ({ title, subtitle }) => {
    return (
        <>
            <h1 className="text-7xl text-center font-bold">
                {title}
            </h1>
            <h2 className="text-lg text-center font-light m-8">
                {subtitle}
            </h2>
        </>
    );
}

export default Title;