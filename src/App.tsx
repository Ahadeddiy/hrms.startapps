import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer autoClose={700}/>
    </>
  );
}

export default App;
