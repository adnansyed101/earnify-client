import Loading from "../components/Loading";
import useGetUser from "../hooks/useGetUser";

const UserProfile = () => {
  const { userDB, isLoading } = useGetUser();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-20 min-h-[calc(100vh-30px)] bg-base-200">
      <div className="flex flex-col items-center shadow-lg rounded-lg p-6 w-80 mx-auto bg-base-100">
        <img
          src={userDB?.image}
          alt={userDB?.name}
          className="w-24 h-24 rounded-full border-4 border-primary shadow-md mb-4"
        />
        <div className="indicator">
          <span className="indicator-item badge badge-secondary">
            {userDB?.role}
          </span>
          <h2 className="text-xl font-semibold">{userDB?.name}</h2>
        </div>
        <p>{userDB?.email}</p>
      </div>
    </section>
  );
};

export default UserProfile;
