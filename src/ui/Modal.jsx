import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, children }) {
  const { openName, open, close } = useContext(ModalContext);

  function handleClick() {
    console.log(1);
    openName === opens || openName !== "" ? close() : open(opens);
  }

  //   return cloneElement(children, { onClick: handleClick });
  return children(handleClick);
}

function Window({ windowName, height, children }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useRef();

  // Basically here we listen the click event in the capturing phase because when a user clicked modal button to open the modal, but that modal window shows for a couple of milliseconds and after that the window disappears strangely. That's because when we clicked a button to open the modal in the above [Open] component that clicked also open the modal window for just a milliseconds and then closes it immediately.  Since events bubbles in JavaScript (meaning parent element can recieve and handle event that occurs in the child elements as a target if both of those DOM elements listens the exact same event) and clicking the open modal button open the modal window for a ms and that click event also attached to the document therefore, that listeners detects that window is open and the closes the window immediately. there is multiple ways to solve it for example stops the event propagation or listen for the event in the capturing phase. In this case I listen for the event in the capturing phase to solve this issue.

  useEffect(
    function () {
      function handleClose(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }
      window.addEventListener("click", handleClose, true);

      return () => {
        window.removeEventListener("click", handleClose, true);
      };
    },
    [close]
  );

  if (openName !== windowName) return null;

  return createPortal(
    <div className="fixed inset-0 w-full h-full z-20">
      <div
        ref={ref}
        className={`fixed top-0 right-0 h-[100%] w-[80%] px-8 py-10 bg-gray-50 z-30 shadow-2xl  overflow-y-scroll scrollbar`}
      >
        <button
          onClick={close}
          className="absolute top-0 left-0 mx-8 text-2xl hover:text-indigo-800"
        >
          &times;
        </button>
        <div>{children({ onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
