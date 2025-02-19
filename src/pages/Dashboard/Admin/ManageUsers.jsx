import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/user/alluser");
      return data;
    },
  });

  const handleRoleChange = async (userId, newRole, currentRole) => {
    if (newRole === currentRole) {
      return;
    }

    try {
      await axiosSecure.patch(`/user/updaterole/${userId}`, {
        role: newRole,
      });
      refetch();
      toast.success("Updated users role");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRemoveUser = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this user?"
    );
    if (confirmed) {
      try {
        await axiosSecure.delete(`/user/deleteuser/${userId}`);
        refetch();
        toast.success("Deleted user and task/submission.");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <h2 className="text-xl md:text-3xl font-bold text-center mb-4">
        Manage Users
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-base-100 shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="p-2 md:p-4">Photo</th>
              <th className="p-2 md:p-4">Name</th>
              <th className="p-2 md:p-4">Email</th>
              <th className="p-2 md:p-4">Role</th>
              <th className="p-2 md:p-4">Coins</th>
              <th className="p-2 md:p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user) => (
              <tr key={user._id} className="hover:bg-base-300">
                <td className="p-2 md:p-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={user.image} alt={user.name} />
                    </div>
                  </div>
                </td>
                <td className="p-2 md:p-4">{user.name}</td>
                <td className="p-2 md:p-4">{user.email}</td>
                <td className="p-2 md:p-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value, user.role)
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
                    onClick={() => handleRemoveUser(user._id)}
                    className="btn btn-error btn-sm"
                    disabled={user.role === "Admin"}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageUsers;
