import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios'
import './app.css'

const schema = z.object({
  name: z.string().trim().min(1),
  age: z.number(),
  married: z.preprocess((value) => value === "true", z.boolean()),
  comment: z.string().optional(),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/user',
      data
    })

    console.log(data)
    console.log(response)
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input">
          <label>Name</label>
          <input {...register("name")} required placeholder="이름을 입력해주세요." />
          {errors?.name && <p>name invalid</p>}
        </div>
        <div className="input">
          <label>Age</label>
          <input
            {...register("age", { required: true, valueAsNumber: true })}
            type="number"
            placeholder="나이를 입력해주세요."
          />
          {errors?.age && <p>age invalid</p>}
        </div>
        <div className="input">
          <label>Married</label>
          <select {...register("married")}>
            <option value="true">married</option>
            <option value="false">not married</option>
          </select>
          {errors?.married && <p>married invalid</p>}
        </div>
        <div className="input">
          <label>Comment</label>
          <input {...register("comment")} placeholder="댓글을 입력해주세요." />
        </div>
        <button type="submit">제출하기</button>
      </form>
      <div className="comment-container">
        <h1>댓글 목록</h1>
        <div className="comment">
          <p>공태윤</p>
          <p>안녕하세요.</p>
        </div>
      </div>
    </>
  );
}

export default App;