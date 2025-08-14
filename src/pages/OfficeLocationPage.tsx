import SharedDetailsPage from "../reusecomponents/SharedDetailsPage";

export default function OfficeLocationPage() {
  return (
    <SharedDetailsPage
      collectionName="officeLocations"
      backLink="/office-locations-dashboard"
      backLinkText="Back to list"
    />
  );
}