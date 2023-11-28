import { votesPayload } from '../context/votesContext'
import { useVotes } from '../hooks/useVotes'
import '../scss/votes.scss'

function VoteItem({ firstname, lastname, count }: votesPayload): JSX.Element {
    const { totalVotesCount } = useVotes()

    return (
        <div className="results-item">
            <h3>{`${firstname} ${lastname}`}</h3>

            <div className="progress-box">
                <div className="progress-bar">
                    <span
                        style={{ width: `${((count / totalVotesCount * 100))}%` }}
                        className='percentage-tag'>

                    </span>
                </div>
                <p className='pecentage-text'>{((count / totalVotesCount * 100)).toFixed(2)}%</p>
            </div>

            <p className='vote-count-text'>{count} VOTES</p>
        </div>
    )
}

export default VoteItem