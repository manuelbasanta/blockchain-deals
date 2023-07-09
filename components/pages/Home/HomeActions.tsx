"use client"
import Button from "../../ui/Button/Button"

const HomeActions = () => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const elem = document.getElementById('learn-more');
        window.scrollTo({
          top: elem?.getBoundingClientRect().top,
          behavior: "smooth",
        });
    };
    return (
        <>
            <Button href="/new" label="Start creating" type="primary"/>
            <Button href="#learn-more" label="Learn more" onClick={handleScroll} />
        </>
    )
}

export default HomeActions;