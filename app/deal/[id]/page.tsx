import { Metadata } from "next";
import Deal from "../../../components/pages/Deal/Deal";

export async function generateMetadata(
    { params }
  ): Promise<Metadata> {
    const { id } = params;
    return {
      title: `Deal #${id} details`,
      description: `Deal #${id} details and current state.`
    }
  }

export default function Page({ params }) {
    const { id } = params;
    {/* @ts-expect-error Server Component */}
    return <Deal id={id} />;
}