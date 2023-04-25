import {Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css"
import 'primeicons/primeicons.css';
import ImageClassification from "./pages/Image";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" exact element={<ImageClassification />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
