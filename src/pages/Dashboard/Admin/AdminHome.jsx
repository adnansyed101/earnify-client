import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AdminStats from "./AdminStats";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: adminOverview = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/overview/admin?email=${user?.email}`
      );
      return data;
    },
  });

  const handleApprove = async (payment) => {
    try {
      await axiosSecure.patch(`/user/updatecoin/${payment.worker._id}`, {
        coin: payment.worker.coin - payment.withdrawalCoin,
      });
      await axiosSecure.patch(`/withdrawal/status/${payment._id}`, {
        status: "accepted",
      });
      await axiosSecure.post("/notification", {
        message: `Withdrawal of ${payment.withdrawalCoin} was accepted.`,
        toEmail: payment.worker.email,
        time: new Date(),
      });
      refetch();
      toast.success("Accepted Withdrawal.");
    } catch (err) {
      toast.err(err.message);
    }
  };

  const handleReject = async (payment) => {
    try {
      await axiosSecure.patch(`/withdrawal/status/${payment._id}`, {
        status: "rejected",
      });
      await axiosSecure.post("/notification", {
        message: `Withdrawal of ${payment.withdrawalCoin} was rejected.`,
        toEmail: payment.worker.email,
        time: new Date(),
      });
      refetch();
      toast.success("Withdrawal Rejected");
    } catch (err) {
      toast.err(err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-14">
      <h1 className="text-2xl font-bold mb-2">Overview</h1>
      <AdminStats
        totalWorker={adminOverview.data?.totalWorker || 0}
        totalBuyer={adminOverview.data?.totalBuyer || 0}
        totalAvailableCoin={
          adminOverview.data.totalAvailableCoin[0]?.totalCoins || 0
        }
        totalPayment={adminOverview.data.totalPayment[0]?.totalPaid || 0}
      />
      <section className="py-10">
        <div className="mx-auto">
          <h2 className="text-lg md:text-3xl font-bold text-center mb-4">
            Withdraw Request
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-xs bg-white shadow-md rounded-lg whitespace-nowrap">
              <thead>
                <tr>
                  <th className="p-2 md:p-4">Worker Name</th>
                  <th className="p-2 md:p-4">Withdraw Coins</th>
                  <th className="p-2 md:p-4">Withdraw Amount</th>
                  <th className="p-2 md:p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminOverview.data.pendingPayments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-100">
                    <td className="p-2 md:p-4">{payment.worker.name}</td>
                    <td className="p-2 md:p-4">{payment.withdrawalCoin}</td>
                    <td className="p-2 md:p-4">$ {payment.withdrawalAmount}</td>
                    <td className="p-2 md:p-4 flex gap-2">
                      {payment.status === "pending" ? (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleApprove(payment)}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(payment)}
                            className="btn btn-error btn-sm"
                          >
                            Reject
                          </button>
                        </>
                      ) : payment.status === "accepted" ? (
                        <div className="badge badge-success">Accepted</div>
                      ) : (
                        <div className="badge badge-error">Rejected</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
