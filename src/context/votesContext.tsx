import { createContext, useState, ReactNode, useEffect } from "react";
import { apiGet, apiPost } from "../util/axios";
import { useNavigate } from "react-router-dom";
import { notifyWarning, notifySuccess, notifyError } from '../notification/Toastify'
import { io } from "socket.io-client";
import { decodeJwt } from '../security/roleUrlRouter'


const socket = io("http://votes-app.onrender.com")

export interface votesPayload {
    contestantId: string,
    firstname: string,
    lastname: string,
    count: number
}

export interface contestant {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    imgURL: string,
    description: string,
    numberOfVotes: number
}

export type VotesContextType = {
    votes: votesPayload[],
    setVotes: React.Dispatch<React.SetStateAction<votesPayload[]>>
    totalVotesCount: number,
    setTotalVotes: React.Dispatch<React.SetStateAction<number>>,
    contestants: contestant[],
    setContestants: React.Dispatch<React.SetStateAction<contestant[]>>,
    GetAllVotes: any
    VoteForContestant: any,
    // isSelected: boolean,
    // setIsSelected: React.Dispatch<React.SetStateAction<boolean>>,
    // selectedId: string,
    // setSelectedId: React.Dispatch<React.SetStateAction<string>>,
}

export const VotesContext = createContext<VotesContextType>({} as VotesContextType)

type VotesProviderProps = {
    children: ReactNode;
};

export const VotesProvider = ({ children }: VotesProviderProps) => {
    const navigate = useNavigate()
    const [votes, setVotes] = useState<votesPayload[] | []>([])
    const [totalVotesCount, setTotalVotes] = useState<number>(0)
    const [contestants, setContestants] = useState<contestant[] | []>([])

    useEffect(() => {
        socket.on('vote', () => {
            GetAllVotes()
            notifySuccess('New vote!')
        })
    }, [socket])

    useEffect(() => {
        apiGet('users/contestants')
            .then(res => {
                const data: contestant[] = res.data.contestants
                setContestants(data)
                //console.log(data)

            }).catch(err => {
                console.log(err)
                notifyError(err.response)
            })
    }, [])


    useEffect(() => {
        GetAllVotes()
    }, [])


    const GetAllVotes = (): any => {
        apiGet('votes')
            .then(res => {
                const data: votesPayload[] = res.data.votes
                const votesCount: number = res.data.totalVotes;
                //console.log(data)
                setVotes(data)
                setTotalVotes(votesCount)
            })
            .catch(err => {
                console.log(err)
                notifyError(err.response)
            })
    }


    const VoteForContestant = (id: string): any => {
        const token: string| null = localStorage.getItem('token')
        if(!token) {
            notifyError('Choose a contestant first')
            return
        }

        const { _id } = decodeJwt(token) //voter's Id

        if (!id) {
            notifyError('Choose a contestant first')
        }
        else if (!_id) {
            notifyWarning('Voter cannot be null. Login.')
            // let from = location.state?.from?.pathname
            navigate("/login", { replace: true })
        }

        else {
            apiPost('votes', {
                voterId: _id,
                contestantId: id,
                points: 1,
            })
                .catch(err => {
                    console.log(err)
                    notifyError(err.response.data.message)
                })
        }
    }


    return (
        <VotesContext.Provider value={{
            votes,
            contestants,
            setContestants,
            totalVotesCount,
            GetAllVotes,
            VoteForContestant,
            setVotes, 
            setTotalVotes,
        }}>
            {children}
        </VotesContext.Provider>
    )
}
