import TeamNotificationBell
from "../teams/TeamNotificationBell";

export default function DashboardHeader({

 username,

 visitorCount,

 liveData,

 notifications,

 clearNotifications,

}) {

 return (

  <div className="mb-8">

  <div className="flex justify-between items-start">

    <h1
      className="
        text-2xl md:text-4xl
        font-bold
        text-white
      "
    >
      Welcome back, {username} 👋
      <p className="text-gray-400 mt-2">
 AI Powered Smart Link Management Platform
</p>
    </h1>

    <TeamNotificationBell
      notifications={notifications}
      clearNotifications={clearNotifications}
    />

  </div>

   <div
    className="
     mt-4
     flex
     items-center
     gap-3
    "
   >

    <div
     className="
      h-3
      w-3
      rounded-full
      bg-green-500
      animate-pulse
     "
    />

    <span
     className="
      text-green-400
      font-medium
     "
    >
     {visitorCount}
     visitors online
    </span>

   </div>

   {

    liveData && (

     <div
      className="
       mt-4
       max-w-3xl
       bg-green-500/10
       border
       border-green-500/20
       text-green-400
       px-4
       py-3
       rounded-xl
       font-medium
      "
     >

      🔥 Live Click →

      {" "}

      {liveData.shortId}

      {" "}

      now has

      {" "}

      {liveData.clicks}

      {" "}

      clicks

     </div>

    )

   }

  </div>

 );

}