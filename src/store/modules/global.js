import toastr from 'toastr'
import { inBrowser } from '~utils'
import cookies from 'js-cookie'

// toastr.options.positionClass = 'toast-top-center'

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "600",
    "timeOut": "1000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

const state = {
    loading: false,
    progress: 0,
    showLoginModal: false,
    showRegisterModal: false,
    nightModeOnOff: cookies.get('nightMode') ? cookies.get('nightMode').toLowerCase() === 'true' : false
}

const actions = {
    ['gProgress']({ commit }, payload) {
        commit('progress', payload)
    },
    ['showMsg'](store, config) {
        let content, type
        if (typeof config === 'string') {
            content = config
            type = 'error'
        } else {
            content = config.content
            type = config.type
        }

        if (inBrowser) toastr[type](content)
    },
    ['hideMsg']() {
        toastr.clear()
    }
}

const mutations = {
    ['progress'](state, payload) {
        state.progress = payload
    },
    ['showLoginModal'](state, payload) {
        state.showLoginModal = payload
    },
    ['showRegisterModal'](state, payload) {
        state.showRegisterModal = payload
    },
    ['switchNightMode'](state, payload) {
        state.nightModeOnOff = payload
    }
}

const getters = {
    ['getGlobal'](state) {
        return state
    }
}

export default {
    actions,
    state,
    mutations,
    getters
}