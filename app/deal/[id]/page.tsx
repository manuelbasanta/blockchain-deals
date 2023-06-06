import Deal from "../../../components/pages/Deal/Deal";

export default function Page({ params }) {
    const { id } = params;
    return <Deal id={id}/>;
}