import { useState } from 'react';
import styles from './Home.module.css';
import { Button } from "react-bootstrap";
import MakeStage from "../../components/makestage/MakeStageModal";
import CardList from "../../components/cards/HomeCardList";

function Home() {

  const [MakeStageOn, setMakeStageOn] = useState(false);

  const genres = ["버스킹", "마술", "샌드아트", "코미디"]

  return (
    <div className={styles.container}>
      <img className={styles.banner} src="../public/icons/totoroposter.jpg" alt="" />
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
      <div className='list'>
        {genres.map((genre) => (
          <CardList genre={genre} />
        ))}
      </div>
    </div>
  );
}

export default Home;
