import TrustlessDeal from "../../../../components/pages/Deal/TrustlessDeal/TrustlessDeal";

export default function Page({ params }) {
    const { id } = params;
    {/* @ts-expect-error Server Component */}
    return <TrustlessDeal id={id} />;
}