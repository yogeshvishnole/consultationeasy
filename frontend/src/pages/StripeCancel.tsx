import Layout from "../components/layout/Layout";

interface Props {}

const StripeCancel: React.FC<Props> = () => {
  return (
    <Layout>
      <div className="container flex-center">Payment failed ! Try Again.</div>
    </Layout>
  );
};

export default StripeCancel;
