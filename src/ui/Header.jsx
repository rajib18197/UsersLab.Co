import AddNewUser from "../features/users/AddNewUser";
import Button from "./Button";
import Logo from "./Logo";
import Modal from "./Modal";

export default function Header() {
  return (
    <header className="h-[70px] bg-rose-600 flex justify-between items-center px-4">
      <Logo />

      <Modal>
        <Modal.Open opens="add-new-user">
          {(handler) => (
            <Button type="primary" onClick={handler}>
              Add New User
            </Button>
          )}
        </Modal.Open>
        <Modal.Window windowName="add-new-user">
          {({ onCloseModal }) => <AddNewUser onCloseModal={onCloseModal} />}
        </Modal.Window>
      </Modal>
    </header>
  );
}
