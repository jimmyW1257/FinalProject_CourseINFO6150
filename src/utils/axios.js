import axios from 'axios'
import { Loading } from 'element-ui'
import { confirm } from '@/base/confirm'
import store from '@/store'

const BASE_URL = 'https://mu-api.yuk0.com/'
    // Request instance without global loading
export const requestWithoutLoading = createBaseInstance()
    // Request instance with global loading
    // The function is passed in because loading needs to be handled before handling the request result handleResponse
    // So you need to insert the loading interceptor processing logic internally
export const request = createBaseInstance()
mixinLoading(request.interceptors)
    // Generic axios instance
function createBaseInstance() {
    const instance = axios.create({
        baseURL: BASE_URL,
    })

    instance.interceptors.response.use(handleResponse, handleError)
    return instance
}

function handleError(e) {
    confirm(e.message, 'Error~')
    throw e
}

function handleResponse(response) {
    return response.data
}

let loading
let loadingCount = 0
const SET_AXIOS_LOADING = 'global/setAxiosLoading'

function mixinLoading(interceptors) {
    interceptors.request.use(loadingRequestInterceptor)
    interceptors.response.use(
        loadingResponseInterceptor,
        loadingResponseErrorInterceptor
    )

    function loadingRequestInterceptor(config) {
        if (!loading) {
            loading = Loading.service({
                target: 'body',
                background: 'transparent',
                text: 'Loading',
            })
            store.commit(SET_AXIOS_LOADING, true)
        }
        loadingCount++

        return config
    }

    function handleResponseLoading() {
        loadingCount--
        if (loadingCount === 0) {
            loading.close()
            loading = null
            store.commit(SET_AXIOS_LOADING, false)
        }
    }

    function loadingResponseInterceptor(response) {
        handleResponseLoading()
        return response
    }

    function loadingResponseErrorInterceptor(e) {
        handleResponseLoading()
        throw e
    }
}