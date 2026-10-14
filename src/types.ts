export interface SiteConfig {
  cakitoCheckoutUrl: string;
  whatsappNumber: string;
  whatsappMessage: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubtitle: string;
  ctaButtonText: string;
  productName: string;
  originalPrice: string;
  currentPrice: string;
  installments: string;
  guaranteeDays: number;
  showCountdown: boolean;
  countdownMinutes: number;
  showRecentSalesPopup: boolean;
  announcementText: string;
  bonusList: string[];
  featuresList: string[];
  adminUsername?: string;
  adminPassword?: string;
  vipGroupUrl?: string;
  memberWelcomeMessage?: string;
}
