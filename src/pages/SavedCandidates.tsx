import { useEffect, useState } from "react";
import { ICandidate as Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(savedCandidates);
    console.log("Saved Candidates:", savedCandidates);
  }, []);

  const handleRemovedCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Login</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <img src={candidate.avatar_url} alt={`Avatar for ${candidate.login}`} style={{height: "100px"}}/>
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email ? candidate.email : "No Email on Record"}</td>
                <td>{candidate.company}</td>
                <td>
                  <a href={candidate.html_url}>Website</a>
                </td>
                <button onClick={() => candidate.id !== undefined && handleRemovedCandidate(candidate.id)} style={{backgroundColor: "red"}}>-</button>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Username</th>
                <th>Location</th>
                <th>Email</th>
                <th>Company</th>
                <th>Website</th>
              </tr>
            </thead>
          </table>
          <tbody>No Saved Candidates</tbody>
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;