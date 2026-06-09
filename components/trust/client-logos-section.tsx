import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {clientLogos} from '@/lib/trust/client-logos';
import {ClientLogosCarouselScroll} from '@/components/trust/client-logos-carousel-scroll';

type Props = {
  variant?: 'grid' | 'carousel';
};

function LogoCard({logo, index}: {logo: (typeof clientLogos)[number]; index: number}) {
  return (
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
  );
}

export function ClientLogosSection({variant = 'grid'}: Props) {
  const t = useTranslations('clientLogos');

  if (variant === 'carousel') {
    return (
      <section className="client-logos-section client-logos-section--carousel" aria-label={t('title')}>
        <div className="container-shell client-logos-carousel__header">
          <p className="client-logos-carousel__note">{t('description')}</p>
        </div>
        <div className="client-logos-carousel">
          <ClientLogosCarouselScroll>
            {clientLogos.map((logo, index) => (
              <LogoCard logo={logo} index={index} key={logo.id} />
            ))}
          </ClientLogosCarouselScroll>
        </div>
      </section>
    );
  }

  return (
    <section className="client-logos-section" aria-labelledby="client-logos-title">
      <div className="container-shell client-logos-section__inner">
        <header className="client-logos-section__header">
          <h2 id="client-logos-title">{t('title')}</h2>
          <p className="client-logos-description">{t('description')}</p>
        </header>

        <div className="client-logos-grid">
          {clientLogos.map((logo, index) => (
            <LogoCard logo={logo} index={index} key={logo.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
