import CalendarView from "../components/Calendar/CalendarView";
import Navbar from "../components/Navbar/Navbar";
import "./DashboardGC.css";

function DashboardGC() {
  return (
    <>
    <Navbar/>

    <div className="dashboard">

      {/* MAIN */}
      <div className="calendarbody">
        <CalendarView />
      </div>

    </div>
    </>

  );
}

export default DashboardGC;
