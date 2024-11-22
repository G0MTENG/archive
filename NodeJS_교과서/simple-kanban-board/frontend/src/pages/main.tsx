import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { UserProps } from '../types'

const palette = [
  '#A8DADC', // Soft Blue
  '#BDE4A8', // Soft Green
  '#FFF1A8', // Soft Yellow
  '#FFD6A5', // Soft Orange
  '#FFAAA5', // Soft Red
  '#CBAACB', // Soft Purple
  '#D5E6E1', // Soft Mint
  '#FFC4D6', // Soft Pink
  '#E0E0E0', // Soft Gray
  '#D3A588', // Soft Brown
]

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
  padding: 0 40px;
`

const BoardContainer = styled.div`
  width: 300px;
  min-height: 600px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  box-shadow:
    0 10px 15px rgba(0, 0, 0, 0.1),
    /* 더 부드러운 그림자 */ 0 4px 6px rgba(0, 0, 0, 0.05); /* 추가적인 깊이 효과 */
`

const CardContainer = styled.div<{ color: string }>`
  width: 200px;
  height: 200px;
  padding: 20px;
  background-color: ${(props) => props.color};

  h5 {
    font-size: 20px;
    margin: 0;
  }
`
type CardType = {
  title: string
  content: string
  color: string
}
const Card = ({ title, content, color }: CardType) => {
  return (
    <CardContainer color={color}>
      <h5>{title}</h5>
      <p>{content}</p>
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

export const MainPage = ({ userId }: Pick<UserProps, 'userId'>) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (userId === null) {
      // userId가 null
      navigate('/')
    }
  }, [])

  return (
    <Wrapper>
      <Header>Kanban Board</Header>
      <Main>
        <Board title='Not Started'>
          <Card title='밥먹기' content='좀있다가 밥먹어야지' color={palette[0]} />
        </Board>
        <Board title='In Progress'>2</Board>
        <Board title='Done'>3</Board>
      </Main>
    </Wrapper>
  )
}
