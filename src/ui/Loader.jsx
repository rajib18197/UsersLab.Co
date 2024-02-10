import { LuLoader } from "react-icons/lu";

function Loader() {
  return (
    <div className="flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="spinner">
        <LuLoader />
      </div>
    </div>
  );
}

export default Loader;
