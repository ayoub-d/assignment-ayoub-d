import "./style.css";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Button from "react-bootstrap/Button";
import AppointementItem from "../appointement-item/appointement-item";
import { filter, find } from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import CreateAppointementModal from "../create-appointement-modal/create-appointement-modal";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

function AppointementsDashboard() {
  const [showAddAppointementModal, setShowAddAppointementModal] = useState(
    false
  );
  const [appointements, setappointements] = useState([]);

  const handleAppointementAdded = (appointement) => {
    appointements.push(appointement);
  };
  const handleAppointementDeleted = (id) => {
    setappointements(
      filter(appointements, (appointement) => appointement.id !== id)
    );
  };

  const onAppointementDrop = ({ event, start, end }) => {
    const appointementIndex = appointements.indexOf(event);
    const updatedAppointement = { ...event, start, end };

    const nextAppointements = [...appointements];
    nextAppointements.splice(appointementIndex, 1, updatedAppointement);

    setappointements(nextAppointements);
  };

  return (
    <div>
      <div className="page-title">Appointements Dashboard</div>
      <div className="container">
        <div className="events-list">
          <div className="section">Secheduled Events</div>
          <Button
            variant="success"
            onClick={() => setShowAddAppointementModal(true)}
          >
            Create Appointement
          </Button>
          <CreateAppointementModal
            showModal={showAddAppointementModal}
            onCloseModal={() => {
              setShowAddAppointementModal(false);
            }}
            onAppointementAdded={handleAppointementAdded}
          />
          {appointements.map((appointement) => (
            <AppointementItem
              appointement={appointement}
              onAppointementDeleted={handleAppointementDeleted}
            />
          ))}
        </div>
        <div className="calandar">
          <DragAndDropCalendar
            onEventDrop={onAppointementDrop}
            localizer={localizer}
            events={appointements}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            defaultDate={new Date()}
          />
        </div>
      </div>
    </div>
  );
}

export default AppointementsDashboard;
