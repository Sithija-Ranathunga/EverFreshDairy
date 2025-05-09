import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MilkingSideBar from "../../../components/MilkingSideBar.jsx";

function MilkingSession() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/milkingSession")

      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log(response.data);
          setSessions(response.data);
        } else {
          console.error("Expected an array but got: ", response.data);
          setSessions([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/milkingSession/${id}`)
      .then((response) => {
        console.log(response);
        setSessions((prevSessions) =>
          prevSessions.filter((session) => session._id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-sky-50">
      <Header />
      <div className="flex h-screen">
        <MilkingSideBar />
        <div className="flex-1 pl-8">
          <h1 className="mt-10  mb-6 text-3xl font-bold ">Milking Sessions</h1>

          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold">Milking Session Details</h3>
            <button
              className="px-4 py-2 text-white bg-blue-800 mr-32 rounded-lg hover:bg-blue-600"
              onClick={() => navigate("/addmilkingsession")}
            >
              Add Session
            </button>
          </div>

          <table className="w-4/5 mx-auto my-[2.22vh] bg-white shadow-md rounded-lg">
            <thead className="text-white bg-blue-900">
              <tr>
                <th className="p-[1.6vh] text-center">Session Id</th>
                <th className="p-[1.6vh] text-center">Shed Id</th>
                <th className="p-[1.6vh] text-center">Cow Group</th>
                <th className="p-[1.6vh] text-center">Date</th>
                <th className="p-[1.6vh] text-center">specialNotes</th>
                <th className="p-[1.6vh] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sessions.map((session) => (
                <tr
                  key={session._id}
                  className="border-b border-gray-800 hover:bg-gray-100"
                >
                  <td className="p-[1.6vh] text-center">{session.SessionId}</td>
                  <td className="p-[1.6vh] text-center">{session.shedId}</td>
                  <td className="p-[1.6vh] text-center">{session.cow_group}</td>
                  <td className="p-[1.6vh] text-center">
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(session.date))}
                  </td>
                  <td className="p-[1.6vh] text-center">
                    {session.specialNotes}
                  </td>
                  <td className="p-[1.6vh] text-center">
                    <button
                      onClick={() =>
                        navigate(`/milkingsessionupdate/${session._id}`)
                      }
                      className="px-[1.25vh] py-[0.9vh] text-[1.42vh] bg-yellow-600 text-white rounded-md hover:bg-yellow-600 mr-6"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(session._id)}
                      className="px-[1.25vh] py-[0.9vh] text-[1.42vh] bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {sessions.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    No session found.
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

export default MilkingSession;
