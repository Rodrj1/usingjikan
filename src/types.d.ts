type Genre = {
	mal_id: number;
	name: string;
};

type Webp = {
	image_url: string;
	large_image_url: string;
	small_image_url: string;
};

type Producer = {
	mal_id: number;
	name: string;
	url: string;
};

type Author = {
	mal_id: number;
	name: string;
	url: string;
};

type Theme = {
	mal_id: number;
	name: string;
};

export type Anime = {
	aired: {
		from: string;
		to: string;
		string: string;
	};
	airing: boolean;
	background: string;
	broadcast: {
		day: string;
		string: string;
		time: string;
		timezone: string;
	};
	duration: string;
	episodes: number;
	favorites: number;
	genres: Genre[];
	images: { webp: Webp };
	mal_id: number;
	popularity: number;
	producers: Producer[];
	rating: string;
	score: number;
	scored_by: number;
	source: string;
	status: string;
	synopsis: string;
	title: string;
	title_english: string;
	title_japanese: string;
	title_synonyms: string[];
	trailer: {
		embed_url: string;
		url: string;
		youtube_id: string;
	};
	type: string;
	url: string;
};

export type Manga = {
	background: string;
	favorites: number;
	genres: Genre[];
	images: { webp: Webp };
	mal_id: number;
	popularity: number;
	published: { string: string };
	score: number;
	scored_by: number;
	status: string;
	synopsis: string;
	title: string;
	title_english: string;
	title_japanese: string;
	title_synonyms: string[];
	type: string;
	url: string;
	themes: Theme[];
	authors: Author[];
};

export type Character = {
	character: {
		images: {
			webp: {
				image_url: string;
			};
		};
		mal_id: number;
		name: string;
		url: string;
	};
	favorites:number;
};
