import PowerMonImg from "../../../assets/Images/PowerMon.png"
export default function Header() {
  return(
    <div className="flex justify-between bg-yellow-100 p-4 rounded items-ceneter">
      <div className="flex gap-2 items-center">
        <img src={PowerMonImg} alt="" className="w-10 h-10"/>
        <div>
          <h2 className="font-semibold">Powermon Paused</h2>
          <p className="text-sm font-semibold">Powermon Window: 6:00 AM - 6:34 AM</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="bg-blue-400 text-white rounded py-1 px-4 w-18 h-10">Start Schedule</button>
        <button className="bg-red-400 text-white px-2 py-1 rounded w-18 h-10">Abort</button>
      </div>
    </div>
  );
}