/**
 * Placement statistics dataset for Bharti ITI over the last 3 academic years:
 * 2022-23, 2023-24, and 2024-25.
 * Designed to build trust with prospective students and parents.
 */

export const yearlyPlacementStats = [
  {
    year: "2022-23",
    graduated: 420,
    placed: 345,
    placementRate: 82.1,
    avgSalaryLPA: 2.52,
    highestSalaryLPA: 4.80,
    companiesVisited: 28,
    offersCount: 382,
    apprenticeships: 95,
  },
  {
    year: "2023-24",
    graduated: 480,
    placed: 412,
    placementRate: 85.8,
    avgSalaryLPA: 3.18,
    highestSalaryLPA: 5.80,
    companiesVisited: 38,
    offersCount: 468,
    apprenticeships: 122,
  },
  {
    year: "2024-25",
    graduated: 520,
    placed: 476,
    placementRate: 91.5,
    avgSalaryLPA: 3.85,
    highestSalaryLPA: 7.20,
    companiesVisited: 52,
    offersCount: 564,
    apprenticeships: 148,
  },
];

export const tradePlacementStats = [
  {
    trade: "Electrician",
    shortName: "Electrician",
    totalStudents: 145,
    placedStudents: 138,
    placementRate: 95.2,
    avgSalaryLPA: 3.9,
    highestSalaryLPA: 6.8,
    topRecruiter: "Tata Power",
  },
  {
    trade: "Fitter",
    shortName: "Fitter",
    totalStudents: 130,
    placedStudents: 122,
    placementRate: 93.8,
    avgSalaryLPA: 3.7,
    highestSalaryLPA: 7.2,
    topRecruiter: "L&T Heavy Civil",
  },
  {
    trade: "Welder (6G)",
    shortName: "Welder",
    totalStudents: 85,
    placedStudents: 78,
    placementRate: 91.8,
    avgSalaryLPA: 4.1,
    highestSalaryLPA: 6.5,
    topRecruiter: "L&T Hydrocarbon",
  },
  {
    trade: "COPA (Computer)",
    shortName: "COPA",
    totalStudents: 72,
    placedStudents: 64,
    placementRate: 88.9,
    avgSalaryLPA: 3.2,
    highestSalaryLPA: 4.8,
    topRecruiter: "State Bank Ops / TCS iON",
  },
  {
    trade: "Mechanic Motor Vehicle",
    shortName: "MMV",
    totalStudents: 58,
    placedStudents: 52,
    placementRate: 89.7,
    avgSalaryLPA: 3.5,
    highestSalaryLPA: 5.4,
    topRecruiter: "Maruti Suzuki",
  },
  {
    trade: "RAC (Refrig. & AC)",
    shortName: "RAC",
    totalStudents: 30,
    placedStudents: 26,
    placementRate: 86.7,
    avgSalaryLPA: 3.4,
    highestSalaryLPA: 4.6,
    topRecruiter: "Daikin India / Voltas",
  },
];

export const sectorDistribution = [
  { name: "Heavy Engineering & Manufacturing", shortName: "Manufacturing", value: 35, count: 167, color: "#1B2A5C" },
  { name: "Power & Renewable Energy", shortName: "Power & Energy", value: 23, count: 109, color: "#F28C28" },
  { name: "Automobile & EV Tech", shortName: "Automotive", value: 18, count: 86, color: "#3B82F6" },
  { name: "IT, Telecom & Automation", shortName: "IT & Services", value: 14, count: 67, color: "#10B981" },
  { name: "Railways & Govt PSUs", shortName: "Railways/PSU", value: 10, count: 47, color: "#8B5CF6" },
];

export const topRecruitingPartners = [
  { name: "Tata Power", sector: "Power Distribution", hires: "85+ Hired", badge: "A+ Partner" },
  { name: "Maruti Suzuki", sector: "Automobile Manufacturing", hires: "70+ Hired", badge: "Campus Drive" },
  { name: "Larsen & Toubro (L&T)", sector: "Heavy Engineering", hires: "65+ Hired", badge: "Highest CTC" },
  { name: "Indian Railways", sector: "Government Apprentice", hires: "120+ Placed", badge: "Govt. Scheme" },
  { name: "Havells India", sector: "Electrical Systems", hires: "45+ Hired", badge: "Top Recruiter" },
  { name: "Daikin India", sector: "HVAC & Thermal", hires: "30+ Hired", badge: "Specialist" },
  { name: "Hero MotoCorp", sector: "Two-Wheeler OEM", hires: "40+ Hired", badge: "Mass Recruiter" },
  { name: "BHEL & State Discoms", sector: "Public Sector", hires: "55+ Placed", badge: "PSU Partner" },
];

export const trustGuarantees = [
  {
    title: "100% Placement Support",
    subtitle: "Dedicated Training & Placement Officer (TPO)",
    description: "Personalized resume building, mock technical interviews, and minimum 3 on-campus interview opportunities per eligible candidate.",
  },
  {
    title: "NAPS & Apprenticeship Registration",
    subtitle: "Ministry of Skill Development & Entrepreneurship",
    description: "Direct enrollment in National Apprenticeship Promotion Scheme with monthly government-assured stipends starting from ₹9,000 to ₹14,000.",
  },
  {
    title: "National Trade Certificate (NTC)",
    subtitle: "Lifetime NCVT / DGT Validity",
    description: "Our graduates qualify directly for competitive technician vacancies in Indian Railways (RRB), DRDO, ISRO, and State Electricity Boards.",
  },
];
