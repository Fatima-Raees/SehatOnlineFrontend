// pages/biobert.tsx
import { GetServerSideProps } from 'next';
import { getBioBertResults } from '@/chatBotBackend/servicesAPI';
interface BioBertResponse {
  label: string;
  score: number;
}

interface BioBertProps {
  bioBertData: BioBertResponse[] | null; // or adjust depending on your actual response
}

const BioBertPage = ({ bioBertData }: BioBertProps) => {
  return (
    <div>
      <h1>BioBERT Results</h1>
      <pre>{JSON.stringify(bioBertData, null, 2)}</pre>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const text = "Your biomedical text here for analysis.";
  try {
    const bioBertData = await getBioBertResults(text);
    return { props: { bioBertData } };
  } catch (error) {
    return { props: { bioBertData: null } };
  }
};

export default BioBertPage;
