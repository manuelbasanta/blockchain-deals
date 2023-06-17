import Button from "../Button/Button";
import Card from "../Card/Card";

const CardDeal = ({ title, buyerHref, description, sellerHref }) => {
    return (
        <Card>
            <div className="flex items-center justify-between flex-col h-[100%]">
                <div className="font-bold text-xl">{title}</div>
                <div className="m-5 text-sm">{description}</div>
                <div className="flex gap-1 flex-col">
                    <Button label={`New ${title} as Buyer`} href={buyerHref} type="primary"/>
                    <span className="mt-2">
                        <Button  label={`New ${title} as Seller`} href={sellerHref} type="primary" />
                    </span>
                </div>
            </div>
        </Card>
    )
}

export default CardDeal;