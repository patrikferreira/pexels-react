export default class GetData {
    private apiUrl: string;

    constructor() {
        this.apiUrl = '/api';
    }

    private async fetchFromApi(route: string, params: { [key: string]: string }) {
        const url = new URL(`${window.location.origin}${this.apiUrl}${route}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch from ${route}: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching from internal API:", error);
            throw new Error("Internal Server Error");
        }
    }

    public async getPhotos(page: number = 1, perPage: number = 15, query: string = "") {
        return this.fetchFromApi('/photos', { page: String(page), per_page: String(perPage), query });
    }

    public async getVideos(page: number = 1, perPage: number = 15, query: string = "") {
        return this.fetchFromApi('/videos', { page: String(page), per_page: String(perPage), query });
    }
}
