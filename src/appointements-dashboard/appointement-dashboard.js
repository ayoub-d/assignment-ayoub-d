import "./style.css";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import AppointementItem from "../appointement-item/appointement-item";
import { filter } from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import CreateAppointementModal from "../create-appointement-modal/create-appointement-modal";

const localizer = momentLocalizer(moment);

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
          {appointements.map((appointement, index) => (
            <AppointementItem
              appointement={appointement}
              onAppointementDeleted={handleAppointementDeleted}
            />
          ))}
        </div>
        <div className="calandar">
          <Calendar
            localizer={localizer}
            events={appointements}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </div>
    </div>
  );
}

export default AppointementsDashboard;
