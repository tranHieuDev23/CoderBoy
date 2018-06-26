import * as Butter from 'buttercms'
import { GlobalConfig } from '../../configs/global-config'

export const ButterService = Butter(GlobalConfig.BUTTERCMS_API_TOKEN)