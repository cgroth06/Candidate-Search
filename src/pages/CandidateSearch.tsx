import { useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { ICandidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<ICandidate | null>(null);
  
  const getUser = async (login: string) => {
    try {
      const user = await searchGithubUser(login); // Use searchGithubUser here
      console.log('User:', user);
      setCandidate(user);
    } catch (err) {
      console.log('An error occurred when retrieving user:', err);
    }
  };

  const loadNewCandidate = async () => {
    try {
      const res = await searchGithub(); // This should retrieve a random user
      if (res.length > 0) {
        await getUser(res[0].login); // Assuming res[0].login contains the username
      } else {
        setCandidate(null);
      }
    } catch(err) {
      console.log(err);
    }
  };

  const saveCandidate = () => {
    if (candidate) {
      console.log('Candidate saved:', candidate);
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(candidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      setCandidate(null);
      loadNewCandidate();
    }
  };

  return (
    <div>
    <h1>Candidate Search</h1>
    <div className="card">
      
      {candidate ? (
        <div className="innercard" key={candidate.id}>
          <img src={candidate.avatar_url} alt={`Avatar for ${candidate.login}`} style={{height: "200px"}}/>
          <div>
            <h3>Name:{candidate.name}</h3>
            <p>Username:{candidate.login}</p>
            <p>Location:{candidate.location}</p>
            <p>Email:{candidate.email}</p>
            <p>Company:{candidate.company}</p>
            <a href={candidate.html_url}>Website</a>

          </div>
        </div>
      ) : (
        <p>No candidate found</p>
      )}
      <div className="yesNo">
        <button onClick={loadNewCandidate} style={{ backgroundColor: "red"}}>-</button>
        <button onClick={saveCandidate} style={{backgroundColor: "green"}}>+</button>
      </div>
    </div>
    </div>
  );
};

export default CandidateSearch;