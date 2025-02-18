import { useState } from "react";
import { toast } from "react-toastify";
import useGetUser from "../../../hooks/useGetUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WithdrawalForm = () => {
  const [coins, setCoins] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const { userDB } = useGetUser();
  const axiosSecure = useAxiosSecure();

  const handleCoinChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setCoins(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (coins < 200) {
      return toast.error("Withdrawing less than 200 coins.");
    }

    if (coins > userDB?.coin) {
      return toast.error("Do not have enough coins.");
    }

    const withdrawal = {
      withdrawalCoin: coins,
      withdrawalAmount: parseFloat((coins / 20).toFixed(2)),
      paymentSystem,
      withdrawDate: new Date(),
      status: "pending",
      workerEmail: userDB?.email,
      worker: userDB?._id,
    };

    try {
      await axiosSecure.post("/withdrawal", withdrawal);
      toast.success("Withdrawal Request Sent");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section>
      <h2 className="text-lg md:text-3xl font-bold text-center mb-8">
        Withdraw Coins
      </h2>
      <div className="bg-base-100 shadow-md rounded-lg p-6 space-y-6">
        {/* Current Coin and Dollar Balance */}
        <div className="flex justify-between items-center">
          <p className="text-lg">
            <strong>Available Coins:</strong> {userDB?.coin}
          </p>
          <p className="text-lg">
            <strong>Amount in Dollars:</strong> $
            {(userDB?.coin / 20).toFixed(2)}
          </p>
        </div>

        {/* Withdrawal Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-2">
            {/* Coins to Withdraw */}
            <div className="form-control">
              <label className="label font-medium">Coins to Withdraw</label>
              <input
                type="number"
                min="0"
                value={coins}
                onChange={handleCoinChange}
                className="input input-bordered w-full"
                required
              />
              <p className="text-sm mt-2 text-secondary">
                *Cannot withdraw less than 200 coins.
              </p>
            </div>

            {/* Withdraw Amount */}
            <div className="form-control">
              <label className="label font-medium">
                Amount to Withdraw ($)
              </label>
              <input
                type="text"
                value={`$${(coins / 20).toFixed(2)}`}
                className="input input-bordered w-full"
                name="withdrawalAmount"
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Payment System */}
            <div className="form-control">
              <label className="label font-medium">Payment System</label>
              <select
                value={paymentSystem}
                onChange={(e) => setPaymentSystem(e.target.value)}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select a payment system</option>
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
                <option value="rocket">Rocket</option>
                <option value="card">Card</option>
              </select>
            </div>

            {/* Account Number */}
            <div className="form-control">
              <label className="label font-medium">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* Withdraw Button */}
          <button type="submit" className="btn btn-primary w-full">
            Withdraw
          </button>
        </form>
      </div>
    </section>
  );
};

export default WithdrawalForm;
