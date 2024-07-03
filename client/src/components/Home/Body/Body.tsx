import './Body.css';

function Body(props: any) {
  function handleTogglePopup() {
    props.setTogglePopup(!props.togglePopup);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="font-mono font-bold border rounded-full p-[6rem] py-[6.5rem] bg-white border-black mb-20 shadow-lg">
        User
      </div>
      <div className="grid gap-4 grid-cols-1">
        <a onClick={handleTogglePopup} className="button-body cursor-pointer" >
          Add Words
        </a>
        <a className="button-body" href="/words">Word Lists</a>
        <a className="button-body cursor-pointer">Quiz Word</a>
      </div>
    </div>
  );
}

export default Body;
