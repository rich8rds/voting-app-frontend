import { useEffect } from 'react'
import VoteItem from '../components/VoteItem'
import VoteUserItem from '../components/VoteUserItem'
import '../scss/votes.scss'
import { useVotes } from '../hooks/useVotes'
import Navbar from '../components/Navbar'
import { useSearchParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Votes(): JSX.Element {
    const { contestants, votes, totalVotesCount } = useVotes()
    const { GetProfile } = useAuth()
    const [ queryParams ]= useSearchParams()


    useEffect(() => {
        const token = queryParams.get('token')
        if (token) {
            console.log('token', token)
            GetProfile(token)
        }
    }, [queryParams])

    return (
        <section className='votes-section'>
            <Navbar />
            <section className='votes-page'>
                <section className="voting-section">
                    <h1 className='main-header'>Vote Contestant </h1>
                    <div className="votes-div">
                        {
                            contestants?.map((contestant, index) => {
                                const { _id, firstname, email, lastname, description, imgURL, numberOfVotes } = contestant
                                return (
                                    <div className="div" key={index}>
                                        <VoteUserItem
                                            _id={_id}
                                            email={email}
                                            firstname={firstname}
                                            lastname={lastname}
                                            description={description}
                                            imgURL={imgURL}
                                            numberOfVotes={numberOfVotes}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>

                <section className="results-section">
                    <div className="main-header">
                        <h1 className='header'>Results</h1>
                        <p>Total Votes: {totalVotesCount}</p>

                    </div>
                    <div className="vote-results-div">


                        {
                            votes?.map((vote, index) => {
                                const { contestantId, firstname, lastname, count } = vote
                                return (
                                    <div className="div" key={index}>
                                        <VoteItem
                                            contestantId={contestantId}
                                            firstname={firstname}
                                            lastname={lastname}
                                            count={count}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </section>
        </section>
    )
}

export default Votes