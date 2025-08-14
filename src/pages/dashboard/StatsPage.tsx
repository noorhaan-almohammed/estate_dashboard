import StatsList from "../../components/lists/StatsList";
import AddStatModal from "../../components/modals/AddStatModal";
import EditStatModal from "../../components/modals/EditStatModal";
import ReusableDataPage from "../../reusecomponents/TpoSectionPage";

export default function StatsPage() {
  return (
    <ReusableDataPage
      collectionName="stats"
      pageTitle="Statistics Dashboard"
      addButtonText="+ Add Statistic"
      ListComponent={StatsList}
      AddModalComponent={AddStatModal}
      EditModalComponent={EditStatModal}
      emptyStateText="No statistics found. Add your first one!"
    />
  );
}