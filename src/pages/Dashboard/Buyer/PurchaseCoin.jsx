import { toast } from "react-toastify";
import useGetUser from "../../../hooks/useGetUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const coinPackages = [
  { id: 1, coin: 10, price: 1 },
  { id: 2, coin: 150, price: 10 },
  { id: 3, coin: 500, price: 20 },
  { id: 4, coin: 1000, price: 35 },
];

const PurchaseCoin = () => {
  const { userDB, refetch } = useGetUser();
  const axiosSecure = useAxiosSecure();

  const handleBuyNow = async (coin, price) => {
    const payment = {
      purchaseDate: new Date(),
      coinsPurchased: coin,
      amountPaid: price,
      transID: `TXN${Math.random()
        .toString(36)
        .substring(2, 5 + 2)}`,
      buyerEmail: userDB?.email,
    };

    try {
      await axiosSecure.post(`/payment?email=${userDB?.email}`, payment);
      await axiosSecure.patch(`/user/updatecoin/${userDB?._id}`, {
        coin: userDB?.coin + coin,
      });
      refetch();
      toast.success("Coin Purchased Successfully.");
    } catch (err) {
      toast.err(err.message);
    }
  };

  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-4">Buy Coins</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {coinPackages.map((packageData) => (
          <div
            key={packageData.id}
            className="card bg-base-100 shadow-md rounded-lg p-6 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              {packageData.coin} Coins
            </h3>
            <p className="text-xl font-medium mb-6">$ {packageData.price}</p>
            <button
              onClick={() => handleBuyNow(packageData.coin, packageData.price)}
              className="btn btn-primary w-full"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PurchaseCoin;
