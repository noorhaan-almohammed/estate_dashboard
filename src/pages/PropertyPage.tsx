import SharedDetailsPage from "../reusecomponents/SharedDetailsPage";

export default function PropertyPage() {
  return (
    <SharedDetailsPage
      collectionName="properties"
      backLink="/properties-dashboard"
      backLinkText="Back to list"
      titleField="name"
      imageFields={["imageUrls"]}
    />
  );
}