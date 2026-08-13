'use client';

import {LtrText} from '@/components/bidi/ltr-text';
import {trackContactClick} from '@/lib/analytics/events';
import type {ProductionContactInfo} from '@/lib/contact/rfq-contact-page';

type Props = {
  contact: ProductionContactInfo;
  labels: {
    phone: string;
    whatsapp: string;
    email: string;
  };
};

export function FooterContactLinks({contact, labels}: Props) {
  const phoneHref = `tel:${contact.phone}`;
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`;

  return (
    <>
      <a
        href={phoneHref}
        className="site-footer__address-item"
        data-analytics-event="phone_click"
        data-analytics-owner="application"
        data-analytics-component="footer_contact_phone"
        data-analytics-location="global_footer"
        data-analytics-label="phone"
        onClick={() => trackContactClick('phone', 'footer_contact_phone')}
      >
        <span className="site-footer__address-label">{labels.phone}</span>
        <LtrText className="site-footer__address-value">{contact.phone}</LtrText>
      </a>
      <a
        href={whatsappHref}
        className="site-footer__address-item"
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-event="whatsapp_click"
        data-analytics-owner="application"
        data-analytics-component="footer_contact_whatsapp"
        data-analytics-location="global_footer"
        data-analytics-label="whatsapp"
        onClick={() => trackContactClick('whatsapp', 'footer_contact_whatsapp')}
      >
        <span className="site-footer__address-label">{labels.whatsapp}</span>
        <LtrText className="site-footer__address-value">{contact.whatsapp}</LtrText>
      </a>
      <a
        href={`mailto:${contact.email}`}
        className="site-footer__address-item"
        data-analytics-event="email_click"
        data-analytics-owner="application"
        data-analytics-component="footer_contact_email"
        data-analytics-location="global_footer"
        data-analytics-label="email"
        onClick={() => trackContactClick('email', 'footer_contact_email')}
      >
        <span className="site-footer__address-label">{labels.email}</span>
        <LtrText className="site-footer__address-value">{contact.email}</LtrText>
      </a>
    </>
  );
}
