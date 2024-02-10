import { useReducer } from "react";
import { formReducer } from "../features/users/formReducer";
import {
  hasErrorMessage,
  isFieldEmpty,
  isFieldTouched,
} from "../utils/helpers";

export function useFormData() {
  const [formState, dispatch] = useReducer(formReducer, {
    title: {
      value: todoToEdit?.title || "",
      error: "",
      isTouched: false,
    },

    description: {
      value: todoToEdit?.description || "",
      error: "",
      isTouched: false,
    },

    tags: {
      value: todoToEdit?.tags || [],
      error: "",
      isTouched: false,
    },

    priority: {
      value: todoToEdit?.priority || "",
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
            value:
              value === "tags"
                ? formState[value].value.join(",")
                : formState[value].value,
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

    // 3) If No field is empty and No field contains error message, It means the user currently open the form for editing an existing task but without editing anything, he/she wants to submit the form. In that case show them an toast message.

    if (!isFieldTouched(formState)) {
      toast.error(
        "You have not edited anything. Change something to update your task!"
      );
      return;
    }

    // 4) If everything is fine then create a new Task and dispatch either EDIT_TASK or ADD_NEW_TASK based on the mode

    const task = {
      id: isEditSession ? todoToEdit.id : crypto.randomUUID(),
      title: formState.title.value,
      description: formState.description.value,
      tags: formState.tags.value.map((el) => el.trim()).filter(Boolean),
      priority: formState.priority.value,
    };

    if (isEditSession) {
      onEditTodo({ type: "EDIT_TODO", payload: task });
    } else {
      onAddTask({ type: "ADD_NEW_TODO", payload: task });
    }

    // 5) Finally, Close the modal window after the task has successfully created or edited
    onCloseModal();
  }
}
