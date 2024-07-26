import Button from "../../../components/Button";

const StripePayment = ({
  handleSubmit,
}: {
  handleSubmit: (e: React.FormEvent) => void;
}) => {
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Button type="submit" className="w-full">
        Donate
      </Button>
    </form>
  );
};

export default StripePayment;