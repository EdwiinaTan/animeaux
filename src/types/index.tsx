export interface Pictures {
  filename: string
  height: number
  id: string
  size: number
  thumbnails: {
    full: {
      url: string
    }
    large: {
      url: string
    }
    small: {
      url: string
    }
  }
  type: string
  url: string
  width: number
}
