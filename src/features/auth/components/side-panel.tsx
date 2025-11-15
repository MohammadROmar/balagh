import FloatingIcon from '@/features/auth/components/floating-icon';
import LocationIcon from '@/assets/icons/location';
import WifiIcon from '@/assets/icons/wifi';
import PowerIcon from '@/assets/icons/power';
import ShieldIcon from '@/assets/icons/shield';
import UsersIcon from '@/assets/icons/users';
import Pattern from '@/assets/icons/pattern';
import type { TFunction } from '@/shared/models/tfunction';

type SidePanelProps = { t: TFunction<'loginPage'> };

function SidePanel({ t }: SidePanelProps) {
  return (
    <section className="bg-gradient relative hidden h-screen w-full flex-1 lg:flex lg:items-center lg:justify-center">
      <div className="selection:text-emerald-green! max-w-lg p-4 text-center text-balance text-white selection:bg-white">
        <h3 className="text-3xl font-bold">{t('description')}</h3>
        <p className="opacity-90">{t('actions')}</p>
      </div>

      <div className="pointer-events-none absolute size-full text-white select-none">
        <FloatingIcon
          icon={LocationIcon}
          className="top-20 ltr:left-16 rtl:right-16"
        />
        <FloatingIcon
          icon={WifiIcon}
          animationDelay="1.5s"
          className="top-60 ltr:left-1/3 rtl:right-1/3"
        />
        <FloatingIcon
          icon={PowerIcon}
          animationDelay="1s"
          className="top-40 ltr:right-20 rtl:left-20"
        />
        <FloatingIcon
          icon={ShieldIcon}
          animationDelay="2s"
          className="bottom-30 ltr:left-12 rtl:right-12"
        />
        <FloatingIcon
          icon={UsersIcon}
          animationDelay="0.5s"
          className="bottom-50 ltr:right-16 rtl:left-16"
        />

        <div className="absolute inset-x-0 bottom-0">
          <Pattern className="size-full opacity-20" />
        </div>
      </div>
    </section>
  );
}

export default SidePanel;
