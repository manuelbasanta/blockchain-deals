import { Metadata } from 'next';
import NewDeal from '../../components/pages/NewDeal/NewDeal';
 
export const metadata: Metadata = {
  title: 'New Deal',
  description: 'Create a new Deal backed by the Ethereum blockchain',
};

export default function Page() {
    return <NewDeal />;
}