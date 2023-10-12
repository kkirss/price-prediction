import { createContext, useContext } from 'solid-js'

export interface PredictingStatus {
  predictingLocked: boolean
  showPrediction: boolean
}

interface PredictingStatusUpdate {
  lockPredicting: () => void
  unlockPredicting: () => void
  showPrediction: () => void
  hidePrediction: () => void
}

export const PredictingContext = createContext<[PredictingStatus, PredictingStatusUpdate]>([
  {
    predictingLocked: false,
    showPrediction: false
  }, {
    lockPredicting: () => {},
    unlockPredicting: () => {},
    showPrediction: () => {},
    hidePrediction: () => {}
  }
])

export const usePredictingStatus = (): [PredictingStatus, PredictingStatusUpdate] =>
  useContext(PredictingContext)
