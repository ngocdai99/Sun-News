import {
    Dimensions,
    Platform,
    PlatformIOSStatic,
    ScaledSize
} from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }: ScaledSize =
    Dimensions.get('window');
export const { width: widthScreen, height: heightScreen }: ScaledSize =
    Dimensions.get('screen');
export const platform = Platform as PlatformIOSStatic;
export const initTop: number = initialWindowMetrics?.insets.top || 0;

export const initBottom: number = initialWindowMetrics?.insets.bottom || 0;

export const isIOS: boolean = Platform.OS === 'ios';

export const isAndroid: boolean = Platform.OS === 'android';
