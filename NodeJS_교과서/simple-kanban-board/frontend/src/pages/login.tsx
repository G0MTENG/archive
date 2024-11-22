import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserProps } from '../types'

// 유효성 검사 스키마
const userSchema = z.object({
  username: z.string().trim().min(8, '사용자 이름은 최소 8자 이상이어야 합니다.'),
  password: z.string().trim().min(4, '비밀번호는 최소 4자 이상이어야 합니다.'),
})
type UserSchema = z.infer<typeof userSchema>

// 스타일 컴포넌트
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`

const LoginContainer = styled.div`
  width: 572px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  padding: 32.5px 96px;
  background-color: #ffffff;

  h2 {
    text-align: center;
    margin-bottom: 24px;
    font-size: 24px;
    color: #333333;
  }
`

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;

  p {
    margin-bottom: 8px;
    font-size: 14px;
    color: #666666;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 8px 12px;
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    font-size: 14px;
    color: #333333;

    &:focus {
      outline: none;
      border-color: #007aff;
      box-shadow: 0 0 5px rgba(0, 122, 255, 0.4);
    }
  }

  span {
    color: #ff4d4f;
    font-size: 12px;
    margin-top: 5px;
    display: block;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  border: none;
  border-radius: 4px;
  background-color: #007aff;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background-color: #005bb5;
  }

  &:disabled {
    background-color: #d0d0d0;
    cursor: not-allowed;
  }
`

export const LoginPage = ({ setUserId }: Pick<UserProps, 'setUserId'>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  })
  const navigate = useNavigate()

  // 폼 제출 시 실행
  const onSubmit = async (data: UserSchema) => {
    console.log('제출된 데이터:', data)
    try {
      const response = await axios.post<{ status: 'login' | 'register'; userId: number }>(
        'http://localhost:8080/login',
        data,
      )

      if (response.status !== 200) {
        throw new Error('login error')
      }

      setUserId(response.data.userId)
      navigate('/main')
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('error type error')
      }
    }
  }

  return (
    <Wrapper>
      <LoginContainer>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 사용자 이름 입력 */}
          <InputContainer>
            <p>사용자 이름</p>
            <input
              {...register('username')}
              placeholder='사용자 이름을 입력해주세요.'
              aria-invalid={errors.username ? 'true' : 'false'}
            />
            {errors.username && <span>{errors.username.message}</span>}
          </InputContainer>
          {/* 비밀번호 입력 */}
          <InputContainer>
            <p>비밀번호</p>
            <input
              {...register('password')}
              type='password'
              placeholder='비밀번호를 입력해주세요.'
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </InputContainer>
          {/* 로그인 버튼 */}
          <Button type='submit'>로그인</Button>
        </form>
      </LoginContainer>
    </Wrapper>
  )
}
