import * as Butter from 'buttercms'
import GlobalConfig from '../../configs/global-config.json'

export const ButterService = Butter(GlobalConfig.BUTTERCMS_API_TOKEN)