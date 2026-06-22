export default function PageLoader() {

  return (

    <div className="h-screen w-full flex items-center justify-center bg-black">

      <div className="space-y-4 text-center">

        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <p className="text-white text-lg">
          Loading LinkZip...
        </p>

      </div>

    </div>
  );
}