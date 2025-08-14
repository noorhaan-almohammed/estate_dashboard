import SharedDetailsPage from "../reusecomponents/SharedDetailsPage";

export default function StatPage() {
  return (
    <SharedDetailsPage
      collectionName="stats"
      backLink="/stats-dashboard"
      backLinkText="Back to Statistics"
    />
  );
}