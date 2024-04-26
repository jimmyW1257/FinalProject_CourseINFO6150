import { request, requestWithoutLoading } from '@/utils'

// Get the music url
export const getSongUrl = id => request.get(`/song/url?id=${id}`)

// Get music details
export const getSongDetail = ids => request.get(`/song/detail?ids=${ids}`)

// New song express
export const getTopSongs = type => request.get(`/top/song?type=${type}`)

// Similar music
export const getSimiSongs = (id, option) =>
    requestWithoutLoading.get(`/simi/song?id=${id}`, option)

// Lyrics
export const getLyric = id => request.get(`/lyric?id=${id}`)