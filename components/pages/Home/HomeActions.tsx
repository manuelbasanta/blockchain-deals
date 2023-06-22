"use client"
import Button from "../../ui/Button/Button"

const HomeActions = () => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const targetId = 'learn-more';
        const elem = document.getElementById(targetId);
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