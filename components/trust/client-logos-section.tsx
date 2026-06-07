import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {clientLogos} from '@/lib/trust/client-logos';

export function ClientLogosSection() {
  const t = useTranslations('clientLogos');

  return (
    <section className="client-logos-section" aria-labelledby="client-logos-title">
      <div className="container-shell client-logos-section__inner">
        <header className="client-logos-section__header">
          <p className="client-logos-eyebrow">{t('eyebrow')}</p>
          <h2 id="client-logos-title">{t('title')}</h2>
          <p className="client-logos-description">{t('description')}</p>
        </header>

        <div className="client-logos-grid">
          {clientLogos.map((logo, index) => (
            <div className="client-logo-card" key={logo.id} style={{animationDelay: `${index * 60}ms`}}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                className="client-logo-card__image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
