import HeaderLogo, { HeaderTail } from './client-header';

async function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-300 px-4 dark:border-gray-600">
      <HeaderLogo />

      <div className="flex items-center gap-2">
        <HeaderTail />
      </div>
    </header>
  );
}

export default Header;
