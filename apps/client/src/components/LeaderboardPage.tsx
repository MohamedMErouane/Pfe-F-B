import { useState, useEffect } from 'react';
import styles from '../styles/styles.module.css';
import { FaSearch } from 'react-icons/fa';
import { BACKEND_URL } from '@/lib/Constants';
import { State } from '@/lib/types';



const LeaderboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [states, setStates] = useState<State[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/pomodoro`);
        if (res.ok) {
          const data = await res.json();
          setStates(data);
        } else {
          console.error('Failed to fetch data from the backend');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStates = filteredStates.sort((a, b) => b.totalHours - a.totalHours);

  return (
    <div className={styles.container2}>
      <h1 className={`${styles.heading} ${styles.big} ${styles.center} ${styles.bold}`}>Leaderboard</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.input}
          style={{ marginRight: '10px' }}
        />
        <FaSearch className={styles.searchIcon} />
      </div>
      <table className={`${styles.table} ${styles.center}`} style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Hours Studied</th>
          </tr>
        </thead>
        <tbody>
          {sortedStates.map((state, index) => (
            <tr key={state.userId}>
              <td>{index + 1}</td>
              <td>
                <a href={`/profile/${state.name}`}>
                {state.name}
                </a>
              </td>
              <td>{state.totalHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
