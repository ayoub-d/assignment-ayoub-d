import "./style.css"
function AppointementItem({appointement, onAppointementDeleted}) {
  return (
    <div className="event-item">
      <span className="delete-event" onClick={() => onAppointementDeleted(appointement.id)}>X</span>
      <div className="event-title"> {appointement.title}</div>
      <div className="event-date">{appointement.start.toDateString()}</div>
    </div>
  );
}

export default AppointementItem;
