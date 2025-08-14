import OfficeLocationsList from "../../components/lists/OfficeLocationsList";
import AddOfficeLocationModal from "../../components/modals/AddOfficeLocationModal";
import EditOfficeLocationModal from "../../components/modals/EditOfficeLocationModal";
import ReusableDataPage from "../../reusecomponents/TpoSectionPage";

export default function OfficeLocationsPage() {
  

  

  return (
    <ReusableDataPage
         collectionName="officeLocations"
         pageTitle="Office Locations"
         addButtonText="+ Add Location"
         ListComponent={OfficeLocationsList}
         AddModalComponent={AddOfficeLocationModal}
         EditModalComponent={EditOfficeLocationModal}
       />
  );
}
