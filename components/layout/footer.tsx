import Image from 'next/image';
import {useTranslations} from 'next-intl';
import logo from '@/assets/brand/logos/logo-white-transparency.svg';
import {LtrText} from '@/components/bidi/ltr-text';
import {Link} from '@/i18n/routing';
import {HashAnchorLink} from '@/components/navigation/hash-anchor-link';
import {productionContactInfo} from '@/lib/contact/rfq-contact-page';

export function Footer() {
  const footer = useTranslations('footer');
  const localizedAddress = footer.has('address') ? footer('address') : productionContactInfo.address;
  const phoneHref = `tel:${productionContactInfo.phone}`;
  const whatsappHref = `https://wa.me/${productionContactInfo.whatsapp.replace(/\D/g, '')}`;

  return (
    <footer className="site-footer">
      <div className="site-footer__accent" aria-hidden="true" />
      <div className="container-shell site-footer__inner">
        <div className="site-footer__brand">
          <Link href="/" className="footer-logo" aria-label="SIPANEL home">
            <Image src={logo} alt="SIPANEL" width={1547} height={330} className="footer-logo__image" />
          </Link>
          <p className="site-footer__slogan">ENGINEERING POWER. CONTROLLED EXECUTION.</p>
        </div>

        <nav className="site-footer__columns" aria-label={footer('navigationLabel')}>
          <div className="site-footer__column">
            <h2>{footer('systems')}</h2>
            <Link href="/systems/sandwich-panel-systems" className="site-footer__link">{footer('systemsSandwich')}</Link>
            <Link href="/systems/standing-seam-zip-tech-roofing" className="site-footer__link">{footer('systemsStanding')}</Link>
            <Link href="/systems/aluminium-cladding-covering" className="site-footer__link">{footer('systemsCladding')}</Link>
            <Link href="/systems/daylighting-transparent-roofing" className="site-footer__link">{footer('systemsDaylighting')}</Link>
          </div>

          <div className="site-footer__column">
            <h2>{footer('projects')}</h2>
            <Link href="/projects" className="site-footer__link">{footer('projectsSandwich')}</Link>
            <Link href="/projects" className="site-footer__link">{footer('projectsZipRoofing')}</Link>
            <Link href="/projects" className="site-footer__link">{footer('projectsGlass')}</Link>
            <Link href="/projects" className="site-footer__link">{footer('projectsCladding')}</Link>
            <Link href="/projects" className="site-footer__link">{footer('projectsAll')}</Link>
          </div>

          <div className="site-footer__column">
            <h2>{footer('company')}</h2>
            <Link href="/about" className="site-footer__link">{footer('companyAbout')}</Link>
            <HashAnchorLink href="/#process" className="site-footer__link">{footer('companyProcess')}</HashAnchorLink>
            <Link href="/contact" className="site-footer__link">{footer('companyContact')}</Link>
          </div>

          <div className="site-footer__column site-footer__contact">
            <h2>{footer('contact')}</h2>
            <Link href="/contact" className="site-footer__review-link">
              {footer('requestReview')}
            </Link>
            <address className="site-footer__address-list">
              <span className="site-footer__address-item site-footer__address-item--address">
                <span className="site-footer__address-label">{footer('addressLabel')}</span>
                <span className="site-footer__address-value">{localizedAddress}</span>
              </span>
              <a href={phoneHref} className="site-footer__address-item">
                <span className="site-footer__address-label">{footer('phoneLabel')}</span>
                <LtrText className="site-footer__address-value">{productionContactInfo.phone}</LtrText>
              </a>
              <a href={whatsappHref} className="site-footer__address-item">
                <span className="site-footer__address-label">{footer('whatsappLabel')}</span>
                <LtrText className="site-footer__address-value">{productionContactInfo.whatsapp}</LtrText>
              </a>
              <a href={`mailto:${productionContactInfo.email}`} className="site-footer__address-item">
                <span className="site-footer__address-label">{footer('emailLabel')}</span>
                <LtrText className="site-footer__address-value">{productionContactInfo.email}</LtrText>
              </a>
            </address>
          </div>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <div className="container-shell site-footer__bottom-inner">
          <span>{footer('copyright')}</span>
          <div className="site-footer__bottom-links">
            <span>{footer('privacy')}</span>
            <span>{footer('terms')}</span>
            <a href="/sitemap.xml" className="site-footer__bottom-link">{footer('sitemap')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
