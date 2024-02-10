function validateInputField(field, value) {
  if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
    return "Please provide a valid email address";
  }

  if (field !== "email" && value === "") {
    return `${field[0].toUpperCase() + field.slice(1)} cannot be empty`;
  }

  return "";
}

export function formReducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT": {
      const key = action.payload.inputField;

      return {
        ...state,
        [key]: {
          ...state[key],
          value: action.payload.value,
        },
      };
    }

    case "CHANGE_ERROR": {
      const validationMessage = validateInputField(
        action.payload.inputField,
        action.payload.value
      );

      return {
        ...state,
        [action.payload.inputField]: {
          ...state[action.payload.inputField],
          error: validationMessage,
        },
      };
    }

    case "RESET_INPUT_ERROR": {
      return {
        ...state,
        [action.payload.inputField]: {
          ...state[action.payload.inputField],
          error: "",
        },
      };
    }

    case "INPUT_TOUCHED":
      return {
        ...state,
        [action.payload.inputField]: {
          ...state[action.payload.inputField],
          isTouched: true,
        },
      };
  }
}
