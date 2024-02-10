import { useReducer } from "react";
import { formReducer } from "./formReducer";

import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { hasErrorMessage, isFieldEmpty } from "../../utils/helpers";

export default function AddNewUser({ onAddNewUser, onCloseModal }) {
  const [formState, dispatch] = useReducer(formReducer, {
    firstName: {
      value: "",
      error: "",
      isTouched: false,
    },

    lastName: {
      value: "",
      error: "",
      isTouched: false,
    },

    email: {
      value: "",
      error: "",
      isTouched: false,
    },

    address: {
      value: "",
      error: "",
      isTouched: false,
    },

    companyName: {
      value: "",
      error: "",
      isTouched: false,
    },

    avatar: {
      value: "",
      error: "",
      isTouched: false,
    },
  });

  function handleChange(e) {
    // 1) set the 'isTouched' property of the currently typing input field to true
    dispatch({
      type: "INPUT_TOUCHED",
      payload: { inputField: e.target.name },
    });

    // 2) Reset the 'error' property of the currently typing input field to empty string
    dispatch({
      type: "RESET_INPUT_ERROR",
      payload: { inputField: e.target.name },
    });

    // 3) For other input fields set the payload to as it is as we don't need to modify [e.target.value];
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        inputField: e.target.name,
        value: e.target.value,
      },
    });
  }

  function handleBlur(e) {
    // when one input field loose its focus then check if the user give the valid input or NOT
    dispatch({
      type: "CHANGE_ERROR",
      payload: { inputField: e.target.name, value: e.target.value },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // 1) If any input field is empty then set an error message for each input field.

    if (isFieldEmpty(formState)) {
      Object.keys(formState).forEach((value) => {
        dispatch({
          type: "CHANGE_ERROR",
          payload: {
            inputField: value,
            value: formState[value].value,
          },
        });
      });

      return;
    }

    // 2) If No field is empty, then check if one of the input field contains error message or Not

    if (hasErrorMessage(formState)) {
      console.log(formState);
      return;
    }

    // 3) If everything is fine then create a new User

    const [street, city] = formState.address.value.split(",");

    const newUser = {
      userIdCustom: crypto.randomUUID(),
      firstName: formState.firstName.value,
      lastName: formState.lastName.value,
      email: formState.email.value,
      address: { address: street, city },
      company: { name: formState.companyName.value },
      image: avatar.value,
    };

    console.log(newUser);

    onAddNewUser(newUser);

    // 4) Finally, Close the modal window after the user has successfully created
    onCloseModal();
  }

  const { firstName, lastName, email, address, companyName, avatar } =
    formState;

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="flex gap-6 items-center w-full">
        <FormRow label="First Name" error={firstName?.error} className="flex-1">
          <Input
            name="firstName"
            type="text"
            id="firstName"
            value={firstName.value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRow>

        <FormRow label="Last Name" error={lastName?.error} className="flex-1">
          <Input
            name="lastName"
            type="text"
            id="lastName"
            value={lastName.value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRow>
      </div>

      <FormRow label="Email" error={email?.error}>
        <Input
          name="email"
          type="text"
          id="email"
          value={email.value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormRow>

      <FormRow label="Address" error={address?.error}>
        <Input
          name="address"
          type="text"
          id="address"
          value={address.value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormRow>

      <FormRow label="Company Name" error={address?.error}>
        <Input
          name="companyName"
          type="text"
          id="companyName"
          value={companyName.value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormRow>

      <FormRow label="Avatar" error={avatar?.error}>
        <Input
          name="avatar"
          type="text"
          id="avatar"
          value={avatar.value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/* <input
          type="file"
          name="avatar"
          id="avatar"
          onChange={handleChange}
          className="input text-stone-800 block w-full text-sm border border-gray-300 cursor-pointer  focus:outline-none file:mr-5 file:py-1 file:px-3 file:bg-blue-600 file:border-none
          file:text-[16px] file:font-medium
          file:text-stone-100 file:rounded
          hover:file:cursor-pointer hover:file:bg-blue-800"
        /> */}
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
