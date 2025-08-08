import { Link } from "react-router-dom";

const ClientData = {
  id: 1,
  title: "ABC Corporation",
  date: "Since 2019",
  domin: "Commercial Real Estate",
  category: "Luxury Home Development",
  what_say:
    "Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
};

function ClientPage() {
  return (
    <div className="max-w-[90%] mx-auto p-6 space-y-8 h-screen flex flex-col  w-full">
      <div>
        <Link
          to="/clients-dashboard"
          className="font-semibold cursor-pointer px-4 py-2 rounded-full text-lg bg-mainPurple text-white hover:bg-hoverPurple "
        >
          Back to list
        </Link>
      </div>

      <div className="h-screen   flex justify-center items-center">
        <div
          key={ClientData.id}
          className="border rounded-xl p-6 shadow hover:shadow-md transition-shadow bg-bg max-w[450px] xl:max-w-[573px] "
        >
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h3 className="text-[14px] lg:text-xl font-bold text-secPurple">
                {ClientData.date}
              </h3>
              <p className="text-[16px] lg:text-2xl font-bold text-mainText">
                {ClientData.title}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center gap-3.5 ">
            <p className="text-[12px] lg:text-[18px] text-secText mb-4">
              {ClientData.domin}
            </p>
            <p className="text-[12px] lg:text-[18px] text-secText mb-4">
              {ClientData.category}
            </p>
          </div>
          <p className="text-[14px] lg:text-2xl  text-mainText mb-4">
            {ClientData.what_say}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClientPage;
