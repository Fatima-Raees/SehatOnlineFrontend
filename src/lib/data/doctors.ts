export interface DoctorProps {
    id: string
    name: string
    specialty: string
    subSpecialty?: string
    experience: number
    rating: number
    reviews: number
    education: string
    availability: string
    fee: number
    image: string
  }
  
  export const doctors: DoctorProps[] = [
    {
      id: "dr-aisha-khan",
      name: "Dr. Aisha Khan",
      specialty: "Gynecology",
      subSpecialty: "Reproductive Endocrinology",
      experience: 12,
      rating: 4.8,
      reviews: 124,
      education: "MBBS, FCPS",
      availability: "Mon-Fri",
      fee: 2500,
      image: "/images/WomenDr1.jpeg",
    },
    {
      id: "dr-sara-ahmed",
      name: "Dr. Sara Ahmed",
      specialty: "Gynecology",
      subSpecialty: "Obstetrics",
      experience: 8,
      rating: 4.6,
      reviews: 98,
      education: "MBBS, MCPS",
      availability: "Tue-Sat",
      fee: 2000,
      image: "/images/d1.jpg",
    },
    {
      id: "dr-ahmed-ali",
      name: "Dr. Ahmed Ali",
      specialty: "Pediatrics",
      subSpecialty: "Neonatology",
      experience: 15,
      rating: 4.9,
      reviews: 156,
      education: "MBBS, FCPS, FRCPCH",
      availability: "Mon-Thu",
      fee: 3000,
      image: "/images/d2.jpeg",
    },
    {
      id: "dr-fatima-malik",
      name: "Dr. Fatima Malik",
      specialty: "Pediatrics",
      experience: 6,
      rating: 4.5,
      reviews: 78,
      education: "MBBS, DCH",
      availability: "Wed-Sun",
      fee: 1800,
      image: "/images/d4.jpeg",
    },
    {
      id: "dr-zainab-hassan",
      name: "Dr. Zainab Hassan",
      specialty: "Dermatology",
      subSpecialty: "Cosmetic Dermatology",
      experience: 10,
      rating: 4.7,
      reviews: 112,
      education: "MBBS, MD",
      availability: "Mon-Wed",
      fee: 2800,
      image: "/images/d3.jpeg",
    },
    {
      id: "dr-imran-sheikh",
      name: "Dr. Imran Sheikh",
      specialty: "Dermatology",
      experience: 7,
      rating: 4.4,
      reviews: 86,
      education: "MBBS, FCPS",
      availability: "Thu-Sun",
      fee: 2200,
      image: "/images/MenDr.jpeg",
    },
    {
      id: "dr-hassan-raza",
      name: "Dr. Hassan Raza",
      specialty: "Cardiology",
      subSpecialty: "Interventional Cardiology",
      experience: 18,
      rating: 4.9,
      reviews: 210,
      education: "MBBS, FCPS, FRCP",
      availability: "Mon-Fri",
      fee: 3500,
      image: "/images/d5.jpeg",
    },
    {
      id: "dr-ayesha-malik",
      name: "Dr. Ayesha Malik",
      specialty: "Cardiology",
      experience: 9,
      rating: 4.6,
      reviews: 94,
      education: "MBBS, FCPS",
      availability: "Tue-Sat",
      fee: 2700,
      image: "/images/d7.jpg",
    },
    {
      id: "dr-usman-khan",
      name: "Dr. Usman Khan",
      specialty: "Orthopedics",
      subSpecialty: "Sports Medicine",
      experience: 14,
      rating: 4.8,
      reviews: 132,
      education: "MBBS, MS",
      availability: "Mon-Thu",
      fee: 3200,
      image: "/images/d6.jpeg",
    },
    {
      id: "dr-saad-ahmed",
      name: "Dr. Saad Ahmed",
      specialty: "Orthopedics",
      experience: 11,
      rating: 4.7,
      reviews: 108,
      education: "MBBS, FCPS",
      availability: "Wed-Sun",
      fee: 2900,
      image: "/images/d10.jpg",
    },
    {
      id: "dr-nadia-shah",
      name: "Dr. Nadia Shah",
      specialty: "Neurology",
      subSpecialty: "Pediatric Neurology",
      experience: 16,
      rating: 4.9,
      reviews: 178,
      education: "MBBS, FCPS, FRCP",
      availability: "Mon-Fri",
      fee: 3800,
      image: "/images/d12.jpg",
    },
    {
      id: "dr-ali-hassan",
      name: "Dr. Ali Hassan",
      specialty: "Neurology",
      experience: 8,
      rating: 4.5,
      reviews: 92,
      education: "MBBS, FCPS",
      availability: "Tue-Sat",
      fee: 2600,
      image: "/images/d11.jpg",
    },
  ]
  
  export function getDoctorsBySpecialty(specialty: string): DoctorProps[] {
    if (specialty === "all") return doctors
    return doctors.filter((doctor) => doctor.specialty.toLowerCase() === specialty.toLowerCase())
  }
  
  export function getDoctorById(id: string): DoctorProps | undefined {
    return doctors.find((doctor) => doctor.id === id)
  }
  