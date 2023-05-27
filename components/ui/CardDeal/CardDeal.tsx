import Button from "../Button/Button";
import Card from "../Card/Card";

const CardDeal = ({ title, herf, description }) => {
    console.log(title, herf, description)
    return (
        <Card>
            <div className="font-bold text-xl">{title}</div>
            <div>{description}</div>
            <Button label={`New ${title}`} href={herf} />
        </Card>
    )
}

export default CardDeal;