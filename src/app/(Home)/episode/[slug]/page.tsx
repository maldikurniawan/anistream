"use client";

import { Footer, Header } from '@/components';
import { BASE_URL } from '@/constants';
import { EpisodeResponse } from '@/types/EpisodeData';
import React, { useEffect, useState } from 'react';
import { FaRegClock, FaStar, FaVideo } from 'react-icons/fa';
import { ImTv } from 'react-icons/im';

const AnimeDetailPage: React.FC<{ params: Promise<{ slug: string }> }> = ({ params }) => {
    const [animeData, setAnimeData] = useState<EpisodeResponse | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => setIsExpanded(!isExpanded);

    // Fetch the article data when params resolve
    useEffect(() => {
        params.then((resolvedParams) => {
            const slug = resolvedParams.slug;
            const fetchData = async () => {
                const response = await fetch(BASE_URL + "/episode/" + slug);
                const data = await response.json();
                setAnimeData(data);
            };
            fetchData();
        }).catch((error) => {
            console.error('Error resolving params:', error);
        });
    }, [params]);

    const animeDetail = animeData?.data;

    return (
        <main className='overflow-x-hidden'>
            <Header />
            <div className="min-h-screen bg-[#1F1F1F] text-white pt-[94px] p-4 sm:pt-[130px] sm:px-[60px] sm:pb-8">
                <div className="aspect-video w-full mb-4 sm:mb-6">
                    <iframe
                        src={animeDetail?.defaultStreamingUrl}
                        className="w-full h-full rounded-lg border-none"
                        allowFullScreen
                    />
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded-lg border-2 border-[#333333] flex gap-4">
                    <img
                        src={animeDetail?.poster}
                        alt={animeDetail?.title}
                        className="w-[144px] sm:w-[160px] h-[256px] object-cover rounded-lg"
                    />
                    <div>
                        <h3 className="font-semibold sm:font-bold text-sm sm:text-lg line-clamp-1">{animeDetail?.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{animeDetail?.releasedOn}</p>
                        <div onClick={toggleText} className='flex text-[13px] text-gray-300 mt-2 sm:mt-4 cursor-pointer bg-[#2A2A2A] p-0.5 px-1.5 rounded'>
                            <p className={`${isExpanded ? '' : 'line-clamp-1'}`}>
                                {animeDetail?.synopsis.paragraphs}
                            </p>
                            <p
                                className='whitespace-nowrap'
                            >
                                {isExpanded ? '' : '[Show More]'}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 sm:mt-4">
                            {animeDetail?.genreList?.map((genre: any) => (
                                <span
                                    key={genre.genreId}
                                    className="text-xs text-gray-400 bg-[#2A2A2A] px-2 py-0.5 rounded"
                                >
                                    {genre.title}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default AnimeDetailPage;
