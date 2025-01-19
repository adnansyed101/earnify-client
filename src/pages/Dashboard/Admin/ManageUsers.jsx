import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: users = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/user/alluser");
      return data;
    },
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      const { data } = await axiosPublic.patch(`/user/updaterole/${userId}`, {
        role: newRole,
      });
      console.log(data);
      refetch()
      toast.success("Updated users role");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRemoveUser = (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this user?"
    );
    if (confirmed) {
      console.log("hello world");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Manage Users</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="p-4">Photo</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Coins</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.data.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="p-4">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={user.image} alt={user.name} />
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="select select-bordered w-28"
                      disabled={user.role === "Admin"}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Buyer">Buyer</option>
                      <option value="Worker">Worker</option>
                    </select>
                  </td>
                  <td className="p-4">{user.coin}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleRemoveUser(user.id)}
                      className="btn btn-error btn-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageUsers;
