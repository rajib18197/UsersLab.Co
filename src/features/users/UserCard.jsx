import { FaRegAddressCard } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import { forwardRef } from "react";

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

  return (
    <div
      className="bg-[#101d37] text-stone-50 p-4 flex flex-col gap-6"
      ref={ref}
    >
      <div className="bg-orange-600 p-2 flex items-center justify-center w-max">
        <img
          src={avatar}
          alt={`Avatar of ${firstName} ${lastName}`}
          className="h-16 w-16"
        />
      </div>

      <div className="bg-stone-50 text-slate-800 p-4 w-[80%]">
        <h3 className="uppercase text-xl">{firstName}</h3>
        <h3 className="uppercase text-xl">{lastName}</h3>
      </div>

      <div className="flex flex-col gap-4 py-8">
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
