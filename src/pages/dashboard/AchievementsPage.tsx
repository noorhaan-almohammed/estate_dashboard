
import AchievementsList from "../../components/lists/AchievementsList";
import AddAchievementModal from "../../components/modals/AddAchieveModal";
import EditAchievementModal from "../../components/modals/EditAchieveModal";
import ReusableDataPage from "../../reusecomponents/TpoSectionPage";


export default function AchievementsPage() {
  return (
    <ReusableDataPage
      collectionName="achievements"
      pageTitle="All Achievements"
      addButtonText="+ Add Achievement"
      ListComponent={AchievementsList}
      AddModalComponent={AddAchievementModal}
      EditModalComponent={EditAchievementModal}
    />
  );
}