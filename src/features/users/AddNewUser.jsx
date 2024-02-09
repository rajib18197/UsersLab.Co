import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Heading from "../../ui/Heading";

export default function AddNewUser({ onCloseModal }) {
  return (
    <form className="flex flex-col gap-8">
      <div className="flex gap-3 items-center w-full">
        <FormRow label="First Name">
          <Input type="text" id="name" />
        </FormRow>

        <FormRow label="Last Name">
          <Input type="text" id="name" />
        </FormRow>
      </div>
      <FormRow label="Email">
        <Input type="text" id="name" />
      </FormRow>
      <FormRow label="Address">
        <Input type="text" id="name" />
      </FormRow>
      <FormRow label="Company Name">
        <Input type="text" id="name" />
      </FormRow>

      <div className="flex gap-2 justify-end items-center">
        <Button onClick={onCloseModal} type="secondary">
          Cancel
        </Button>
        <Button type="primary">Add New User</Button>
      </div>
    </form>
  );
}
