import { ParentComponent } from 'solid-js'
import { createStore } from 'solid-js/store'

import { PredictingContext, type PredictingStatus } from './predictingStatus'

export const PredictingStatusProvider: ParentComponent = (props) => {
  const [predictionStatus, setPredictionStatus] = createStore<PredictingStatus>({
    predictingLocked: false,
    showPrediction: false
  })
  const updatePredictionStatus = {
    lockPredicting: () => setPredictionStatus('predictingLocked', true),
    unlockPredicting: () => setPredictionStatus('predictingLocked', false),
    showPrediction: () => setPredictionStatus('showPrediction', true),
    hidePrediction: () => setPredictionStatus('showPrediction', false)
  }
  return (
    <PredictingContext.Provider value={[predictionStatus, updatePredictionStatus]}>
      {props.children}
    </PredictingContext.Provider>
  )
}
