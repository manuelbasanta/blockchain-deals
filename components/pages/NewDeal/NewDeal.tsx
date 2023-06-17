import Title from '../../ui/Title/Title';
import CardDeal from '../../ui/CardDeal/CardDeal';

const DEELS = [
    {
        id: 0,
        title: 'Trustless Deal',
        buyerHref: 'new/buyer-trustless-deal',
        sellerHref: 'new/seller-trustless-deal',
        description: 'Create Double Deposit Deal that let\'s you trade good or services safelly',
    },
    {
        id: 1,
        title: 'Arbitrer Deal',
        buyerHref: 'new/buyer-arbitrer-deal',
        sellerHref: 'new/seller-arbitrer-deal',
        description: 'Create that will be approved by a 3rd wallet.',
    }
];

const NewDeal = () => {
    return (
        <div>
            <Title title="New escrow Deal" subtitle="Select what type of Deal you want to create" />
            <div className="flex gap-4 flex-wrap justify-center">
                {DEELS.map(deal => <CardDeal key={deal.id} buyerHref={deal.buyerHref} description={deal.description} title={deal.title} sellerHref={deal.sellerHref}/>)}
            </div>
        </div>
    );
}

export default NewDeal;