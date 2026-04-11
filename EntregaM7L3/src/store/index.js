import { createStore } from 'vuex'
import auth from './modules/auth'
import frameworks from './modules/frameworks'

export default createStore({
  strict: import.meta.env.DEV,
  modules: {
    auth,
    frameworks,
  },
})