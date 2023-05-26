import Card from '../../ui/Card/Card';
import Button from '../../ui/Button/Button';
import Title from '../../ui/Title/Title';

const NewDeal = () => {
    return (
        <div>
            <Title title="New escrow Deal" subtitle="Select what type of Deal you want to create" />
            <div className="flex gap-4 flex-wrap justify-center">
                <Card>
                    <div className="font-bold text-xl">Trustless Deal</div>
                    <Button label="New Trustless Deal" href="new/trustless-deal" />
                </Card>
                <Card>
                    <Button label="New Arbitrer Deal" href="new/arbitrer-deal" />
                </Card>
                <Card>
                    <Button label="New Time locked Deal" href="new/time-locked-deal" />
                </Card>
            </div>
        </div>
    );
}

export default NewDeal;