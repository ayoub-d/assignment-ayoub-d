import DatePicker from "react-datepicker";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { uid } from "uid";
import { useState, useEffect } from "react";

function CreateAppointementModal({
  showModal,
  onCloseModal,
  onAppointementAdded,
}) {
  const [appointementTitle, setAppointementTitle] = useState();
  const [appointementDate, setAppointementDate] = useState();
  const [errors, seterrors] = useState([]);

  useEffect(() => {
    const validattionErrors = [];
    if (!appointementTitle) {
      validattionErrors.push("An appointement must have a title");
    }
    if (!appointementDate) {
      validattionErrors.push("An appointement must have a date");
    }
    seterrors(validattionErrors);
  }, [appointementDate, appointementTitle]);

  return (
    <>
      <Modal show={showModal}>
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
            <Form.Group controlId="formBasicAppointementDate">
              <Form.Label style={{ marginRight: 10 }}>
                Appointement Date
              </Form.Label>
              <DatePicker
                showMonthDropdown
                dropdownMode="select"
                todayButton="Today"
                selected={appointementDate}
                onChange={(value) => {
                  setAppointementDate(value);
                }}
                value={appointementDate}
              />
            </Form.Group>
            <div className="add-appointement-errors">
              {errors.map((error) => (
                <div className="error">{error}</div>
              ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              onCloseModal();
            }}
          >
            Cancel
          </Button>
          <Button
            variant={!!errors.length ? "disabled" : "success"}
            disabled={!!errors.length}
            onClick={() => {
              const appointement = {
                id: uid(16),
                title: appointementTitle,
                allDay: true,
                start: appointementDate,
                end: appointementDate,
              };
              onAppointementAdded(appointement);
              onCloseModal();
              setAppointementDate(undefined);
              setAppointementTitle(undefined);
            }}
          >
            Create Appointement
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateAppointementModal;
