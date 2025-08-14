import ClientsList from "../../components/lists/ClientsList";
import AddClientModal from "../../components/modals/AddClientModal";
import EditClientModal from "../../components/modals/EditClientModal";
import ReusableDataPage from "../../reusecomponents/TpoSectionPage";

export default function ClientsPage() {
  return (
    <ReusableDataPage
      collectionName="clients"
      pageTitle="All Clients"
      addButtonText="+ Add Client"
      ListComponent={ClientsList}
      AddModalComponent={AddClientModal}
      EditModalComponent={EditClientModal}
      emptyStateText="No clients found"
    />
  );
}