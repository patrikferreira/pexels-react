"use client";
import { useEffect, useRef, useState } from "react";
import LoadSpin from "./LoadSpin";

export default function DataContainer() {
  const [dataOption, setDataOption] = useState<string>("photos");
  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [perPage] = useState<number>(15);
  const observerRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="h-full">
      <div className="h-full">
        {isLoading ? (
          <LoadSpin />
        ) : (
          <div className="grid grid-cols-3 gap-4 animate-fadeIn">
            {photos.map((photo: any) => (
              <img
                key={photo.id}
                src={photo.src.large2x}
                alt={photo.alt}
                className="w-full h-auto"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
