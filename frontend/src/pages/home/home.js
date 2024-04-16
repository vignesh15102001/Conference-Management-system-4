import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import styles from '../home/Home.module.css'; // Adjust the path as needed
import NavBar from '../nav';
Modal.setAppElement('#root'); // For accessibility reasons

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentQuery, setCurrentQuery] = useState({});
  const [answer, setAnswer] = useState('');
  const [paperSubmissions, setPaperSubmissions] = useState([]); // State to store paper submissions
  const [reviewerQueries, setReviewerQueries] = useState([]); // State to store reviewer queries

  useEffect(() => {
    // Fetch papers data and reviewer queries from API
    const fetchPapers = async () => {
      try {
        const papersResponse = await axios.get('http://localhost:3000/paper/listAllRecent');
        setPaperSubmissions(papersResponse.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching papers:', error);
      }
    };

    const fetchQueries = async () => {
      try {
        const queriesResponse = await axios.get('http://localhost:3000/query/getAll');
        setReviewerQueries(queriesResponse.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching reviewer queries:', error);
      }
    };

    fetchPapers();
    fetchQueries();
  }, []);

  const openModal = (query) => {
    setCurrentQuery(query);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAnswer(''); // Reset answer input when modal is closed
  };

  const handleSubmit = () => {
    alert('Message sent');
    closeModal(); // Close modal after submission
  };

  return (
    <div>
      <NavBar />
    <div className={styles.homeContainer}>
     
      {/* Paper Submissions Section */}
      <section className={styles.submissionsSection}>
        <h2>Recent Paper Submissions</h2>
        <ul className={styles.paperList}>
          {paperSubmissions.map((paper) => (
            <li key={paper._id} className={styles.paperItem}>
              <Link to={`/paperDetails/${paper._id}`} className={styles.paperTitle}>{paper.paperName}</Link>
              <div className={styles.paperAuthor}>{`by ${paper.paperAuthor}`}</div>
              <div className={styles.paperAbstract}>{paper.abstract}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Reviewer Queries Section */}
      <section className={styles.queriesSection}>
        <h2>Reviewer Queries</h2>
        <ul>
          {reviewerQueries.map((query, index) => (
            <li key={index} className={styles.queryItem} onClick={() => openModal(query)}>
              <div className={styles.queryMessage}>{query.query.substring(0, 50)}...</div>
              <div className={styles.queryAuthor}>{query.reviewer}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Modal for Reviewer Query Details */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Query Details" className={styles.modal}>
        <h2>Query Details</h2>
        <p>{currentQuery.query}</p>
        <p>From: {currentQuery.user}</p>
        <input 
          type="text" 
          value={answer} 
          onChange={(e) => setAnswer(e.target.value)} 
          placeholder="Enter your answer"
          className={styles.answerInput}
        />
        <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
      </Modal>
    </div>
    </div>
  );
}

export default Home;
