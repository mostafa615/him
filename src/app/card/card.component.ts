import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HashTable } from 'angular-hashtable';
import { environment } from 'src/environments/environment';
import { StudentAccountService } from '../account/services/student-account.service';
import { Auth } from '../shared/auth';
import { Helper } from '../shared/helper';
import { Message } from '../shared/message';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  doc: any = document;
  searchData: any = {};
  student: any = {};
  cardTypes: any = [];
  selectedCard: any = {};
  cardSrc: any = null;
  availableCards = new HashTable();

  isExportSubmitted = false;

  //
  public searchKey: string;
  public studentSearchDialogShow = false;
  public studentSearchDialogLoader = false;
  public isWait = false;
  public timeoutId;
  public students: any = [];

  //

  constructor(private studentAcountService: StudentAccountService,
    private cardService: CardService,
    private sanitizer: DomSanitizer) {

      //this.preCardSrc();
    }

  ngOnInit() {
    this.loadCardTypes();
  }

  /**
   * load all card types
   *
   * @return Array
   */
  loadCardTypes() {
    this.cardService.getTypes().subscribe((res) => {
      this.cardTypes = res;
    });
  }

  /**
   * get the url of card design
   *
   */
  preCardSrc() {
    // this.selectedCard.id
    let url = environment.apiUrl + "/card/card_types/show/"+this.selectedCard.id+"?api_token="+Auth.getApiToken()+"&student_id="+this.student.id;
    //this.cardSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return url;
  }

  /**
   * check if the card type if rf
   * if rf take the rf code from machine
   */
  checkRfCard() {
    if (this.selectedCard.id == 2) {
      var code = prompt(Helper.trans('enter the RF code'));

      if (!code)
        return this.checkRfCard();

      return code;
    }

    return null;
  }

  /**
   * show terms and condition modal
   */
  showTermsAndConditions() {
    this.doc.jquery('#cardTermCondition').modal('show');
  }

  /**
   * take the payment id from user
   */
  getPaymentId() {
    var code = prompt(Helper.trans('enter the payment id'));

    if (!code)
        return this.getPaymentId();

    return code;
  }

  /**
   * save the card for student
   *
   */
  saveAndPrint() {
    if (!this.student.id)
      return Message.error(Helper.trans('select student first'));

      // no
      // this.selectedCard.id = 1
    if (!this.selectedCard.id)
      return Message.error(Helper.trans('select card'));

    let data = {
      student_id: this.student.id,
      // this.selectedCard.id
      card_id: this.selectedCard.id,
      //payment_id: this.getPaymentId(),
      rf_code: this.checkRfCard()
    };

    this.preCardSrc();
    this.isExportSubmitted = true;
    this.cardService.exportCard(data).subscribe((res: any) => {

      if (res.status == 1) {
        Message.success(res.message);
        Helper.openWindow(this.preCardSrc());

        // update student info
        this.loadStudentInfo(this.student.id);
      } else {
        Message.error(res.message);
      }
      this.isExportSubmitted = false;
    });
    setTimeout(() => {
      $(`#card${this.selectedCard.id}-input`).trigger('click');
    }, 4000);
  }

  /**
   * convert available card array to hashtable
   */
  preAvailableCards() {
    this.selectedCard = {};
    this.availableCards = new HashTable();
    this.student.available_cards.forEach(element => {
      this.availableCards.put(element.id, element);
    });

    if (this.student.available_cards.length > 0)
      this.selectedCard = this.student.available_cards[0];
  }

  //***********************************************
  //*** student search methods
  //***********************************************
  //
  searchInputEvent() {
    if (!this.searchKey)
      return;

    this.students = [];
    this.studentSearchDialogLoader = true;
    this.isWait = true;
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
       this.searchAboutStudent();
    }, 500);
  }

  searchAboutStudent() {
    this.studentAcountService.search(this.searchKey).subscribe((r) => {
        this.studentSearchDialogLoader = false;
        this.students = r;
        if (this.students.length > 0) {
          this.studentSearchDialogShow = true;
        }
    });
  }

  selectStudent(student) {
    if (student) {
      this.searchData.student_id = student.id;
      this.searchKey = student.name;
      this.loadStudentInfo(student.id);
      this.selectedCard.image_url = student.image;
    }
    this.studentSearchDialogShow = false;
  }

  loadStudentInfo(id) {
    this.studentAcountService.getStudentAccount(id).subscribe((res: any) => {
      this.student = res;
      this.preAvailableCards();
    });
  }

}
