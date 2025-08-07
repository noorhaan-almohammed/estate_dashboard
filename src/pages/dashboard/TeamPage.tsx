import { useState } from "react";
import AddTeamModal from "../../components/modals/AddTeamModal";
import TeamList from "../../components/lists/TeamList";
import testPhoto from "../../assets/cleint test.png";
import EditTeamModal from "../../components/modals/EditTeamModal";

export interface TeamListData {
  id: number;

  name: string;
  position: string;

  profile: string;
}

const teamListData: TeamListData[] = [
  {
    id: 1,
    name: "younis issa",
    position: "CEO",
    profile: testPhoto,
  },
  {
    id: 2,
    name: "younis issa",
    position: "CEO",
    profile: testPhoto,
  },
  {
    id: 3,
    name: "younis issa",
    position: "CEO",
    profile: testPhoto,
  },
  {
    id: 4,
    name: "younis issa",
    position: "CEO",
    profile: testPhoto,
  },
  {
    id: 5,
    name: "younis issa",
    position: "CEO",
    profile: testPhoto,
  },
  {
    id: 6,
    name: "younis issa",
    position: "CEO",
    profile: testPhoto,
  },
  {
    id: 7,
    name: "younis issa",
    position: "CEO",
    profile: testPhoto,
  },
  {
    id: 8,
    name: "younis issa",
    position: "CEO",
    profile: testPhoto,
  },
  {
    id: 9,
    name: "younis issa",
    position: "CEO",
    profile: testPhoto,
  },
];

function TeamPage() {
  const [addTeamModal, setAddTeamModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Team Members</h2>
        <button
          onClick={() => setAddTeamModal(true)}
          className="bg-mainPurple text-white px-4 py-2 rounded-lg hover:bg-hoverPurple"
        >
          + Add Member
        </button>
      </div>

      {addTeamModal && (
        <AddTeamModal
          onClose={() => setAddTeamModal(false)}
        />
      )}


      {showEditModal && (
        <EditTeamModal
          onClose={() => setShowEditModal(false)}
        />
      )}

      <TeamList
        items={teamListData}
        setShowEditModal={setShowEditModal}
      />
    </div>
  )
}

export default TeamPage
