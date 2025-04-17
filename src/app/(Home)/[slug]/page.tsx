import { Footer, Header } from '@/components';
import React from 'react';

interface PageProps {
  params: {
    slug: string;
  };
}

const AnimeDetailPage = ({ params }: PageProps) => {
  return (
    <main>
      <Header />
      <div className="min-h-screen bg-[#1F1F1F] text-white pt-[94px] p-4 sm:pt-[130px] sm:px-[60px] sm:pb-8">
        <h1 className="text-2xl font-bold mb-4">Detail Anime</h1>
        <p>Slug: <span className="text-[#E3BFFF]">{params.slug}</span></p>
      </div>
      <Footer />
    </main>
  );
};

export default AnimeDetailPage;
