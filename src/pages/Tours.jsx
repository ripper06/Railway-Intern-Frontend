import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Tours() {
  const [tours, setTours] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    officer: "",
    from: "",
    to: "",
    outTo: "",
    dutyOrLeave: "Duty",
    purpose: "",
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const isAdmin = !!token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = () => {
    axios.get("http://localhost:5050/api/tours").then((res) => {
      setTours(res.data);
      setFiltered(res.data);
    });
  };

  const clearFilter = () => {
    setFromDate("");
    setToDate("");
    setFiltered(tours);
  };

  const handleFilter = () => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const result = tours.filter((t) => {
      const start = new Date(t.from);
      return (!from || start >= from) && (!to || start <= to);
    });
    setFiltered(result);
  };

  const resetForm = () => {
    setForm({
      officer: "",
      from: "",
      to: "",
      outTo: "",
      dutyOrLeave: "Duty",
      purpose: "",
    });
  };

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5050/api/tours/${editId}`, form, headers);
    } else {
      await axios.post("http://localhost:5050/api/tours", form, headers);
    }
    setShowModal(false);
    setEditId(null);
    resetForm();
    fetchTours();
  };

  const handleEdit = (tour) => {
    setEditId(tour._id);
    setForm({
      officer: tour.officer,
      from: tour.from.split("T")[0],
      to: tour.to.split("T")[0],
      outTo: tour.outTo,
      dutyOrLeave: tour.dutyOrLeave,
      purpose: tour.purpose,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this tour?")) {
      await axios.delete(`http://localhost:5050/api/tours/${id}`, headers);
      fetchTours();
    }
  };

  const getRowClass = (fromStr) => {
    const from = new Date(fromStr);
    const today = new Date();
    const tomorrow = new Date();
    today.setHours(0, 0, 0, 0);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const dateOnly = new Date(from.setHours(0, 0, 0, 0));

    if (dateOnly.getTime() === today.getTime()) return "row-today";      // Green
    if (dateOnly.getTime() === tomorrow.getTime()) return "row-tomorrow"; // Yellow
    if (dateOnly > tomorrow) return "row-future";                         // Grey
    return "row-past";                                                    // White
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Tour Programme/Leave</h2>

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
            <button onClick={() => { resetForm(); setShowModal(true); }}>
              Add Tour Programme/Leave
            </button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Officer</th>
              <th>From</th>
              <th>To</th>
              <th>Out To</th>
              <th>Duty/Leave</th>
              <th>Purpose</th>
              {isAdmin && <th>Edit</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((tour) => (
              <tr key={tour._id} className={getRowClass(tour.from)}>
                <td>{tour.officer}</td>
                <td>{tour.from?.split("T")[0]}</td>
                <td>{tour.to?.split("T")[0]}</td>
                <td>{tour.outTo}</td>
                <td>{tour.dutyOrLeave}</td>
                <td>{tour.purpose}</td>
                {isAdmin && (
                  <td>
                    <button onClick={() => handleEdit(tour)}>Edit</button>{" "}
                    <button onClick={() => handleDelete(tour._id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
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

      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>{editId ? "Edit Tour" : "Add Tour Programme/Leave"}</h3>
            <form onSubmit={handleAddOrEdit}>
              <label>Officer’s Name:</label>
              <input type="text" value={form.officer} onChange={(e) => setForm({ ...form, officer: e.target.value })} required />

              <label>Leaving HQ on:</label>
              <input type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} required />

              <label>Coming Back on:</label>
              <input type="date" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} required />

              <label>Going to:</label>
              <input type="text" value={form.outTo} onChange={(e) => setForm({ ...form, outTo: e.target.value })} required />

              <label>Leave or Duty:</label>
              <select value={form.dutyOrLeave} onChange={(e) => setForm({ ...form, dutyOrLeave: e.target.value })}>
                <option value="Duty">Duty</option>
                <option value="Leave">Leave</option>
              </select>

              <label>Purpose:</label>
              <textarea value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} required />

              <div style={{ marginTop: "10px" }}>
                <button type="submit">SUBMIT</button>
                <button type="button" onClick={() => {
                  setShowModal(false);
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

export default Tours;
