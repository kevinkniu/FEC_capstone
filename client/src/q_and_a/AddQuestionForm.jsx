import React, { useState, useContext, useEffect} from 'react';
import config from '../../dist/config.js';
import axios from 'axios';
import { QuestionContext } from  './QuestionList.jsx';
import styled from 'styled-components';

const FormSection = styled.div`
  margin: 20px 0px;
  `;

const InputText = styled.input`
  margin-right: 10px;
`;

const AddQuestionForm = ({prodId, prodName, count, setCount}) => {

  const [question, setQuestion] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeQuestion = (e) => { setQuestion(e.target.value)};
  const handleChangeNickname = (e) => {setNickname(e.target.value)};
  const handleChangeEmail = (e) => {setEmail(e.target.value)};

  const handleClickSubmit = () => {

    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions`;

    const data = {
      body: question,
      name: nickname,
      email: email,
      product_id: prodId
    }
    axios.post(url, data, {
      headers: {
        Authorization: config.TOKEN
      }
    })
    .then((response) => {
      console.log('success')
    })
    .then(() => {setCount(count + 1)})
    .catch((err) => console.log(err))
  };

  return (
    <div>
      <FormSection>
        <h4>About the {prodName}</h4>
      </FormSection>
        <form>
        <FormSection>
          <label> <h5>Your Question *</h5>
            <textarea name="question" rows="6" cols="60" maxLength="600"  required value={question}             onChange={handleChangeQuestion} />
          </label>
        </FormSection>
        <FormSection>
          <label> <h5>What is your nickname? *</h5>
            <input name="nickname" type="text" placeholder="Example: jackson11!"  size='30' required value={nickname}
              onChange={handleChangeNickname} />
              <br></br>
              <h5>For privacy reasons, do not use your full name or email address</h5>
          </label>
        </FormSection>
        <FormSection>
          <label> <h5>Your email *</h5>
            <input name="password" placeholder="Example: jack@email.com" type="text"  size='30' required value={email}
              onChange={handleChangeEmail} />
              <h5>For authentication reasons, you will not be emailed</h5>
          </label>
        </FormSection>
        </form>
        <FormSection>
          <input type ='submit' value='Submit' onClick={handleClickSubmit}/>
        </FormSection>
      </div>
  )
}

export default AddQuestionForm;