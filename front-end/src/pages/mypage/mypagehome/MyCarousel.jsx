import Carousel from 'react-bootstrap/Carousel';
import { mainBanner } from '/src/assets/images';
import { useNavigate } from 'react-router-dom';

function MyCarousel(props) {
  // console.log(props)
  const navigate = useNavigate()
  const {data} = props

  const toCarouselFirst = (e) => {
    e.preventDefault();
    navigate(`/stageInfo/${data[0]?.showId}`)
  }
  const toCarouselSecond = (e) => {
    e.preventDefault();
    navigate(`/stageInfo/${data[1]?.showId}`)
  }
  const toCarouselThird = (e) => {
    e.preventDefault();
    navigate(`/stageInfo/${data[2]?.showId}`)
  }

  return (
    <Carousel>
      <Carousel.Item 
      style={{width:'34rem',height:'22.75rem'}}
      interval={10000}
      onClick={toCarouselFirst}>
        <img
          src={data[0]?.thumbnail?data[0]?.thumbnail:mainBanner}
          style={{width:'100%',height:'100%'}}
          // className={styles.poster}
          alt="thumbnail"/>
        <Carousel.Caption>
          <h3>{data[0] ? data[0].title : <span>제목</span> }</h3>
          <p>{data[0] ? data[0].title : <span>내용</span> }</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item 
      style={{width:'34rem',height:'22.75rem'}}
      interval={5000}
      onClick={toCarouselSecond}>
        <img
          src={data[1]?.thumbnail?data[1]?.thumbnail:mainBanner}
          style={{width:'100%',height:'100%'}}
          // className={styles.poster}
          alt="thumbnail"/>
        <Carousel.Caption>
          <h3>{data[1] ? data[1].title : <span>제목</span> }</h3>
          <p>{data[1] ? data[1].title : <span>내용</span> }</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item
      style={{width:'34rem',height:'22.75rem'}}
      onClick={toCarouselThird}
      >
        <img
          src={data[2]?.thumbnail?data[2]?.thumbnail:mainBanner}
          style={{width:'100%',height:'100%'}}
          alt="thumbnail"/>
        <Carousel.Caption>
          <h3>{data[2] ? data[2].title : <span>제목</span> }</h3>
          <p>{data[2] ? data[2].title : <span>내용</span> }</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;