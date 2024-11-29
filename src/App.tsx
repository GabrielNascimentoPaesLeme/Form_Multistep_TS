import './App.css';
import { useState } from 'react';

import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import Steps from './components/Steps';
import ReviewForm from './components/ReviewForm';
import UserForm from './components/UserForm';
import Thanks from './components/Tahnks';

import { useForm } from './hooks/useForm';

type Data = {
  name: string;
  email: string;
  review: string;
  comment: string;
}

const formTemplate: Data = {
  name: '',
  email: '',
  review: '',
  comment: '',
}


function App() {


  const [data, setData] = useState(formTemplate)

  function updateFieldHandler(key: string, e: string) {
    setData((prev) => {
      return {...prev, [key]: e}
    })
  }

  const formComponents = [<UserForm updateFieldHandler={updateFieldHandler} data={data}/>, <ReviewForm updateFieldHandler={updateFieldHandler} data={data}/>, <Thanks data={data} />];

  const { changeStep, currentComponent, currentStep } = useForm(formComponents);

  return (
    <div className="app">
      <div className="header">
        <h2>Deixe sua avaliação</h2>
        <p>Utilize o formulário abaixo para avaliar nosso trabalho</p>
      </div>

      <div className="form-container">
        <Steps currentStep={currentStep} />

        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className="inputs-container">{currentComponent}</div>

          <div className="actions">
            <button type="button" onClick={() => changeStep(currentStep - 1)}>
              <GrFormPrevious />
              <span>Voltar</span>
            </button>

            <button type="submit">
              {currentStep != 2 ? <span>Avançar</span> : <span>Enviar</span>}
              <GrFormNext />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
