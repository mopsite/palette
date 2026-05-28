export const copyToClipboard = async text => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('复制失败：', err)
  }
}

const isAvailable = typeof localStorage !== 'undefined'

export const storage = {
  get(key, defaultValue = null) {
    if (!isAvailable) return defaultValue
    try {
      const val = localStorage.getItem(key)
      return val === null ? defaultValue : JSON.parse(val)
    } catch {
      return defaultValue
    }
  },

  set(key, value) {
    if (!isAvailable) return
    if (value === undefined) value = null
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  },

  remove(key) {
    if (!isAvailable) return
    try {
      localStorage.removeItem(key)
    } catch {}
  }
}
