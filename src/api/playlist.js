import { request, requestWithoutLoading } from '@/utils'

// Get the playlist
export const getPlaylists = (params) => request.get('/top/playlist', { params })
    // Excellent playlist
export const getTopPlaylists = (params) => request.get('/top/playlist/highquality', { params })
    // Get similar playlists
export const getSimiPlaylists = (id, option) => requestWithoutLoading.get(`/simi/playlist?id=${id}`, option)