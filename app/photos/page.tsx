"use client";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { AppContext } from "../store/AppContext";
import GetData from "../service/GetData";
import LoadSpin from "../components/LoadSpin";
import Image from "../components/Image";
import Modal from "../components/Modal";
import FixedContainer from "../components/FixedContainer";
import ContentFilter from "../components/ContentFilter";

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
  const scrollRef = useRef<boolean>(false);

  useEffect(() => {
    async function fetchPhotos() {
      setIsLoading(true);
      try {
        const responseData = await getData.getPhotos(currentPage, perPage, searchQuery);
        setPhotos((prevPhotos) => {
          const newPhotos = [...prevPhotos, ...responseData.photos];

          const uniquePhotos = Array.from(new Map(newPhotos.map(photo => [photo.id, photo])).values());

          return currentPage === 1 ? responseData.photos : uniquePhotos;
        });
        setTotalResults(responseData.total_results);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setIsLoading(false);
        scrollRef.current = false;
      }
    }

    fetchPhotos();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    setPhotos([]);
    setCurrentPage(1);
  }, [searchQuery]);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (isBottom && photos.length < totalResults) {
      scrollRef.current = true;
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [photos.length, totalResults]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  function handlePhotoClick(src: string, photographer: string, alt: string) {
    setSelectedPhoto({ src, photographer, alt });
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  }

  return (
    <div className="h-[calc(100%-78px)] pt-[78px] sm:h-[calc(100%-94px)] sm:pt-[94px]">
      <FixedContainer>
        {isLoading && photos.length === 0 ? (
          <LoadSpin />
        ) : (
          <div className="flex flex-col gap-4">
            <ContentFilter />
            <div className="columns-1 sm:columns-2 md:columns-3 space-y-4 animate-fadeIn">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(photo.src?.large2x || photo.src?.original, photo.photographer, photo.alt)}
              >
                <Image src={photo.src?.large2x || photo.src?.original} alt={photo.alt} photographer={photo.photographer} />
              </div>
            ))}
          </div>
          </div>
        )}

        {isLoading && <LoadSpin />}

        {isModalOpen && selectedPhoto && (
          <Modal onClose={handleCloseModal} title={selectedPhoto.photographer} src={selectedPhoto.src} alt={selectedPhoto.alt}>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
          </Modal>
        )}
      </FixedContainer>
    </div>
  );
}
