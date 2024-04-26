import { requestWithoutLoading } from '@/utils'

// Song comments
export const getSongComment = params =>
    requestWithoutLoading.get(`/comment/music`, { params })
    // Playlist comments
export const getPlaylistComment = params =>
    requestWithoutLoading.get(`/comment/playlist`, { params })
    // Popular comments
export const getHotComment = params =>
    requestWithoutLoading.get(`/comment/hot`, { params })
    // MV comments
export const getMvComment = params =>
    requestWithoutLoading.get('/comment/mv', { params })