import { coursesData } from '../data/courses.js';
import { noticesData } from '../data/notices.js';
import { galleryData } from '../data/gallery.js';
import { facultyData } from '../data/faculty.js';
import { testimonialsData } from '../data/testimonials.js';
import { filterNotices, paginate } from '../utils/pure_logic.js';

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || '';

// Helper simulated delay
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch all available technical trades
 */
export async function getCourses() {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/courses`);
    if (!res.ok) throw new Error("Failed to fetch courses from server");
    return res.json();
  }
  await delay(150);
  return [...coursesData];
}

/**
 * Fetch a single course by its URL slug
 */
export async function getCourseBySlug(slug) {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/courses/${encodeURIComponent(slug)}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch course: ${slug}`);
    }
    return res.json();
  }
  await delay(120);
  const found = coursesData.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
  return found || null;
}

/**
 * Fetch notices with category, search query, and pagination
 */
export async function getNotices({ category = "All", search = "", page = 1, limit = 8 } = {}) {
  if (API_BASE_URL) {
    const params = new URLSearchParams({ category, search, page: String(page), limit: String(limit) });
    const res = await fetch(`${API_BASE_URL}/api/notices?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch notices from server");
    return res.json();
  }
  await delay(150);
  const filtered = filterNotices(noticesData, { category, search });
  return paginate(filtered, page, limit);
}

/**
 * Fetch gallery images, optionally filtered by category
 */
export async function getGallery(category = "All") {
  if (API_BASE_URL) {
    const params = category !== "All" ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${API_BASE_URL}/api/gallery${params}`);
    if (!res.ok) throw new Error("Failed to fetch gallery from server");
    return res.json();
  }
  await delay(140);
  if (!category || category === "All") {
    return [...galleryData];
  }
  return galleryData.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Fetch faculty members
 */
export async function getFaculty() {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/faculty`);
    if (!res.ok) throw new Error("Failed to fetch faculty from server");
    return res.json();
  }
  await delay(120);
  return [...facultyData];
}

/**
 * Fetch student / alumni testimonials
 */
export async function getTestimonials() {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/testimonials`);
    if (!res.ok) throw new Error("Failed to fetch testimonials from server");
    return res.json();
  }
  await delay(120);
  return [...testimonialsData];
}

/**
 * Submit an admission enquiry or contact message
 */
export async function submitEnquiry(data) {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit enquiry to server");
    return res.json();
  }
  
  // Simulated local response with delay
  await delay(600);
  return {
    success: true,
    message: "Thank you for contacting Bharti ITI! Your enquiry has been received. Our admission counselor will contact you within 24 hours.",
    referenceId: `BHT-${Date.now().toString().slice(-6)}`,
    data,
  };
}
