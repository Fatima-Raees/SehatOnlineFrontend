import Image from "next/image";

export default function HeroDoctor() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center px-10 py-24 min-h-[50vh] bg-white gap-x-8">
      {/* Left Side - Doctor Image */}
      <div className="relative flex-shrink-0">
        <div className="w-80 h-80 lg:w-96 lg:h-96 bg-[#FFB703] rounded-xl flex items-center justify-center">
          <Image
            src="/Profiles/landing-page/doctor-avatar.png" // Replace with actual doctor image path
            alt="Doctor"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Doctor Info Card */}
        {/* <div className="absolute bottom-4 left-6 bg-white shadow-lg rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <Image
              src="/doctor-avatar.png" // Replace with an avatar or icon
              alt="Doctor Avatar"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Dr. Mitchell Starc</h4>
            <p className="text-xs text-gray-500">Chief Doctor of Nursing</p>
          </div>
        </div> */}
      </div>

      {/* Right Side - Text Content */}
      <div className="lg:w-1/2 max-w-xl">
        <h2 className="text-3xl font-bold text-gray-900 leading-tight">
          Proud to be one of the nation's best
        </h2>
        <p className="text-gray-600 mt-4 leading-relaxed">
          For 30 years in a row, U.S. News & World Report has recognized us as one of the best public hospitals in the Nation and #1 in Texas.
        </p>
        <p className="text-gray-600 mt-3 leading-relaxed">
          Our best is something we strive for each day, caring for our patients—not looking back at what we accomplished but towards what we can do tomorrow.
        </p>
        <button className="mt-6 px-6 py-3 bg-[#0077B6] text-white font-medium rounded-lg shadow-md hover:bg-[#005f8d] transition">
          Learn More
        </button>
      </div>
      </div>
  );
}
