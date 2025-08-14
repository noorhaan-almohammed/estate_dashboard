import SharedDetailsPage from "../reusecomponents/SharedDetailsPage";

export default function AchievementPage() {
  return (
    <SharedDetailsPage
      collectionName="achievements"
      backLink="/achievements-dashboard"
      backLinkText="Back to list"
      imageFields={["imageUrls"]}
    />
  );
}