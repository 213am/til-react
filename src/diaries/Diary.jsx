import { useEffect, useState } from "react";
import {
  CardButtonWrap,
  CardStyled,
  CardTopWrap,
  DairyTitleStyled,
  FormStyled,
  LabelStyled,
  ListTitleStyled,
  ListWrapStyled,
  MoodStyled,
  TitleLabelStyled,
} from "./diaryStyled";

const Diary = () => {
  useEffect(() => {
    getDairies();
    return () => {};
  }, []);

  const initData = {
    title: "",
    date: "",
    content: "",
    mood: "",
    weather: "",
  };
  const [myDiaryList, setMyDiaryList] = useState([]);
  const [formData, setFormData] = useState(initData);
  const API_URL = `http://localhost:5000/diaries`;

  const getDairies = async () => {
    try {
      const res = await fetch(`${API_URL}`);
      const dairyData = await res.json();
      setMyDiaryList(dairyData);
    } catch (error) {
      console.log(`오류 발생 : ${error}`);
      alert(`잠시 후 다시 시도해주세요ㅠㅠ`);
    }
  };
  const postDairy = async () => {
    try {
      await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      alert("오늘의 일기 작성완료!");
      setFormData(initData);
      getDairies();
    } catch (error) {
      console.log(`오류 발생 : ${error}`);
      alert(`잠시 후 다시 시도해주세요ㅠㅠ`);
    }
  };
  const deleteDairy = async _id => {
    try {
      await fetch(`${API_URL}/${_id}`, {
        method: "DELETE",
      });
      alert(`일기가 성공적으로 삭제됐어요`);
      getDairies();
    } catch (error) {
      console.log(`오류 발생 : ${error}`);
      alert(`잠시 후 다시 시도해주세요ㅠㅠ`);
    }
  };

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmitHandler = e => {
    e.preventDefault();
    const { title, date, content, mood, weather } = formData;
    if (title === "") {
      alert("오늘 일기에 제목을 붙여보면 어떨까요?");
      return;
    }
    if (date === "") {
      alert("오늘 날짜를 알려주세요!");
      return;
    }
    if (content === "") {
      alert("오늘 하루를 글로 표현해주세요");
      return;
    }
    if (mood === "") {
      alert("오늘 하루와 가장 어울리는 표정은?!");
      return;
    }
    if (weather === "") {
      alert("오늘 날씨는 어땠나요?");
      return;
    }
    postDairy();
  };

  return (
    <>
      <DairyTitleStyled>나만의 일기 📝</DairyTitleStyled>
      <FormStyled>
        <form
          onSubmit={e => {
            onSubmitHandler(e);
          }}
        >
          <div>
            <TitleLabelStyled htmlFor="">제목</TitleLabelStyled>
            <input
              name="title"
              value={formData.title}
              onChange={e => {
                onChangeHandler(e);
              }}
              type="text"
              placeholder="제목을 입력해주세요"
            />
          </div>
          <div>
            <TitleLabelStyled htmlFor="date">날짜</TitleLabelStyled>
            <input
              name="date"
              value={formData.date}
              onChange={e => {
                onChangeHandler(e);
              }}
              type="date"
              id="date"
              // defaultValue={new Date().toISOString().substring(0, 10)}
            />
          </div>
          <div>
            <TitleLabelStyled htmlFor="">내용</TitleLabelStyled>
            <textarea
              name="content"
              value={formData.content}
              onChange={e => {
                onChangeHandler(e);
              }}
              placeholder="오늘 하루는 어땠나요?"
            />
          </div>
          <MoodStyled>
            <label>기분</label>
            <LabelStyled htmlFor="joyful">🤩</LabelStyled>
            <input
              type="radio"
              name="mood"
              value="0"
              id="joyful"
              onChange={e => {
                onChangeHandler(e);
              }}
            />
            <LabelStyled htmlFor="expectation">😊</LabelStyled>
            <input
              type="radio"
              name="mood"
              value="1"
              id="expectation"
              onChange={e => {
                onChangeHandler(e);
              }}
            />
            <LabelStyled htmlFor="soso">😗</LabelStyled>
            <input
              type="radio"
              name="mood"
              value="2"
              id="soso"
              onChange={e => {
                onChangeHandler(e);
              }}
            />
            <LabelStyled htmlFor="angry">😡</LabelStyled>
            <input
              type="radio"
              name="mood"
              value="3"
              id="angry"
              onChange={e => {
                onChangeHandler(e);
              }}
            />
            <LabelStyled htmlFor="sad">😭</LabelStyled>
            <input
              type="radio"
              name="mood"
              value="4"
              id="sad"
              onChange={e => {
                onChangeHandler(e);
              }}
            />
          </MoodStyled>
          <div>
            <label>날씨</label>
            <LabelStyled htmlFor="lucidity"> ☀</LabelStyled>
            <input
              type="radio"
              name="weather"
              value="0"
              id="lucidity"
              onChange={e => {
                onChangeHandler(e);
              }}
            />
            <LabelStyled htmlFor="cloud"> ☁</LabelStyled>
            <input
              type="radio"
              name="weather"
              value="1"
              id="cloud"
              onChange={e => {
                onChangeHandler(e);
              }}
            />
            <LabelStyled htmlFor="rainy"> 🌧</LabelStyled>
            <input
              type="radio"
              name="weather"
              value="2"
              id="rainy"
              onChange={e => {
                onChangeHandler(e);
              }}
            />
            <LabelStyled htmlFor="snowy"> ❄</LabelStyled>
            <input
              type="radio"
              name="weather"
              value="3"
              id="snowy"
              onChange={e => {
                onChangeHandler(e);
              }}
            />
          </div>
          <div>
            <button type="submit">작성</button>
          </div>
        </form>
      </FormStyled>
      <div>
        <ListTitleStyled>목록</ListTitleStyled>
        <div>
          <ListWrapStyled>
            {myDiaryList.map(item => {
              const { id, title, date, content, mood, weather } = item;
              return (
                <CardStyled key={id}>
                  <CardTopWrap>
                    <div>{title}</div>
                    <div display="flex">
                      <div>{date}</div>
                      <div>
                        {weather === "0"
                          ? "☀"
                          : weather === "1"
                            ? "☁"
                            : weather === "2"
                              ? "🌧"
                              : "❄"}
                      </div>
                    </div>
                    <div>
                      {mood === "0"
                        ? "🤩"
                        : mood === "1"
                          ? "😊"
                          : mood === "2"
                            ? "😗"
                            : mood === "3"
                              ? "😡"
                              : "😭"}
                    </div>
                    <div>{content}</div>
                  </CardTopWrap>
                  <CardButtonWrap>
                    <button type="button">수정</button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteDairy(item.id);
                      }}
                    >
                      삭제
                    </button>
                  </CardButtonWrap>
                </CardStyled>
              );
            })}
          </ListWrapStyled>
        </div>
      </div>
    </>
  );
};

export default Diary;
