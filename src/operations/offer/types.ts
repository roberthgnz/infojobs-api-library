export type PD = {
  id: number;
  value: string;
};

export type Author = {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
  corporateResponsive: boolean;
  showCorporativeHeader: boolean;
};

export type SkillItem = {
  skill: string;
};

export type ReviewSummary = {
  profileId: string;
  profileName: string;
  rating: number;
  totalReviews: number;
  worstRating: number;
  bestRanking: number;
};

export type Pay = {
  amount: number;
  amountId: number;
  amountValue: string;
  periodId: number;
  periodValue: string;
};

export interface Upselling {
  highlightColor: boolean;
  highlightUrgent: boolean;
  highlightHomeMonth: boolean;
  highlightHomeWeek: boolean;
  highlightSubcategory: boolean;
  highlightLogo: boolean;
  highlightStandingOffer: boolean;
}

export type Profile = {
  id: string;
  name: string;
  description: string;
  zipCode: string;
  city: string;
  province: DictionaryItem;
  web: string;
  numberWorkers: number;
  logoUrl: string;
  corporateWebsiteUrl: string;
  websiteUrl: string;
  hidden: boolean;
  country: DictionaryItem;
  typeIndustry: DictionaryItem;
  corporateResponsive: boolean;
  showCorporativeHeader: boolean;
  clientId: number;
  reviewSummary: ReviewSummary;
};

export type Facet = {
  key: string;
  count: number;
  value: string;
};

export type Facets = {
  key: string;
  name: string;
  facet: Facet;
};

export type DictionaryItem = {
  id: number;
  key: string;
  value: string;
  order: unknown;
  parent: unknown;
};

export interface OfferDetailItem {
  id: string;
  title: string;
  category: DictionaryItem;
  subcategories: DictionaryItem[];
  city: string;
  cityPD: DictionaryItem;
  province: DictionaryItem;
  zipCode: string;
  description: string;
  profile: Profile;
}

export interface OfferDetailParameters {
  offerId: string;
}

export interface OfferDetailResponse {
  id: string;
  title: string;
  category: DictionaryItem;
  subcategories: DictionaryItem[];
  link: string;
  city: string;
  cityPD: DictionaryItem;
  province: DictionaryItem;
  zipCode: string;
  description: string;
  profile: Profile;
  creationDate: Date;
  updateDate: Date;
  applications: number;
  upsellings: Upselling;
  showPay: boolean;
  minPay: Pay;
  maxPay: Pay;
  contractType: DictionaryItem;
  journey: DictionaryItem;
  studiesMin: DictionaryItem;
  experienceMin: DictionaryItem;
  minRequirements: string;
  desiredRequirements: string;
  state: number;
  externalUrlForm: string;
  residence: DictionaryItem;
  country: DictionaryItem;
  exactLocation: boolean;
  latitude: number;
  longitude: number;
  department: string;
  vacancies: number;
  commissions: string;
  referenceId: string;
  contractDuration: string;
  detailedStudiesId: number;
  studying: boolean;
  schedule: string;
  jobLevel: DictionaryItem;
  staffInCharge: DictionaryItem;
  hasKillerQuestions: boolean;
  hasOpenQuestions: boolean;
  active: boolean;
  archived: boolean;
  deleted: boolean;
  availableForVisualization: boolean;
  disponibleForFullVisualization: boolean;
  subSegment: number;
  skillsList: SkillItem[];
  epreselec: boolean;
  fiscalAddress: string;
}

export interface OfferListItem {
  id: string;
  title: string;
  category: PD;
  subcategory: PD;
  link: string;
  city: string;
  province: string;
  multiProvince: boolean;
  author: Author;
  updated: Date;
  published: Date;
  applications: string;
  bold: boolean;
  salaryMin: PD;
  salaryMax: PD;
  salaryPeriod: PD;
  salaryDescription: PD;
  contractType: PD;
  workDay: PD;
  study: PD;
  experienceMin: PD;
  requirementMin: string;
  executive: boolean;
  teleworking: PD;
  priority: boolean;
}

export interface OfferListParameters {
  q?: string;
  province?: string;
  category?: string;
  subcategory?: string;
  city?: string;
  country?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod?: string;
  study?: string;
  contractType?: string;
  experienceMin?: string;
  workday?: string;
  employerId?: string;
  emph?: string;
  order?:
    | 'updated'
    | 'updated-desc'
    | 'title'
    | 'title-desc'
    | 'city'
    | 'city-desc'
    | 'author'
    | 'author-desc'
    | 'relevancia-desc'
    | 'applicants-asc';
  page?: number;
  maxResults?: string;
  facets?: boolean;
  sinceDate?: '_24_HOURS' | '_7_DAYS' | '_15_DAYS' | 'ANY';
  teleworking?: string;
}

export interface OfferListResponse {
  offers: OfferListItem[];
  totalResults: number;
  currentResults: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  facets: Facets[];
  availableSortingMethods: string[];
  sortBy: string;
  sinceDate: string;
  queryParameters: Partial<OfferListParameters>;
}
