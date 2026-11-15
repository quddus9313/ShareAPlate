import type {
  User,
  Donation,
  NgoRequirement,
  VolunteerTask,
  PlatformNotification,
  ImpactStats,
  SmartMatchResult,
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_donor_1',
    name: 'Chef Ramesh Sharma',
    email: 'ramesh@spiceterrace.in',
    role: 'donor',
    phone: '+91 98450 11223',
    organizationName: 'Spice Terrace Restaurant',
    donorType: 'Restaurant',
    address: '24/1, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038',
    location: { lat: 12.9784, lng: 77.6408, area: 'Indiranagar' },
    rating: 4.9,
    completedDonationsCount: 42,
    totalKgDonated: 620,
    badges: ['Food Hero', 'Swift Rescuer', 'Zero Waste Champion'],
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'user_donor_2',
    name: 'Priya Nair',
    email: 'priya@dailybakes.com',
    role: 'donor',
    phone: '+91 98451 22334',
    organizationName: 'Daily Bakes & Confectionery',
    donorType: 'Bakery',
    address: '88, 5th Cross, 6th Block, Koramangala, Bengaluru, Karnataka 560095',
    location: { lat: 12.9352, lng: 77.6245, area: 'Koramangala' },
    rating: 4.8,
    completedDonationsCount: 35,
    totalKgDonated: 410,
    badges: ['Food Saver', 'Bakery Champion'],
    createdAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 'user_donor_3',
    name: 'Executive Chef Anand Vardhan',
    email: 'anand@grandbengaluru.in',
    role: 'donor',
    phone: '+91 98452 33445',
    organizationName: 'The Grand Bengaluru Hotel & Banquet',
    donorType: 'Hotel',
    address: '1 MG Road, Bengaluru, Karnataka 560001',
    location: { lat: 12.9748, lng: 77.6094, area: 'MG Road' },
    rating: 5.0,
    completedDonationsCount: 68,
    totalKgDonated: 1250,
    badges: ['Mega Donor', 'Food Hero', 'Sustainable Leader'],
    createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: 'user_donor_4',
    name: 'Manish Agarwal',
    email: 'manish@freshharvest.in',
    role: 'donor',
    phone: '+91 98453 44556',
    organizationName: 'FreshHarvest Organics & Supermarket',
    donorType: 'Grocery',
    address: '14, 27th Main, Sector 1, HSR Layout, Bengaluru, Karnataka 560102',
    location: { lat: 12.9121, lng: 77.6446, area: 'HSR Layout' },
    rating: 4.7,
    completedDonationsCount: 22,
    totalKgDonated: 340,
    badges: ['Green Partner'],
    createdAt: '2026-02-15T11:00:00Z',
  },
  {
    id: 'user_donor_5',
    name: 'Smt. Kamala Devi',
    email: 'kamala.devi@gmail.com',
    role: 'donor',
    phone: '+91 98454 55667',
    organizationName: 'Devi Family Kitchen',
    donorType: 'Household',
    address: '42, 8th Main, 15th Cross, Malleshwaram, Bengaluru, Karnataka 560003',
    location: { lat: 13.0031, lng: 77.5683, area: 'Malleshwaram' },
    rating: 4.9,
    completedDonationsCount: 14,
    totalKgDonated: 95,
    badges: ['Community Star'],
    createdAt: '2026-03-01T09:00:00Z',
  },
  {
    id: 'user_ngo_1',
    name: 'Annapoorna Community Relief',
    email: 'contact@annapoornafood.org',
    role: 'ngo',
    phone: '+91 80 2525 9901',
    organizationName: 'Annapoorna Community Relief Trust',
    address: '102, 12th Main, HAL 2nd Stage, Indiranagar, Bengaluru 560008',
    location: { lat: 12.9698, lng: 77.6499, area: 'Indiranagar' },
    isVerified: true,
    verificationDocuments: ['80G_Tax_Exemption.pdf', 'NGO_Darpan_Reg_2024.pdf'],
    beneficiaryCount: 350,
    completedDonationsCount: 88,
    rating: 4.95,
    createdAt: '2025-11-20T10:00:00Z',
  },
  {
    id: 'user_ngo_2',
    name: 'Karuna Children Shelter & Home',
    email: 'director@karunashelter.org',
    role: 'ngo',
    phone: '+91 80 2553 4412',
    organizationName: 'Karuna Orphanage & Senior Care',
    address: '55, 1st Block, Koramangala, Bengaluru 560034',
    location: { lat: 12.9279, lng: 77.6271, area: 'Koramangala' },
    isVerified: true,
    verificationDocuments: ['Trust_Deed_Cert.pdf', 'FCRA_Renewal.pdf'],
    beneficiaryCount: 180,
    completedDonationsCount: 64,
    rating: 4.9,
    createdAt: '2025-12-05T12:00:00Z',
  },
  {
    id: 'user_ngo_3',
    name: 'Hope Bengaluru Hunger Mission',
    email: 'info@hopehungerrelief.org',
    role: 'ngo',
    phone: '+91 80 2664 1234',
    organizationName: 'Hope Foundation Bengaluru',
    address: '32, 9th Cross, Jayanagar 4th Block, Bengaluru 560011',
    location: { lat: 12.9250, lng: 77.5938, area: 'Jayanagar' },
    isVerified: true,
    verificationDocuments: ['NGO_Certificate_2025.pdf'],
    beneficiaryCount: 420,
    completedDonationsCount: 110,
    rating: 4.98,
    createdAt: '2025-10-15T09:00:00Z',
  },
  {
    id: 'user_ngo_5',
    name: 'Seva Sankalp Welfare Society (Pending Verification)',
    email: 'sevasankalp.blr@gmail.com',
    role: 'ngo',
    phone: '+91 99001 77889',
    organizationName: 'Seva Sankalp Welfare Society',
    address: '15, Sampige Road, Malleshwaram, Bengaluru 560003',
    location: { lat: 13.0012, lng: 77.5701, area: 'Malleshwaram' },
    isVerified: false,
    verificationDocuments: ['Societies_Registration_Application.pdf'],
    beneficiaryCount: 120,
    completedDonationsCount: 0,
    rating: 0,
    createdAt: '2026-03-02T16:00:00Z',
  },
  {
    id: 'user_vol_1',
    name: 'Rahul Deshmukh',
    email: 'rahul.deshmukh@gmail.com',
    role: 'volunteer',
    phone: '+91 98801 12345',
    address: 'Defence Colony, Indiranagar, Bengaluru 560038',
    location: { lat: 12.9790, lng: 77.6420, area: 'Indiranagar' },
    rating: 5.0,
    completedDonationsCount: 38,
    totalHoursVolunteered: 72,
    badges: ['Volunteer Star', 'Speedy Rescuer', 'Top Courier'],
    createdAt: '2026-01-05T10:00:00Z',
  },
  {
    id: 'user_vol_2',
    name: 'Ananya Sen',
    email: 'ananya.sen@gmail.com',
    role: 'volunteer',
    phone: '+91 98802 23456',
    address: '4th Block, Koramangala, Bengaluru 560034',
    location: { lat: 12.9340, lng: 77.6250, area: 'Koramangala' },
    rating: 4.9,
    completedDonationsCount: 29,
    totalHoursVolunteered: 54,
    badges: ['Volunteer Star', 'Weekend Warrior'],
    createdAt: '2026-01-18T11:00:00Z',
  },
  {
    id: 'user_admin',
    name: 'Operations Admin',
    email: 'admin@shareaplate.org',
    role: 'admin',
    phone: '+91 80 4000 1234',
    organizationName: 'ShareAPlate Foundation India',
    address: 'Civic Impact Hub, MG Road, Bengaluru 560001',
    location: { lat: 12.9750, lng: 77.6090, area: 'MG Road' },
    createdAt: '2025-01-01T00:00:00Z',
  },
];

export const INITIAL_DONATIONS: Donation[] = [
  {
    id: 'don_001',
    donorId: 'user_donor_1',
    donorName: 'Chef Ramesh Sharma (Spice Terrace)',
    donorType: 'Restaurant',
    donorPhone: '+91 98450 11223',
    foodName: 'Nutritious Vegetable Pulao & Dal Tadka',
    category: 'Cooked Meals',
    description: 'Freshly prepared vegetable pulao with carrots, beans, peas, and rich yellow dal tadka prepared for lunch banquet. Neatly packed into food-grade containers.',
    quantity: 45,
    unit: 'boxes',
    estimatedMeals: 45,
    imageUrl: 'assets/images/marketplace_fresh_meals_1794072150653.jpg',
    isVegetarian: true,
    dietaryTags: ['Vegetarian', 'Jain Option Available', 'Nut-Free'],
    allergens: ['None'],
    packagingType: 'Compostable Kraft Meal Boxes',
    preparationTime: '2026-11-07T12:00:00',
    storageConditions: 'Hot Holding (>60°C)',
    pickupLocation: {
      address: 'Spice Terrace, 100 Feet Road, Indiranagar',
      lat: 12.9784,
      lng: 77.6408,
      area: 'Indiranagar',
      specialInstructions: 'Park in service lane behind kitchen, ask for Chef Ramesh.',
    },
    pickupStartTime: '2026-11-07T13:30:00',
    pickupDeadline: '2026-11-07T16:00:00',
    status: 'Available',
    urgency: 'High',
    verificationToken: 'TOKEN_DON_001_A91B',
    otpCode: '482910',
    safetyChecklistConfirmed: true,
    aiSafetyNotes: 'Cooked meals should be collected within 3 hours of preparation if held warm. Verified clean kitchen.',
    statusHistory: [
      {
        status: 'Available',
        timestamp: '2026-11-07T12:15:00Z',
        updatedBy: 'Chef Ramesh Sharma',
        actorRole: 'donor',
        note: 'Published donation after kitchen lunch wrap-up.',
      },
    ],
    createdAt: '2026-11-07T12:15:00Z',
    updatedAt: '2026-11-07T12:15:00Z',
  },
  {
    id: 'don_002',
    donorId: 'user_donor_2',
    donorName: 'Priya Nair (Daily Bakes)',
    donorType: 'Bakery',
    donorPhone: '+91 98451 22334',
    foodName: 'Artisanal Sourdough & Fresh Breads',
    category: 'Bakery Products',
    description: 'Crisp rustic sourdough loaves, whole wheat loaves, and French baguettes baked fresh this morning. Sealed in food grade paper covers.',
    quantity: 35,
    unit: 'boxes',
    estimatedMeals: 70,
    imageUrl: 'assets/images/bakery_surplus_bread_1794072151734.jpg',
    isVegetarian: true,
    dietaryTags: ['Vegetarian', 'Dairy-Free'],
    allergens: ['Wheat (Gluten)'],
    packagingType: 'Eco-friendly Brown Paper Bags',
    preparationTime: '2026-11-07T07:30:00',
    storageConditions: 'Room Temperature (Dry)',
    pickupLocation: {
      address: 'Daily Bakes, 5th Cross, 6th Block, Koramangala',
      lat: 12.9352,
      lng: 77.6245,
      area: 'Koramangala',
      specialInstructions: 'Come through front display counter.',
    },
    pickupStartTime: '2026-11-07T14:00:00',
    pickupDeadline: '2026-11-07T19:00:00',
    status: 'Available',
    urgency: 'Medium',
    verificationToken: 'TOKEN_DON_002_C82D',
    otpCode: '319402',
    safetyChecklistConfirmed: true,
    aiSafetyNotes: 'Bakery bread items have high stability (24-48h at room temp in dry conditions).',
    statusHistory: [
      {
        status: 'Available',
        timestamp: '2026-11-07T11:00:00Z',
        updatedBy: 'Priya Nair',
        actorRole: 'donor',
      },
    ],
    createdAt: '2026-11-07T11:00:00Z',
    updatedAt: '2026-11-07T11:00:00Z',
  },
  {
    id: 'don_003',
    donorId: 'user_donor_3',
    donorName: 'The Grand Bengaluru Hotel',
    donorType: 'Hotel',
    donorPhone: '+91 98452 33445',
    foodName: 'South Indian Banquet Meal Packs (Sambar, Rice, Kootu)',
    category: 'Cooked Meals',
    description: 'High-grade surplus from corporate seminar: Steamed Sona Masoori rice, mixed vegetable sambar, vegetable kootu, and curd rice cups.',
    quantity: 80,
    unit: 'boxes',
    estimatedMeals: 80,
    imageUrl: 'assets/images/hero_food_rescue_1794072150460.jpg',
    isVegetarian: true,
    dietaryTags: ['Vegetarian', 'Gluten-Free Options'],
    allergens: ['Dairy (in Curd Rice)'],
    packagingType: 'Multi-compartment Sealed Trays',
    preparationTime: '2026-11-07T12:30:00',
    storageConditions: 'Hot Holding (>60°C)',
    pickupLocation: {
      address: '1 MG Road, Central Bengaluru',
      lat: 12.9748,
      lng: 77.6094,
      area: 'MG Road',
      specialInstructions: 'Banquet loading bay, Gate 3.',
    },
    pickupStartTime: '2026-11-07T13:45:00',
    pickupDeadline: '2026-11-07T15:45:00',
    status: 'Claimed',
    urgency: 'Urgent',
    claimedByNgoId: 'user_ngo_1',
    claimedByNgoName: 'Annapoorna Community Relief',
    assignedVolunteerId: 'user_vol_1',
    assignedVolunteerName: 'Rahul Deshmukh',
    verificationToken: 'TOKEN_DON_003_FE11',
    otpCode: '829415',
    safetyChecklistConfirmed: true,
    aiSafetyNotes: 'Prompt collection requested due to banquet hot-holding threshold.',
    statusHistory: [
      {
        status: 'Available',
        timestamp: '2026-11-07T12:40:00Z',
        updatedBy: 'Anand Vardhan',
        actorRole: 'donor',
      },
      {
        status: 'Claimed',
        timestamp: '2026-11-07T12:55:00Z',
        updatedBy: 'Annapoorna Community Relief',
        actorRole: 'ngo',
      },
    ],
    createdAt: '2026-11-07T12:40:00Z',
    updatedAt: '2026-11-07T13:05:00Z',
  },
  {
    id: 'don_004',
    donorId: 'user_donor_4',
    donorName: 'FreshHarvest Organics',
    donorType: 'Grocery',
    donorPhone: '+91 98453 44556',
    foodName: 'Fresh Farm Produce (Carrots, Beans, Tomatoes & Apples)',
    category: 'Vegetables',
    description: 'Surplus organic farm fresh produce received this morning. Super fresh, perfect for NGO community kitchen stews and cooking.',
    quantity: 60,
    unit: 'kg',
    estimatedMeals: 150,
    imageUrl: 'assets/images/food_plate_sharing_1794072151768.jpg',
    isVegetarian: true,
    dietaryTags: ['Vegan', 'Raw Organic'],
    allergens: ['None'],
    packagingType: 'Crates & Mesh Sacks',
    preparationTime: '2026-11-07T08:00:00',
    storageConditions: 'Refrigerated (below 4°C)',
    pickupLocation: {
      address: 'Sector 1, HSR Layout, Bengaluru',
      lat: 12.9121,
      lng: 77.6446,
      area: 'HSR Layout',
      specialInstructions: 'Store loading dock behind petrol pump.',
    },
    pickupStartTime: '2026-11-07T14:00:00',
    pickupDeadline: '2026-11-07T20:00:00',
    status: 'Available',
    urgency: 'Low',
    verificationToken: 'TOKEN_DON_004_BB77',
    otpCode: '654321',
    safetyChecklistConfirmed: true,
    statusHistory: [
      {
        status: 'Available',
        timestamp: '2026-11-07T09:30:00Z',
        updatedBy: 'Manish Agarwal',
        actorRole: 'donor',
      },
    ],
    createdAt: '2026-11-07T09:30:00Z',
    updatedAt: '2026-11-07T09:30:00Z',
  },
  {
    id: 'don_006',
    donorId: 'user_donor_1',
    donorName: 'Chef Ramesh Sharma (Spice Terrace)',
    donorType: 'Restaurant',
    donorPhone: '+91 98450 11223',
    foodName: 'Paneer Butter Masala & Jeera Rice',
    category: 'Cooked Meals',
    description: '30 generous portion boxes of aromatic jeera rice and rich paneer butter masala.',
    quantity: 30,
    unit: 'boxes',
    estimatedMeals: 30,
    imageUrl: 'assets/images/marketplace_fresh_meals_1794072150653.jpg',
    isVegetarian: true,
    dietaryTags: ['Vegetarian'],
    allergens: ['Dairy'],
    packagingType: 'Sealed Meal Boxes',
    preparationTime: '2026-11-06T19:30:00',
    storageConditions: 'Refrigerated (below 4°C)',
    pickupLocation: {
      address: 'Spice Terrace, Indiranagar',
      lat: 12.9784,
      lng: 77.6408,
      area: 'Indiranagar',
    },
    pickupStartTime: '2026-11-06T20:30:00',
    pickupDeadline: '2026-11-06T22:30:00',
    status: 'Delivered',
    urgency: 'Low',
    claimedByNgoId: 'user_ngo_1',
    claimedByNgoName: 'Annapoorna Community Relief',
    assignedVolunteerId: 'user_vol_1',
    assignedVolunteerName: 'Rahul Deshmukh',
    verificationToken: 'TOKEN_DON_006_COMP',
    otpCode: '102938',
    safetyChecklistConfirmed: true,
    statusHistory: [
      { status: 'Available', timestamp: '2026-11-06T19:45:00Z', updatedBy: 'Chef Ramesh', actorRole: 'donor' },
      { status: 'Delivered', timestamp: '2026-11-06T21:20:00Z', updatedBy: 'Annapoorna staff', actorRole: 'ngo' },
    ],
    createdAt: '2026-11-06T19:45:00Z',
    updatedAt: '2026-11-06T21:20:00Z',
  },
];

export const INITIAL_REQUIREMENTS: NgoRequirement[] = [
  {
    id: 'req_001',
    ngoId: 'user_ngo_1',
    ngoName: 'Annapoorna Community Relief',
    category: 'Cooked Meals',
    requiredQuantity: 100,
    unit: 'meals',
    beneficiaryCount: 100,
    requiredDate: '2026-11-07',
    area: 'Indiranagar',
    urgency: 'High',
    isVegetarianOnly: true,
    specialNotes: 'For evening relief kitchen feeding migrant daily wage workers.',
    isFulfilled: false,
    createdAt: '2026-11-07T08:00:00Z',
  },
  {
    id: 'req_002',
    ngoId: 'user_ngo_2',
    ngoName: 'Karuna Children Shelter & Home',
    category: 'Bakery Products',
    requiredQuantity: 50,
    unit: 'boxes',
    beneficiaryCount: 65,
    requiredDate: '2026-11-07',
    area: 'Koramangala',
    urgency: 'Medium',
    isVegetarianOnly: true,
    specialNotes: 'After-school snack for orphan children.',
    isFulfilled: false,
    createdAt: '2026-11-07T09:00:00Z',
  },
];

export const INITIAL_TASKS: VolunteerTask[] = [
  {
    id: 'task_001',
    donationId: 'don_003',
    volunteerId: 'user_vol_1',
    volunteerName: 'Rahul Deshmukh',
    ngoId: 'user_ngo_1',
    ngoName: 'Annapoorna Community Relief',
    donorName: 'The Grand Bengaluru Hotel',
    foodName: 'South Indian Banquet Meal Packs (80 boxes)',
    quantityText: '80 boxes (~80 meals)',
    pickupAddress: 'The Grand Bengaluru Hotel, 1 MG Road, Gate 3 Loading Bay',
    pickupCoords: { lat: 12.9748, lng: 77.6094 },
    deliveryAddress: 'Annapoorna Trust, 12th Main, HAL 2nd Stage, Indiranagar',
    deliveryCoords: { lat: 12.9698, lng: 77.6499 },
    estimatedDistanceKm: 4.6,
    deadline: '2026-11-07T15:45:00',
    status: 'Assigned',
    notes: 'Please bring insulated thermal bags or crates.',
  },
];

export const INITIAL_NOTIFICATIONS: PlatformNotification[] = [
  {
    id: 'notif_1',
    userId: 'user_donor_1',
    title: 'New NGO Match Found',
    message: 'Annapoorna Community Relief is 1.8 km away and looking for 100 cooked meals.',
    type: 'claim',
    isRead: false,
    createdAt: '2026-11-07T12:20:00Z',
  },
];

// LocalStorage Persistence Helpers for Static / GitHub Pages Hosting
const STORAGE_KEYS = {
  USERS: 'shareaplate_mock_users',
  DONATIONS: 'shareaplate_mock_donations',
  REQUIREMENTS: 'shareaplate_mock_requirements',
  TASKS: 'shareaplate_mock_tasks',
  NOTIFICATIONS: 'shareaplate_mock_notifications',
};

export function getMockUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  return INITIAL_USERS;
}

export function getMockDonations(): Donation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DONATIONS);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(INITIAL_DONATIONS));
  return INITIAL_DONATIONS;
}

export function saveMockDonations(donations: Donation[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  } catch {}
}

export function getMockRequirements(): NgoRequirement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REQUIREMENTS);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(STORAGE_KEYS.REQUIREMENTS, JSON.stringify(INITIAL_REQUIREMENTS));
  return INITIAL_REQUIREMENTS;
}

export function saveMockRequirements(reqs: NgoRequirement[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.REQUIREMENTS, JSON.stringify(reqs));
  } catch {}
}

export function getMockTasks(): VolunteerTask[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
  return INITIAL_TASKS;
}

export function saveMockTasks(tasks: VolunteerTask[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch {}
}

export function getMockNotifications(): PlatformNotification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  return INITIAL_NOTIFICATIONS;
}

export function saveMockNotifications(notifs: PlatformNotification[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  } catch {}
}
