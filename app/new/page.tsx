import { Metadata } from 'next';
import NewDeal from '../../components/pages/NewDeal/NewDeal';
 
export const metadata: Metadata = {
  title: 'New Deal',
  description: 'Create a new Deal backed by the blockchain',
};

export default function Page() {
    return <NewDeal />;
}