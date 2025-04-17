import { Footer, Header } from '@/components';
import React from 'react'

interface AnimeDetailPageProps {
    params: {
        slug: string;
    };
}

const AnimeDetailPage = ({ params }: AnimeDetailPageProps) => {
    return (
        <main>
            <Header />
            <div className="min-h-screen bg-[#1F1F1F] text-white pt-[94px] p-4 sm:pt-[130px] sm:px-[60px] sm:pb-8">
                <p>Slug: {params.slug}</p>
            </div>
            <Footer />
        </main>
    );
};

export default AnimeDetailPage;
