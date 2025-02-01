import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = {}, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payment?email=${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-10 mt-6">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-200 shadow-md rounded-lg whitespace-nowrap">
            <thead>
              <tr>
                <th className="p-2 md:p-4">Date</th>
                <th className="p-2 md:p-4">Coins Purchased</th>
                <th className="p-2 md:p-4">Amount Paid</th>
                <th className="p-2 md:p-4">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.data.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-100">
                  <td className="p-2 md:p-4">
                    {format(new Date(payment.purchaseDate), "PP")}
                  </td>
                  <td className="p-2 md:p-4">{payment.coinsPurchased}</td>
                  <td className="p-2 md:p-4">{payment.amountPaid}</td>
                  <td className="p-2 md:p-4">{payment.transID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PaymentHistory;
