export const PLAN_LIMITS = {

 free: {
  links: 25,
  teams: 1,
  teamMembers: 5,
  customDomains: 0,
  monthlyClicks: 5000,
  qrCodes: 25,
  analyticsRetentionDays: 30,
  apiRequestsPerMonth: 0,
  apiAccess: false,
  aiFeatures: false,
  abTesting: false,
  customBranding: false,
  exportReports: false,
 },

 pro: {
  links: 500,
  teams: 10,
  teamMembers: 50,
  customDomains: 5,
  monthlyClicks: 100000,
  qrCodes: 500,
  analyticsRetentionDays: 365,
  apiRequestsPerMonth: 100000,
  apiAccess: true,
  aiFeatures: true,
  abTesting: true,
  customBranding: true,
  exportReports: true,
 },

 business: {
  links: Infinity,
  teams: Infinity,
  teamMembers: Infinity,
  customDomains: Infinity,
  monthlyClicks: Infinity,
  qrCodes: Infinity,
  analyticsRetentionDays: Infinity,
  apiRequestsPerMonth: Infinity,
  apiAccess: true,
  aiFeatures: true,
  abTesting: true,
  customBranding: true,
  exportReports: true,
 },

};

export const PLAN_PRICES = {
 free: 0,
 pro: 199,
 business: 999,
};