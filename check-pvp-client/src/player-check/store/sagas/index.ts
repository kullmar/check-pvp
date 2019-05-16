import { yield, call } from 'redux-saga';
import Api from '../../../app/api';
import * as fromActions from '../actions';
import { Character } from '../../../../../check-pvp-common/models';

function* fetchCharacter(action: fromActions.search) {
    try {
        const character = yield call<Character>(Api.getCharacter(action.payload));
        
    } catch (err) {
        
    }
}