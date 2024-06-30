import Button from "../uitl/Button";

function Body(props: any) {
  function handleTogglePopup() {
    props.setTogglePopup(!props.togglePopup);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="font-mono font-bold border rounded-full p-12 bg-white border-black mb-20">
        User
      </div>
      <div className="grid gap-4 grid-cols-1 ">
        <Button onClick={handleTogglePopup} textCol={"text-purple-500"}>
          Add Words
        </Button>
        <Button textCol={"text-red-500"}>Word Lists</Button>
        <Button textCol={"text-green-500"}>Quiz Word</Button>
      </div>
    </div>
  );
}

export default Body;
