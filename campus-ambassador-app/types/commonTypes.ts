export interface BoundingBox {
  height: number
  left: number
  top: number
  width: number
}

export interface ProfileImageFaceResult {
  boundingBox: BoundingBox
  confidence: number
}
