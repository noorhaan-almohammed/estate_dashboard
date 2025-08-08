import { Link } from "react-router-dom"

import testPhoto from "../assets/cleint test.png";

const teamMemberData = 
  {
    id: 1,
    name: "younis issa",
    position: "CEO",
    profile: testPhoto,
  }


function MemberTeamPage() {
  return (
    <div className="max-w-[90%] mx-auto p-6 space-y-8 h-screen flex flex-col">
      <div>
        <Link
          to="/team-dashboard"
          className="font-semibold cursor-pointer px-4 py-2 rounded-full text-lg bg-mainPurple text-white hover:bg-hoverPurple "
        >
          Back to list
        </Link>
        </div>

        <div className="grid grid-cols-3 gap-5 flex-1 place-content-center">
          <div className="w-full h-80 rounded-xl overflow-hidden">
            <img src={teamMemberData.profile} alt="image" className="object-cover w-full h-full" />
          </div>
          <div className="col-span-2">
              <h3 className="text-lg font-semibold">{teamMemberData.name}</h3>
              <p className="text-sm text-gray-600">{teamMemberData.position}</p>
           
          </div>
        </div>
      
    </div>
  )
}

export default MemberTeamPage
