import SharedDetailsPage from "../reusecomponents/SharedDetailsPage";

export default function MemberTeamPage() {
  return (
    <SharedDetailsPage
      collectionName="team"
      backLink="/team-dashboard"
      backLinkText="Back to list"
      titleField="name"
    />
  );
}