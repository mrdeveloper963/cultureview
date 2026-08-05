// Mock data for development when database is unavailable

export const mockCountries = [
  { id: 1, nameEn: 'United States', nameFa: 'ایالات متحده', code: 'US', flagUrl: null, totalPosts: 5, createdAt: new Date() },
  { id: 2, nameEn: 'United Kingdom', nameFa: 'انگلستان', code: 'GB', flagUrl: null, totalPosts: 3, createdAt: new Date() },
  { id: 3, nameEn: 'Germany', nameFa: 'آلمان', code: 'DE', flagUrl: null, totalPosts: 4, createdAt: new Date() },
  { id: 4, nameEn: 'France', nameFa: 'فرانسه', code: 'FR', flagUrl: null, totalPosts: 2, createdAt: new Date() },
  { id: 5, nameEn: 'Japan', nameFa: 'ژاپن', code: 'JP', flagUrl: null, totalPosts: 6, createdAt: new Date() },
  { id: 6, nameEn: 'Canada', nameFa: 'کانادا', code: 'CA', flagUrl: null, totalPosts: 3, createdAt: new Date() },
  { id: 7, nameEn: 'Australia', nameFa: 'استرالیا', code: 'AU', flagUrl: null, totalPosts: 2, createdAt: new Date() },
  { id: 8, nameEn: 'India', nameFa: 'هند', code: 'IN', flagUrl: null, totalPosts: 4, createdAt: new Date() },
  { id: 9, nameEn: 'China', nameFa: 'چین', code: 'CN', flagUrl: null, totalPosts: 3, createdAt: new Date() },
]

export const mockCategories = [
  { id: 1, slug: 'work-culture', nameEn: 'Work Culture', nameFa: 'فرهنگ کاری', descriptionEn: 'Work-life balance, office culture, workplace norms', descriptionFa: null, icon: '💼', displayOrder: 1, createdAt: new Date() },
  { id: 2, slug: 'food-dining', nameEn: 'Food & Dining', nameFa: 'غذا و رستوران', descriptionEn: 'Cuisine, dining etiquette, food culture', descriptionFa: null, icon: '🍽️', displayOrder: 2, createdAt: new Date() },
  { id: 3, slug: 'social-norms', nameEn: 'Social Norms', nameFa: 'هنجارهای اجتماعی', descriptionEn: 'Greetings, personal space, social expectations', descriptionFa: null, icon: '🤝', displayOrder: 3, createdAt: new Date() },
  { id: 4, slug: 'communication', nameEn: 'Communication Style', nameFa: 'سبک ارتباطی', descriptionEn: 'Directness, formality, non-verbal cues', descriptionFa: null, icon: '💬', displayOrder: 4, createdAt: new Date() },
  { id: 5, slug: 'time-punctuality', nameEn: 'Time & Punctuality', nameFa: 'زمان و دقت', descriptionEn: 'Attitudes toward time, scheduling, punctuality', descriptionFa: null, icon: '⏰', displayOrder: 5, createdAt: new Date() },
]

export const mockPosts = [
  {
    id: '1',
    userId: 'user-1',
    countryId: 5,
    categoryId: 1,
    title: 'Punctuality is taken very seriously',
    content: 'In Japan, being even 5 minutes late is considered extremely rude. Trains run on time to the second, and meetings start exactly when scheduled. This cultural norm extends to all aspects of life.',
    experienceType: 'lived',
    likesCount: 24,
    dislikesCount: 2,
    commentsCount: 5,
    isPublished: true,
    isReported: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    userId: 'user-2',
    countryId: 3,
    categoryId: 2,
    title: 'Bread is a serious matter',
    content: 'Germans take their bread very seriously - there are over 300 types of bread in Germany. Bakeries are everywhere and fresh bread is a daily ritual. Don\'t be surprised if people have strong opinions about proper bread.',
    experienceType: 'lived',
    likesCount: 18,
    dislikesCount: 1,
    commentsCount: 3,
    isPublished: true,
    isReported: false,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
]

export const mockComments = [
  {
    id: '1',
    postId: '1',
    userId: 'user-3',
    parentCommentId: null,
    content: 'I experienced this firsthand! The train system is incredibly precise.',
    likesCount: 5,
    dislikesCount: 0,
    isReported: false,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
]

export const USE_MOCK_DATA = true // Toggle this when database is available
