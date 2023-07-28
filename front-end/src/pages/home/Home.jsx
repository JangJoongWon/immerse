import { useState } from 'react';
import './Home.css';
import { Button } from "react-bootstrap";
import MakeStage from "../../modals/makestage/MakeStageModal";
import CardList from "../../components/cards/CardList";

function Home() {

  const [MakeStageOn, setMakeStageOn] = useState(false);

  const genres = ["버스킹", "마술", "샌드아트", "코미디"]

  return (
    <div className="home-container">
      <img className="banner-img" src="../public/icons/totoroposter.jpg" alt="" />
      <MakeStage
        show={MakeStageOn}
        onHide={() => setMakeStageOn(false)}
      />
      <Button
        variant="danger"
        onClick={() => setMakeStageOn(true)}
      >
        방만들기
      </Button>
      {genres.map((genre) => (
        <CardList genre={genre} />
      ))}
    </div>
  );
}

export default Home;
