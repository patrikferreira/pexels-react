"use client";

import { useEffect, useState } from "react";
import LoadSpin from "./LoadSpin";
import Button from "./Button";

export default function DataContainer() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [perPage] = useState<number>(15);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/photos/?page=${currentPage}&per_page=${perPage}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }

        const data = await response.json();
        setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
        setTotalResults(data.total_results);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [currentPage, perPage]);

  const handleLoadMore = () => {
    if (photos.length < totalResults) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="h-full">
      <div className="h-full">
        {isLoading && photos.length === 0 ? (
          <LoadSpin />
        ) : (
          <div className="grid grid-cols-3 gap-4 animate-fadeIn">
            {photos.map((photo: any, index: number) => (
              <img
                key={`${photo.id}-${index}`}
                src={photo.src.large2x}
                alt={photo.alt}
                className="w-full h-auto"
              />
            ))}
          </div>
        )}
        {photos.length < totalResults && (
          <div className="flex justify-center mt-4">
            <Button
              content={isLoading ? "Carregando..." : "Carregar mais"}
              action={handleLoadMore}
              className="w-32 py-2 rounded-xl bg-firstColor shadow-customShadow text-thirdColor text-sm font-semibold"
            />
          </div>
        )}
      </div>
    </div>
  );
}
