import { Message } from "src/app/shared/message";
import { Helper } from '../../shared/helper';

export class SafeAlerter {

  constructor(private student: any) {

  }

  /**
   * fire all alerts for the student
   *
   */
  notify() {
    this.notifyNotes();
  }

  /**
   * show warning alert to notify with notes of the student
   *
   */
  notifyNotes() {
    var self = this;
    console.log('notifyNotes()');
    if (this.student.notes)
    if (this.student.notes.length > 0)
      Message.warning(this.student.name, this.student.notes, function(){
        self.notifyOldBalance();
      });
  }

  /**
   * show warning alert to old balance of the student
   *
   */
  notifyOldBalance() {
    console.log('notifyOldBalance()');
    if (this.student.old_balance)
    if (this.student.old_balance > 0)
      Message.warning(this.student.name, Helper.trans('old balance') + " ( " + this.student.old_balance + " ) ");
  }
}
