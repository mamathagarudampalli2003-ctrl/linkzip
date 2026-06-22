import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfilePlanCard from "../components/profile/ProfilePlanCard";
import ProfileSecurity from "../components/profile/ProfileSecurity";
import ProfileApiKeys from "../components/profile/ProfileApiKeys";
import ProfileTeams from "../components/profile/ProfileTeams";
import ProfileAiSettings from "../components/profile/ProfileAiSettings";

export default function Profile() {

  // DEMO DATA

  const user = {
    name: "Mamatha",
    email: "mamatha@gmail.com",
    plan: "Pro",
    avatar:
      "https://i.pravatar.cc/150?img=5",
  };

  const stats = {
    totalLinks: 124,
    totalClicks: 8421,
    teams: 4,
    aiScore: 92,
  };

  return (

    <div className="space-y-6">

      {/* HEADER */}
      <ProfileHeader user={user} />

      {/* STATS */}
      <ProfileStats stats={stats} />

      {/* GRID */}
      <div className="grid lg:grid-cols-2 gap-6">

        <ProfilePlanCard />

        <ProfileSecurity />

        <ProfileApiKeys />

        <ProfileTeams />

      </div>

      {/* AI */}
      <ProfileAiSettings />

    </div>
  );
}