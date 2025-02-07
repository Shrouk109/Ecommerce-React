import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <>
      <div className="flex justify-center items-center">
        <ReactLoading type="spokes" color="#007bff" />
      </div>
    </>
  );
}
