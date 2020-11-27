import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'
import PropTypes from 'prop-types'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static propTypes = {
    history: PropTypes.any.isRequired,
    match: PropTypes.any.isRequired
  }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId)  
    
    return (
      <section className='NotePageMain'>
        {note ? (
          <>
            <Note
              id={note.id}
              name={note.title}
              modified={note.modified}
              onDeleteNote={this.handleDeleteNote}
            />
            <div className='NotePageMain__content'>
              {note.content.split(/\n \r|\n/).map((para, i) =>
                <p key={i}>{para}</p>
              )}
            </div>
          </>)
          : null}
        
      </section>
    )
  }
}
