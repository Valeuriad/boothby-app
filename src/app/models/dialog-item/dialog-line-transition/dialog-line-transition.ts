import { DialogLine } from '../dialog-line/dialog-line';

export class DialogLineTransition {
    id = 0;
    wait = 0;
    dialogId = 0;
    previous = 0;
    next: DialogLine = new DialogLine();
}
