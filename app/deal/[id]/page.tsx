import Deal from "../../../components/pages/Deal/Deal";

export default function Page({ params }) {
    const { id } = params;
    {/* @ts-expect-error Server Component */}
    return <Deal id={id}/>;
}