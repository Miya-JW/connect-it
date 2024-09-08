import axios from 'axios';
const fetch = require('node-fetch');

// Spotify API credentials
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID; // 替换为你的Spotify Client ID
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; // 替换为你的Spotify Client Secret

const API_BASE_URL = 'https://api.spotify.com/v1';

// Function to get access token
async function getAuthToken() {
    const base64 = btoa(clientId + ':' + clientSecret); // 使用 btoa 进行 Base64 编码
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + base64
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
}

//获得查询的歌手信息或者专辑信息（search result page）
export const searchItems = async (searchTerm, searchType) => {
    const token = await getAuthToken();
    let type;
    switch (searchType) {
        case 'music_artist':
            type = 'artist'; // Spotify API 中对应的参数值
            break;
        case 'music_album':
            type = 'album'; // Spotify API 中对应的参数值
            break;
        default:
            throw new Error('Unsupported search type');
    }

    const response = await axios.get(`${API_BASE_URL}/search`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            q: searchTerm,
            type: type,
            limit: 10 // 可以根据需要调整返回结果的数量
        },
    });

    if (searchType === 'music_artist') {
        return response.data.artists.items.map(artist => ({
            artist_id: artist.id,
            artist_name: artist.name,
            artist_image: artist.images[0] ? artist.images[0].url : null,
            artist_spotify_url: artist.external_urls.spotify,
            artist_genre: artist.genres.join(', '),
            artist_popularity: artist.popularity,
            artist_followers: artist.followers.total
        }));
    } 
    else if (searchType === 'music_album') {
        // 接收到数据后进行排序
        return response.data.albums.items
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date)) // 按发布日期降序排序
            .map(album => ({
                album_id: album.id,
                album_title: album.name,
                album_image: album.images[0] ? album.images[0].url : null,
                album_release_date: album.release_date,
                album_total_tracks: album.total_tracks,
                album_spotifyUrl: album.external_urls.spotify,
                album_artist_name: album.artists[0] ? album.artists[0].name : 'Unknown Artist'
            }));
    }


};

//获得最新专辑信息（music page）
export const fetchNewReleases = async () => {
    const token = await getAuthToken(); // 确保你有一个函数来处理认证和获取令牌
    const response = await axios.get(`https://api.spotify.com/v1/browse/new-releases`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            country: 'US', // 选择合适的市场
            limit: 10   // 你可以指定返回的专辑数量
        }
    });

    return response.data.albums.items.map(album => ({
        album_id: album.id,
        album_title: album.name,
        album_image: album.images[0] ? album.images[0].url : null,
        album_release_date: album.release_date,
        album_total_tracks: album.total_tracks,
        album_spotifyUrl: album.external_urls.spotify,
        album_artist_name: album.artists.map(artist => artist.name).join(', ')
    }));
};

//获得最热门专辑信息（music page）
export const getPopularAlbums = async () => {
    const token = await getAuthToken(); // 确保你有一个函数来处理认证和获取令牌
    const response = await axios.get(`https://api.spotify.com/v1/browse/featured-playlists`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            country: 'US', // 根据需要选择合适的市场
            limit: 10   // 你可以指定返回的播放列表数量
        }
    });

    // 假设每个播放列表的第一个专辑是热门的
   const albums = await Promise.all(
        response.data.playlists.items.map(async playlist => {
            const playlistDetails = await axios.get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    limit: 1
                }
            });
            const album = playlistDetails.data.items[0].track.album;
            return {
                album_id: album.id,
                album_title: album.name,
                album_image: album.images[0] ? album.images[0].url : null,
                album_release_date: album.release_date,
                album_total_tracks: album.total_tracks,
                album_spotifyUrl: album.external_urls.spotify,
                album_artist_name: album.artists.map(artist => artist.name).join(', ')
            };
        })
    );

    return albums;
};

// 获得 受欢迎歌手
export const getPopularArtists = async () => {
    try {
        const token = await getAuthToken();
        const response = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: 'genre:pop', // 示例: 改为搜索流行音乐艺术家
                type: 'artist',
                market: 'US',
                limit: 50
            }
        });

        // 检查是否成功获取到数据
        if (response.data && response.data.artists && response.data.artists.items.length > 0) {
            return response.data.artists.items
                .sort((a, b) => b.popularity - a.popularity) // 按流行度降序排序
                .slice(0, 10) // 选择前10位
                .map(artist => ({
                    artist_id: artist.id,
                    artist_name: artist.name,
                    artist_image: artist.images[0] ? artist.images[0].url : null,
                    artist_genre: artist.genres.join(', '),
                    artist_followers: artist.followers.total,
                    artist_popularity: artist.popularity,
                    artist_spotify_url: artist.external_urls.spotify
                }));
        } else {
            console.log('No artists found.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching popular artists:', error);
        return []; // 在错误情况下返回空数组
    }
};