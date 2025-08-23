import { useEffect, useState } from "react";
import Container from "./Components/Container";
const App = () => {

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  return (
    <>
      {loader ? <div className="loader"><img src="./images/loader.gif" alt="" /></div> : ""}
      <div className="container">
        <Container />
      </div>
    </>
  )
}
export default App;
