import './App.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Header } from './Header';
import { Home } from './Home';

function App() {
  return (
    <div className="container">
      <Header />
      <Home />
    </div>
  );
}

export default App;
