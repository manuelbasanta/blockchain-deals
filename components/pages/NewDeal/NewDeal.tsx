import Title from '../../ui/Title/Title';
import Card from '../../ui/Card/Card';
import Button from '../../ui/Button/Button';
import NumberedList from '../../ui/NumberedList/NumberedList';

const NewDeal = () => {
    return (
        <div>
            <Title title="New escrow Deal" subtitle="Select what type of Deal you want to create" />
            <div className="flex gap-8 flex-wrap">
                <Card>
                    <div className="flex items-center justify-between flex-col h-[100%]">
                        <div>
                            <div className="font-bold text-xl">Trustless Deal <span className="text-blue-600">as Buyer</span></div>
                            <div className="m-5 text-sm font-light">Create Double Deposit Deal as the buyer.</div>
                            <NumberedList items={[
                                'Create the Deal with this form and send it to the seller. You need to put the value of the goods or services the seller will provide and a deposit.',
                                'The seller confirms the Deal by making his or her deposit.',
                                'You receive the goods/service from the seller and complete the Deal.',
                                'You get your deposit back and the seller gets the value + the deposit.'
                            ]}/>
                        </div>
                        <div className="flex gap-1 flex-col">
                            <Button label="New Deal as Buyer" href="new/buyer-deal" type="primary"/>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center justify-between flex-col h-[100%]">
                        <div>
                            <div className="font-bold text-xl">Trustless Deal <span className="text-green-600">as Seller</span></div>
                            <div className="m-5 text-sm font-light">Create Double Deposit Deal as the seller.</div>
                            <NumberedList items={[
                                'Create the Deal with this form and send it to the buyer. You need to put the value of the goods or services you will provide and a deposit.',
                                'The buyer confirms the Deal by making his or her deposit.',
                                'You can now provide the goods/service to the buyer.',
                                'The buyer receives the goods/service and completes the Deal.',
                                'You get your deposit back plus the value of the Deal and the seller gets his/her deposit back.'
                            ]}/>
                        </div>
                        <div className="flex gap-1 flex-col">
                            <Button label="New Deal as Seller" href="new/seller-deal" type="primary"/>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default NewDeal;