import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositorios no Github</Title>

      <Form action="">
        <input type="text" placeholder="Digite o nome do repositorio" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img src="https://avatars1.githubusercontent.com/u/17475188?s=460&u=28af8693c6164d25311df6e2d0f53439d135cdc4&v=4" alt="Ariel Conti" />

          <div>
            <strong>RocketSeat/unform</strong>
            <p>Easy peasy highly scalable ReactJS & React Native forms! 🚀</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img src="https://avatars1.githubusercontent.com/u/17475188?s=460&u=28af8693c6164d25311df6e2d0f53439d135cdc4&v=4" alt="Ariel Conti" />

          <div>
            <strong>RocketSeat/unform</strong>
            <p>Easy peasy highly scalable ReactJS & React Native forms! 🚀</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img src="https://avatars1.githubusercontent.com/u/17475188?s=460&u=28af8693c6164d25311df6e2d0f53439d135cdc4&v=4" alt="Ariel Conti" />

          <div>
            <strong>RocketSeat/unform</strong>
            <p>Easy peasy highly scalable ReactJS & React Native forms! 🚀</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img src="https://avatars1.githubusercontent.com/u/17475188?s=460&u=28af8693c6164d25311df6e2d0f53439d135cdc4&v=4" alt="Ariel Conti" />

          <div>
            <strong>RocketSeat/unform</strong>
            <p>Easy peasy highly scalable ReactJS & React Native forms! 🚀</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
}

export default Dashboard;
