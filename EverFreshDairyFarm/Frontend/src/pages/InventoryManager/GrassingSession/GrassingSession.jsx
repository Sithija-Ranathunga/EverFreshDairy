import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header.jsx";
import { Footer } from "../../../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InventorySideBar from "../../../components/InventorySideBar.jsx";

function GrassingSession() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/Grassing")
      .then((response) => {
        if (Array.isArray(response.data.Session)) {
          setSessions(response.data.Session);
        } else {
          console.error("Expected an array but got:", response.data);
          setSessions([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/Grassing/${id}`)
      .then((response) => {
        console.log(response);
        // Optionally, update the local state instead of reloading the page:
        setSessions((prevSessions) =>
          prevSessions.filter((session) => session._id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  // Filter sessions based on the search query.
  const filteredSessions = sessions.filter((session) => {
    const query = searchQuery.toLowerCase();
    return (
      (session.SessionId && session.SessionId.toLowerCase().includes(query)) ||
      (session.ShedId && session.ShedId.toLowerCase().includes(query)) ||
      (session.CowGroup && session.CowGroup.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-sky-100">
      <Header />
      <div className="flex h-screen">
        <InventorySideBar />
        <div className="flex-1 pl-8">
          <h1 className="mt-10 mb-6 text-3xl font-bold">Grassing Sessions</h1>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold">Grassing Session Details</h3>
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔎 Search sessions..."
                className="px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-600"
              />
              <button
                className="px-4 py-2 mr-10 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => navigate("/addsession")}
              >
                + Add Session
              </button>
            </div>
          </div>

          <table className="w-4/5 mx-auto my-[2.22vh] bg-white shadow-md rounded-lg mt-9">
            <thead className="text-white bg-blue-900">
              <tr>
                <th className="p-[1.6vh] text-center">Session Id</th>
                <th className="p-[1.6vh] text-center">ShedId</th>
                <th className="p-[1.6vh] text-center">CowGroup</th>
                <th className="p-[1.6vh] text-center">Date</th>
                <th className="p-[1.6vh] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredSessions.map((session) => (
                <tr
                  key={session._id}
                  className="border-b border-gray-800 hover:bg-gray-100"
                >
                  <td className="p-[1.6vh] text-center">{session.SessionId}</td>
                  <td className="p-[1.6vh] text-center">{session.ShedId}</td>
                  <td className="p-[1.6vh] text-center">{session.CowGroup}</td>
                  <td className="p-[1.6vh] text-center">
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(session.Date))}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        navigate(`/grassingsessionupdate/${session._id}`)
                      }
                      className="px-3 py-1 mr-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    
                    <button
                      onClick={() => handleDelete(session._id)}
                      className="px-3 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSessions.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    No sessions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GrassingSession;
