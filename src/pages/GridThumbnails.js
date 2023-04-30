import React, { useState, useEffect } from "react";
import Card from "../components/card/Card";
import { GridThumbnailsContainer } from "./GridThumbnails.style";
import Header from "../components/header/Header";
import Pagination from "../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { urlRequest } from "../redux/apiCalls/urlCallActions";
import Modal from "../components/modal/Modal";

function GridThumbnails() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.urlCall);
  const [galleryData, setGalleryData] = useState([]);
  const [urlConfig, setUrlConfig] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  console.log(modalInfo);
  const postsPerPage = 10;
  const url = `https://api.imgur.com/3/gallery/${urlConfig.section ?? "hot"}/${
    urlConfig.sort ?? "viral"
  }/${urlConfig.window ?? "day"}/1?showViral=${
    urlConfig.showViral ?? true
  }&mature=false&album_previews=false`;

  useEffect(() => {
    dispatch(urlRequest(url));
    setGalleryData(state.data);
  }, [url]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = galleryData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header getUrlInfos={setUrlConfig} />
      <GridThumbnailsContainer>
        {currentPosts.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            imageSrc={card.images ? card.images["0"].link : card.link}
            description={card?.description}
            extraInfo={{
              upvotes: card.ups,
              downvotes: card.downs,
              score: card.score,
              views: card.views,
              photoUrl: card.images ? card.images["0"].link : card.link,
              title: card.title,
              description: card.description,
            }}
            getModal={setOpenModal}
            imgInfo={setModalInfo}
          />
        ))}
      </GridThumbnailsContainer>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={galleryData.length}
        paginate={paginate}
      />
      <Modal
        open={openModal}
        info={modalInfo}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}

export default GridThumbnails;
