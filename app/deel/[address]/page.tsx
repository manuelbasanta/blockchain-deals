import Deal from "../../../components/pages/Deal/Deal";

export default function Page({ params }) {
    const { address } = params;
    return <Deal address={address}/>;
}