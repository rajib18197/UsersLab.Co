import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useReducer } from "react";
import { formReducer } from "./formReducer";
import {
  hasErrorMessage,
  isFieldEmpty,
  isFieldTouched,
} from "../../utils/helpers";

export default function AddNewUser({ onCloseModal }) {
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

    // 3) If the currently typing input field's name is [tags] then set action object's payload property to diferent value as it would be an array which means we need to modify the [e.target.value].
    if (e.target.name === "tags") {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          inputField: e.target.name,
          value: e.target.value.split(","),
        },
      });
      return;
    }

    // 4) For other input fields set the payload to as it is as we don't need to modify [e.target.value];
    dispatch({
      type: "CHANGE_INPUT",
      payload: { inputField: e.target.name, value: e.target.value },
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

    // 3) If everything is fine then create a new Task and dispatch either EDIT_TASK or ADD_NEW_TASK based on the mode

    const newUser = {
      id: crypto.randomUUID(),
      firstName: formState.firstName.value,
      lastName: formState.lastName.value,
      email: formState.email.value,
      address: formState.address.value,
      companyName: formState.companyName.value,
    };

    console.log(newUser);
    // 4) Finally, Close the modal window after the task has successfully created or edited
    onCloseModal();
  }

  const { firstName, lastName, email, address, companyName } = formState;

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

      <div className="flex gap-2 justify-end items-center">
        <Button onClick={onCloseModal} type="secondary">
          Cancel
        </Button>
        <Button type="primary">Add New User</Button>
      </div>
    </form>
  );
}
