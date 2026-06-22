import { useEffect, useState, useMemo } from "react";

import { useNavigate } from "react-router-dom";

// ================= LAYOUT =================

import DashboardLayout from "../components/layout/DashboardLayout";

import DashboardHeader from "../components/dashboard/DashboardHeader";

// ================= COMPONENTS =================

import StatsCards from "../components/analytics/StatsCards";

import AnalyticsOverview from "../components/dashboard/AnalyticsOverview";

import AiInsightsPanel from "../components/analytics/AiInsightsPanel";

import AiInsightsCard from "../components/dashboard/AiInsightsCard";

import BulkUpload from "../components/dashboard/BulkUpload";

import ExportAnalyticsButton from "../components/analytics/ExportAnalyticsButton";

// ================= SECTIONS =================

import ShortenerSection from "../sections/dashboard/ShortenerSection";

import AnalyticsSection from "../sections/dashboard/AnalyticsSection";

import TeamsSection from "../sections/dashboard/TeamsSection";

import ProfileSection from "../sections/dashboard/ProfileSection";

import BillingSection from "../sections/dashboard/BillingSection";

// ================= HOOKS =================

import useUrls from "../hooks/useUrls";

import useTeams from "../hooks/useTeams";

import useAI from "../hooks/useAI";

import useAnalytics from "../hooks/useAnalytics";

import useRealtimeAnalytics from "../hooks/useRealtimeAnalytics";

import useAiInsights from "../hooks/useAiInsights";

import socket from "../socket/socket";


// ================= HELPERS =================

import {

  getAverageClicks,

  getChartData,

  getLiveVisitors,

  getLowPerformanceLink,

  getTopLink,

  getTotalClicks,

  getTotalLinks,

  generateAiSuggestion,

} from "../utils/analyticsHelpers";

export default function Dashboard() {

  const navigate =
    useNavigate();

  // ================= USER =================

  const [username, setUsername] =
    useState("");

  // ================= ACTIVE TAB =================

  const [activeTab, setActiveTab] =
    useState("shortener");

  // ================= URL STATES =================

  const [url, setUrl] =
    useState("");

  const [customId, setCustomId] =
    useState("");

  const [mobileUrl, setMobileUrl] =
    useState("");

  const [desktopUrl, setDesktopUrl] =
    useState("");

  const [morningUrl, setMorningUrl] =
    useState("");

  const [eveningUrl, setEveningUrl] =
    useState("");

  const [indiaUrl, setIndiaUrl] =
    useState("");

  const [usUrl, setUsUrl] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [aiRules, setAiRules] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [sortType, setSortType] =
    useState("latest");

  const [customDomain, setCustomDomain] =
    useState("");

  const [password, setPassword] =
  useState("");

  const [variantAUrl, setVariantAUrl] = useState("");
  const [variantBUrl, setVariantBUrl] = useState("");
  const [
  notifications,
  setNotifications
] = useState([]);

const clearNotifications =
() => {

  setNotifications([]);

};

  // ================= TEAM STATES =================

  const [teamId, setTeamId] =
    useState("");
  
  const [currentRole, setCurrentRole] =
  useState("");

    useEffect(() => {

  console.log(
    "SELECTED TEAM ID:",
    teamId
  );

}, [teamId]);

useEffect(() => {

  if (!teamId)
    return;

  socket.emit(
    "join-team",
    teamId
  );

}, [teamId]);

useEffect(() => {

  socket.on(
  "team-notification",
  async (data) => {

    setNotifications(
      (prev) => [

        {
          id: Date.now(),
          message:
            data.message,
        },

        ...prev,

      ]
    );

    if (teamId) {

      fetchTeams();

      fetchTeamLinks();

    }

  }
);

  return () => {

    socket.off(
      "team-notification"
    );

  };

}, []);

  const [newTeamName, setNewTeamName] =
    useState("");

  const [memberEmail, setMemberEmail] =
    useState("");

  const [teamTab, setTeamTab] =
    useState("members");

  // ================= URL HOOK =================

  const {

    urls,

    loading,

    fetchUrls,

    createShortUrl,

    deleteUrl,

    toggleUrlStatus,

  } = useUrls();

  // ================= TEAM HOOK =================

  const {
  teams,
  teamLinks,

  invitations,

  activities,
  fetchActivities,

  fetchTeams,
  fetchTeamLinks,

  handleCreateTeam,
  handleAddMember,
  handleInviteMember,
  handleRemoveMember,
  handleChangeRole,
  handleResendInvite,
  handleCancelInvite,

} = useTeams(teamId);

  // ================= AI HOOK =================

  const {

    aiData,

    fetchAiInsights,

  } = useAI();


  // ================= ANALYTICS HOOK =================

  const {

    analytics,

    liveData,

    visitorCount,

    loading: analyticsLoading,

    refreshAnalytics,

  } = useAnalytics();

  const {
  data: insightsData,
  loading: insightsLoading,
} = useAiInsights();

  const browserStats =
  analytics?.browserStats || {};

const osStats =
  analytics?.osStats || {};

  // ================= INITIAL LOAD =================

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    let user = null;

try {

  user = JSON.parse(
    localStorage.getItem("user")
  );

} catch {

  user = null;

}

    if (!token) {

      navigate("/login");

      return;
    }

    if (user) {

      setUsername(

        user.username ||

        user.name ||

        "User"
      );
    }

    fetchUrls();

    fetchTeams();

    fetchAiInsights();

  }, []);

  // ================= FILTERED URLS =================

  // Show ONLY personal links
  const filteredUrls =
useMemo(() => {

 return urls

 .filter(
  item =>
   !item.team
 )

 .filter(

  item =>

   item.originalUrl
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    )

   ||

   item.shortId
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    )

 )

 .sort(

  (a,b) => {

   if (
    sortType ===
    "clicks"
   ) {

    return (
      (b.clicks || 0)
      -
      (a.clicks || 0)
    );

   }

   return (
    new Date(
      b.createdAt
    )
    -
    new Date(
      a.createdAt
    )
   );

  }

 );

}, [

 urls,

 search,

 sortType,

]);

  // ================= ANALYTICS =================

  const totalLinks =

    analytics?.totalLinks ||

    getTotalLinks(urls);

  const totalClicks =

    analytics?.totalClicks ||

    getTotalClicks(urls);

  const topLink =

    analytics?.topLink ||

    getTopLink(urls);

  const lowLink =

    analytics?.lowLink ||

    getLowPerformanceLink(urls);

  const avgClicks =

    analytics?.avgClicks ||

    getAverageClicks(urls);

  const liveVisitors =

    analytics?.liveVisitors ||

    getLiveVisitors(urls);

  const chartData =

    analytics?.chartData ||

    getChartData(urls);

  const aiSuggestion =

    analytics?.aiSuggestion ||

    generateAiSuggestion({

      totalClicks,

      avgClicks,

      topLink,
    });

    const topCountries = 
     analytics?.topCountries || [];

  // ================= UI =================

  return (

    <DashboardLayout

      activeTab={activeTab}

      setActiveTab={
        setActiveTab
      }

    >

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <DashboardHeader

 username={username}

 visitorCount={visitorCount}

 liveData={liveData}

 notifications={notifications}

 clearNotifications={
  clearNotifications
 }

/>
</div>
      {/* ================= SHORTENER ================= */}

      {activeTab ===
        "shortener" && (

        <div className="
          space-y-8
        ">

          {/* ================= STATS ================= */}

          <StatsCards

            totalLinks={
              totalLinks
            }

            totalClicks={
              totalClicks
            }

            avgClicks={
              avgClicks
            }

            liveVisitors={
              liveVisitors
            }

          />

          {/* ================= OVERVIEW ================= */}

          <div className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-6
          ">

            <div className="
              xl:col-span-2
            ">

              <AnalyticsOverview

                chartData={
                  chartData
                }

                totalClicks={
                  totalClicks
                }

                topLink={
                  topLink
                }

              />


            </div>


            <div>

              <AiInsightsPanel

                topLink={
                  topLink
                }

                lowLink={
                  lowLink
                }

                avgClicks={
                  avgClicks
                }

                totalClicks={
                  totalClicks
                }

                aiSuggestion={
                  aiSuggestion
                }

              />
              <AiInsightsCard
  data={insightsData}
/>

            </div>

          </div>

          {/* ================= SHORTENER ================= */}

          <ShortenerSection

            url={url}
            setUrl={setUrl}

            customId={customId}
            setCustomId={setCustomId}

            mobileUrl={mobileUrl}
            setMobileUrl={setMobileUrl}

            desktopUrl={desktopUrl}
            setDesktopUrl={setDesktopUrl}

            morningUrl={morningUrl}
            setMorningUrl={setMorningUrl}

            eveningUrl={eveningUrl}
            setEveningUrl={setEveningUrl}

            indiaUrl={indiaUrl}
            setIndiaUrl={setIndiaUrl}

            usUrl={usUrl}
            setUsUrl={setUsUrl}

            expiry={expiry}
            setExpiry={setExpiry}

            aiRules={aiRules}
            setAiRules={setAiRules}

            urls={filteredUrls}

            loading={loading}

            search={search}
            setSearch={setSearch}

            sortType={sortType}
            setSortType={setSortType}

            teamId={teamId}
            teams={teams}
            setTeamId={setTeamId}

            createShortUrl={createShortUrl}

            fetchUrls={fetchUrls}

            deleteUrl={deleteUrl}

            toggleUrlStatus={toggleUrlStatus}

            customDomain={customDomain}
            setCustomDomain={setCustomDomain}

            password={password}
            setPassword={setPassword}

            variantAUrl={variantAUrl}
            setVariantAUrl={setVariantAUrl}
            variantBUrl={variantBUrl}
            setVariantBUrl={setVariantBUrl}
          />

          <BulkUpload
  createShortUrl={
    createShortUrl
  }
/>

        </div>
      )}

      {/* ================= ANALYTICS ================= */}

      {activeTab ===
  "analytics" && (

  <div className="space-y-6">
    <div className="mb-6">

  <ExportAnalyticsButton
    urls={urls}
  />

</div>

    <AnalyticsSection
  totalLinks={totalLinks}
  totalClicks={totalClicks}
  avgClicks={avgClicks}
  topLink={topLink}
  lowLink={lowLink}
  liveVisitors={liveVisitors}
  chartData={chartData}
  aiSuggestion={aiSuggestion}

  browserStats={
    analytics?.browserStats || {}
  }

  osStats={
    analytics?.osStats || {}
  }

  analytics={analytics}
  urls={urls}
/>

    <div
      className="
        bg-[#111827]
        rounded-2xl
        p-6
        border
        border-white/10
      "
    >

      <h2
        className="
          text-xl
          font-bold
          text-white
          mb-4
        "
      >
        Top Countries
      </h2>

      {topCountries.map(
        ([country, count]) => (
          <div
            key={country}
            className="
              flex
              justify-between
              py-2
            "
          >

            <span className="text-gray-300">
              {country}
            </span>

            <span className="text-cyan-400">
              {count}
            </span>

          </div>
        )
      )}

    </div>

  </div>
)}

      {/* ================= TEAMS ================= */}

      {activeTab ===
        "teams" && (

  <TeamsSection
  teams={teams}
  teamId={teamId}
  setTeamId={setTeamId}
  currentRole={currentRole}

  teamLinks={teamLinks}

  invitations={invitations}

  newTeamName={newTeamName}
  setNewTeamName={setNewTeamName}

  memberEmail={memberEmail}
  setMemberEmail={setMemberEmail}
  

  handleCreateTeam={handleCreateTeam}
  handleAddMember={handleAddMember}
  handleInviteMember={handleInviteMember}
  handleRemoveMember={handleRemoveMember}
  handleChangeRole={handleChangeRole}
  handleResendInvite={handleResendInvite}
  handleCancelInvite={handleCancelInvite}

  teamTab={teamTab}
  setTeamTab={setTeamTab}
  activities={activities}
  fetchActivities={fetchActivities}
/>      
      )}

      {activeTab === "billing" && (
  <BillingSection />
)}

      {/* ================= PROFILE ================= */}

      {activeTab ===
        "profile" && (

        <ProfileSection

          username={username}

          totalLinks={totalLinks}

          totalClicks={totalClicks}

        />
      )}

    </DashboardLayout>
  );
}