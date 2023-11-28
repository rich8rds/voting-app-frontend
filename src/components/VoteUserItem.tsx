import { contestant } from "../context/votesContext"
import { useVotes } from "../hooks/useVotes"


function VoteUserItem({ _id, firstname, lastname, description, imgURL }: contestant): JSX.Element {
    const { VoteForContestant } = useVotes()

    const handleVote = () => {
        VoteForContestant(_id)
    }

    return (
        <div className={"votes-container"}>
            <div className="img-div">
                <img src={imgURL} alt="" />
            </div>
            <div className="info">
                <label htmlFor="demo_opt_1" className='user-name'>{`${firstname} ${lastname}`}</label>
                <p className='desc'> {description} </p>
            </div>
            <div className="check-user">
                <label htmlFor="demo_opt_1"></label>
            </div>
            <div className="submit-btn-div">
                <button className='btn btn-large' onClick={handleVote}>Vote</button>
            </div>
        </div>
    )
}

export default VoteUserItem