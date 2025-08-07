import type { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import type { TeamListData } from "../../pages/dashboard/TeamPage";

const TeamList = ({
  items,
  setShowEditModal,
}: {
  items: TeamListData[];
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {items.map((team: TeamListData) => (
        <div key={team.id} className="border rounded-xl p-4 shadow">
            <div className="rounded-lg w-full h-50 overflow-hidden">
              <img
                src={team.profile}
                alt="image"
                className="h-full w-full object-cover"
              />
            </div>
          

          <div className="flex flex-col gap-4 mt-2">
            <div>
              <h3 className="text-lg font-semibold">{team.name}</h3>
              <p className="text-sm text-gray-600">{team.position}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              to={`/team-member/${team.id}`}
              className="text-blue-600 cursor-pointer"
            >
              Show
            </Link>

            <button
              className="text-green-600 cursor-pointer"
              onClick={() => {
                setShowEditModal(true);
              }}
            >
              Edit
            </button>

            <button
              className="text-red-600 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TeamList
