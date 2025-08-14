import PropertiesList from "../../components/lists/PropertiesList";
import AddPropertyModal from "../../components/modals/AddPropertyModal";
import EditPropertyModal from "../../components/modals/EditPropertyModal";
import ReusableDataPage from "../../reusecomponents/TpoSectionPage";

export default function PropertiesPage() {
  return (
    <ReusableDataPage
      collectionName="properties"
      pageTitle="All Properties"
      addButtonText="+ Add Property"
      ListComponent={PropertiesList}
      AddModalComponent={AddPropertyModal}
      EditModalComponent={EditPropertyModal}
      emptyStateText="No properties found"
    />
  );
}