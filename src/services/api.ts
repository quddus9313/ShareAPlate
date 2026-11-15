import type {
  User,
  Donation,
  NgoRequirement,
  VolunteerTask,
  PlatformNotification,
  ImpactStats,
  SmartMatchResult,
} from '../types';
import {
  getMockUsers,
  getMockDonations,
  saveMockDonations,
  getMockRequirements,
  saveMockRequirements,
  getMockTasks,
  saveMockTasks,
  getMockNotifications,
  saveMockNotifications,
} from './mockData';
import QRCode from 'qrcode';

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('shareaplate_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function requestWithFallback<T>(
  url: string,
  options: RequestInit | undefined,
  fallback: () => T | Promise<T>
): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      return await fallback();
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return await fallback();
    }
    return await res.json();
  } catch {
    return await fallback();
  }
}

export const api = {
  // Auth
  async getDemoUsers(): Promise<User[]> {
    return requestWithFallback(
      `${API_BASE}/auth/demo-users`,
      undefined,
      () => getMockUsers()
    );
  },

  async login(email: string): Promise<{ token: string; user: User }> {
    return requestWithFallback(
      `${API_BASE}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      },
      () => {
        const users = getMockUsers();
        const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim()) || users[0];
        return {
          token: `jwt_token_${user.id}_mock`,
          user,
        };
      }
    );
  },

  async register(data: Partial<User>): Promise<{ token: string; user: User }> {
    return requestWithFallback(
      `${API_BASE}/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
      () => {
        const users = getMockUsers();
        const newUser: User = {
          id: `user_${data.role || 'donor'}_${Date.now()}`,
          name: data.name || 'Anonymous User',
          email: data.email || `user${Date.now()}@example.com`,
          role: data.role || 'donor',
          phone: data.phone || '+91 98000 00000',
          organizationName: data.organizationName || data.name,
          donorType: data.donorType,
          address: data.address || 'Bengaluru, Karnataka',
          location: data.location || { lat: 12.9716, lng: 77.5946, area: 'Bengaluru Central' },
          createdAt: new Date().toISOString(),
        };
        users.push(newUser);
        localStorage.setItem('shareaplate_mock_users', JSON.stringify(users));
        return {
          token: `jwt_token_${newUser.id}_mock`,
          user: newUser,
        };
      }
    );
  },

  async getMe(): Promise<{ user: User }> {
    return requestWithFallback(
      `${API_BASE}/auth/me`,
      { headers: getAuthHeaders() },
      () => {
        const saved = localStorage.getItem('shareaplate_user');
        if (saved) return { user: JSON.parse(saved) };
        return { user: getMockUsers()[0] };
      }
    );
  },

  // Donations
  async getDonations(params?: {
    category?: string;
    status?: string;
    search?: string;
    donorId?: string;
    claimedByNgoId?: string;
  }): Promise<Donation[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.status) query.append('status', params.status);
    if (params?.search) query.append('search', params.search);
    if (params?.donorId) query.append('donorId', params.donorId);
    if (params?.claimedByNgoId) query.append('claimedByNgoId', params.claimedByNgoId);

    return requestWithFallback(
      `${API_BASE}/donations?${query.toString()}`,
      undefined,
      () => {
        let list = getMockDonations();
        if (params?.category && params.category !== 'All') {
          list = list.filter((d) => d.category === params.category);
        }
        if (params?.status && params.status !== 'All') {
          list = list.filter((d) => d.status.toLowerCase() === params.status?.toLowerCase());
        }
        if (params?.search) {
          const q = params.search.toLowerCase();
          list = list.filter(
            (d) =>
              d.foodName.toLowerCase().includes(q) ||
              d.description.toLowerCase().includes(q) ||
              d.pickupLocation.area.toLowerCase().includes(q)
          );
        }
        if (params?.donorId) {
          list = list.filter((d) => d.donorId === params.donorId);
        }
        if (params?.claimedByNgoId) {
          list = list.filter((d) => d.claimedByNgoId === params.claimedByNgoId);
        }
        return list;
      }
    );
  },

  async getDonationById(id: string): Promise<Donation> {
    return requestWithFallback(
      `${API_BASE}/donations/${id}`,
      undefined,
      () => {
        const d = getMockDonations().find((item) => item.id === id);
        if (!d) throw new Error('Donation not found');
        return d;
      }
    );
  },

  async createDonation(data: Partial<Donation>): Promise<Donation> {
    return requestWithFallback(
      `${API_BASE}/donations`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      },
      () => {
        const list = getMockDonations();
        const newDonation: Donation = {
          id: `don_${Date.now()}`,
          donorId: data.donorId || 'user_donor_1',
          donorName: data.donorName || 'Chef Ramesh Sharma',
          donorType: data.donorType || 'Restaurant',
          donorPhone: data.donorPhone || '+91 98450 11223',
          foodName: data.foodName || 'Surplus Meal Packs',
          category: data.category || 'Cooked Meals',
          description: data.description || 'Nutritious surplus meal packs.',
          quantity: data.quantity || 10,
          unit: data.unit || 'boxes',
          estimatedMeals: data.estimatedMeals || data.quantity || 10,
          imageUrl: data.imageUrl || 'assets/images/marketplace_fresh_meals_1794072150653.jpg',
          isVegetarian: data.isVegetarian ?? true,
          dietaryTags: data.dietaryTags || ['Vegetarian'],
          allergens: data.allergens || ['None'],
          packagingType: data.packagingType || 'Food Grade Boxes',
          preparationTime: data.preparationTime || new Date().toISOString(),
          storageConditions: data.storageConditions || 'Hot Holding (>60°C)',
          pickupLocation: data.pickupLocation || {
            address: 'Indiranagar, Bengaluru',
            lat: 12.9784,
            lng: 77.6408,
            area: 'Indiranagar',
          },
          pickupStartTime: data.pickupStartTime || new Date().toISOString(),
          pickupDeadline: data.pickupDeadline || new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
          status: 'Available',
          urgency: data.urgency || 'High',
          verificationToken: `TOKEN_${Date.now()}`,
          otpCode: Math.floor(100000 + Math.random() * 900000).toString(),
          safetyChecklistConfirmed: true,
          statusHistory: [
            {
              status: 'Available',
              timestamp: new Date().toISOString(),
              updatedBy: data.donorName || 'Donor',
              actorRole: 'donor',
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        list.unshift(newDonation);
        saveMockDonations(list);
        return newDonation;
      }
    );
  },

  async claimDonation(id: string, ngoId: string, ngoName: string): Promise<{ donation: Donation; task: VolunteerTask }> {
    return requestWithFallback(
      `${API_BASE}/donations/${id}/claim`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ngoId, ngoName }),
      },
      () => {
        const list = getMockDonations();
        const donation = list.find((d) => d.id === id);
        if (!donation) throw new Error('Donation not found');

        donation.status = 'Claimed';
        donation.claimedByNgoId = ngoId;
        donation.claimedByNgoName = ngoName;
        donation.updatedAt = new Date().toISOString();
        donation.statusHistory.push({
          status: 'Claimed',
          timestamp: new Date().toISOString(),
          updatedBy: ngoName,
          actorRole: 'ngo',
        });
        saveMockDonations(list);

        const task: VolunteerTask = {
          id: `task_${Date.now()}`,
          donationId: donation.id,
          ngoId,
          ngoName,
          donorName: donation.donorName,
          foodName: `${donation.foodName} (${donation.quantity} ${donation.unit})`,
          quantityText: `${donation.quantity} ${donation.unit}`,
          pickupAddress: donation.pickupLocation.address,
          pickupCoords: { lat: donation.pickupLocation.lat, lng: donation.pickupLocation.lng },
          deliveryAddress: `${ngoName} Community Hub`,
          deliveryCoords: { lat: 12.9716, lng: 77.5946 },
          estimatedDistanceKm: 2.5,
          deadline: donation.pickupDeadline,
          status: 'Available',
        };
        const tasks = getMockTasks();
        tasks.unshift(task);
        saveMockTasks(tasks);

        return { donation, task };
      }
    );
  },

  async verifyPickup(id: string, tokenOrOtp: string, actorName: string, actorRole: string): Promise<any> {
    return requestWithFallback(
      `${API_BASE}/donations/${id}/verify-pickup`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ tokenOrOtp, actorName, actorRole }),
      },
      () => {
        const list = getMockDonations();
        const d = list.find((item) => item.id === id);
        if (d) {
          d.status = 'Picked Up';
          d.updatedAt = new Date().toISOString();
          d.statusHistory.push({
            status: 'Picked Up',
            timestamp: new Date().toISOString(),
            updatedBy: actorName,
            actorRole: actorRole as any,
          });
          saveMockDonations(list);
        }
        return { success: true, status: 'Picked Up' };
      }
    );
  },

  async verifyDelivery(id: string, tokenOrOtp: string, ngoName: string): Promise<any> {
    return requestWithFallback(
      `${API_BASE}/donations/${id}/verify-delivery`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ tokenOrOtp, ngoName }),
      },
      () => {
        const list = getMockDonations();
        const d = list.find((item) => item.id === id);
        if (d) {
          d.status = 'Delivered';
          d.updatedAt = new Date().toISOString();
          d.statusHistory.push({
            status: 'Delivered',
            timestamp: new Date().toISOString(),
            updatedBy: ngoName,
            actorRole: 'ngo',
          });
          saveMockDonations(list);
        }
        return { success: true, status: 'Delivered' };
      }
    );
  },

  async getDonationQr(id: string): Promise<{ dataUrl: string; token: string; otp: string }> {
    return requestWithFallback(
      `${API_BASE}/donations/${id}/qr`,
      undefined,
      async () => {
        const d = getMockDonations().find((item) => item.id === id);
        const token = d?.verificationToken || `TOKEN_${id}`;
        const otp = d?.otpCode || '123456';
        let dataUrl = '';
        try {
          dataUrl = await QRCode.toDataURL(token);
        } catch {
          dataUrl = '';
        }
        return { dataUrl, token, otp };
      }
    );
  },

  async cancelDonation(id: string): Promise<any> {
    return requestWithFallback(
      `${API_BASE}/donations/${id}`,
      { method: 'DELETE', headers: getAuthHeaders() },
      () => {
        const list = getMockDonations().filter((d) => d.id !== id);
        saveMockDonations(list);
        return { success: true };
      }
    );
  },

  // Requirements
  async getRequirements(): Promise<NgoRequirement[]> {
    return requestWithFallback(
      `${API_BASE}/requirements`,
      undefined,
      () => getMockRequirements()
    );
  },

  async createRequirement(data: Partial<NgoRequirement>): Promise<NgoRequirement> {
    return requestWithFallback(
      `${API_BASE}/requirements`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      },
      () => {
        const list = getMockRequirements();
        const newReq: NgoRequirement = {
          id: `req_${Date.now()}`,
          ngoId: data.ngoId || 'user_ngo_1',
          ngoName: data.ngoName || 'NGO Partner',
          category: data.category || 'Cooked Meals',
          requiredQuantity: data.requiredQuantity || 50,
          unit: data.unit || 'meals',
          beneficiaryCount: data.beneficiaryCount || 50,
          requiredDate: data.requiredDate || new Date().toISOString().split('T')[0],
          area: data.area || 'Bengaluru',
          urgency: data.urgency || 'High',
          isVegetarianOnly: data.isVegetarianOnly ?? true,
          specialNotes: data.specialNotes || '',
          isFulfilled: false,
          createdAt: new Date().toISOString(),
        };
        list.unshift(newReq);
        saveMockRequirements(list);
        return newReq;
      }
    );
  },

  async deleteRequirement(id: string): Promise<any> {
    return requestWithFallback(
      `${API_BASE}/requirements/${id}`,
      { method: 'DELETE', headers: getAuthHeaders() },
      () => {
        const list = getMockRequirements().filter((r) => r.id !== id);
        saveMockRequirements(list);
        return { success: true };
      }
    );
  },

  // Volunteer
  async getVolunteerTasks(params?: { volunteerId?: string; status?: string }): Promise<VolunteerTask[]> {
    const query = new URLSearchParams();
    if (params?.volunteerId) query.append('volunteerId', params.volunteerId);
    if (params?.status) query.append('status', params.status);

    return requestWithFallback(
      `${API_BASE}/volunteer/tasks?${query.toString()}`,
      undefined,
      () => {
        let tasks = getMockTasks();
        if (params?.volunteerId) {
          tasks = tasks.filter((t) => t.volunteerId === params.volunteerId);
        }
        if (params?.status) {
          tasks = tasks.filter((t) => t.status === params.status);
        }
        return tasks;
      }
    );
  },

  async acceptVolunteerTask(taskId: string, volunteerId: string, volunteerName: string): Promise<VolunteerTask> {
    return requestWithFallback(
      `${API_BASE}/volunteer/tasks/${taskId}/accept`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ volunteerId, volunteerName }),
      },
      () => {
        const tasks = getMockTasks();
        const task = tasks.find((t) => t.id === taskId);
        if (!task) throw new Error('Task not found');
        task.status = 'Assigned';
        task.volunteerId = volunteerId;
        task.volunteerName = volunteerName;
        saveMockTasks(tasks);
        return task;
      }
    );
  },

  // Smart Matching
  async getSmartMatches(donationId: string): Promise<SmartMatchResult[]> {
    return requestWithFallback(
      `${API_BASE}/matching/recommend-ngos/${donationId}`,
      undefined,
      () => {
        const ngos = getMockUsers().filter((u) => u.role === 'ngo');
        return ngos.map((ngo, idx) => ({
          ngoId: ngo.id,
          ngoName: ngo.name,
          distanceKm: 1.5 + idx * 1.2,
          matchScore: 95 - idx * 8,
          breakdown: {
            locationScore: 90 - idx * 5,
            quantityScore: 85,
            timeScore: 90,
            categoryScore: 95,
          },
          explanation: `${95 - idx * 8}% Match — ${ngo.name} is in ${ngo.location?.area || 'Bengaluru'} with high rescue capacity.`,
          beneficiaries: ngo.beneficiaryCount || 150,
          preferredCategories: ['Cooked Meals', 'Bakery Products', 'Vegetables'],
        }));
      }
    );
  },

  async notifyMatchedNgos(donationId: string, ngoIds: string[]): Promise<any> {
    return requestWithFallback(
      `${API_BASE}/matching/notify-ngos`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ donationId, ngoIds }),
      },
      () => ({ success: true, notifiedCount: ngoIds.length })
    );
  },

  // Analytics
  async getAnalytics(): Promise<{ stats: ImpactStats; monthlyTrends: any[]; categoryBreakdown: any[] }> {
    return requestWithFallback(
      `${API_BASE}/analytics/overview`,
      undefined,
      () => {
        const donations = getMockDonations();
        const delivered = donations.filter((d) => d.status === 'Delivered');
        const totalFoodRescuedKg = delivered.reduce(
          (acc, d) => acc + (d.unit === 'kg' ? d.quantity : d.quantity * 0.4),
          1420
        );
        const totalMealsProvided = delivered.reduce((acc, d) => acc + d.estimatedMeals, 3550);
        const co2PreventedKg = Math.round(totalFoodRescuedKg * 2.5);
        const waterSavedLiters = Math.round(totalFoodRescuedKg * 250);

        const stats: ImpactStats = {
          totalFoodRescuedKg: Math.round(totalFoodRescuedKg),
          totalMealsProvided,
          totalDonationsCompleted: delivered.length + 84,
          activeDonationsCount: donations.filter((d) => ['Available', 'Claimed', 'In Transit', 'Picked Up'].includes(d.status)).length,
          verifiedNgosCount: 5,
          activeVolunteersCount: 10,
          co2PreventedKg,
          waterSavedLiters,
          successRatePercent: 96.4,
        };

        const monthlyTrends = [
          { month: 'Jun', meals: 1800, foodKg: 720, co2Kg: 1800 },
          { month: 'Jul', meals: 2200, foodKg: 880, co2Kg: 2200 },
          { month: 'Aug', meals: 2900, foodKg: 1160, co2Kg: 2900 },
          { month: 'Sep', meals: 3400, foodKg: 1360, co2Kg: 3400 },
          { month: 'Oct', meals: 4100, foodKg: 1640, co2Kg: 4100 },
          { month: 'Nov', meals: 4850, foodKg: 1940, co2Kg: 4850 },
        ];

        const categoryBreakdown = [
          { name: 'Cooked Meals', value: 48, fill: '#2E7D32' },
          { name: 'Bakery Products', value: 24, fill: '#74C69D' },
          { name: 'Vegetables & Fruits', value: 18, fill: '#F4A261' },
          { name: 'Packaged Food', value: 10, fill: '#1B4332' },
        ];

        return { stats, monthlyTrends, categoryBreakdown };
      }
    );
  },

  async getLeaderboard(): Promise<{ donors: any[]; ngos: any[]; volunteers: any[] }> {
    return requestWithFallback(
      `${API_BASE}/analytics/leaderboard`,
      undefined,
      () => {
        const users = getMockUsers();
        const donors = users
          .filter((u) => u.role === 'donor')
          .map((u) => ({
            id: u.id,
            name: u.organizationName || u.name,
            type: u.donorType,
            mealsDonated: (u.completedDonationsCount || 10) * 25,
            donationsCount: u.completedDonationsCount || 10,
            badges: u.badges || ['Food Saver'],
          }));
        const ngos = users
          .filter((u) => u.role === 'ngo')
          .map((u) => ({
            id: u.id,
            name: u.name,
            beneficiaries: u.beneficiaryCount || 150,
            mealsReceived: (u.completedDonationsCount || 20) * 35,
            area: u.location?.area || 'Bengaluru',
          }));
        const volunteers = users
          .filter((u) => u.role === 'volunteer')
          .map((u) => ({
            id: u.id,
            name: u.name,
            deliveriesCompleted: u.completedDonationsCount || 15,
            hoursContributed: u.totalHoursVolunteered || 30,
            rating: u.rating || 4.9,
            area: u.location?.area || 'Bengaluru',
          }));
        return { donors, ngos, volunteers };
      }
    );
  },

  // Notifications
  async getNotifications(userId?: string): Promise<PlatformNotification[]> {
    return requestWithFallback(
      userId ? `${API_BASE}/notifications?userId=${userId}` : `${API_BASE}/notifications`,
      undefined,
      () => {
        const notifs = getMockNotifications();
        if (userId) return notifs.filter((n) => n.userId === userId || !n.userId);
        return notifs;
      }
    );
  },

  async markNotificationAsRead(id: string): Promise<any> {
    return requestWithFallback(
      `${API_BASE}/notifications/${id}/read`,
      { method: 'PUT' },
      () => {
        const notifs = getMockNotifications();
        const n = notifs.find((item) => item.id === id);
        if (n) n.isRead = true;
        saveMockNotifications(notifs);
        return { success: true };
      }
    );
  },

  // AI Endpoints
  async checkFoodSafety(params: {
    foodName: string;
    category: string;
    preparationTime?: string;
    storageConditions?: string;
  }): Promise<{
    isEligible: boolean;
    safeWindowHours: number;
    handlingChecklist: string[];
    allergenPrompts: string[];
    advisoryNote: string;
  }> {
    return requestWithFallback(
      `${API_BASE}/ai/food-safety`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      },
      () => ({
        isEligible: true,
        safeWindowHours: params.category === 'Cooked Meals' ? 4 : 24,
        handlingChecklist: [
          'Maintain warm food above 60°C or chill rapidly below 4°C.',
          'Use clean, food-grade biodegradable containers with secure lids.',
          'Label preparation time and key allergens clearly.',
          'Ensure pickup by NGO or volunteer within the recommended window.',
        ],
        allergenPrompts: ['Check for dairy, gluten, nuts, or soy.', 'Label non-vegetarian or Jain ingredients clearly.'],
        advisoryNote: 'Food safety eligibility verified for distribution. Donors must ensure visual and aroma quality check before dispatch.',
      })
    );
  },

  async generateDescription(params: {
    foodName: string;
    category: string;
    quantity: number;
    unit: string;
    briefNotes?: string;
    isVegetarian?: boolean;
  }): Promise<{ description: string }> {
    return requestWithFallback(
      `${API_BASE}/ai/generate-description`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      },
      () => ({
        description: `${params.quantity} ${params.unit} of freshly prepared ${params.foodName} available for immediate rescue and community distribution. ${
          params.isVegetarian ? '100% pure vegetarian.' : 'Non-vegetarian.'
        } Packaged securely in clean containers. Please collect within the stated pickup window to ensure optimum freshness.`,
      })
    );
  },

  async predictFoodWaste(params: {
    donorType?: string;
    dayOfWeek?: string;
    typicalSurplusCategory?: string;
  }): Promise<{
    predictedSurplusMeals: number;
    likelySurplusTime: string;
    highRiskCategories: string[];
    suggestedAction: string;
    preventionRecommendations: string[];
  }> {
    return requestWithFallback(
      `${API_BASE}/ai/waste-prediction`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      },
      () => ({
        predictedSurplusMeals: 35,
        likelySurplusTime: '15:00 - 16:30',
        highRiskCategories: ['Cooked Rice & Curries', 'Banquet Starters'],
        suggestedAction: 'Pre-schedule pickup with nearby verified NGOs 2 hours prior to banquet conclusion.',
        preventionRecommendations: [
          'Calibrate batch cooking during afternoon shift by 15%.',
          'Use blast chiller if banquet surplus exceeds 50 portions.',
        ],
      })
    );
  },

  // Admin
  async getPendingNgos(): Promise<User[]> {
    return requestWithFallback(
      `${API_BASE}/admin/ngos/pending`,
      undefined,
      () => getMockUsers().filter((u) => u.role === 'ngo' && !u.isVerified)
    );
  },

  async verifyNgo(ngoId: string, action: 'approve' | 'reject'): Promise<any> {
    return requestWithFallback(
      `${API_BASE}/admin/ngos/${ngoId}/verify`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ action }),
      },
      () => {
        const users = getMockUsers();
        const ngo = users.find((u) => u.id === ngoId);
        if (ngo) {
          ngo.isVerified = action === 'approve';
          localStorage.setItem('shareaplate_mock_users', JSON.stringify(users));
        }
        return { success: true };
      }
    );
  },
};
