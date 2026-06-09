import Image from 'next/image';
import {useTranslations} from 'next-intl';
import logo from '@/assets/brand/logos/logo.png';
import {LtrText} from '@/components/bidi/ltr-text';
import {Link} from '@/i18n/routing';
import {productionContactInfo} from '@/lib/contact/rfq-contact-page';

const systemLinks = [{key: 'systems', href: '/systems'}] as const;
const projectLinks = [{key: 'projects', href: '/projects'}] as const;
const resourceLinks = ['resources'] as const;
const companyLinks = [
  {key: 'process', href: '/#process'},
  {key: 'about', href: '/about'}
] as const;

export function Footer() {
  const nav = useTranslations('nav');
  const footer = useTranslations('footer');
  const localizedAddress = footer.has('address') ? footer('address') : '';
  const phoneHref = `tel:${productionContactInfo.phone}`;
  const whatsappHref = `https://wa.me/${productionContactInfo.whatsapp.replace(/\D/g, '')}`;
  const contactLabels = {
    address: footer.has('addressLabel') ? footer('addressLabel') : 'Address',
    phone: footer.has('phoneLabel') ? footer('phoneLabel') : 'Phone',
    whatsapp: footer.has('whatsappLabel') ? footer('whatsappLabel') : 'WhatsApp',
    email: footer.has('emailLabel') ? footer('emailLabel') : 'Email'
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__accent" aria-hidden="true" />
      <div className="container-shell site-footer__inner">
        <div className="site-footer__brand">
          <Link href="/" className="footer-logo" aria-label="SIPANEL home">
            <Image src={logo} alt="SIPANEL" width={1547} height={330} className="footer-logo__image" />
          </Link>
          <p className="site-footer__slogan">ENGINEERING POWER. CONTROLLED EXECUTION.</p>
          <p className="site-footer__message">PRECISE DESIGN | SMART PROCUREMENT | ENGINEERED INSTALLATION</p>
        </div>

        <nav className="site-footer__columns" aria-label={footer('navigationLabel')}>
          <div className="site-footer__column">
            <h2>{footer('systems')}</h2>
            {systemLinks.map((item) => (
              /* track: footer_link_click */
              <Link key={item.key} href={item.href} className="site-footer__link">
                {nav(item.key)}
              </Link>
            ))}
          </div>

          <div className="site-footer__column">
            <h2>{footer('projects')}</h2>
            {projectLinks.map((item) => (
              /* track: footer_link_click */
              <Link key={item.key} href={item.href} className="site-footer__link">
                {nav(item.key)}
              </Link>
            ))}
          </div>

          <div className="site-footer__column">
            <h2>{footer('resources')}</h2>
            {resourceLinks.map((key) => (
              /* track: footer_link_click */
              <Link key={key} href="/resources" className="site-footer__link">
                {nav(key)}
              </Link>
            ))}
          </div>

          <div className="site-footer__column">
            <h2>{footer('company')}</h2>
            {companyLinks.map((item) => (
              /* track: footer_link_click */
              <Link key={item.key} href={item.href} className="site-footer__link">
                {nav(item.key)}
              </Link>
            ))}
          </div>

          <div className="site-footer__column site-footer__contact">
            <h2>{footer('contact')}</h2>
            <address className="site-footer__address-list">
              <span className="site-footer__address-item site-footer__address-item--address">
                <span className="site-footer__address-label">{contactLabels.address}</span>
                <span className="site-footer__address-value">{localizedAddress ? localizedAddress : productionContactInfo.address}</span>
              </span>
              {/* track: footer_contact_click */}
              <a href={phoneHref} className="site-footer__address-item">
                <span className="site-footer__address-label">{contactLabels.phone}</span>
                <LtrText className="site-footer__address-value">{productionContactInfo.phone}</LtrText>
              </a>
              {/* track: footer_contact_click */}
              <a href={whatsappHref} className="site-footer__address-item">
                <span className="site-footer__address-label">{contactLabels.whatsapp}</span>
                <LtrText className="site-footer__address-value">{productionContactInfo.whatsapp}</LtrText>
              </a>
              {/* track: footer_contact_click */}
              <a href={`mailto:${productionContactInfo.email}`} className="site-footer__address-item">
                <span className="site-footer__address-label">{contactLabels.email}</span>
                <LtrText className="site-footer__address-value">{productionContactInfo.email}</LtrText>
              </a>
              {/* track: footer_link_click */}
              <LtrText as="a" href={productionContactInfo.website} className="site-footer__address-item">
                {productionContactInfo.website.replace('https://', '')}
              </LtrText>
            </address>
          </div>
        </nav>
      </div>
    </footer>
  );
}
