import './Body.css';
import HomeCard from '../../uitl/HomeCard';

function Body(props: any) {
  function handleTogglePopup() {
    props.setTogglePopup(!props.togglePopup);
  }

  return (
    <div className="flex justify-center items-center">
      <div className="gap-4 flex justify-center items-center">
        {/* <a onClick={handleTogglePopup} className="w-[26rem] h-[26rem] text-2xl text-[#2e1065] flex justify-center items-center rounded-xl shadow-[1px_2px_2rem_rgba(95,0,156,0.4)] border-4 border-[#2e1065] cursor-pointer">
          Add Words
        </a>
        <a className="w-[26rem] h-[26rem] text-2xl text-[#2e1065] flex justify-center items-center rounded-xl shadow-[1px_2px_2rem_rgba(95,0,156,0.4)] border-4 border-[#2e1065]" href="/words">
          Word Lists
        </a>
        <a className="w-[26rem] h-[26rem] text-2xl text-[#2e1065] flex justify-center items-center rounded-xl shadow-[1px_2px_2rem_rgba(95,0,156,0.4)] border-4 border-[#2e1065] cursor-pointer">
          Quiz Word
        </a> */}
        <HomeCard onClick={handleTogglePopup}>Add Word</HomeCard>
        <HomeCard href="/words">Word Lists</HomeCard>
        <HomeCard >Quiz Word</HomeCard>

      </div>
    </div>
  );
}

export default Body;
