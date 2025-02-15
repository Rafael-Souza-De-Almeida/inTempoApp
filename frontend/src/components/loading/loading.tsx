import { ClipLoader } from "react-spinners";

export function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="purple" size={50} />
    </div>
  );
}
