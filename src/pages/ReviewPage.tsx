import { Link } from "react-router-dom"
import testPhoto from "../assets/cleint test.png";

const onereview = {
    id: 1,
    rating: 3,
    name: "younis issa",
    country: "Syria",
    city: "tartous",
    title: "Mamma Mia Marcelo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi maxime officia, quisquam reprehenderit nostrum laboriosam id, quo culpa vel sit libero ratione temporibus quod facere repudiandae doloribus est voluptatum? Fugit.",
    profile: testPhoto,
  }

function ReviewPage() {
  // const { id } = useParams<{ id: string }>();
  return (
    <div className="max-w-[90%] mx-auto p-6 space-y-8">
      <div>
        <Link
          to="/reviews-dashboard"
          className="font-semibold cursor-pointer px-4 py-2 rounded-full text-lg bg-mainPurple text-white hover:bg-hoverPurple "
        >
          Back to list
        </Link>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="w-full h-80 rounded-xl overflow-hidden">
            <img src={onereview.profile} alt="image" className="object-cover w-full h-full" />
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-600">{`Rating: ${onereview.rating} out of 5`}</p>
          <h3 className="text-lg font-semibold mt-2">{onereview.title}</h3>
          <p className="text-sm text-gray-600">{onereview.description}</p>

          <div className="flex gap-4 mt-2">
            
            <div>
              <h3 className="text-lg font-semibold">{onereview.name}</h3>
              <p className="text-sm text-gray-600">{`${onereview.country}, ${onereview.city}`}</p>
            </div>
          </div>
          </div>
        </div>
      
    </div>
  )
}

export default ReviewPage
