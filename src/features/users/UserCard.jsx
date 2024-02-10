import { FaRegAddressCard } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

export default forwardRef(function UserCard({ user }, ref) {
  const {
    id,
    image: avatar,
    firstName,
    lastName,
    email,
    address: { address, city },
    company: { name: companyName },
  } = user;

  const navigate = useNavigate();

  function handleClick() {
    if (!user.age) return;

    navigate(`/users/${id}`);
  }

  return (
    <div
      className="bg-[hsl(0deg, 0%, 100%)] shaodow-cs text-stone-800 p-8 pb-16 max-w-[365px] rounded flex flex-col gap-6"
      ref={ref}
    >
      <div className="bg-slate-800 p-2 flex items-center justify-center w-max">
        <img
          src={avatar}
          alt={`Avatar of ${firstName} ${lastName}`}
          className="h-16 w-16"
        />
      </div>

      <div
        className="bg-slate-800 text-slate-50 p-4 w-[85%] rounded cursor-pointer"
        onClick={handleClick}
      >
        <h3 className="uppercase text-xl">{firstName}</h3>
        <h3 className="uppercase text-xl">{lastName}</h3>
      </div>

      <div className="flex flex-col gap-6 py-8">
        <Info icon={<AiOutlineMail />}>
          <strong className="underline text-blue-600">{email}</strong>
        </Info>

        <Info icon={<FaRegAddressCard />}>
          <strong>{address}</strong>, {city}
        </Info>

        <Info icon={<GoOrganization />}>
          <strong>{companyName}</strong>
        </Info>
      </div>
    </div>
  );
});

function Info({ icon, children }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{children}</span>
    </div>
  );
}
