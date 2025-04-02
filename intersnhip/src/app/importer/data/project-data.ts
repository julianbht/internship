import type { ProjectData } from "@/app/importer/types/project";

export const projectData: ProjectData[] = [
  {
    id: "transaction-importer",
    title: "Transaction Importer",
    subtitle: "Automated Data Pipeline for Affiliate Transactions",
    description:
      "The Transaction Importer retrieves transaction data from digidip, an affiliate meta-network. Through digidip, we access affiliate links to approximately 70,000 shops. Whenever a user clicks a link through our platform, a transaction is initiated. This component queries these transactions from digidip's API and stores them in our database for further processing and analysis.",
    diagram: {
      type: "mermaid",
      content: `
        graph TD;
          A["API Client"] -->|"Fetch Transactions"| B["Transaction Parser"]
          B -->|"Parsed Data"| C["Data Validator"]
          C -->|"Validated Data"| D["Database Adapter"]
          D -->|"Store"| E["Database"]
          F["Scheduler"] -->|"Trigger Import"| A
      `,
    },
    codeExamples: [
      {
        id: "api-client",
        title: "API Client",
        description:
          "The API client component responsible for fetching transaction data from the digidip API.",
        language: "typescript",
        code: `import { DigidipConfig } from '../types/config';
import { RawTransaction } from '../types/transaction';

export class DigidipApiClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  
  constructor(config: DigidipConfig) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
  }
  
  async fetchTransactions(startDate: Date, endDate: Date): Promise<RawTransaction[]> {
    const url = new URL('/api/v1/transactions', this.baseUrl);
    
    // Add query parameters
    url.searchParams.append('start_date', startDate.toISOString());
    url.searchParams.append('end_date', endDate.toISOString());
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': \`Bearer \${this.apiKey}\`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(\`Failed to fetch transactions: \${response.statusText}\`);
    }
    
    const data = await response.json();
    return data.transactions as RawTransaction[];
  }
}`,
      },
      {
        id: "transaction-parser",
        title: "Transaction Parser",
        description:
          "Parses and normalizes the raw transaction data from the API.",
        language: "typescript",
        code: `import { RawTransaction, Transaction } from '../types/transaction';

export class TransactionParser {
  parse(rawTransactions: RawTransaction[]): Transaction[] {
    return rawTransactions.map(raw => this.parseTransaction(raw));
  }
  
  private parseTransaction(raw: RawTransaction): Transaction {
    return {
      id: raw.transaction_id,
      shopId: raw.shop_id,
      shopName: raw.shop_name,
      userId: raw.user_id,
      amount: this.parseAmount(raw.amount, raw.currency),
      currency: raw.currency,
      status: this.mapStatus(raw.status),
      createdAt: new Date(raw.created_at),
      updatedAt: new Date(raw.updated_at),
      metadata: raw.metadata || {},
    };
  }
  
  private parseAmount(amount: string, currency: string): number {
    // Handle different currency formats
    const numericAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ''));
    
    // Convert to standard format (cents/pennies)
    return Math.round(numericAmount * 100);
  }
  
  private mapStatus(status: string): 'pending' | 'approved' | 'rejected' {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'confirmed':
        return 'approved';
      case 'rejected':
      case 'declined':
        return 'rejected';
      default:
        return 'pending';
    }
  }
}`,
      },
      {
        id: "scheduler",
        title: "Import Scheduler",
        description: "Schedules regular imports of transaction data.",
        language: "typescript",
        code: `import { CronJob } from 'cron';
import { TransactionImporter } from './transaction-importer';
import { Logger } from '../utils/logger';

export class ImportScheduler {
  private cronJob: CronJob;
  private readonly importer: TransactionImporter;
  private readonly logger: Logger;
  
  constructor(importer: TransactionImporter, logger: Logger) {
    this.importer = importer;
    this.logger = logger;
    
    // Run every hour at minute 0
    this.cronJob = new CronJob('0 * * * *', this.runImport.bind(this));
  }
  
  start(): void {
    this.logger.info('Starting transaction import scheduler');
    this.cronJob.start();
  }
  
  stop(): void {
    this.logger.info('Stopping transaction import scheduler');
    this.cronJob.stop();
  }
  
  private async runImport(): Promise<void> {
    try {
      this.logger.info('Starting scheduled transaction import');
      
      // Calculate date range for the import (last hour)
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setHours(endDate.getHours() - 1);
      
      await this.importer.importTransactions(startDate, endDate);
      
      this.logger.info('Scheduled transaction import completed successfully');
    } catch (error) {
      this.logger.error('Scheduled transaction import failed', { error });
    }
  }
}`,
      },
    ],
  },
  {
    id: "dzi-scraper",
    title: "DZI Charity Scraper",
    subtitle: "Data Collection Tool for Charity Organizations",
    description:
      "The DZI Scraper collects information about charitable organizations from the German Central Institute for Social Issues (Deutsches Zentralinstitut für Soziale Fragen). This component enables users to select verified charities to which they can donate their accumulated contributions. The scraper extracts essential information such as organization names, missions, contact details, and certification status.",
    diagram: {
      type: "mermaid",
      content: `
        graph TD;
          A["Web Scraper"] -->|"Extract Data"| B["HTML Parser"]
          B -->|"Raw Data"| C["Data Normalizer"]
          C -->|"Structured Data"| D["Validation Service"]
          D -->|"Validated Data"| E["Database Service"]
          E -->|"Store"| F["Database"]
          G["Scheduler"] -->|"Trigger Scraping"| A
      `,
    },
    codeExamples: [
      {
        id: "web-scraper",
        title: "Web Scraper",
        description:
          "The core scraping component that fetches charity data from the DZI website.",
        language: "typescript",
        code: `import puppeteer, { Browser, Page } from 'puppeteer';
import { Logger } from '../utils/logger';
import { RawCharityData } from '../types/charity';

export class DZIScraper {
  private browser: Browser | null = null;
  private readonly logger: Logger;
  private readonly baseUrl = 'https://www.dzi.de/organisation/';
  
  constructor(logger: Logger) {
    this.logger = logger;
  }
  
  async initialize(): Promise<void> {
    this.logger.info('Initializing DZI scraper');
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  
  async scrapeCharities(): Promise<RawCharityData[]> {
    if (!this.browser) {
      await this.initialize();
    }
    
    this.logger.info('Starting charity scraping process');
    const page = await this.browser!.newPage();
    
    // Navigate to the charity list page
    await page.goto(\`\${this.baseUrl}?listing=1\`);
    
    // Get all charity URLs
    const charityUrls = await this.extractCharityUrls(page);
    this.logger.info(\`Found \${charityUrls.length} charities to scrape\`);
    
    // Scrape each charity
    const charities: RawCharityData[] = [];
    for (const url of charityUrls) {
      try {
        const charityData = await this.scrapeCharityPage(url);
        charities.push(charityData);
      } catch (error) {
        this.logger.error(\`Failed to scrape charity at \${url}\`, { error });
      }
    }
    
    this.logger.info(\`Successfully scraped \${charities.length} charities\`);
    return charities;
  }
  
  private async extractCharityUrls(page: Page): Promise<string[]> {
    return page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('.charity-list a'));
      return links.map(link => link.getAttribute('href')).filter(Boolean) as string[];
    });
  }
  
  private async scrapeCharityPage(url: string): Promise<RawCharityData> {
    const page = await this.browser!.newPage();
    await page.goto(url);
    
    return page.evaluate(() => {
      const name = document.querySelector('h1')?.textContent?.trim() || '';
      const description = document.querySelector('.charity-description')?.textContent?.trim() || '';
      const certificationElement = document.querySelector('.certification-status');
      const certificationStatus = certificationElement?.textContent?.trim() || 'Unknown';
      const isCertified = certificationStatus.includes('Certified');
      
      // Extract contact information
      const address = document.querySelector('.contact-address')?.textContent?.trim() || '';
      const website = document.querySelector('.contact-website a')?.getAttribute('href') || '';
      const email = document.querySelector('.contact-email')?.textContent?.trim() || '';
      
      return {
        name,
        description,
        isCertified,
        certificationStatus,
        contactInfo: {
          address,
          website,
          email,
        },
        scrapedAt: new Date().toISOString(),
        sourceUrl: window.location.href,
      };
    });
  }
  
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}`,
      },
      {
        id: "data-normalizer",
        title: "Data Normalizer",
        description:
          "Normalizes and structures the raw charity data from the scraper.",
        language: "typescript",
        code: `import { RawCharityData, Charity, CharityCategory } from '../types/charity';

export class CharityDataNormalizer {
  normalize(rawData: RawCharityData[]): Charity[] {
    return rawData.map(raw => this.normalizeCharity(raw));
  }
  
  private normalizeCharity(raw: RawCharityData): Charity {
    return {
      name: this.normalizeName(raw.name),
      description: this.cleanText(raw.description),
      isCertified: raw.isCertified,
      certificationStatus: raw.certificationStatus,
      categories: this.extractCategories(raw.description),
      contactInfo: {
        address: this.formatAddress(raw.contactInfo.address),
        website: this.normalizeUrl(raw.contactInfo.website),
        email: raw.contactInfo.email.toLowerCase().trim(),
      },
      metadata: {
        scrapedAt: new Date(raw.scrapedAt),
        sourceUrl: raw.sourceUrl,
        lastUpdated: new Date(),
      }
    };
  }
  
  private normalizeName(name: string): string {
    // Remove common suffixes like "e.V." and standardize format
    return name
      .replace(/\\s+e\\.V\\.(\\s+|$)/i, '')
      .replace(/\\s+/g, ' ')
      .trim();
  }
  
  private cleanText(text: string): string {
    return text
      .replace(/\\s+/g, ' ')
      .trim();
  }
  
  private formatAddress(address: string): string {
    // Standardize address format
    return address
      .replace(/\\n+/g, ', ')
      .replace(/\\s+/g, ' ')
      .trim();
  }
  
  private normalizeUrl(url: string): string {
    if (!url) return '';
    
    try {
      // Ensure URL has protocol
      if (!url.startsWith('http')) {
        url = 'https://' + url;
      }
      
      const parsedUrl = new URL(url);
      return parsedUrl.toString();
    } catch {
      return '';
    }
  }
  
  private extractCategories(description: string): CharityCategory[] {
    const categoryKeywords: Record<CharityCategory, string[]> = {
      'HEALTH': ['health', 'medical', 'disease', 'hospital', 'patient'],
      'EDUCATION': ['education', 'school', 'learning', 'student', 'teaching'],
      'ENVIRONMENT': ['environment', 'climate', 'nature', 'conservation', 'sustainable'],
      'HUMANITARIAN': ['humanitarian', 'aid', 'relief', 'emergency', 'disaster'],
      'ANIMAL_WELFARE': ['animal', 'wildlife', 'protection', 'species', 'welfare'],
      'HUMAN_RIGHTS': ['rights', 'justice', 'equality', 'freedom', 'advocacy'],
      'POVERTY': ['poverty', 'homeless', 'hunger', 'food', 'shelter'],
      'OTHER': []
    };
    
    const descriptionLower = description.toLowerCase();
    const matchedCategories: CharityCategory[] = [];
    
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (category === 'OTHER') continue;
      
      const hasMatch = keywords.some(keyword => descriptionLower.includes(keyword));
      if (hasMatch) {
        matchedCategories.push(category as CharityCategory);
      }
    }
    
    // If no categories matched, assign OTHER
    if (matchedCategories.length === 0) {
      matchedCategories.push('OTHER');
    }
    
    return matchedCategories;
  }
}`,
      },
      {
        id: "database-service",
        title: "Database Service",
        description:
          "Handles storing and retrieving charity data from the database.",
        language: "typescript",
        code: `import { PrismaClient } from '@prisma/client';
import { Charity } from '../types/charity';
import { Logger } from '../utils/logger';

export class CharityDatabaseService {
  private readonly prisma: PrismaClient;
  private readonly logger: Logger;
  
  constructor(logger: Logger) {
    this.prisma = new PrismaClient();
    this.logger = logger;
  }
  
  async saveCharities(charities: Charity[]): Promise<void> {
    this.logger.info(\`Saving \${charities.length} charities to database\`);
    
    for (const charity of charities) {
      await this.saveCharity(charity);
    }
  }
  
  private async saveCharity(charity: Charity): Promise<void> {
    try {
      // Check if charity already exists
      const existing = await this.prisma.charity.findFirst({
        where: {
          name: charity.name,
        },
      });
      
      if (existing) {
        // Update existing charity
        await this.prisma.charity.update({
          where: { id: existing.id },
          data: {
            description: charity.description,
            isCertified: charity.isCertified,
            certificationStatus: charity.certificationStatus,
            contactAddress: charity.contactInfo.address,
            contactWebsite: charity.contactInfo.website,
            contactEmail: charity.contactInfo.email,
            updatedAt: new Date(),
            metadata: charity.metadata,
          },
        });
        
        // Update categories
        await this.prisma.charityCategory.deleteMany({
          where: { charityId: existing.id },
        });
        
        await this.prisma.charityCategory.createMany({
          data: charity.categories.map(category => ({
            charityId: existing.id,
            category,
          })),
        });
        
        this.logger.info(\`Updated charity: \${charity.name}\`);
      } else {
        // Create new charity
        const created = await this.prisma.charity.create({
          data: {
            name: charity.name,
            description: charity.description,
            isCertified: charity.isCertified,
            certificationStatus: charity.certificationStatus,
            contactAddress: charity.contactInfo.address,
            contactWebsite: charity.contactInfo.website,
            contactEmail: charity.contactInfo.email,
            metadata: charity.metadata,
          },
        });
        
        // Add categories
        await this.prisma.charityCategory.createMany({
          data: charity.categories.map(category => ({
            charityId: created.id,
            category,
          })),
        });
        
        this.logger.info(\`Created new charity: \${charity.name}\`);
      }
    } catch (error) {
      this.logger.error(\`Failed to save charity: \${charity.name}\`, { error });
      throw error;
    }
  }
  
  async getCharities(filters?: {
    isCertified?: boolean;
    categories?: string[];
  }): Promise<Charity[]> {
    const where: any = {};
    
    if (filters?.isCertified !== undefined) {
      where.isCertified = filters.isCertified;
    }
    
    if (filters?.categories && filters.categories.length > 0) {
      where.categories = {
        some: {
          category: {
            in: filters.categories,
          },
        },
      };
    }
    
    const charities = await this.prisma.charity.findMany({
      where,
      include: {
        categories: true,
      },
    });
    
    return charities.map(dbCharity => ({
      name: dbCharity.name,
      description: dbCharity.description,
      isCertified: dbCharity.isCertified,
      certificationStatus: dbCharity.certificationStatus,
      categories: dbCharity.categories.map(c => c.category as CharityCategory),
      contactInfo: {
        address: dbCharity.contactAddress,
        website: dbCharity.contactWebsite,
        email: dbCharity.contactEmail,
      },
      metadata: dbCharity.metadata as any,
    }));
  }
  
  async close(): Promise<void> {
    await this.prisma.$disconnect();
  }
}`,
      },
    ],
  },
];
