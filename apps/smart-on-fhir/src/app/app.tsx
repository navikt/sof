import styles from './app.module.css';
import { Questionnaire } from './components/Questionnaire';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

export function App() {
  return (
    <div className={styles.app}>
      <Questionnaire />
    </div>
  );
}

export default App;
