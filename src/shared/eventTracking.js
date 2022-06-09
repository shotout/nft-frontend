import {Adjust, AdjustEvent} from 'react-native-adjust';
import analytics from '@react-native-firebase/analytics';
import {isIphone} from './devices';

export const SELECT_WALLET_ID = 'j81x6y';
export const UNSELECT_WALLET_ID = 'i9yy3h';
export const SIGN_UP_SUCCESS_ID = 'd4wqbc';
export const SIGN_IN_SUCCESS_ID = 'xm63ag';
export const OPEN_COLLECTION_ID = 'ktgvnx';
export const HYPE_COLLECTION_ID = 'per8m1';
export const UNHYPE_COLLECTION_ID = 'disd7w';
export const SWYPE_COLLECTION_ID = '74zxjc';
export const OPEN_COLLECTION_DURATION_ID = '3hltmi';
export const OPEN_MINT = 'efh83v';

const getScreenName = id => {
  switch (id) {
    case SELECT_WALLET_ID:
      return 'select_wallet';
    case UNSELECT_WALLET_ID:
      return 'unselect_wallet';
    case SIGN_IN_SUCCESS_ID:
      return 'sign_up_success';
    case OPEN_COLLECTION_ID:
      return 'open_collection';
    case HYPE_COLLECTION_ID:
      return 'hype_collection';
    case UNHYPE_COLLECTION_ID:
      return 'unhype_collection';
    case SWYPE_COLLECTION_ID:
      return 'swype_collection';
    case OPEN_COLLECTION_DURATION_ID:
      return 'opened_collection_duration';
    case OPEN_MINT:
      return 'mint_button_pressed';
    default:
      return id;
  }
};

export const eventTracking = async (id, message) => {
  const adjustEvent = new AdjustEvent(id);
  if (message) {
    adjustEvent.setCallbackId(message);
  }
  Adjust.trackEvent(adjustEvent);
  await analytics().logEvent(getScreenName(id), {
    id,
    item: message,
    // description: ['round neck', 'long sleeved'],
    // size: 'L',
  });
  console.log('Tracking content:', message);
};

export const askTrackingPermission = () => {
  if (isIphone) {
    Adjust.requestTrackingAuthorizationWithCompletionHandler(status => {
      switch (status) {
        case 0:
          // ATTrackingManagerAuthorizationStatusNotDetermined case
          console.log("The user hasn't been asked yet");
          break;
        case 1:
          // ATTrackingManagerAuthorizationStatusRestricted case
          console.log('The user device is restricted');
          break;
        case 2:
          // ATTrackingManagerAuthorizationStatusDenied case
          console.log('The user denied access to IDFA');
          break;
        case 3:
          // ATTrackingManagerAuthorizationStatusAuthorized case
          console.log('The user authorized access to IDFA');
          break;
        default:
          console.log('The status is not available');
          break;
      }
    });
  }
};
