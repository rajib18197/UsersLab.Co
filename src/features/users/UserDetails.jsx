import { useParams } from "react-router-dom";
import { useUsersData } from "../../hooks/useUsersData";
import { getUser } from "../../services/apiUsers";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

export default function UserDetails() {
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useUsersData({ id, service: getUser });

  if (isLoading) return <h2>Loading</h2>;

  if (isError) return <h2>{error}</h2>;
  console.log(user);
  const {
    id: userId,
    image: avatar,
    firstName,
    lastName,
    email,
    address: { address, city } = {},
    company: { name: companyName } = {},
  } = user || {};

  return (
    <div className="my-6 border-2 p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <Heading as={"h2"}>User Id #{userId}</Heading>
        <Button to={-1} type="small">
          Back
        </Button>
      </div>

      <div className="flex flex-col gap-8">
        <div className="bg-purple-600 text-stone-50 px-6 py-1 rounded flex flex-wrap justify-center md:justify-between items-center">
          <div className="flex gap-4 items-center p-2">
            <div className="w-[70px] h-[70px] rounded-full bg-stone-800 flex items-center justify-center">
              <img
                src={avatar}
                alt=""
                className="w-[55px] h-[55px] object-cover"
              />
            </div>
            <Heading as="h2">
              {firstName} {lastName}
            </Heading>
          </div>
          <p className="text-xl ">
            Email: <strong className="text-stone-100">{email}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <p className="text-xl">{address}</p>
          <p className="hidden sm:text-2xl sm:block">&bull;</p>
          <p className="text-xl">{city} City</p>
          <p className="hidden sm:text-2xl sm:block">&bull;</p>
          <p className="text-xl">{companyName}</p>
        </div>
      </div>
    </div>
  );
}
