import "./style.css";
import moment from "moment";

function AppointementItem({ appointement, onAppointementDeleted }) {
  return (
    <div className="event-item">
      <span
        className="delete-event"
        onClick={() => onAppointementDeleted(appointement.id)}
      >
        X
      </span>
      <div className="event-title"> {appointement.title}</div>
      <div className="event-date">
        {moment(appointement.start).format("DD/MM/YYYY")}
      </div>
    </div>
  );
}

export default AppointementItem;
