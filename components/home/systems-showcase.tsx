import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {SystemsShowcaseCarousel} from '@/components/home/systems-showcase-carousel';
import sandwichPanelCover from '@/assets/systems/sandwich-panel/cover-desktop.webp';
import standingSeamCover from '@/assets/systems/standing-seam/cover-desktop.webp';
import aluminiumCladdingCover from '@/assets/systems/aluminium-claddin/cover-desktop.webp';
import daylightingCover from '@/assets/systems/transparent-roofing/cover-desktop.webp';

const systems = [
  {
    id: 'sandwich-panel',
    href: '/systems/sandwich-panel-systems',
    image: sandwichPanelCover,
    nameKey: 'sandwichPanel' as const,
    descKey: 'sandwichPanelDesc' as const
  },
  {
    id: 'standing-seam',
    href: '/systems/standing-seam-zip-tech-roofing',
    image: standingSeamCover,
    nameKey: 'standingSeam' as const,
    descKey: 'standingSeamDesc' as const
  },
  {
    id: 'aluminium-cladding',
    href: '/systems/aluminium-cladding-covering',
    image: aluminiumCladdingCover,
    nameKey: 'aluminiumCladding' as const,
    descKey: 'aluminiumCladdingDesc' as const
  },
  {
    id: 'daylighting-transparent',
    href: '/systems/daylighting-transparent-roofing',
    image: daylightingCover,
    nameKey: 'daylighting' as const,
    descKey: 'daylightingDesc' as const
  },
  {
    id: 'tensile-fabric',
    href: '/systems/tensile-fabric-membrane-structures',
    nameKey: 'tensileFabric' as const,
    descKey: 'tensileFabricDesc' as const
  },
  {
    id: 'retractable-roof',
    href: '/systems/retractable-roof-covering-systems',
    nameKey: 'retractableRoof' as const,
    descKey: 'retractableRoofDesc' as const
  },
  {
    id: 'etfe',
    href: '/systems/etfe-roof-facade-systems',
    nameKey: 'etfe' as const,
    descKey: 'etfeDesc' as const
  }
] as const;

export function SystemsShowcase() {
  const t = useTranslations('systemsShowcase');

  return (
    <section className="systems-showcase" aria-labelledby="systems-showcase-title">
      <div className="container-shell systems-showcase__inner">
        <header className="systems-showcase__header">
          <h2 id="systems-showcase-title">{t('title')}</h2>
          <p>{t('description')}</p>
          <p className="systems-showcase__intro-link">
            {t('introText')} <Link href="/systems">{t('introCta')}</Link>
          </p>
        </header>

        <SystemsShowcaseCarousel previousLabel={t('previousLabel')} nextLabel={t('nextLabel')}>
          {systems.map((system) => (
            <Link href={system.href} className="systems-showcase__card" key={system.id}>
              <div className="systems-showcase__card-image">
                {'image' in system ? (
                  <Image
                    src={system.image}
                    alt={t(system.nameKey)}
                    fill
                    sizes="(max-width: 767px) 78vw, (max-width: 1024px) 40vw, 320px"
                    className="systems-showcase__card-img"
                  />
                ) : (
                  <div className="systems-showcase__pending-img" aria-label={t(system.nameKey)} role="img">
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </div>
              <div className="systems-showcase__card-body">
                <h3>{t(system.nameKey)}</h3>
                <p>{t(system.descKey)}</p>
                <span className="systems-showcase__card-action">{t('learnMore')}</span>
              </div>
            </Link>
          ))}
        </SystemsShowcaseCarousel>
      </div>
    </section>
  );
}
