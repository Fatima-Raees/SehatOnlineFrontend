export default function DoctorsSection() {
    const doctors = [
      {
        name: "Dr. Trent Boult",
        specialty: "Surgeon",
        specialtyColor: "bg-yellow-200 text-yellow-800",
        rating: 4.8,
        reviews: 272,
        patients: "2500+",
        location: "Mount Adora Hospital, CA",
        image: "/Profiles/landing-page/doctor-avatar.png", // Replace with actual image URL
        bgColor: "bg-yellow-100",
      },
      {
        name: "Dr. Tim Sothee",
        specialty: "Neurologist",
        specialtyColor: "bg-purple-200 text-purple-800",
        rating: 4.8,
        reviews: 272,
        patients: "2500+",
        location: "Mount Adora Hospital, CA",
        image: "/Profiles/landing-page/doctor-avatar02.png",
        bgColor: "bg-purple-100",
      },
      {
        name: "Dr. Matt Henry",
        specialty: "Dermatologist",
        specialtyColor: "bg-green-200 text-green-800",
        rating: 4.8,
        reviews: 272,
        patients: "2500+",
        location: "Mount Adora Hospital, CA",
        image: "/Profiles/landing-page/doctor-avatar03.png",
        bgColor: "bg-teal-100",
      },
    ];
  
    return (
      <div className="text-center py-12 bg-gray-50">
        <h2 className="text-3xl font-bold">Our great doctors</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2">
          World-class care for everyone. Our health system offers unmatched, expert health care.
        </p>
  
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <div className={`${doctor.bgColor} p-6 rounded-lg`}>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 mx-auto rounded-full"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{doctor.name}</h3>
              <span className={`px-3 py-1 text-sm font-medium rounded ${doctor.specialtyColor}`}>
                {doctor.specialty}
              </span>
              <div className="flex items-center justify-center mt-2 text-yellow-500">
                ⭐ {doctor.rating} <span className="text-gray-500 ml-1">({doctor.reviews})</span>
              </div>
              <p className="text-gray-700 mt-2">+{doctor.patients} Patients</p>
              <p className="text-gray-500 text-sm">{doctor.location}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  