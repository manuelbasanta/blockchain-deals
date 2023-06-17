const Title = ({ title, subtitle }) => {
    return (
        <>
            <h1 className="text-5xl md:text-7xl text-center font-bold">
                {title}
            </h1>
            <h2 className="text-sm md:text-base text-center font-light my-8">
                {subtitle}
            </h2>
        </>
    );
}

export default Title;