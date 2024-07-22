import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <div className="h-screen w-[100%] flex justify-center items-center flex-col">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="black"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      Loading...
    </div>
  );
}

export default Loader;
