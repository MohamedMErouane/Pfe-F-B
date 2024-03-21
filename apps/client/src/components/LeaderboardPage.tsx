import { useState } from 'react';
import styles from '../styles/styles.module.css';
import { FaSearch } from 'react-icons/fa';
const clients = [
  { id: 1, name: 'John', hoursStudied: 10 },
  { id: 2, name: 'Alice', hoursStudied: 8 },
  { id: 3, name: 'Bob', hoursStudied: 12 },
  { id: 4 , name: 'Hmed', hoursStudied:14},
  { id: 5 , name: 'khalid', hoursStudied:60}
];
const LeaderboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedClients = filteredClients.sort((a, b) => b.hoursStudied - a.hoursStudied);

  return (
    <div className={styles.container2 } >
      <h1 className={`${styles.heading} ${styles.big} ${styles.center} ${styles.bold}`}>Leaderboard</h1>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.input}
          style={{marginRight: '10px'}}
        />
         <FaSearch className={styles.searchIcon} />
      </div>
      <table className={`${styles.table} ${styles.center}`} style={{borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Hours Studied</th>
          </tr>
        </thead>
        <tbody>
          {sortedClients.map((client, index) => (
            <tr key={client.id}>
              <td>{index + 1}</td>
              <td>{client.name}</td>
              <td>{client.hoursStudied}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;