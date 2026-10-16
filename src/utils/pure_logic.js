/**
 * Pure helper and logic functions for Bharti ITI website
 */

export function validatePhone(phone) {
  if (!phone) return false;
  // Clean spaces, hyphens, and +91 prefix if user typed it
  const cleaned = phone.toString().replace(/[\s\-+]/g, '');
  const digits = cleaned.startsWith('91') && cleaned.length === 12 
    ? cleaned.slice(2) 
    : cleaned;
  // Indian mobile numbers start with 6, 7, 8, or 9 and have 10 digits
  return /^[6-9]\d{9}$/.test(digits);
}

export function validateEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validateEnquiryForm(form) {
  const errors = {};

  if (!form.name || form.name.trim().length < 2) {
    errors.name = "Full name is required (minimum 2 characters)";
  }

  if (!form.phone || !validatePhone(form.phone)) {
    errors.phone = "Enter a valid 10-digit Indian mobile number (starts with 6-9)";
  }

  if (!form.email || !validateEmail(form.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!form.trade || form.trade === "") {
    errors.trade = "Please select a trade of interest";
  }

  if (!form.message || form.message.trim().length < 5) {
    errors.message = "Message or query is required (minimum 5 characters)";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateContactForm(form) {
  const errors = {};

  if (!form || !form.name || form.name.trim().length < 2) {
    errors.name = "Full name is required (minimum 2 characters)";
  }

  if (!form || !form.phone || !validatePhone(form.phone)) {
    errors.phone = "Enter a valid 10-digit Indian mobile number (starts with 6-9)";
  }

  if (!form || !form.trade || form.trade.trim() === "") {
    errors.trade = "Please select a trade of interest";
  }

  if (!form || !form.message || form.message.trim().length < 5) {
    errors.message = "Message or query is required (minimum 5 characters)";
  }

  // If email is provided, validate format
  if (form && form.email && form.email.trim() !== "" && !validateEmail(form.email)) {
    errors.email = "Enter a valid email address";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function isRecentNotice(dateString, maxDays = 7) {
  if (!dateString) return false;
  const noticeDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - noticeDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= maxDays;
}

export function filterCourses(courses = [], { search = "", duration = "All", sector = "All" } = {}) {
  const q = search.trim().toLowerCase();

  return courses.filter((course) => {
    // Search match
    const matchesSearch = !q || 
      course.name.toLowerCase().includes(q) ||
      course.slug.toLowerCase().includes(q) ||
      course.overview.toLowerCase().includes(q) ||
      (course.careerScope && course.careerScope.some(scope => scope.toLowerCase().includes(q)));

    // Duration match
    const matchesDuration = duration === "All" || course.duration.toLowerCase().includes(duration.toLowerCase());

    // Sector match
    const matchesSector = sector === "All" || course.sector.toLowerCase() === sector.toLowerCase();

    return matchesSearch && matchesDuration && matchesSector;
  });
}

export function filterNotices(notices = [], { search = "", category = "All" } = {}) {
  const q = search.trim().toLowerCase();

  return notices.filter((notice) => {
    const matchesCategory = category === "All" || notice.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = !q ||
      notice.title.toLowerCase().includes(q) ||
      (notice.description && notice.description.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });
}

export function paginate(items = [], page = 1, pageSize = 8) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = items.slice(startIndex, startIndex + pageSize);

  return {
    items: pageItems,
    currentPage,
    totalPages,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

/**
 * Calculates aggregated placement statistics from 3-year trend data
 */
export function calculatePlacementSummary(yearlyStats = []) {
  if (!yearlyStats || yearlyStats.length === 0) {
    return {
      totalGraduated: 0,
      totalPlaced: 0,
      aggregateRate: 0,
      latestRate: 0,
      highestSalary: 0,
      averageSalary: 0,
      growthRate: 0,
      totalCompanies: 0,
      totalApprenticeships: 0,
    };
  }

  const totalGraduated = yearlyStats.reduce((sum, s) => sum + (s.graduated || 0), 0);
  const totalPlaced = yearlyStats.reduce((sum, s) => sum + (s.placed || 0), 0);
  const totalCompanies = yearlyStats.reduce((sum, s) => sum + (s.companiesVisited || 0), 0);
  const totalApprenticeships = yearlyStats.reduce((sum, s) => sum + (s.apprenticeships || 0), 0);

  const aggregateRate = totalGraduated > 0 
    ? Number(((totalPlaced / totalGraduated) * 100).toFixed(1)) 
    : 0;

  const highestSalary = Math.max(...yearlyStats.map(s => s.highestSalaryLPA || 0));

  const totalAvgWeight = yearlyStats.reduce((sum, s) => sum + ((s.avgSalaryLPA || 0) * (s.placed || 1)), 0);
  const averageSalary = totalPlaced > 0 
    ? Number((totalAvgWeight / totalPlaced).toFixed(2)) 
    : 0;

  const earliest = yearlyStats[0];
  const latest = yearlyStats[yearlyStats.length - 1];
  const growthRate = earliest && latest && earliest.placementRate 
    ? Number((latest.placementRate - earliest.placementRate).toFixed(1)) 
    : 0;

  return {
    totalGraduated,
    totalPlaced,
    aggregateRate,
    latestRate: latest ? latest.placementRate : 0,
    highestSalary,
    averageSalary,
    growthRate,
    totalCompanies,
    totalApprenticeships,
  };
}

export function formatLPA(val) {
  if (val === undefined || val === null || isNaN(val)) return "₹0.00 LPA";
  return `₹${Number(val).toFixed(2)} LPA`;
}

export function getTopPerformingTrade(tradeStats = []) {
  if (!tradeStats || tradeStats.length === 0) return null;
  return [...tradeStats].sort((a, b) => (b.placementRate || 0) - (a.placementRate || 0))[0];
}

