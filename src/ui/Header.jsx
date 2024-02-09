import Button from "./Button";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="h-[70px] bg-rose-600 flex justify-between items-center px-4">
      <Logo />
      <Button type="primary">Add New User</Button>
    </header>
  );
}
