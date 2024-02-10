import Logo from "./Logo";

export default function Header() {
  return (
    <header className="h-[70px] bg-slate-800 flex justify-between items-center px-4">
      <Logo />
    </header>
  );
}
