import SharedDetailsPage from "../reusecomponents/SharedDetailsPage";

export default function ClientPage() {
  return (
    <SharedDetailsPage
      collectionName="clients"
      backLink="/clients-dashboard"
      backLinkText="Back to list"
      titleField="title"
    />
  );
}