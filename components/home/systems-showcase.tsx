import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
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
        </header>

        <div className="systems-showcase__grid">
          {systems.map((system) => (
            <Link href={system.href} className="systems-showcase__card" key={system.id}>
              <div className="systems-showcase__card-image">
                <Image
                  src={system.image}
                  alt={t(system.nameKey)}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="systems-showcase__card-img"
                />
              </div>
              <div className="systems-showcase__card-body">
                <h3>{t(system.nameKey)}</h3>
                <p>{t(system.descKey)}</p>
                <span className="systems-showcase__card-action">{t('learnMore')}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
