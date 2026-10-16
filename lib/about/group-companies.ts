import type {StaticImageData} from 'next/image';
import fazasazehLogo from '@/assets/about/group/fazasazeh.webp';
import avizsazehLogo from '@/assets/about/group/avizsazeh.webp';
import aisanaatLogo from '@/assets/about/group/aisanaat.webp';
import ahanassaLogo from '@/assets/about/group/ahanassa.webp';

export type GroupCompanyId = 'fazasazeh' | 'avizsazeh' | 'aisanaat' | 'ahanassa';

export type GroupCompany = {
  id: GroupCompanyId;
  href: string;
  domain: string;
  logo: StaticImageData;
};

// Sister companies of the SIPANEL group. Display names/descriptions live in messages (`groupCompanies`).
export const groupCompanies: GroupCompany[] = [
  {id: 'fazasazeh', href: 'https://www.fazasazeh.ir', domain: 'fazasazeh.ir', logo: fazasazehLogo},
  {id: 'avizsazeh', href: 'https://avizsazeh.com', domain: 'avizsazeh.com', logo: avizsazehLogo},
  {id: 'aisanaat', href: 'https://aisanaat.ir', domain: 'aisanaat.ir', logo: aisanaatLogo},
  {id: 'ahanassa', href: 'https://ahanassa.com', domain: 'ahanassa.com', logo: ahanassaLogo}
];
