import Title from '../../ui/Title/Title';
import CardDeal from '../../ui/CardDeal/CardDeal';

const DEELS = [
    {
        id: 0,
        title: 'Trustless Deal',
        href: 'new/buyer-trustless-deal',
        description: '',
    },
    {
        id: 1,
        title: 'Arbitrer Deal',
        href: 'new/buyer-arbitrer-deal',
        description: '',
    },
    {
        id: 2,
        title: 'Time locked Deal',
        href: 'new/time-locked-deal',
        description: '',
    },
];

const NewDeal = () => {
    return (
        <div>
            <Title title="New escrow Deal" subtitle="Select what type of Deal you want to create" />
            <div className="flex gap-4 flex-wrap justify-center">
                {DEELS.map(deal => <CardDeal key={deal.id} herf={deal.href} description={deal.description} title={deal.title}/>)}
            </div>
        </div>
    );
}

export default NewDeal;