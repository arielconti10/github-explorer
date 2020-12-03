import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository{
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  }
  description: string;
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem('@GithubExplorer:repositories');

    if (storedRepositories) {
      return JSON.parse(storedRepositories)
    }
    return [];
  });
  const [newRepo, setNewRepo] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
  }, [repositories])

  const handleAddNewRepository = async (event: FormEvent<HTMLFormElement>) : Promise<void> => {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositorio');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);

      setInputError('');
      setNewRepo('');

    } catch (err) {
      setInputError('Repositorio nao encontrado');
    }

  }

  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositorios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddNewRepository}>
        <input
          type="text"
          placeholder="Digite o nome do repositorio"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />

        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError} </Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link to={`/repository/${repository.full_name}`} key={repository.full_name}>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
}

export default Dashboard;
