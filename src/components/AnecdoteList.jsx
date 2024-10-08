import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter) || ''

    // Convert filter to lowercase
    const lowercaseFilter = filter.toLowerCase()

    // Sort the anecdotes by votes
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    // Filter the sorted anecdotes based on the search term (case-insensitive)
    const filteredAnecdotes = sortedAnecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(lowercaseFilter)
    )

    const dispatch = useDispatch()
    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(showNotification(`You voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            <Filter />
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList