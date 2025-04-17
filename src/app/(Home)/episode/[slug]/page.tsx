"use client";

import { Footer, Header } from '@/components';
import { BASE_URL, SAMEHADA } from '@/constants';
import { EpisodeResponse } from '@/types/EpisodeData';
import React, { useEffect, useState } from 'react';

const AnimeDetailPage: React.FC<{ params: Promise<{ slug: string }> }> = ({ params }) => {
    const [animeData, setAnimeData] = useState<EpisodeResponse | null>(null);
    const [selectedResolution, setSelectedResolution] = useState<string | null>(null);
    const [selectedServers, setSelectedServers] = useState<any[]>([]);
    const [streamingUrl, setStreamingUrl] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => setIsExpanded(!isExpanded);

    useEffect(() => {
        params.then(async ({ slug }) => {
            const res = await fetch(SAMEHADA + "/episode/" + slug);
            const data = await res.json();
            setAnimeData(data);
        });
    }, [params]);

    const animeDetail = animeData?.data;
    const qualities = animeDetail?.server?.qualities || [];

    const handleResolutionClick = (resolution: string) => {
        setSelectedResolution(resolution);
        const servers = qualities.find((q: any) => q.title === resolution)?.serverList || [];
        setSelectedServers(servers);
        setStreamingUrl(null);

        // Jika ada server, langsung pilih server pertama
        if (servers.length > 0) {
            handleServerClick(servers[0].href);
        }
    };

    const handleServerClick = async (href: string) => {
        try {
            const res = await fetch(BASE_URL + href);
            const data = await res.json();
            setStreamingUrl(data?.data?.url);
        } catch (error) {
            console.error('Error fetching server:', error);
        }
    };

    return (
        <main className='overflow-x-hidden'>
            <Header />
            <div className="min-h-screen bg-[#1F1F1F] text-white pt-[94px] p-4 sm:pt-[130px] sm:px-[60px] sm:pb-8">

                {streamingUrl ? (
                    <div className="w-full aspect-video border-2 border-[#333333] rounded-lg mb-4 sm:mb-6">
                        <video src={streamingUrl} controls className="w-full h-full rounded-lg" />
                    </div>
                ) : (
                    <div className="w-full aspect-video border-2 border-[#333333] rounded-lg mb-4 sm:mb-6">
                        <iframe
                            src={animeDetail?.defaultStreamingUrl}
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                        />
                    </div>
                )}

                {/* Pilihan Resolusi */}
                <div className="mb-4 sm:mb-6">
                    <div className="flex gap-2 flex-wrap">
                        {qualities
                            .filter((q: any) => q.serverList?.length > 0)
                            .map((q: any) => (
                                <button
                                    key={q.title}
                                    onClick={() => handleResolutionClick(q.title)}
                                    className={`px-3 py-1 text-sm rounded-lg border-2 hover:border-[#8C00FF] cursor-pointer ${selectedResolution === q.title ? 'border-[#8C00FF]' : 'border-[#333333]'}`}
                                >
                                    {q.title}
                                </button>
                            ))}
                    </div>
                </div>

                {/* Detail Anime */}
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
                                {animeDetail?.synopsis?.paragraphs}
                            </p>
                            <p className='whitespace-nowrap'>
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
