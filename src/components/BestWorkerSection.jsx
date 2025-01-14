import { BsCoin } from "react-icons/bs";

const workers = [
  {
    id: 1,
    name: "Alice Johnson",
    coins: 1500,
    image:
      "https://img.freepik.com/free-photo/photo-cheerful-curly-haired-woman-feels-like-winner-clenches-fists-makes-victory-gesture-exclaims-with-happiness-wears-yellow-jumper-achieves-goal-gets-triumph-poses-indoor-yes-i-did-it_273609-37571.jpg?semt=ais_hybrid",
  },
  {
    id: 2,
    name: "Bob Smith",
    coins: 1200,
    image:
      "https://img.freepik.com/free-photo/photo-cheerful-curly-haired-woman-feels-like-winner-clenches-fists-makes-victory-gesture-exclaims-with-happiness-wears-yellow-jumper-achieves-goal-gets-triumph-poses-indoor-yes-i-did-it_273609-37571.jpg?semt=ais_hybrid",
  },
  {
    id: 3,
    name: "Catherine Brown",
    coins: 1100,
    image:
      "https://img.freepik.com/free-photo/photo-cheerful-curly-haired-woman-feels-like-winner-clenches-fists-makes-victory-gesture-exclaims-with-happiness-wears-yellow-jumper-achieves-goal-gets-triumph-poses-indoor-yes-i-did-it_273609-37571.jpg?semt=ais_hybrid",
  },
  {
    id: 4,
    name: "David Wilson",
    coins: 1050,
    image:
      "https://img.freepik.com/free-photo/photo-cheerful-curly-haired-woman-feels-like-winner-clenches-fists-makes-victory-gesture-exclaims-with-happiness-wears-yellow-jumper-achieves-goal-gets-triumph-poses-indoor-yes-i-did-it_273609-37571.jpg?semt=ais_hybrid",
  },
  {
    id: 5,
    name: "Emily Davis",
    coins: 980,
    image:
      "https://img.freepik.com/free-photo/photo-cheerful-curly-haired-woman-feels-like-winner-clenches-fists-makes-victory-gesture-exclaims-with-happiness-wears-yellow-jumper-achieves-goal-gets-triumph-poses-indoor-yes-i-did-it_273609-37571.jpg?semt=ais_hybrid",
  },
  {
    id: 6,
    name: "Franklin Harris",
    coins: 900,
    image:
      "https://img.freepik.com/free-photo/photo-cheerful-curly-haired-woman-feels-like-winner-clenches-fists-makes-victory-gesture-exclaims-with-happiness-wears-yellow-jumper-achieves-goal-gets-triumph-poses-indoor-yes-i-did-it_273609-37571.jpg?semt=ais_hybrid",
  },
];

const BestWorkerSection = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-2">
        <h2 className="text-3xl font-bold text-center mb-8">Best Workers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className="card bg-white shadow-lg p-6 rounded-lg flex flex-col items-center"
            >
              <div className="avatar">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={worker.image} alt={worker.name} />
                </div>
              </div>
              <h3 className="text-lg font-semibold mt-4">{worker.name}</h3>
              <p className="flex gap-1 items-center">
                {worker.coins} <BsCoin />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestWorkerSection;
