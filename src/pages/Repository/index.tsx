import React, { useEffect, useState } from 'react'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository{
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  }
  description: string;
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  }
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([])

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    const getRepositoriesData = async () => {
      const [repository, issues] = await Promise.all([
        await api.get<Repository>(`repos/${params.repository}`),
        await api.get<Issue[]>(`repos/${params.repository}/issues`)
      ]);

      setRepository(repository.data);
      setIssues(issues.data);
    }
    getRepositoriesData();
  }, [params.repository])

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository?.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issues.map(issue => (
          <a target="blank" href={issue.html_url} key={issue.id}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
}

export default Repository;
