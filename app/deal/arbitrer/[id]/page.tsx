import ArbitrerDeal from "../../../../components/pages/Deal/ArbitrerDeal/ArbitrerDeal";

export default function Page({ params }) {
    const { id } = params;
    {/* @ts-expect-error Server Component */}
    return <ArbitrerDeal id={id} />;
}