export interface AnimeResponse {
    data: AnimeData;
}

export interface AnimeData {
    title: string;
    poster: string;
    score: {
        value: string;
        users: string;
    };
    japanese: string;
    synonyms: string;
    english: string;
    status: 'Ongoing' | 'Completed' | 'Hiatus' | 'Upcoming' | string;
    type: 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special' | string;
    source: 'Manga' | 'Light Novel' | 'Original' | 'Visual Novel' | 'Game' | string;
    duration: string;
    episodes: number;
    season: string;
    studios: string;
    producers: string;
    aired: string;
    trailer: string;
    synopsis: {
        paragraphs: string[];
        connections: Connection[];
    };
    genreList: Genre[];
    batchList: Batch[];
    episodeList: Episode[];
}

export interface Genre {
    title: string;
    genreId: string;
    href: string;
    samehadakuUrl: string;
}

export interface Episode {
    title: number | string;
    episodeId: string;
    href: string;
    samehadakuUrl: string;
}

export interface Connection {
    title: string;
    relation: string;
    animeId: string;
    href: string;
    samehadakuUrl: string;
}

export interface Batch {
    resolution: string;
    downloadLinks: {
        provider: string;
        url: string;
    }[];
}
