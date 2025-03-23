import { FaArrowRight } from "react-icons/fa";

const MedicalServices = () => {
  return (
    <section className="w-full flex flex-col items-center text-center py-12 px-4 mt-14">
      {/* Header Section */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Providing the best <br /> <span className="text-black">medical services</span>
      </h2>
      <p className="text-gray-600 mt-4 max-w-2xl">
      Easily find and consult with experienced healthcare professionals. Get personalized medical advice and the best treatment options for your needs.
      </p>

      {/* Services Cards */}
      <div className="mt-[50px] flex flex-wrap justify-center gap-8 mb-16">
        {/* Card 1: Find a Doctor */}
        <div className="group w-80 p-6 border rounded-lg shadow-sm hover:shadow-lg transition-all">
          <img src="/icons/doctor.svg" alt="Doctor" className="h-20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Find a Doctor</h3>
          <p className="text-gray-600 text-sm mt-2">
            World-class care for everyone. From the lab to the clinic.
          </p>
          <div className="mt-4 flex justify-center">
            <button className="p-3 bg-gray-200 rounded-full group-hover:bg-blue-600 transition">
              <FaArrowRight className="text-gray-600 group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Card 2: Find a Location */}
        <div className="group w-80 p-6 border rounded-lg shadow-md bg-blue-50 hover:shadow-lg transition-all">
          <img src="/icons/location.svg" alt="Location" className="h-20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Find a Location</h3>
          <p className="text-gray-600 text-sm mt-2">
          Find the nearest hospitals, clinics, and diagnostic centers with ease. Access top-notch healthcare wherever you are.
          </p>
          <div className="mt-4 flex justify-center">
            <button className="p-3 bg-blue-600 rounded-full">
              <FaArrowRight className="text-white" />
            </button>
          </div>
        </div>

        {/* Card 3: Book Appointment */}
        <div className="group w-80 p-6 border rounded-lg shadow-sm hover:shadow-lg transition-all ">
          <img src="/icons/calendar.svg" alt="Appointment" className="h-20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Book Appointment</h3>
          <p className="text-gray-600 text-sm mt-2">
          Avoid long waits and book appointments at your convenience. Get quick access to specialists and timely medical care.
          </p>
          <div className="mt-4 flex justify-center">
            <button className="p-3 bg-gray-200 rounded-full group-hover:bg-blue-600 transition">
              <FaArrowRight className="text-gray-600 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalServices;
