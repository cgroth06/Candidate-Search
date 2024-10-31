import { createContext } from 'react';   


// TODO: Create an interface for the Candidate objects returned by the API

 export interface ICandidate {
    name?: string;
    id?: number;
    login: string;
    location?: string;
    avatar_url?: string;
    email?: string;
    html_url?: string;
    company?: string;
}

const CandidateContext = createContext<ICandidate | null>( {} as ICandidate);

export default CandidateContext;