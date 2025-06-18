import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [form, setForm] = useState({
    appointmentDate: "",
    meetingTime: "",
    appointmentWith: "",
    designation: "",
    purpose: "",
    venue: "",
    isVip: false,
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const isAdmin = !!token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios.get("http://localhost:5050/api/appointments").then((res) => {
      setAppointments(res.data);
      setFiltered(res.data);
    });
  };

  const clearFilter = () => {
    setFromDate("");
    setToDate("");
    setFiltered(appointments);
  };

  const handleFilter = () => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const result = appointments.filter((appt) => {
      const apptDate = new Date(appt.appointmentDate);
      return (!from || apptDate >= from) && (!to || apptDate <= to);
    });
    setFiltered(result);
  };

  const resetForm = () => {
    setForm({
      appointmentDate: "",
      meetingTime: "",
      appointmentWith: "",
      designation: "",
      purpose: "",
      venue: "",
      isVip: false,
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5050/api/appointments", form, headers);
    setShowAddModal(false);
    resetForm();
    fetchAppointments();
  };

  const handleEditClick = (appt) => {
    setEditId(appt._id);
    setForm({
      appointmentDate: appt.appointmentDate.split("T")[0],
      meetingTime: appt.meetingTime,
      appointmentWith: appt.appointmentWith,
      designation: appt.designation,
      purpose: appt.purpose,
      venue: appt.venue,
      isVip: appt.isVip,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5050/api/appointments/${editId}`,
      form,
      headers
    );
    setShowEditModal(false);
    setEditId(null);
    fetchAppointments();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this appointment?")) {
      await axios.delete(`http://localhost:5050/api/appointments/${id}`, headers);
      fetchAppointments();
    }
  };

  const getRowClass = (dateStr) => {
    const apptDate = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    const dateOnly = new Date(apptDate.setHours(0, 0, 0, 0));

    if (dateOnly.getTime() === today.getTime()) return "row-today";
    if (dateOnly.getTime() === tomorrow.getTime()) return "row-tomorrow";
    if (dateOnly > tomorrow) return "row-future";
    return "row-past";
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Appointments & Meetings</h2>

        <div className="filters">
          <label>From Date:</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <label>To Date:</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          <button onClick={handleFilter}>SHOW</button>
          <button onClick={clearFilter}>CLEAR</button>
        </div>

        {isAdmin && (
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            <button onClick={() => { resetForm(); setShowAddModal(true); }}>
              Add New Appointment
            </button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Appointment / Meeting Date</th>
              <th>Appointment / Meeting Time</th>
              <th>Appointment / Meeting With</th>
              <th>Designation</th>
              <th>Purpose</th>
              <th>Venue</th>
              {isAdmin && <th>Edit</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((appt) => (
              <tr key={appt._id} className={getRowClass(appt.appointmentDate)}>
                <td>{appt.appointmentDate?.split("T")[0]}</td>
                <td>{appt.meetingTime}</td>
                <td>{appt.appointmentWith}</td>
                <td>{appt.designation}</td>
                <td>{appt.purpose}</td>
                <td>{appt.venue}</td>
                {isAdmin && (
                  <td>
                    <button onClick={() => handleEditClick(appt)}>Edit</button>{" "}
                    <button onClick={() => handleDelete(appt._id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Color Legend */}
        <div style={{ marginTop: "20px" }}>
          <strong>Legend:</strong>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "20px", height: "20px", backgroundColor: "#b6e7b6", border: "1px solid #ccc", marginRight: "6px" }}></div>
              <span>Today</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "20px", height: "20px", backgroundColor: "#fff899", border: "1px solid #ccc", marginRight: "6px" }}></div>
              <span>Tomorrow</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "20px", height: "20px", backgroundColor: "#e0e0e0", border: "1px solid #ccc", marginRight: "6px" }}></div>
              <span>Future</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "20px", height: "20px", backgroundColor: "#ffffff", border: "1px solid #ccc", marginRight: "6px" }}></div>
              <span>Past</span>
            </div>
          </div>
        </div>
      </div>

      {(showAddModal || showEditModal) && (
        <div className="modal">
          <div className="modal-box">
            <h3>{showAddModal ? "Add New Appointment" : "Edit Appointment"}</h3>
            <form onSubmit={showAddModal ? handleAddSubmit : handleEditSubmit}>
              <label>Appointment / Meeting Date:</label>
              <input type="date" value={form.appointmentDate} onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })} required />

              <label>Appointment / Meeting Time:</label>
              <input type="time" value={form.meetingTime} onChange={(e) => setForm({ ...form, meetingTime: e.target.value })} required />

              <label>Appointment / Meeting With:</label>
              <input type="text" value={form.appointmentWith} onChange={(e) => setForm({ ...form, appointmentWith: e.target.value })} required />

              <label>Designation:</label>
              <input type="text" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} required />

              <label>Purpose:</label>
              <textarea value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} required />

              <label>Venue:</label>
              <input type="text" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} required />

              <label>
                <input type="checkbox" checked={form.isVip} onChange={(e) => setForm({ ...form, isVip: e.target.checked })} />
                &nbsp; Is VIP?
              </label>

              <div style={{ marginTop: "10px" }}>
                <button type="submit">SUBMIT</button>
                <button type="button" onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setEditId(null);
                }}>CLEAR</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Appointments;
