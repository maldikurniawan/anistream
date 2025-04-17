export interface EpisodeResponse {
    data: EpisodeData;
}

export interface EpisodeData {
    title: string;
    animeId: string;
    poster: string;
    releasedOn: string;
    defaultStreamingUrl: string;
    hasPrevEpisode: boolean;
    prevEpisode?: EpisodeLink;
    hasNextEpisode: boolean;
    nextEpisode?: EpisodeLink | null;
    synopsis: Synopsis;
    genreList: Genre[];
    server: Server;
    downloadUrl: DownloadUrl;
    recommendedEpisodeList: RecommendedEpisode[];
}

export interface EpisodeLink {
    title: string;
    episodeId: string;
    href: string;
    samehadakuUrl: string;
}

export interface Synopsis {
    paragraphs: string[];
    connections: any[]; // ganti jika ada struktur datanya
}

export interface Genre {
    title: string;
    genreId: string;
    href: string;
    samehadakuUrl: string;
}

export interface Server {
    qualities: ServerQuality[];
}

export interface ServerQuality {
    title: string;
    serverList: ServerList[];
}

export interface ServerList {
    title: string;
    serverId: string;
    href: string;
}

export interface DownloadUrl {
    formats: Format[];
}

export interface Format {
    title: string;
    qualities: DownloadQuality[];
}

export interface DownloadQuality {
    title: string;
    urls: DownloadUrlEntry[];
}

export interface DownloadUrlEntry {
    title: string;
    url: string;
}

export interface RecommendedEpisode {
    title: string;
    poster: string;
    releaseDate: string;
    episodeId: string;
    href: string;
    samehadakuUrl: string;
}
