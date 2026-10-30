import type { ComponentType } from 'react'
import type { Screen } from '../data'
import PlanScreen from './PlanScreen'
import RoutesScreen from './RoutesScreen'
import TrackingScreen from './TrackingScreen'
import BoardingScreen from './BoardingScreen'
import JourneyScreen from './JourneyScreen'
import DisruptionScreen from './DisruptionScreen'
import HelpScreen from './HelpScreen'
import RecoveryScreen from './RecoveryScreen'
import TransferScreen from './TransferScreen'
import TransferBoardingScreen from './TransferBoardingScreen'
import ArrivalScreen from './ArrivalScreen'
import FeedbackScreen from './FeedbackScreen'
import DoneScreen from './DoneScreen'
import SettingsScreen from './SettingsScreen'

export const screenComponents: Record<Screen, ComponentType> = {
  plan: PlanScreen,
  routes: RoutesScreen,
  tracking: TrackingScreen,
  boarding: BoardingScreen,
  journey: JourneyScreen,
  disruption: DisruptionScreen,
  help: HelpScreen,
  recovery: RecoveryScreen,
  transfer: TransferScreen,
  transferBoarding: TransferBoardingScreen,
  arrival: ArrivalScreen,
  feedback: FeedbackScreen,
  done: DoneScreen,
  settings: SettingsScreen,
}
