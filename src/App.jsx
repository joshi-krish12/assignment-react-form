import React, { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });

  const [records, setRecords] = useState([]);
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstname || !form.lastname || !form.email) {
      alert("Please complete the form");
      return;
    }

    const existingIndex = records.findIndex(
      (item) => item.email.toLowerCase() === form.email.toLowerCase()
    );

    if (existingIndex !== -1) {
      const updated = [...records];
      updated[existingIndex].count += 1;
      setRecords(updated);
    } else {
      setRecords([
        ...records,
        {
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          count: 1
        },
      ]);
    }

    setForm({ firstname: "", lastname: "", email: "" });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>React Form Submission</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="Enter first name"
          value={form.firstname}
          onChange={handleChange}
          style={{ margin: "5px", padding: "8px" }}
        />
        <br />
        <input
          type="text"
          name="lastname"
          placeholder="Enter last name"
          value={form.lastname}
          onChange={handleChange}
          style={{ margin: "5px", padding: "8px" }}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          style={{ margin: "5px", padding: "8px" }}
        />
        <br /><br />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Submit
        </button>
      </form>

      <h3>Submitted Records</h3>
      {records.length === 0 ? (
        <p>No records yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {records.map((row) => (
              <tr key={row.email}>
                <td>{row.firstname}</td>
                <td>{row.lastname}</td>
                <td>{row.email}</td>
                <td>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}