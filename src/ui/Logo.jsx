import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/users"}>
      <h3 className="text-2xl font-bold text-stone-50">UsersLab.Co</h3>
    </Link>
  );
}
