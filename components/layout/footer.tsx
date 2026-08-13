import Image from 'next/image';
import {useTranslations} from 'next-intl';
import logo from '@/assets/brand/logos/logo-white-transparency.svg';
import {Link} from '@/i18n/routing';
import {HashAnchorLink} from '@/components/navigation/hash-anchor-link';
import {productionContactInfo} from '@/lib/contact/rfq-contact-page';
import {ProjectFilterLink} from '@/components/projects/project-filter-link';
import {FooterContactLinks} from '@/components/layout/footer-contact-links';

export function Footer() {
  const footer = useTranslations('footer');
  const localizedAddress = footer.has('address') ? footer('address') : productionContactInfo.address;

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
            <ProjectFilterLink filter="sandwich" className="site-footer__link">{footer('projectsSandwich')}</ProjectFilterLink>
            <ProjectFilterLink filter="standing" className="site-footer__link">{footer('projectsZipRoofing')}</ProjectFilterLink>
            <ProjectFilterLink filter="transparent-roofing" className="site-footer__link">{footer('projectsGlass')}</ProjectFilterLink>
            <ProjectFilterLink filter="cladding" className="site-footer__link">{footer('projectsCladding')}</ProjectFilterLink>
            <ProjectFilterLink filter="all" className="site-footer__link">{footer('projectsAll')}</ProjectFilterLink>
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
              <FooterContactLinks
                contact={productionContactInfo}
                labels={{
                  phone: footer('phoneLabel'),
                  whatsapp: footer('whatsappLabel'),
                  email: footer('emailLabel')
                }}
              />
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
