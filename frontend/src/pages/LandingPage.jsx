import { useNavigate, Link } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0b1120] text-white min-h-screen">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-8 py-5 backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-400 cursor-pointer">
          LinkZip 🚀
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 border border-gray-500 rounded hover:bg-white/10 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="text-center py-28 px-6 relative">

        <p className="text-sm text-yellow-400 mb-3">
          🚧 Early Access — Be the first to try LinkZip
        </p>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Turn Every Click Into <br />
          <span className="text-blue-400">Smart Decisions ⚡</span>
          <span className="text-blue-400">AI Smart Link Routing Platform.</span>
        </h1>

        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Route users based on device, location, and time.
          Optimize links automatically with AI-powered insights.
        </p>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 px-8 py-3 rounded text-lg hover:scale-105 transition"
          >
            Get Early Access 🚀
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="border px-8 py-3 rounded text-lg hover:bg-white/10 transition"
          >
            Live Demo
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          No credit card required • Free to start
        </p>

        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl rounded-full top-10 left-1/2 -translate-x-1/2"></div>
      </div>

      <div className="py-12 px-6">

  <div
    className="
      max-w-6xl
      mx-auto
      grid
      md:grid-cols-4
      gap-6
    "
  >

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">

      <h3 className="text-3xl font-bold text-blue-400">
        AI
      </h3>

      <p className="text-gray-400 mt-2">
        Smart Routing
      </p>

    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">

      <h3 className="text-3xl font-bold text-green-400">
        Real-Time
      </h3>

      <p className="text-gray-400 mt-2">
        Analytics
      </p>

    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">

      <h3 className="text-3xl font-bold text-purple-400">
        Teams
      </h3>

      <p className="text-gray-400 mt-2">
        Collaboration
      </p>

    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">

      <h3 className="text-3xl font-bold text-orange-400">
        SaaS
      </h3>

      <p className="text-gray-400 mt-2">
        Production Ready
      </p>

    </div>

  </div>

</div>

      {/* PROBLEM → SOLUTION */}
      <div className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Traditional Links Are Dumb 😴
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto mb-10">
          One link for everyone. No personalization. No optimization.
          You're losing clicks without even knowing.
        </p>

        <h2 className="text-3xl font-bold text-blue-400">
          LinkZip Makes Every Click Smart ⚡
        </h2>
      </div>

      {/* DEMO */}
      <div className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          See LinkZip in Action 👀
        </h2>

        <p className="text-gray-400 mb-10">
          Smart routing based on real-time conditions
        </p>

        <div className="flex justify-center">
          <div className="relative group">

            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-30 group-hover:opacity-60 transition duration-500 rounded-2xl"></div>

            <img
              src="/dashboard-preview.png"
              alt="Dashboard Preview"
              className="relative rounded-2xl shadow-2xl border border-gray-700 group-hover:scale-105 transition duration-500"
            />

          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400 space-y-2">
          <p className="text-green-400">→ Mobile user → Mobile page</p>
          <p className="text-purple-400">→ Desktop user → Landing page</p>
          <p className="text-blue-400">→ Evening traffic → Offer page</p>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 px-10 py-16">
        {[
          {
            title: "🤖 AI Decision Engine",
            desc: "Automatically route users to best destination",
          },
          {
            title: "📊 Real-Time Analytics",
            desc: "Track clicks & performance instantly",
          },
          {
            title: "🌍 Geo Targeting",
            desc: "Redirect users by location",
          },
          {
            title: "⏰ Time Routing",
            desc: "Control links by time",
          },
          {
            title: "📱 Device Routing",
            desc: "Mobile & desktop optimization",
          },
          {
            title: "🔗 Smart Links",
            desc: "Custom & branded links",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 p-6 rounded-xl hover:scale-105 transition"
          >
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* USE CASES */}
      <div className="px-10 py-16 text-center">
        <h2 className="text-2xl font-bold mb-8">
          Built for Everyone 💡
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-gray-400">
          <div>📢 Marketers → Optimize campaigns</div>
          <div>💻 Developers → Smart routing</div>
          <div>🚀 Startups → Growth tracking</div>
          <div>🏢 Businesses → Geo targeting</div>
        </div>
      </div>

      {/* PRICING */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Simple Pricing 💰</h2>

        <div className="grid md:grid-cols-2 gap-8 px-10">

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="text-gray-400">
              Basic links + analytics
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Pro 🚀</h3>
            <p>
              Advanced routing + AI insights
            </p>
          </div>

        </div>
      </div>

      {/* FINAL CTA */}
      <div className="text-center py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <h2 className="text-3xl font-bold mb-4">
          Start Building Smart Links Today 🚀
        </h2>

        <button
          onClick={() => navigate("/signup")}
          className="bg-white text-black px-6 py-3 rounded font-semibold hover:scale-105 transition"
        >
          Get Early Access
        </button>
      </div>

      {/* FOOTER */}
      {/* FOOTER */}

<div
  className="
    border-t
    border-white/10
    py-10
    px-6
  "
>

  <div
    className="
      max-w-6xl
      mx-auto
      flex
      flex-col
      md:flex-row
      justify-between
      items-center
      gap-6
    "
  >

    <div>

      <h2 className="text-xl font-bold text-blue-400">
        LinkZip 🚀
      </h2>

      <p className="text-gray-400 mt-2">
        AI Smart Link Routing Platform
      </p>

    </div>

    <div
      className="
        flex
        gap-6
      "
    >

      <Link
        to="/privacy"
        className="text-gray-400 hover:text-white"
      >
        Privacy Policy
      </Link>

      <Link
        to="/terms"
        className="text-gray-400 hover:text-white"
      >
        Terms of Service
      </Link>

      <Link
        to="/contact"
        className="text-gray-400 hover:text-white"
      >
        Contact
      </Link>

    </div>

  </div>

  <p
    className="
      text-center
      text-gray-500
      mt-8
      text-sm
    "
  >
    © 2026 LinkZip. All rights reserved.
  </p>

</div>
</div>
  )};