import styles from "./HomeCardList.module.css"
import { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from '../../stage_data.json';
import StageCard from "./stagecard";
import { Button } from "react-bootstrap"


function cardList({genre}) {

    // const genres = ["버스킹", "마술", "샌드아트", "코미디"]

    // 캐러셀 세팅
    const settings = {
      arrows: true,
      dots: true,
      infinite: true,
      slidesToShow: 1,
    };
    
    // 상태관리
    const [liveState, setLiveState] = useState(true);
    
    // live상태인 데이터만 live 데이터로 저장
    const liveData = data.filter((item) => {
      return liveState ? item.fields.state === "live" : item.fields.state === "reserved";
    });
    
    const handleLiveButtonClick = () => {
      setLiveState(true);
    };
    
    const handleReserveButtonClick = () => {
      setLiveState(false);
    };

  return (
    <div className={styles.container}>

      <div className={styles.boxcover}>
        <div className={styles.box}>

          <div className="bar">
            <h1 >{genre}</h1>
            <div className="stage-button">
                <Button 
                  onClick={handleLiveButtonClick}
                  variant="outline-light"
                  className={styles.selectbutton}>
                    Live
                  </Button>
                <Button 
                  onClick={handleReserveButtonClick}
                  variant="outline-light"
                  className={styles.selectbutton}>
                    Reserve
                  </Button>
            </div>
          </div>

          <div className={styles.totalbox}>
              <div className={styles.stagelist}>
                <Slider {...settings} className={styles.carousel}>
                  {liveData.map((item) => {
                    if (item.fields.genre === genre) {
                      return (
                        <div className="stage-card-component" key={item.pk}>
                          <StageCard key={item.pk} data={item} />
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Slider>
              </div>
          </div>
      </div>

      </div>

    </div>
  )
}

export default cardList


