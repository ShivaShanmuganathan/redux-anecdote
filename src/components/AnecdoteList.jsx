
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Filter from './Filter'

const AnecdoteList = () => {
    // modify to use filter
    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter)).sort((a, b) => b.votes - a.votes))

    const dispatch = useDispatch()
    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
      }
    return (
      <div>
        <Filter />
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
  }
  
  export default AnecdoteList