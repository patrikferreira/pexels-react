"use client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store/AppContext";
import GetData from "../service/GetData";
import LoadSpin from "../components/LoadSpin";
import Image from "../components/Image";
import Modal from "../components/Modal";
import Button from "../components/Button";
import FixedContainer from "../components/FixedContainer";

export default function Photos() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [perPage] = useState<number>(30);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    src: string;
    photographer: string;
    alt: string;
  } | null>(null);

  const { searchQuery } = useContext(AppContext);
  const getData = new GetData();

  useEffect(() => {
    async function fetchPhotos() {
      setIsLoading(true);
      try {
        const responseData = await getData.getPhotos(
          currentPage,
          perPage,
          searchQuery
        );
        setPhotos((prevPhotos) =>
          currentPage === 1
            ? responseData.photos
            : [...prevPhotos, ...responseData.photos]
        );
        setTotalResults(responseData.total_results);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPhotos();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    setPhotos([]);
    setCurrentPage(1);
  }, [searchQuery]);

  function handleLoadMore() {
    if (photos.length < totalResults) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  function handlePhotoClick(src: string, photographer: string, alt: string) {
    setSelectedPhoto({ src, photographer, alt });
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  }

  return (
    <div className="h-[calc(100%-92px)] pt-[92px]">
      <FixedContainer>
        {isLoading && photos.length === 0 ? (
          <LoadSpin />
        ) : (
          <div className="columns-3 space-y-4 animate-fadeIn">
            {photos.map((photo, index) => (
              <div
                key={`${photo.id}-${index}`}
                onClick={() =>
                  handlePhotoClick(
                    photo.src?.large2x || photo.src?.original,
                    photo.photographer,
                    photo.alt
                  )
                }
              >
                <Image
                  src={photo.src?.large2x || photo.src?.original}
                  alt={photo.alt}
                  photographer={photo.photographer}
                />
              </div>
            ))}
          </div>
        )}
        {photos.length < totalResults && (
          <div className="flex justify-center mt-4">
            <Button
              action={handleLoadMore}
              className="w-32 py-2 rounded-xl bg-firstColor shadow-customShadow text-thirdColor text-sm font-semibold"
            >
              {isLoading ? "Loading..." : "Load more"}
            </Button>
          </div>
        )}

        {isModalOpen && selectedPhoto && (
          <Modal
            onClose={handleCloseModal}
            title={selectedPhoto.photographer}
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
          >
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
          </Modal>
        )}
      </FixedContainer>
    </div>
  );
}
