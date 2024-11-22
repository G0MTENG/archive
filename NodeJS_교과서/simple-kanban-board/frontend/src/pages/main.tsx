import { PropsWithChildren, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { UserProps } from '../types'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { palette } from '../constants'

const Header = styled.header`
  width: 100%;
  height: 80px;
  font-size: 24px;
  font-weight: 600;
  padding: 23px 0;
`

const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0 40px 100px;
  position: relative;
`

const PlusButton = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  bottom: 50px;
  left: calc(50% - 25px);
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 3px;

  &:hover {
    background-color: #005bb5;
  }
`

const BoardContainer = styled.div`
  width: 300px;
  min-height: 600px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
  background-color: #ffffff;
  box-shadow:
    0 10px 15px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.05);
`

const CardContainer = styled.div<{ color: string }>`
  width: 200px;
  height: 200px;
  padding: 20px;
  background-color: ${(props) => props.color};
  position: relative;

  h5 {
    font-size: 20px;
    margin: 0;
  }

  button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #007aff;
    color: white;
    z-index: 10000;
    border: none;
    border-radius: 3px;
  }
`
type CardPropsType = {
  card: CardType
  onClick: VoidFunction
  refetch: VoidFunction
  setPickCard: (card: CardType | null) => void
}
const Card = ({ onClick, card, refetch, setPickCard }: CardPropsType) => {
  const { title, content, color, id } = card
  const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    await axios.delete(`http://localhost:8080/cards/${id}`)
    setPickCard(null)
    refetch()
  }

  return (
    <CardContainer onClick={onClick} color={color}>
      <h5>{title}</h5>
      <p>{content}</p>
      <button onClick={handleClickDelete}>X</button>
    </CardContainer>
  )
}

type BoardType = {
  title: string
}
const Board = ({ title, children }: PropsWithChildren<BoardType>) => {
  return (
    <BoardContainer>
      <h2>{title}</h2>
      {children}
    </BoardContainer>
  )
}

type CardType = {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  content: string
  userId: number
  statusId: string
  color: string
}
type CardNStatus = {
  status: string
  cards: CardType[]
}
type GETResponse = CardNStatus[]

const getKanbanData = async (userId: number) => {
  try {
    const response = await axios.get<GETResponse>(`http://localhost:8080/cards/${userId}`)
    if (response.status !== 200) {
      new Error('get request error')
    }

    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h2 {
    margin-top: 0;
    font-size: 20px;
    text-align: center;
    color: #333;
  }

  p {
    font-size: 14px;
    color: #666;
    text-align: center;
    margin: 16px 0;
  }
`

const Modal = ({ children, onClose }: PropsWithChildren<{ onClose: () => void }>) => {
  const handleClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <ModalOverlay onClick={handleClickOverlay}>
      <ModalContent>{children}</ModalContent>
    </ModalOverlay>
  )
}

type FormInput = {
  title: string
  content: string
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Label = styled.label`
  font-size: 14px;
  color: #333;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;

  &:focus {
    border-color: #007aff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 122, 255, 0.3);
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  resize: none;

  &:focus {
    border-color: #007aff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 122, 255, 0.3);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`

const StatusButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  color: #fff;
  background-color: ${(props) => (props.isActive ? '#007aff' : '#ccc')};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#005bb5' : '#aaa')};
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007aff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`

type FormModalContentProps = {
  pickCard: CardType | null
  setPickCard: (card: CardType | null) => void
  userId: number
  onClose: () => void
}
const FormModalContent = ({ pickCard, setPickCard, userId, onClose }: FormModalContentProps) => {
  const { register, handleSubmit, reset } = useForm<FormInput>({
    defaultValues: {
      title: pickCard?.title ?? '',
      content: pickCard?.content ?? '',
    },
  })
  const [statusId, setStatusId] = useState<number>(0)

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const color = palette[Math.floor(Math.floor(Math.random() * palette.length))]
      const formData = { ...data, statusId, userId, color }

      if (!pickCard) {
        await axios.post('http://localhost:8080/cards', formData)
        alert('카드가 성공적으로 생성되었습니다.')
        reset()
        onClose()
      } else {
        await axios.put(`http://localhost:8080/cards/${pickCard.id}`, formData)
        alert('카드가 성공적으로 수정되었습니다.')
        reset()
        onClose()
        setPickCard(null)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('카드 생성 중 오류:', error.message)
        alert('알 수 없는 오류 발생')
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>제목</Label>
      <Input
        {...register('title', { required: '제목을 입력해주세요.' })}
        placeholder='카드 제목을 입력해주세요.'
      />
      <Label>내용</Label>
      <Textarea
        {...register('content', { required: '내용을 입력해주세요.' })}
        placeholder='카드 내용을 입력해주세요.'
      />
      <ButtonGroup>
        <StatusButton type='button' isActive={statusId === 0} onClick={() => setStatusId(0)}>
          Not Started
        </StatusButton>
        <StatusButton type='button' isActive={statusId === 1} onClick={() => setStatusId(1)}>
          In Progress
        </StatusButton>
        <StatusButton type='button' isActive={statusId === 2} onClick={() => setStatusId(2)}>
          Done
        </StatusButton>
      </ButtonGroup>
      <SubmitButton type='submit'>작성하기</SubmitButton>
    </Form>
  )
}

export const MainPage = ({ userId }: Pick<UserProps, 'userId'>) => {
  const navigate = useNavigate()
  const [modal, setModal] = useState<boolean>(false)
  const [pickCard, setPickCard] = useState<CardType | null>(null)
  const { data, refetch } = useQuery({
    queryFn: () => getKanbanData(userId as number),
    queryKey: ['main', userId],
    enabled: !!userId,
  })

  const handleClickEdit = (card: CardType) => {
    setPickCard(card)
    setModal(true)
  }

  const handleClickOpenModal = () => {
    setModal(true)
  }

  const handleClickCloseModal = () => {
    setModal(false)
  }

  useEffect(() => {
    if (userId === null) {
      // userId가 null
      navigate('/')
    }
  }, [])

  if (!data) {
    return <div>네트워크 요청에 실패했습니다.</div>
  }

  const [notStartedData, inProgressData, doneData] = data
  const notStartedCards = notStartedData.cards
  const inProgressCards = inProgressData.cards
  const doneCards = doneData.cards

  return (
    <Wrapper>
      <Header>Kanban Board</Header>
      <Main>
        <Board title='Not Started'>
          {notStartedCards.map((card, index) => (
            <Card
              onClick={() => handleClickEdit(card)}
              key={index}
              setPickCard={setPickCard}
              refetch={refetch}
              card={card}
            />
          ))}
        </Board>
        <Board title='In Progress'>
          {inProgressCards.map((card, index) => (
            <Card
              onClick={() => handleClickEdit(card)}
              key={index}
              setPickCard={setPickCard}
              refetch={refetch}
              card={card}
            />
          ))}
        </Board>
        <Board title='Done'>
          {doneCards.map((card, index) => (
            <Card
              onClick={() => handleClickEdit(card)}
              key={index}
              setPickCard={setPickCard}
              refetch={refetch}
              card={card}
            />
          ))}
        </Board>
      </Main>
      <PlusButton onClick={handleClickOpenModal}>+</PlusButton>
      {modal && (
        <Modal onClose={handleClickCloseModal}>
          <FormModalContent
            pickCard={pickCard}
            setPickCard={setPickCard}
            userId={userId as number}
            onClose={handleClickCloseModal}
          />
        </Modal>
      )}
    </Wrapper>
  )
}
