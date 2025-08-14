import TeamList from "../../components/lists/TeamList";
import AddTeamModal from "../../components/modals/AddTeamModal";
import EditTeamModal from "../../components/modals/EditTeamModal";
import ReusableDataPage from "../../reusecomponents/TpoSectionPage";

export default function TeamPage() {
  return (
    <ReusableDataPage
      collectionName="team"
      pageTitle="Our Team"
      addButtonText="+ Add Member"
      ListComponent={TeamList}
      AddModalComponent={AddTeamModal}
      EditModalComponent={EditTeamModal}
      emptyStateText="No team members found"
      orderByField="createdAt"
      orderDirection="desc"
    />
  );
}