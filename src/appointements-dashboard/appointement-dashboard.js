import React, { Children } from "react";
import "./style.css";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { uid } from "uid";
import AppointementItem from "../appointement-item/appointement-item";
import { filter } from "lodash";

const localizer = momentLocalizer(moment);

function AddAppointementModal({
  showModal,
  onCloseModal,
  onAppointementAdded,
}) {
  const [appointementTitle, setAppointementTitle] = useState();
  return (
    <>
      <Modal show={showModal}>
        <Modal.Header>Create Appointement</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicAppointementTitle">
              <Form.Label>Appointement Title</Form.Label>
              <Form.Control
                placeholder="Enter Appointement Title"
                onChange={(event) => {
                  setAppointementTitle(event.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              const appointement = {
                id: uid(16),
                title: appointementTitle,
                allDay: true,
                start: new Date(),
                end: new Date(),
              };
              onAppointementAdded(appointement);
              onCloseModal();
            }}
          >
            Create Appointement
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

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
            Add Appointement
          </Button>
          <AddAppointementModal
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
