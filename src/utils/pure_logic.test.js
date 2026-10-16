import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePhone,
  validateEmail,
  validateEnquiryForm,
  validateContactForm,
  filterCourses,
  filterNotices,
  paginate,
  isRecentNotice,
  calculatePlacementSummary,
  formatLPA,
  getTopPerformingTrade
} from './pure_logic.js';

test('validatePhone: checks valid 10-digit Indian phone numbers', () => {
  assert.equal(validatePhone('9876543210'), true);
  assert.equal(validatePhone('+91 9876543210'), true);
  assert.equal(validatePhone('6123456789'), true);
  assert.equal(validatePhone('7890123456'), true);
  assert.equal(validatePhone('8901234567'), true);
  
  // Invalid numbers
  assert.equal(validatePhone('1234567890'), false); // starts with 1
  assert.equal(validatePhone('98765'), false); // too short
  assert.equal(validatePhone('987654321000'), false); // too long
  assert.equal(validatePhone(''), false);
  assert.equal(validatePhone(null), false);
});

test('validateEmail: checks email format', () => {
  assert.equal(validateEmail('student@bhartiiti.in'), true);
  assert.equal(validateEmail('info.test+2@gmail.com'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail('@domain.com'), false);
  assert.equal(validateEmail('user@'), false);
  assert.equal(validateEmail(''), false);
});

test('validateEnquiryForm: validates complete form object', () => {
  const validForm = {
    name: 'Rahul Sharma',
    phone: '9876543210',
    email: 'rahul@example.com',
    trade: 'electrician',
    message: 'I want to know about admission fees and hostel facility.'
  };

  const res = validateEnquiryForm(validForm);
  assert.equal(res.isValid, true);
  assert.equal(Object.keys(res.errors).length, 0);

  const invalidForm = {
    name: '',
    phone: '1234',
    email: 'bad',
    trade: '',
    message: 'hi'
  };

  const badRes = validateEnquiryForm(invalidForm);
  assert.equal(badRes.isValid, false);
  assert.ok(badRes.errors.name);
  assert.ok(badRes.errors.phone);
  assert.ok(badRes.errors.email);
  assert.ok(badRes.errors.trade);
  assert.ok(badRes.errors.message);
});

test('validateContactForm: validates name, phone, trade interest, and message', () => {
  // Valid case with all 4 required fields
  const validContact = {
    name: 'Suresh Kumar',
    phone: '9876543210',
    trade: 'Fitter',
    message: 'I would like more information on admission eligibility.'
  };
  const validRes = validateContactForm(validContact);
  assert.equal(validRes.isValid, true);
  assert.equal(Object.keys(validRes.errors).length, 0);

  // Missing / invalid all 4 fields
  const emptyRes = validateContactForm({});
  assert.equal(emptyRes.isValid, false);
  assert.equal(Boolean(emptyRes.errors.name), true);
  assert.equal(Boolean(emptyRes.errors.phone), true);
  assert.equal(Boolean(emptyRes.errors.trade), true);
  assert.equal(Boolean(emptyRes.errors.message), true);

  // Invalid phone numbers
  assert.equal(validateContactForm({ name: 'Vikram', phone: '12345', trade: 'Electrician', message: 'Hello query' }).isValid, false);

  // Short message
  assert.equal(validateContactForm({ name: 'Vikram', phone: '9876543210', trade: 'Electrician', message: 'hi' }).isValid, false);

  // Optional valid email does not error
  const withValidEmail = validateContactForm({
    name: 'Vikram',
    phone: '9876543210',
    trade: 'Electrician',
    message: 'Hello query here',
    email: 'vikram@example.com'
  });
  assert.equal(withValidEmail.isValid, true);

  // Optional invalid email flags error
  const withBadEmail = validateContactForm({
    name: 'Vikram',
    phone: '9876543210',
    trade: 'Electrician',
    message: 'Hello query here',
    email: 'not-an-email'
  });
  assert.equal(withBadEmail.isValid, false);
  assert.ok(withBadEmail.errors.email);
});

test('filterCourses: handles search, duration and sector', () => {
  const dummyCourses = [
    { slug: 'electrician', name: 'Electrician', duration: '2 Years', sector: 'Engineering', overview: 'Electrical circuits' },
    { slug: 'copa', name: 'COPA', duration: '1 Year', sector: 'Non-Engineering', overview: 'Computer operator programming' },
    { slug: 'welder', name: 'Welder', duration: '1 Year', sector: 'Engineering', overview: 'Arc welding techniques' },
  ];

  assert.equal(filterCourses(dummyCourses, { search: 'elec' }).length, 1);
  assert.equal(filterCourses(dummyCourses, { duration: '1 Year' }).length, 2);
  assert.equal(filterCourses(dummyCourses, { sector: 'Non-Engineering' }).length, 1);
  assert.equal(filterCourses(dummyCourses, { sector: 'Engineering', duration: '1 Year' }).length, 1);
});

test('filterNotices and paginate work correctly', () => {
  const notices = [
    { id: 1, title: 'Admission Open 2025', category: 'Admission', description: 'Apply online' },
    { id: 2, title: 'Diwali Holiday Notice', category: 'Holiday', description: 'Institute closed' },
    { id: 3, title: 'Semester Exam Date Sheet', category: 'Examination', description: 'NCVT AITT 2025' },
    { id: 4, title: 'National Scholarship Portal', category: 'Scholarship', description: 'Apply for post matric' },
  ];

  const filtered = filterNotices(notices, { category: 'Admission' });
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].title, 'Admission Open 2025');

  const paged = paginate(notices, 1, 2);
  assert.equal(paged.items.length, 2);
  assert.equal(paged.totalPages, 2);
  assert.equal(paged.hasNextPage, true);
  assert.equal(paged.hasPrevPage, false);
});

test('calculatePlacementSummary: computes aggregated 3-year stats correctly', () => {
  const sampleYears = [
    { year: "2022-23", graduated: 100, placed: 80, placementRate: 80.0, avgSalaryLPA: 2.5, highestSalaryLPA: 5.0, companiesVisited: 20, apprenticeships: 40 },
    { year: "2023-24", graduated: 200, placed: 180, placementRate: 90.0, avgSalaryLPA: 3.5, highestSalaryLPA: 7.0, companiesVisited: 30, apprenticeships: 60 }
  ];

  const summary = calculatePlacementSummary(sampleYears);
  assert.equal(summary.totalGraduated, 300);
  assert.equal(summary.totalPlaced, 260);
  assert.equal(summary.aggregateRate, 86.7);
  assert.equal(summary.latestRate, 90.0);
  assert.equal(summary.highestSalary, 7.0);
  assert.equal(summary.growthRate, 10.0);
  assert.equal(summary.totalCompanies, 50);
  assert.equal(summary.totalApprenticeships, 100);

  // Edge case: empty list
  const emptySummary = calculatePlacementSummary([]);
  assert.equal(emptySummary.totalGraduated, 0);
  assert.equal(emptySummary.totalPlaced, 0);
  assert.equal(emptySummary.aggregateRate, 0);
});

test('formatLPA: formats number to Indian Lakhs Per Annum string', () => {
  assert.equal(formatLPA(3.85), "₹3.85 LPA");
  assert.equal(formatLPA(7.2), "₹7.20 LPA");
  assert.equal(formatLPA(null), "₹0.00 LPA");
});

test('getTopPerformingTrade: identifies trade with highest placement rate', () => {
  const trades = [
    { trade: "Electrician", placementRate: 95.2 },
    { trade: "COPA", placementRate: 88.9 },
    { trade: "Fitter", placementRate: 93.8 },
  ];
  const top = getTopPerformingTrade(trades);
  assert.equal(top.trade, "Electrician");
  assert.equal(top.placementRate, 95.2);
});

