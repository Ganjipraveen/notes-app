import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import NoteItem from '../NoteItem'

import {
  MainContainer,
  NotesContainer,
  Heading,
  Form,
  TitleInput,
  NoteTextArea,
  AddButton,
  EmptyNotesViewContainer,
  Image,
  EmptyNotesHeading,
  Description,
  NotesList,
} from './styledComponents'

const Notes = () => {
  const [title, setTitle] = useState('')
  const [noteText, setNoteText] = useState('')
  const [notesList, setNotesList] = useState('')

  const onAddNote = event => {
    event.preventDefault()
    const newNote = {
      id: uuidv4(),
      title,
      noteText,
    }
    setNotesList(prevNotesList => [...prevNotesList, newNote])
    setTitle('')
    setNoteText('')
  }

  const onChangeTitle = event => setTitle(event.target.value)

  const onChangeNoteText = event => setNoteText(event.target.value)

  const renderEmptyView = () => (
    <EmptyNotesViewContainer>
      <EmptyNotesViewContainer>
        <Image
          src="https://assets.ccbp.in/frontend/hooks/empty-notes-img.png"
          alt="notes empty"
        />
        <EmptyNotesHeading>No Notes Yet</EmptyNotesHeading>
        <Description>Notes you add will appear here</Description>
      </EmptyNotesViewContainer>
    </EmptyNotesViewContainer>
  )

  return (
    <MainContainer>
      <NotesContainer>
        <Heading>Notes</Heading>
        <Form onSubmit={onAddNote}>
          <TitleInput
            type="text"
            placeholder="Title"
            value={title}
            onChange={onChangeTitle}
          />
          <NoteTextArea
            placeholder="Take a Note..."
            value={noteText}
            onChange={onChangeNoteText}
            rows="4"
          />
          <AddButton type="submit">Add</AddButton>
        </Form>
        {notesList.length === 0 ? (
          renderEmptyView()
        ) : (
          <NotesList>
            {notesList.map(eachItem => (
              <NoteItem key={eachItem.id} noteDetails={eachItem} />
            ))}
          </NotesList>
        )}
      </NotesContainer>
    </MainContainer>
  )
}

export default Notes
